using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Npgsql;
using ZipDocsApi.Models;

namespace ZipDocsApi.Utils
{
    public class DBHelper
    {

        private IConfiguration config;

        public DBHelper(IConfiguration iConfig)
        {
            config = iConfig;
        }
            

        public DataTable GetDataTable(string Query)
        {
            
            DataTable dt = new DataTable();
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {

                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                objConn.Open();
                NpgsqlDataAdapter objDataAdapter = new NpgsqlDataAdapter(Query, objConn);
                objDataAdapter.Fill(dt);
                objConn.Close();
                return dt;


            }
            catch (Exception ex)
            {
                return null;
            }



        }

        public bool ForgotConsultant(string Mobile, string Email)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {
                string CreatePassword(int length)
                {
                    const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                    StringBuilder res = new StringBuilder();
                    Random rnd = new Random();
                    while (0 < length--)
                    {
                        res.Append(valid[rnd.Next(valid.Length)]);
                    }
                    return res.ToString();
                }
                //create random password
                string newPassword = CreatePassword(8);
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                objConn.Open();
                using var cmd = new NpgsqlCommand("UPDATE consultants SET password = @password WHERE (mobile,email) = (@mobile,@email)", objConn)
                {
                    Parameters =
                    {
                        new("password",newPassword),
                        new("mobile", Mobile),
                        new("email",Email)



                     }
                };

                cmd.ExecuteNonQuery();
                objConn.Close();
                return true;


            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool LoginConsultant(string Mobile,string Password)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {

                DateTime currDate = DateTime.Now;
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                objConn.Open();
                using var cmd = new NpgsqlCommand("UPDATE consultants SET (verified,last_login) = (@verified,@last_login) WHERE (mobile,password) = (@mobile,@password)", objConn)
                {
                    Parameters =
                    {
                        new("verified", true),
                        new("last_login",currDate),
                        new("mobile", Mobile), 
                        new("password",Password)
                        
                        

                     }
                };

                cmd.ExecuteNonQuery();
                objConn.Close();
                return true;


            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool RegisterConsultant(ConsultantRegisterRequest consultantRegisterRequest)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            
            string CreatePassword(int length)
            {
                const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                StringBuilder res = new StringBuilder();
                Random rnd = new Random();
                while (0 < length--)
                {
                    res.Append(valid[rnd.Next(valid.Length)]);
                }
                return res.ToString();
            }
            //create random password
            string newPassword = CreatePassword(8);
            
            try
            {

                DateTime currDate = DateTime.Now;
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                objConn.Open();
                using var cmd = new NpgsqlCommand("INSERT INTO consultants (name,mobile,email,password,registered_on,address,city,state,country,pincode,phone1,phone2,valid_till,allowed_storage_mb) VALUES (@name, @mobile,@email,@password,@registered_on,@address,@city,@state,@country,@pincode,@phone1,@phone2,@valid_till,@allowed_storage_mb)", objConn)
                {
                    Parameters =
                    {
                         new("name", Convert.ToString(consultantRegisterRequest.Name)),
                         new("mobile", Convert.ToString(consultantRegisterRequest.Mobile)),
                         new("email",Convert.ToString(consultantRegisterRequest.Email)),
                         new("password",newPassword),
                         new("registered_on",currDate),
                         new("address",Convert.ToString(consultantRegisterRequest.Address)),
                         new("city",Convert.ToString(consultantRegisterRequest.City)),
                         new("state",Convert.ToString(consultantRegisterRequest.State)),
                         new("country",Convert.ToString(consultantRegisterRequest.Country)),
                         new("pincode",Convert.ToString(consultantRegisterRequest.Pincode)),
                         new("phone1",Convert.ToString(consultantRegisterRequest.Phone1)),
                         new("phone2",Convert.ToString(consultantRegisterRequest.Phone2)),
                         new("valid_till",currDate.AddDays(30)),
                         new("allowed_storage_mb",5)

                     }
                };

                cmd.ExecuteNonQuery();
                objConn.Close();
                return true;


            }
            catch (Exception ex)
            {
                return false;
            }




            
        }

        public int UploadFile(UploadFileRequest uploadFileRequest)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                NpgsqlDataAdapter objDataAdapter = new NpgsqlDataAdapter();
                DataTable dt = new DataTable();
                objConn.Open();
                using var cmd = new NpgsqlCommand("INSERT INTO account_files (name,file_path,folder_id,tags,account_id,consultant_id,customer_id,extension,disk_file_name) VALUES (@name,@file_path,@folder_id,@tags,@account_id,@consultant_id,@customer_id,@extension,@disk_file_name) RETURNING id", objConn)
                {
                    Parameters =
                    {
                        new("name", uploadFileRequest.Name),
                        new("file_path", uploadFileRequest.FilePath),
                        new("folder_id", uploadFileRequest.FolderID),
                        new("tags", uploadFileRequest.Tags),
                        new("account_id", uploadFileRequest.AccountID),
                        new("consultant_id", uploadFileRequest.ConsultantID),
                        new("customer_id", uploadFileRequest.CustomerID),
                        new("extension", uploadFileRequest.Extension),
                        new("disk_file_name", uploadFileRequest.disk_file_name)

                    }
                };
                objDataAdapter.SelectCommand = cmd;
                objDataAdapter.Fill(dt);
                objConn.Close();
                if (dt != null && dt.Rows.Count > 0)
                {
                    int folder_id = Convert.ToInt32(dt.Rows[0]["id"]);

                    return folder_id;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }





        public int CreateFolder(CreateFolderRequest createFolderRequest)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                NpgsqlDataAdapter objDataAdapter = new NpgsqlDataAdapter();
                DataTable dt = new DataTable();
                objConn.Open();
                using var cmd = new NpgsqlCommand("INSERT INTO account_folders (account_id,name,parent_id,consultant_id,customer_id,disk_folder_name) VALUES (@account_id,@name,@parent_id,@consultant_id,@customer_id,@disk_folder_name) RETURNING id", objConn)
                {
                    Parameters =
                        {
                            new("account_id",createFolderRequest.AccountID),
                            new("name",createFolderRequest.Name),
                            new("parent_id",createFolderRequest.ParentID),
                            new("consultant_id",createFolderRequest.ConsultantID),
                            new("customer_id",createFolderRequest.CustomerID),
                            new("disk_folder_name",createFolderRequest.disk_folder_name)

                        }
                };
                objDataAdapter.SelectCommand = cmd;
                objDataAdapter.Fill(dt);
                objConn.Close();
                if (dt != null && dt.Rows.Count > 0)
                {
                    int folder_id = Convert.ToInt32(dt.Rows[0]["id"]);

                    return folder_id;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public bool CreateAccount(CustomerAccountRequest customerAccountRequest)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;
            try
            {
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                NpgsqlDataAdapter objDataAdapter = new NpgsqlDataAdapter();
                DataTable dt = new DataTable();
                objConn.Open();

                using var cmd = new NpgsqlCommand("INSERT INTO consultant_customer_accounts (consultant_id,customer_id,name,contact_name,mobile,phone1,phone2,account_type_id,address,email,city,state,country,pincode) VALUES (@consultant_id,@customer_id,@name,@contact_name,@mobile,@phone1,@phone2,@account_type_id,@address,@email,@city,@state,@country,@pincode) RETURNING id", objConn)
                {
                    Parameters =
                    {
                        new("consultant_id", customerAccountRequest.ConsultantID),
                        new("customer_id", customerAccountRequest.CustomerID),
                        new("name", Convert.ToString(customerAccountRequest.Name)),
                        new("contact_name", Convert.ToString(customerAccountRequest.ContactName)),
                        new("mobile", Convert.ToString(customerAccountRequest.Mobile)),
                        new("phone1", Convert.ToString(customerAccountRequest.Phone1)),
                        new("phone2", Convert.ToString(customerAccountRequest.Phone2)),
                        new("account_type_id", customerAccountRequest.AccountTypeID),
                        new("address", Convert.ToString(customerAccountRequest.Address)),
                        new("email", Convert.ToString(customerAccountRequest.Email)),
                        new("city", Convert.ToString(customerAccountRequest.City)),
                        new("state", Convert.ToString(customerAccountRequest.State)),
                        new("country", Convert.ToString(customerAccountRequest.Country)),
                        new("pincode", Convert.ToString(customerAccountRequest.Pincode)),

                    }
                };
                objDataAdapter.SelectCommand = cmd;
                objDataAdapter.Fill(dt);
                if (dt != null && dt.Rows.Count > 0)
                {
                    int account_id = Convert.ToInt32(dt.Rows[0]["id"]);
                    using var cmd1 = new NpgsqlCommand("INSERT INTO account_folders (account_id,name,parent_id,consultant_id,customer_id) VALUES (@account_id,@name,@parent_id,@consultant_id,@customer_id)", objConn)
                    {
                        Parameters =
                        {
                            new("account_id",account_id),
                            new("name","root"),
                            new("parent_id",Convert.ToInt32(0)),
                            new("consultant_id",customerAccountRequest.ConsultantID),
                            new("customer_id",customerAccountRequest.CustomerID)
                        }
                    };
                    cmd1.ExecuteNonQuery();

                }
                objConn.Close();
                return true;

            }
            catch(Exception ex)
            {
                return false;
            }

        }

        public bool CreateCustomer(CustomerCreateRequest customerCreateRequest)
        {
            string dbConnectionString = config.GetSection("MySettings").GetSection("ConnectionString").Value;

            string CreatePassword(int length)
            {
                const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                StringBuilder res = new StringBuilder();
                Random rnd = new Random();
                while (0 < length--)
                {
                    res.Append(valid[rnd.Next(valid.Length)]);
                }
                return res.ToString();
            }
            //create random password
            string newPassword = CreatePassword(8);

            try
            {

                DateTime currDate = DateTime.Now;
                NpgsqlConnection objConn = new NpgsqlConnection(dbConnectionString);
                NpgsqlDataAdapter objDataAdapter = new NpgsqlDataAdapter();
                DataTable dt = new DataTable();
                objConn.Open();
                using var cmd = new NpgsqlCommand("INSERT INTO customers (name,mobile,email,password,registered_on,address,city,state,country,pincode,phone1,phone2) VALUES (@name, @mobile,@email,@password,@registered_on,@address,@city,@state,@country,@pincode,@phone1,@phone2) RETURNING id", objConn)
                {
                    Parameters =
                    {
                         new("name", Convert.ToString(customerCreateRequest.Name)),
                         new("mobile", Convert.ToString(customerCreateRequest.Mobile)),
                         new("email",Convert.ToString(customerCreateRequest.Email)),
                         new("password",newPassword),
                         new("registered_on",currDate),
                         new("address",Convert.ToString(customerCreateRequest.Address)),
                         new("city",Convert.ToString(customerCreateRequest.City)),
                         new("state",Convert.ToString(customerCreateRequest.State)),
                         new("country",Convert.ToString(customerCreateRequest.Country)),
                         new("pincode",Convert.ToString(customerCreateRequest.Pincode)),
                         new("phone1",Convert.ToString(customerCreateRequest.Phone1)),
                         new("phone2",Convert.ToString(customerCreateRequest.Phone2))
                     }
                };
                objDataAdapter.SelectCommand = cmd;
                objDataAdapter.Fill(dt);
             
                if(dt!=null && dt.Rows.Count>0)
                {
                    int customer_id = Convert.ToInt32(dt.Rows[0]["id"]);
                    using var cmd1 = new NpgsqlCommand("INSERT INTO consultant_customers (consultant_id,customer_id) VALUES (@consultant_id,@customer_id)", objConn)
                    {
                        Parameters =
                    {
                         new("consultant_id",customerCreateRequest.ConsultantID),
                         new("customer_id",customer_id)
                     }
                    };
                    cmd1.ExecuteNonQuery();

                }
                objConn.Close();

                return true;


            }
            catch (Exception ex)
            {
                return false;
            }





        }

    }

}
