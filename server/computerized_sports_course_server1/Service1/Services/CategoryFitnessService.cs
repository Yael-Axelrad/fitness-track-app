using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CategoryFitnessService : IService<CategoryFitness>
    {
        private readonly IRepository<CategoryFitness> repository;

        public CategoryFitnessService(IRepository<CategoryFitness> repository)
        {
            this.repository = repository;
        }

        public async Task<CategoryFitness> AddItem(CategoryFitness item)
        {
            await repository.AddItem(item);
            return item;
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<CategoryFitness>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<CategoryFitness> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public Task<CategoryFitness> UpdateItem(int id, CategoryFitness item)
        {
            return repository.UpdateItem(id, item);
        }
    }
}
