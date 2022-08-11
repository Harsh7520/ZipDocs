using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ZipDocsApi.Models;
using ZipDocsApi.Utils;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Net.Mail;
using System.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ZipDocsApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class ConsultantController : BaseController
    {

        private IConfiguration config;
        public readonly IHttpContextAccessor _httpContextAccessor;
        public readonly IHostingEnvironment _environment;
      

        public ConsultantController(IHostingEnvironment environment, IHttpContextAccessor accessor, IConfiguration iConfig) : base(environment, accessor, iConfig)
        {
            config = iConfig;
            _httpContextAccessor = accessor;
            _environment = environment;


        }

        [HttpGet]
        [Route("account/downloadfile")]
        public IActionResult downloadFile(int fileid)
        {
            DataTable dt = new DataTable();
            DBHelper dd = new DBHelper(config);
            dt = dd.GetDataTable("select * from account_files where id=" + fileid + " limit 1");
            if (dt == null || dt.Rows.Count == 0)
            {
                return StatusCode(404, "File not found");
            }

            string extension = Convert.ToString(dt.Rows[0]["extension"]).Replace(".","");
            string webRootPath = _environment.WebRootPath;
            string path = Path.Combine(webRootPath, Convert.ToString(dt.Rows[0]["file_path"]));
            var fs = new FileStream(path, FileMode.Open);

            return File(fs, "application/"+extension, Convert.ToString(dt.Rows[0]["name"]));
        }


        [HttpGet]
        [Route("account/getfiles")]
        public IActionResult getFiles(int folderid)
        {
            FilesResponse filesResponse = new FilesResponse();
            filesResponse.apiResponseHeader = new APIResponseHeader();
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }
            DataTable dt = new DataTable();
            DBHelper dd = new DBHelper(config);
            dt = dd.GetDataTable("select * from account_files where folder_id =" + folderid + " order by id");
            if (dt == null || dt.Rows.Count == 0)
            {
                filesResponse.apiResponseHeader.ReturnCode = 404;
                filesResponse.apiResponseHeader.ReturnMessage = "No Files Found";
                return StatusCode(200, "No Files Found");
            }

            filesResponse.filesDetails = new List<FileDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                FileDetails file = new FileDetails();
                file.ID = Convert.ToInt32(dt.Rows[i]["id"]);
                file.ConsultantID = Convert.ToInt32(dt.Rows[i]["consultant_id"]);
                file.CustomerID = Convert.ToInt32(dt.Rows[i]["customer_id"]);
                file.Name = Convert.ToString(dt.Rows[i]["name"]);
                file.AccountID = Convert.ToInt32(dt.Rows[i]["account_id"]);
                file.FolderID = Convert.ToInt32(dt.Rows[i]["folder_id"]);
                file.DiskFileName = Convert.ToString(dt.Rows[i]["disk_file_name"]);
                file.Extension = Convert.ToString(dt.Rows[i]["extension"]);
                file.FilePath = Convert.ToString(dt.Rows[i]["file_path"]);

                filesResponse.filesDetails.Add(file);

            }

            return StatusCode(200, filesResponse);
        }

        [HttpGet]
        [Route("account/getfolders")]
        public IActionResult getFolders(int accountid)
        {
            FoldersResponse foldersResponse = new FoldersResponse();
            foldersResponse.apiResponseHeader = new APIResponseHeader();
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }
            DataTable dt = new DataTable();
            DBHelper dd = new DBHelper(config);
            dt = dd.GetDataTable("select * from account_folders where account_id =" + accountid + " order by parent_id");
            if (dt == null || dt.Rows.Count == 0)
            {
                foldersResponse.apiResponseHeader.ReturnCode = 404;
                foldersResponse.apiResponseHeader.ReturnMessage = "No Folders Found";
                return StatusCode(200, "No Folders Found");
            }

            foldersResponse.foldersDetails = new List<FolderDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                FolderDetails fold = new FolderDetails();
                fold.ID = Convert.ToInt32(dt.Rows[i]["id"]);
                fold.ConsultantID = Convert.ToInt32(dt.Rows[i]["consultant_id"]);
                fold.CustomerID = Convert.ToInt32(dt.Rows[i]["customer_id"]);
                fold.Name = Convert.ToString(dt.Rows[i]["name"]);
                fold.AccountID = Convert.ToInt32(dt.Rows[i]["account_id"]);
                fold.ParentID = Convert.ToInt32(dt.Rows[i]["parent_id"]);
                fold.DiskFolderName = Convert.ToString(dt.Rows[i]["disk_folder_name"]);

                foldersResponse.foldersDetails.Add(fold);

            }

            return StatusCode(200, foldersResponse);
        }


        [HttpGet]
        [Route("consultant/customer/getaccounts")]
        public IActionResult getAccounts(int customerid)
        {
            AccountsResponse accountResponse = new AccountsResponse();
            accountResponse.apiResponseHeader = new APIResponseHeader();
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }
            DataTable dt = new DataTable();
            DBHelper dd = new DBHelper(config);
            dt = dd.GetDataTable("select * from consultant_customer_accounts where customer_id =" + customerid + " order by name");
            if (dt == null || dt.Rows.Count == 0)
            {
                accountResponse.apiResponseHeader.ReturnCode = 404;
                accountResponse.apiResponseHeader.ReturnMessage = "No Accounts Found";
                return StatusCode(200, "No Accounts Found");
            }

            accountResponse.accountsDetails = new List<AccountDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                AccountDetails acc = new AccountDetails();
                acc.ID = Convert.ToInt32(dt.Rows[i]["id"]);
                acc.ConsultantID = Convert.ToInt32(dt.Rows[i]["consultant_id"]);
                acc.CustomerID = Convert.ToInt32(dt.Rows[i]["customer_id"]);
                acc.Name = Convert.ToString(dt.Rows[i]["name"]);
                acc.ContactName = Convert.ToString(dt.Rows[i]["contact_name"]);
                acc.Mobile = Convert.ToString(dt.Rows[i]["mobile"]);
                acc.Email = Convert.ToString(dt.Rows[i]["email"]);
                acc.City = Convert.ToString(dt.Rows[i]["city"]);
                acc.State = Convert.ToString(dt.Rows[i]["state"]);
                acc.Country = Convert.ToString(dt.Rows[i]["country"]);
                acc.Phone1 = Convert.ToString(dt.Rows[i]["phone1"]);
                acc.Phone2 = Convert.ToString(dt.Rows[i]["phone2"]);
                acc.Pincode = Convert.ToString(dt.Rows[i]["pincode"]);
                accountResponse.accountsDetails.Add(acc);

            }

            return StatusCode(200, accountResponse);
        }

        [HttpPost]
        [Route("consultant/uploadfile")]

        public IActionResult uploadFile(UploadFileRequest uploadFileRequest)
        {
            int consultant_id = ValidateConsultant();
            uploadFileRequest.ConsultantID = consultant_id;
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }

            FileResponse fileResponse = new FileResponse();
            fileResponse.apiResponseHeader = new APIResponseHeader();

            DBHelper dd = new DBHelper(config);
            DataTable db = dd.GetDataTable("select disk_folder_name from account_folders where id=" + uploadFileRequest.FolderID + " limit 1");
            if (db == null || db.Rows.Count == 0)
            {
                fileResponse.apiResponseHeader.ReturnCode = 101;
                fileResponse.apiResponseHeader.ReturnMessage = "Parent Folder does not exist";
                return StatusCode(200, fileResponse);
            }

            //get disk_folder_name from folder
            string disk_folder_name = db.Rows[0]["disk_folder_name"].ToString();

            string webRootPath = _environment.WebRootPath;
            string uploads = Path.Combine(webRootPath, "documents/" + consultant_id.ToString() + "/" + uploadFileRequest.CustomerID.ToString() + "/" + uploadFileRequest.AccountID.ToString() + "/" + disk_folder_name);
            try
            {
                if (!Directory.Exists(uploads))
                {
                    DirectoryInfo di = Directory.CreateDirectory(uploads);
                }

                //Get extension from uploadFileRequest.Name

                int ext_ind = uploadFileRequest.Name.LastIndexOf(".");

                string ext = uploadFileRequest.Name.Substring(ext_ind);

                string disk_file_name = System.DateTime.Now.Ticks.ToString()+ext;


                string path = Path.Combine(uploads, disk_file_name);
                byte[] fileDataByteArray;
                MemoryStream fileDataStream;
                fileDataByteArray = Convert.FromBase64String(uploadFileRequest.FileBytesBase64);
                fileDataStream = new MemoryStream(fileDataByteArray);
                fileDataStream.Position = 0;
                using (FileStream outputFileStream = new FileStream(path, FileMode.Create))
                {
                    fileDataStream.CopyTo(outputFileStream);
                }

                uploadFileRequest.disk_file_name = disk_file_name;
                uploadFileRequest.Extension = ext;
                int rootind = path.IndexOf("documents");
                uploadFileRequest.FilePath = path.Substring(rootind);


                int fileId = dd.UploadFile(uploadFileRequest);
                //get folder id

                if (fileId > 0)
                {
                    fileResponse.fileDetails = new FileDetails();
                    fileResponse.fileDetails.FolderID = uploadFileRequest.FolderID;
                    fileResponse.fileDetails.Extension = uploadFileRequest.Extension;
                    fileResponse.fileDetails.AccountID = uploadFileRequest.AccountID;
                    fileResponse.fileDetails.ConsultantID = uploadFileRequest.ConsultantID;
                    fileResponse.fileDetails.CustomerID = uploadFileRequest.CustomerID;
                    fileResponse.fileDetails.Name = uploadFileRequest.Name;
                    fileResponse.fileDetails.DiskFileName = uploadFileRequest.disk_file_name;
                    fileResponse.fileDetails.ID = fileId;
                    fileResponse.apiResponseHeader.ReturnCode = 0;
                    fileResponse.apiResponseHeader.ReturnMessage = "Success";
                   
                    return StatusCode(200, fileResponse);
                }
                else
                {
                    fileResponse.apiResponseHeader.ReturnCode = 301;
                    fileResponse.apiResponseHeader.ReturnMessage = "Unable to Create Folder";
                    return StatusCode(200, fileResponse);

                }
                //insert record in database

                return StatusCode(200);
            }
            catch
            {
                return StatusCode(400);
            }


        }



        [HttpPost]
        [Route("consultant/createaccountfolder")]
        public IActionResult createAccountFolder(CreateFolderRequest createFolderRequest)
        {
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }
            createFolderRequest.ConsultantID = consultant_id;
            FolderResponse folderResponse = new FolderResponse();
            folderResponse.apiResponseHeader = new APIResponseHeader();

            if (String.IsNullOrEmpty(createFolderRequest.Name))
            {
                folderResponse.apiResponseHeader.ReturnCode = 101;
                folderResponse.apiResponseHeader.ReturnMessage = "Name is Mandatory";
                return StatusCode(200, folderResponse);
            }

            DBHelper dd = new DBHelper(config);
            DataTable db = dd.GetDataTable("select id,name from account_folders where id=" + createFolderRequest.ParentID + " and account_id=" + createFolderRequest.AccountID + " limit 1");
            if(db == null || db.Rows.Count == 0)
            {
                folderResponse.apiResponseHeader.ReturnCode = 101;
                folderResponse.apiResponseHeader.ReturnMessage = "Parent Folder does not exist";
                return StatusCode(200, folderResponse);
            }
            if (db.Rows[0]["id"].ToString() != createFolderRequest.ParentID.ToString())
            {
                folderResponse.apiResponseHeader.ReturnCode = 101;
                folderResponse.apiResponseHeader.ReturnMessage = "Parent ID is invalid";
                return StatusCode(200, folderResponse);
            }
            DataTable dt = dd.GetDataTable("select name from account_folders where parent_id=" +createFolderRequest.ParentID + " and account_id="+createFolderRequest.AccountID+ " and name='" + createFolderRequest.Name + "' limit 1");
            if (!(dt == null || dt.Rows.Count == 0))
            {
                folderResponse.apiResponseHeader.ReturnCode = 201;
                folderResponse.apiResponseHeader.ReturnMessage = "Folder Already Exists";
                return StatusCode(200, folderResponse);

            }

            string disk_folder_name = DateTime.Now.Ticks.ToString();

            string webRootPath = _environment.WebRootPath;
            string uploads = Path.Combine(webRootPath, "documents/" + createFolderRequest.ConsultantID.ToString() + "/" + createFolderRequest.CustomerID.ToString() + "/" + createFolderRequest.AccountID.ToString() + "/" + disk_folder_name);

            try
            {
                if (!Directory.Exists(uploads))
                {
                    DirectoryInfo di = Directory.CreateDirectory(uploads);
                }
            }
            catch
            {
                folderResponse.apiResponseHeader.ReturnCode = 201;
                folderResponse.apiResponseHeader.ReturnMessage = "Can't create folder";
                return StatusCode(200, folderResponse);
            }
            createFolderRequest.disk_folder_name = disk_folder_name;


            int folderId =  dd.CreateFolder(createFolderRequest);
            //get folder id

            if (folderId>0)
            {
                folderResponse.folderDetails = new FolderDetails();
                folderResponse.apiResponseHeader.ReturnCode = 0;
                folderResponse.apiResponseHeader.ReturnMessage = "Success";
                folderResponse.folderDetails.AccountID = createFolderRequest.AccountID;
                folderResponse.folderDetails.Name = createFolderRequest.Name;
                folderResponse.folderDetails.ParentID = createFolderRequest.ParentID;
                folderResponse.folderDetails.ConsultantID = createFolderRequest.ConsultantID;
                folderResponse.folderDetails.CustomerID = createFolderRequest.CustomerID;
                folderResponse.folderDetails.DiskFolderName = createFolderRequest.disk_folder_name;


                return StatusCode(200,folderResponse);
            }
            else
            {
                folderResponse.apiResponseHeader.ReturnCode = 301;
                folderResponse.apiResponseHeader.ReturnMessage = "Unable to Create Folder";
                return StatusCode(200, folderResponse);

            }
                
        }

        [HttpPost]
        [Route("consultant/createcustomeraccount")]

        public IActionResult createCustomerAccount(CustomerAccountRequest customerAccountRequest)
        {
            
            
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {

                return StatusCode(401, "Unauthorized");
            }


            customerAccountRequest.ConsultantID = consultant_id;
            AccountResponse accountResponse = new AccountResponse();

            accountResponse.apiResponseHeader = new APIResponseHeader();

            if (String.IsNullOrEmpty(customerAccountRequest.Name))
            {
                accountResponse.apiResponseHeader.ReturnCode = 101;
                accountResponse.apiResponseHeader.ReturnMessage = "Name is Mandatory";
                return StatusCode(200, accountResponse);
            }

            if (String.IsNullOrEmpty(customerAccountRequest.Mobile))
            {
                accountResponse.apiResponseHeader.ReturnCode = 101;
                accountResponse.apiResponseHeader.ReturnMessage = "Mobile is Mandatory";
                return StatusCode(200, accountResponse);
            }

            if (customerAccountRequest.Mobile.Length != 10)
            {
                accountResponse.apiResponseHeader.ReturnCode = 101;
                accountResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, accountResponse);
            }

            bool isMobile = Regex.IsMatch(customerAccountRequest.Mobile, @"\+?[0-9]{10}");
            if (!isMobile)
            {
                accountResponse.apiResponseHeader.ReturnCode = 101;
                accountResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, accountResponse);
            }
            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select * from consultant_customer_accounts where customer_id=" + customerAccountRequest.CustomerID + " and customer_id="+customerAccountRequest.CustomerID+"and name='"+customerAccountRequest.Name+"' limit 1");
            if (!(dt == null || dt.Rows.Count == 0))
            {
                accountResponse.apiResponseHeader.ReturnCode = 201;
                accountResponse.apiResponseHeader.ReturnMessage = "Account Already Exists";
                return StatusCode(200, accountResponse);

            }
            bool accountInserted = dd.CreateAccount(customerAccountRequest);
            if (accountInserted)
            {
                accountResponse.accountDetails = new AccountDetails();
                accountResponse.apiResponseHeader.ReturnCode = 0;
                accountResponse.apiResponseHeader.ReturnMessage = "Success";
                accountResponse.accountDetails.ConsultantID = customerAccountRequest.ConsultantID;
                accountResponse.accountDetails.CustomerID = customerAccountRequest.CustomerID;
                accountResponse.accountDetails.Name = customerAccountRequest.Name;
                accountResponse.accountDetails.ContactName = customerAccountRequest.ContactName;
                accountResponse.accountDetails.Mobile = customerAccountRequest.Mobile;
                accountResponse.accountDetails.Phone1 = customerAccountRequest.Phone1;
                accountResponse.accountDetails.Phone2 = customerAccountRequest.Phone2;
                accountResponse.accountDetails.AccountTypeID = customerAccountRequest.AccountTypeID;
                accountResponse.accountDetails.Address = customerAccountRequest.Address;
                accountResponse.accountDetails.Email = customerAccountRequest.Email;
                accountResponse.accountDetails.City = customerAccountRequest.City;
                accountResponse.accountDetails.State = customerAccountRequest.State;
                accountResponse.accountDetails.Country = customerAccountRequest.Country;
                accountResponse.accountDetails.Pincode = customerAccountRequest.Pincode;




                return StatusCode(200,accountResponse);
            }
            else
            {

                accountResponse.apiResponseHeader.ReturnCode = 301;
                accountResponse.apiResponseHeader.ReturnMessage = "Unable to Create Account";
                return StatusCode(200, accountResponse);
            }
        }

        [HttpGet]
        [Route("consultant/getcustomers")]

        public IActionResult getCustomers()
        {
            CustomersResponse customersResponse = new CustomersResponse();
            customersResponse.apiResponseHeader = new APIResponseHeader();
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {
               
                return StatusCode(401, "Unauthorized");
            }
            DataTable dt = new DataTable();
            DBHelper dd = new DBHelper(config);
            dt = dd.GetDataTable("select c.* from customers c inner join consultant_customers cc on cc.customer_id = c.id where cc.consultant_id = " + consultant_id.ToString() + " order by name");
            if (dt == null || dt.Rows.Count == 0)
            {
                customersResponse.apiResponseHeader.ReturnCode = 404;
                customersResponse.apiResponseHeader.ReturnMessage = "No Customers Found";
                return StatusCode(200, "No Customers Found");
            }

            customersResponse.customersDetails = new List<CustomerDetails>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                CustomerDetails cust = new CustomerDetails();
                cust.ID = Convert.ToInt32(dt.Rows[i]["id"]);
                cust.Name = Convert.ToString(dt.Rows[i]["name"]);
                cust.Mobile = Convert.ToString(dt.Rows[i]["mobile"]);
                cust.Email = Convert.ToString(dt.Rows[i]["email"]);
                cust.Address = Convert.ToString(dt.Rows[i]["address"]);
                cust.City = Convert.ToString(dt.Rows[i]["city"]);
                cust.State = Convert.ToString(dt.Rows[i]["state"]);
                cust.Country = Convert.ToString(dt.Rows[i]["country"]);
                cust.Phone1 = Convert.ToString(dt.Rows[i]["phone1"]);
                cust.Phone2 = Convert.ToString(dt.Rows[i]["phone2"]);
                cust.registered_on = Convert.ToString(dt.Rows[i]["Registered_on"]);
                customersResponse.customersDetails.Add(cust);

            }

            return StatusCode(200,customersResponse);
        }

        [HttpPost]
        [Route("consultant/createcustomer")]
        public IActionResult createCustomer(CustomerCreateRequest customerCreateRequest)
        {

            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {
                return StatusCode(401, "Unauthorized");
            }

            customerCreateRequest.ConsultantID = consultant_id;
            CustomerResponse customerResponse = new CustomerResponse();

            customerResponse.apiResponseHeader = new APIResponseHeader();
            if (String.IsNullOrEmpty(customerCreateRequest.Name))
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Name is Mandatory";
                return StatusCode(200, customerResponse);
            }

            if (String.IsNullOrEmpty(customerCreateRequest.Mobile))
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Mobile is Mandatory";
                return StatusCode(200, customerResponse);
            }

            if (customerCreateRequest.Mobile.Length != 10)
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, customerResponse);
            }

            bool isMobile = Regex.IsMatch(customerCreateRequest.Mobile, @"\+?[0-9]{10}");
            if (!isMobile)
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, customerResponse);
            }

            if (String.IsNullOrEmpty(customerCreateRequest.Email))
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Email is Mandatory";
                return StatusCode(200, customerResponse);
            }

            bool isEmail = Regex.IsMatch(customerCreateRequest.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            if (!isEmail)
            {
                customerResponse.apiResponseHeader.ReturnCode = 101;
                customerResponse.apiResponseHeader.ReturnMessage = "Invalid Email";
                return StatusCode(200, customerResponse);
            }

            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select mobile,email from customers where mobile='" + customerCreateRequest.Mobile + "' or email='" + customerCreateRequest.Email + "' limit 1");
            if (!(dt == null || dt.Rows.Count == 0))
            {
                if (dt.Rows[0]["Mobile"].ToString() == customerCreateRequest.Mobile || dt.Rows[0]["Email"].ToString() == customerCreateRequest.Email)
                {

                    customerResponse.apiResponseHeader.ReturnCode = 201;
                    customerResponse.apiResponseHeader.ReturnMessage = "Customer Already Exists";
                    return StatusCode(200, customerResponse);

                }
            }
            bool customerInserted = dd.CreateCustomer(customerCreateRequest);
            if (customerInserted)
            {

                //send mail to consultant
                MailHelper mm = new MailHelper(config);
                DataTable db = mm.SendConsultantRegistrationMail("select password from customers where mobile='" + customerCreateRequest.Mobile + "' and email='" + customerCreateRequest.Email + "' limit 1");
                if (!(db == null || db.Rows.Count == 0))
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("harsh.bhatt811@gmail.com", "xeoehcdvpblywqod"),
                        EnableSsl = true,
                    };

                    smtpClient.Send("harsh.bhatt811@gmail.com", customerCreateRequest.Email, "ZipDocs Registration Details", "Your Password for login is : " + db.Rows[0]["Password"].ToString());
                }
                customerResponse.customerDetails = new CustomerDetails();
                customerResponse.apiResponseHeader.ReturnCode = 0;
                customerResponse.apiResponseHeader.ReturnMessage = "Success";
                customerResponse.customerDetails.Name = customerCreateRequest.Name;
                customerResponse.customerDetails.Mobile = customerCreateRequest.Mobile;
                customerResponse.customerDetails.Email = customerCreateRequest.Email;
                return StatusCode(200, customerResponse);
            }
            else
            {

                customerResponse.apiResponseHeader.ReturnCode = 301;
                customerResponse.apiResponseHeader.ReturnMessage = "Can't create Customer";
                return StatusCode(200, customerResponse);
            }







        }

        

        [HttpGet]
        [Route("consultant/profile")]

        public IActionResult consultantProfile()
        {
            ConsultantDetails profile = new ConsultantDetails();
            int consultant_id = ValidateConsultant();
            if (consultant_id == 0)
            {
                return StatusCode(401, "Unauthorized"); 
            }

            ConsultantResponse consultantResponse = new ConsultantResponse();
            consultantResponse.apiResponseHeader = new APIResponseHeader();
            consultantResponse.consultantDetails = new ConsultantDetails();
            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select * from consultants where id=" + consultant_id.ToString() +" limit 1");
            if ((dt == null || dt.Rows.Count == 0))
            {
                return StatusCode(401, "Unauthorized");
            }
            consultantResponse.apiResponseHeader.ReturnCode = 0;
            consultantResponse.apiResponseHeader.ReturnMessage = "Success";
            consultantResponse.consultantDetails.ID = Convert.ToInt32(dt.Rows[0]["id"]);
            consultantResponse.consultantDetails.Name = Convert.ToString(dt.Rows[0]["name"]);
            consultantResponse.consultantDetails.Address = Convert.ToString(dt.Rows[0]["address"]);

            return StatusCode(200, consultantResponse);
      


        }

        [HttpPost]
        [Route("consultant/forgotpassword")]
        public IActionResult forgotConsultant(ConsultantForgotRequest consultantforgotRequest)
        {
            ConsultantResponse consultantResponse = new ConsultantResponse();
            consultantResponse.apiResponseHeader = new APIResponseHeader();


            if (String.IsNullOrEmpty(consultantforgotRequest.Mobile))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Mobile is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            if (consultantforgotRequest.Mobile.Length != 10)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }

            bool isMobile = Regex.IsMatch(consultantforgotRequest.Mobile, @"\+?[0-9]{10}");
            if (!isMobile)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }

            if (String.IsNullOrEmpty(consultantforgotRequest.Email))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Email is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            bool isEmail = Regex.IsMatch(consultantforgotRequest.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            if (!isEmail)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Email";
                return StatusCode(200, consultantResponse);
            }
            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select mobile,email from consultants where mobile='" + consultantforgotRequest.Mobile + "' and email='" + consultantforgotRequest.Email + "' limit 1");
            if ((dt == null || dt.Rows.Count == 0))
            {


                consultantResponse.apiResponseHeader.ReturnCode = 201;
                consultantResponse.apiResponseHeader.ReturnMessage = "Consultant with this Mobile and Email does not exist";
                return StatusCode(200, consultantResponse);


            }
            bool consultForgotSucc = dd.ForgotConsultant(consultantforgotRequest.Mobile, consultantforgotRequest.Email);
            if (consultForgotSucc)
            {
                MailHelper mm = new MailHelper(config);
                DataTable db = mm.SendConsultantRegistrationMail("select password from consultants where mobile='" + consultantforgotRequest.Mobile + "' and email='" + consultantforgotRequest.Email + "' limit 1");
                if (!(db == null || db.Rows.Count == 0))
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("harsh.bhatt811@gmail.com", "xeoehcdvpblywqod"),
                        EnableSsl = true,
                    };

                    smtpClient.Send("harsh.bhatt811@gmail.com", consultantforgotRequest.Email, "ZipDocs New Password", "Your new Password is : " + db.Rows[0]["Password"].ToString());
                }
                consultantResponse.consultantDetails = new ConsultantDetails();
                consultantResponse.apiResponseHeader.ReturnCode = 0;
                consultantResponse.apiResponseHeader.ReturnMessage = "Success";
                consultantResponse.consultantDetails.Mobile = consultantforgotRequest.Mobile;
                consultantResponse.consultantDetails.Email = consultantforgotRequest.Email;
                return StatusCode(200, consultantResponse);
            }
            else
            {

                consultantResponse.apiResponseHeader.ReturnCode = 301;
                consultantResponse.apiResponseHeader.ReturnMessage = "Unable to Reset Password";
                return StatusCode(200, consultantResponse);
            }
        }
        [HttpPost]
        [Route("consultant/login")]
        public IActionResult loginConsultant(ConsultantLoginRequest consultantloginRequest)
        {
            ConsultantResponse consultantResponse = new ConsultantResponse();
            consultantResponse.apiResponseHeader = new APIResponseHeader();
        

            if (String.IsNullOrEmpty(consultantloginRequest.Mobile))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Mobile is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            if (consultantloginRequest.Mobile.Length != 10)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }

            bool isMobile = Regex.IsMatch(consultantloginRequest.Mobile, @"\+?[0-9]{10}");
            if (!isMobile)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }
            if (String.IsNullOrEmpty(consultantloginRequest.Password))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Password is Mandatory";
                return StatusCode(200, consultantResponse);
            }
            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select id,mobile,password from consultants where mobile='" + consultantloginRequest.Mobile + "' and password='" + consultantloginRequest.Password + "' limit 1");
            if ((dt == null || dt.Rows.Count == 0))
            {
               

                    consultantResponse.apiResponseHeader.ReturnCode = 201;
                    consultantResponse.apiResponseHeader.ReturnMessage = "Incorrect Login Details";
                    return StatusCode(200, consultantResponse);

                
            }
            string consultantID = dt.Rows[0]["id"].ToString();
            
            bool consultLoginSucc = dd.LoginConsultant(consultantloginRequest.Mobile, consultantloginRequest.Password);
            if (consultLoginSucc)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                string jwtKey = config.GetSection("MySettings").GetSection("JWTKey").Value;
                var key = Encoding.ASCII.GetBytes(jwtKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("consultant_id",consultantID)}),
                    Expires = DateTime.Now.AddHours(6),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);


                
                consultantResponse.consultantDetails = new ConsultantDetails();
                
                consultantResponse.apiResponseHeader.ReturnCode = 0;
                consultantResponse.apiResponseHeader.ReturnMessage = "Success";
                consultantResponse.consultantDetails.Mobile = consultantloginRequest.Mobile;
                consultantResponse.consultantDetails.Token = tokenHandler.WriteToken(token);
                return StatusCode(200, consultantResponse);
            }
            else
            {

                consultantResponse.apiResponseHeader.ReturnCode = 301;
                consultantResponse.apiResponseHeader.ReturnMessage = "Can't login";
                return StatusCode(200, consultantResponse);
            }
        }

        [HttpPost]
        [Route("consultant/register")]

        public IActionResult registerConsultant(ConsultantRegisterRequest consultantRegisterRequest)
        {
            ConsultantResponse consultantResponse = new ConsultantResponse();

            consultantResponse.apiResponseHeader = new APIResponseHeader();


            //Validate Request
            if (String.IsNullOrEmpty(consultantRegisterRequest.Name))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Name is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            if (String.IsNullOrEmpty(consultantRegisterRequest.Mobile))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Mobile is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            if (consultantRegisterRequest.Mobile.Length != 10)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }

            bool isMobile = Regex.IsMatch(consultantRegisterRequest.Mobile, @"\+?[0-9]{10}");
            if (!isMobile)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Mobile";
                return StatusCode(200, consultantResponse);
            }

            if (String.IsNullOrEmpty(consultantRegisterRequest.Email))
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Email is Mandatory";
                return StatusCode(200, consultantResponse);
            }

            bool isEmail = Regex.IsMatch(consultantRegisterRequest.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
            if (!isEmail)
            {
                consultantResponse.apiResponseHeader.ReturnCode = 101;
                consultantResponse.apiResponseHeader.ReturnMessage = "Invalid Email";
                return StatusCode(200, consultantResponse);
            }

            DBHelper dd = new DBHelper(config);
            DataTable dt = dd.GetDataTable("select mobile,email from consultants where mobile='" + consultantRegisterRequest.Mobile + "' or email='" + consultantRegisterRequest.Email + "' limit 1");
            if (!(dt == null || dt.Rows.Count == 0))
            {
                if (dt.Rows[0]["Mobile"].ToString() == consultantRegisterRequest.Mobile || dt.Rows[0]["Email"].ToString() == consultantRegisterRequest.Email)
                {

                    consultantResponse.apiResponseHeader.ReturnCode = 201;
                    consultantResponse.apiResponseHeader.ReturnMessage = "Consultant Already Exists";
                    return StatusCode(200, consultantResponse);

                }
            }

            bool consultInserted = dd.RegisterConsultant(consultantRegisterRequest);
            if (consultInserted)
            {

                //send mail to consultant
                MailHelper mm = new MailHelper(config);
                DataTable db = mm.SendConsultantRegistrationMail("select password from consultants where mobile='" + consultantRegisterRequest.Mobile + "' and email='" + consultantRegisterRequest.Email + "' limit 1");
                if (!(db == null || db.Rows.Count == 0))
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("harsh.bhatt811@gmail.com", "xeoehcdvpblywqod"),
                        EnableSsl = true,
                    };

                    smtpClient.Send("harsh.bhatt811@gmail.com", consultantRegisterRequest.Email, "ZipDocs Registration Details", "Your Password for login is : "+db.Rows[0]["Password"].ToString());
                }
                consultantResponse.consultantDetails = new ConsultantDetails();
                consultantResponse.apiResponseHeader.ReturnCode = 0;
                consultantResponse.apiResponseHeader.ReturnMessage = "Success";
                consultantResponse.consultantDetails.Name = consultantRegisterRequest.Name;
                consultantResponse.consultantDetails.Mobile = consultantRegisterRequest.Mobile;
                consultantResponse.consultantDetails.Email = consultantRegisterRequest.Email;
                consultantResponse.consultantDetails.Address = consultantRegisterRequest.Address;
                consultantResponse.consultantDetails.City = consultantRegisterRequest.City;
                consultantResponse.consultantDetails.State = consultantRegisterRequest.State;
                consultantResponse.consultantDetails.Country = consultantRegisterRequest.Country;
                consultantResponse.consultantDetails.Pincode = consultantRegisterRequest.Pincode;
                consultantResponse.consultantDetails.Phone1 = consultantRegisterRequest.Phone1;
                consultantResponse.consultantDetails.Phone2 = consultantRegisterRequest.Phone2;
                
                return StatusCode(200, consultantResponse);
            }
            else
            {

                consultantResponse.apiResponseHeader.ReturnCode = 301;
                consultantResponse.apiResponseHeader.ReturnMessage = "Can't register consultant";
                return StatusCode(200, consultantResponse);
            }

           
        }
      
       

      
    }
}
