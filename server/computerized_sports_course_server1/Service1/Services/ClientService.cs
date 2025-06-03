using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Net.Mail;
using System.Net;
using Repository.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Service.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _repository; // השתמש ב- IClientRepository במקום IRepository<Client>
        private readonly IRepository<Client> _clients;

        private readonly IConfiguration _config;

        public ClientService(IClientRepository repository, IRepository<Client> clients, IConfiguration config)
        {
            _repository = repository;
            _clients = clients;
            _config = config;
        }

        public async Task<Client> AddItem(Client item)
        {
            var existingClient = await _repository.GetByEmailAndPassword(item.Mail, item.PhoneNumber);
            if (existingClient != null)
            {
                throw new InvalidOperationException("המשתמש קיים כבר עם מייל וסיסמה אלה");
            }

            await _repository.AddItem(item);
            return item;
        }


        private Client BadRequest(string v)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteItem(int id)
        {
            await _repository.DeleteItem(id);
        }

        public async Task<List<Client>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Client> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        //public async Task<Client> GetByEmailAndPassword(string mail, string PhoneNumber)

        public async Task<Client> GetByEmailAndPassword(string mail, string password)
        {
            var users = await _repository.GetAll();
            var user = users.FirstOrDefault(u => u.Mail == mail);

            if (user == null)
            {
                Console.WriteLine("User not found.");
                return null;
            }

            // השוואת הסיסמה עם המחרוזת המוצפנת
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PhoneNumber);

            if (!isPasswordValid)
            {
                Console.WriteLine("Incorrect password.");
                return null;
            }

            Console.WriteLine($"User {user.Name} authenticated successfully.");
            return user;
        }


        public string Generate(Client user)
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
        new Claim("Id",user.Id.ToString()),
        new Claim(ClaimTypes.NameIdentifier,user.Name),
        new Claim(ClaimTypes.Email,user.Mail),
        new Claim("IdNumber", user.PhoneNumber),
        new Claim(ClaimTypes.MobilePhone,user.PhoneNumber),

    };
                var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                    claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            public Task<Client> UpdateItem(int id, Client item)
        {
            return _repository.UpdateItem(id, item);
        }
    }
}
