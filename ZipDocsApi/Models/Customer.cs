using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipDocsApi.Models
{
    public class CustomerAccountRequest
    {
        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string Name { get; set; }

        public string ContactName { get; set; }

        public string Mobile { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }

        public int AccountTypeID { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string Pincode { get; set; }
    }

    public class CustomerCreateRequest
    {
        public int ConsultantID { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string Pincode { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }

    }

    public class CustomerDetails
    {

        public int ID { get; set; }

        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string Pincode { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }
        public string registered_on { get; set; }




    }


    public class AccountDetails
    {
        public int ID { get; set; }
        public int ConsultantID { get; set; }

        public int CustomerID { get; set; }

        public string Name { get; set; }

        public string ContactName { get; set; }

        public string Mobile { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }

        public int AccountTypeID { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string Pincode { get; set; }
    }
    public class CustomerResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public CustomerDetails customerDetails { get; set; }
    }

    public class CustomersResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }

        public List<CustomerDetails> customersDetails { get; set; }
    }

    public class AccountResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public AccountDetails accountDetails { get; set; }
    }

    public class AccountsResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public List<AccountDetails> accountsDetails { get; set; }
    }
}
