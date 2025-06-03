using Repository.Entities;

namespace Repository.Interface
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<Client> GetByEmailAndPassword(string mail, string phoneNumber);
    }
}
