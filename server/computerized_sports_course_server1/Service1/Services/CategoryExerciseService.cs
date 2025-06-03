using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CategoryExerciseService : IService<CategoryExercise>
    {
        private readonly IRepository<CategoryExercise> repository;

        public CategoryExerciseService(IRepository<CategoryExercise> repository)
        {
            this.repository = repository;
        }


        public async Task<CategoryExercise> AddItem(CategoryExercise item)
        {
            await repository.AddItem(item);
            return item;
        }

        public async Task DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public async Task<List<CategoryExercise>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<CategoryExercise> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public  Task<CategoryExercise> UpdateItem(int id, CategoryExercise item)
        {
            //var CategoryExercise = await GetById(id);
            //CategoryExercise.Id = item.Id;
            //CategoryExercise.FitnessExerciseId = item.FitnessExerciseId;
            //CategoryExercise.CategoryId = item.CategoryId;
            //await context.Save();
            //return CategoryExercise;
            return repository.UpdateItem(id, item);
        }
    }
}
