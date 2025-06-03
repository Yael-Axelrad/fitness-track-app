using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CategoryTrackService : IService<CategoryTrack>
    {
        private readonly IRepository<CategoryTrack> repository;

        public CategoryTrackService(IRepository<CategoryTrack> repository)
        {
            this.repository = repository;
        }

        public async Task<CategoryTrack> AddItem(CategoryTrack item)
        {
            await repository.AddItem(item);
            return item;
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<CategoryTrack>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<CategoryTrack> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public Task<CategoryTrack> UpdateItem(int id, CategoryTrack item)
        {
            return repository.UpdateItem(id, item);
        }
    }
}
