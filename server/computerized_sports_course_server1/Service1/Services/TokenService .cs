using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
#nullable disable

using Repository.Entities;

namespace Service.Services
{
    public class TokenService
    {
        private readonly string _secretKey = "your_secret_key_here"; // שים כאן מפתח מאובטח יותר

        public string GenerateToken(Client client)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, client.Name),
                new Claim(ClaimTypes.NameIdentifier, client.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "your_issuer",
                audience: "your_audience",
                claims: claims,
                expires: DateTime.Now.AddHours(1),  // הזמן לפקיעת הטוקן
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
