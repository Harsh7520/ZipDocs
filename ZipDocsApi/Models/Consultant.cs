using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZipDocsApi.Models
{
    public class Consultant
    {
        

    }

    

    public class ConsultantRegisterRequest
    {
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

    public class ConsultantLoginRequest
    {
        public string Mobile { get; set; }
        public string Password { get; set; }

    }

    public class ConsultantForgotRequest
    {
        public string Mobile { get; set; }
        public string Email { get; set; }

    }

    public class ConsultantDetails
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

        public string valid_till { get; set; }

        public int allowed_storage_mb { get; set; }
        public  string Token { get; set; }
    }

    public class ConsultantResponse
    {
        public APIResponseHeader apiResponseHeader { get; set; }
        public ConsultantDetails consultantDetails { get; set; }
    }

    


}
