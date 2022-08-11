using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ZipDocsApi.Utils
{
    public class MailHelper
    {
        private IConfiguration config;

        public MailHelper(IConfiguration iConfig)
        {
            config = iConfig;
        }
        public DataTable SendConsultantRegistrationMail(string Query)
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
    }
}
