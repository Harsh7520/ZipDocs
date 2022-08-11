using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Hosting;

namespace ZipDocsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IConfiguration config;
        public readonly IHttpContextAccessor _httpContextAccessor;
        public readonly IHostingEnvironment _environment;
        public BaseController(IHostingEnvironment environment, IHttpContextAccessor accessor, IConfiguration iConfig)
        {
            config = iConfig;
            _httpContextAccessor = accessor;
            _environment = environment;
        }


        protected int ValidateConsultant()
        {
            if (!_httpContextAccessor.HttpContext.Request.Headers.ContainsKey("Authorization"))
            {
                return 0;
            }
            if (string.IsNullOrEmpty(_httpContextAccessor.HttpContext.Request.Headers["Authorization"]))
            {
                return 0;
            }

            string TokenKey = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            TokenKey = TokenKey.Replace("Bearer ", "");
            var tokenHandler = new JwtSecurityTokenHandler();
            string jwtKey = config.GetSection("MySettings").GetSection("JWTKey").Value;
            var key = Encoding.ASCII.GetBytes(jwtKey);
            try
            {
                tokenHandler.ValidateToken(TokenKey, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero


                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;

                int consultantID = Convert.ToInt32(jwtToken.Claims.First(x => x.Type == "consultant_id").Value);
                return consultantID;

            }

            catch
            {
                return 0;
            }
        }
    }
}
