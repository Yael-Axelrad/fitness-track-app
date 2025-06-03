using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt;

namespace Repository.Repositories
{
    public class ClientRepository: IClientRepository
    {
        private readonly IContext context;

        public ClientRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<Client> AddItem(Client item)
        {
            await context.Clients.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.Clients.Remove(await GetById(id));
            await context.Save();
        }

        public async Task<List<Client>>  GetAll()
        {
            return await context.Clients.ToListAsync();
        }

        public async Task<Client>  GetById(int id)
        {
            return await context.Clients.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Client> GetByEmailAndPassword(string mail, string password)
        {
            var users = await GetAll(); // תיקון השגיאה בתחביר
            var user = users.FirstOrDefault(u => u.Mail == mail);

            if (user == null)
            {
                Console.WriteLine("User not found.");
                return null;
            }

            // בדיקת סיסמה מוצפנת מול הקלט
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.Mail); // ודאי שהסיסמה נשמרת בשדה Password

            if (!isPasswordValid)
            {
                Console.WriteLine("Incorrect password.");
                return null;
            }

            Console.WriteLine($"User {user.Name} authenticated successfully.");
            return user;
        }



        public async Task<Client> UpdateItem(int id, Client item)
        {
            var Client =await GetById(id);
            Client.Mail = item.Mail;
            Client.Id = item.Id;
            Client.Name = item.Name;
            Client.Age = item.Age;
            Client.PhoneNumber = item.PhoneNumber;
            Client.Status = item.Status;
            await context.Save();
            return Client;
        }
    }
}
