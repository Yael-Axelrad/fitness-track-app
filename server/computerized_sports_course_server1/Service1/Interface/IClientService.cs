using Repository.Entities;

namespace Service.Interface
{
    public interface IClientService : IService<Client>
    {
        Task<Client> GetByEmailAndPassword(string mail, string phoneNumber);
        string Generate(Client user);
    }
}
