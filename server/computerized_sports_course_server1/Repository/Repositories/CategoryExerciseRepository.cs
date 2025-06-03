using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Repository.Repositories
{
    public class CategoryExerciseRepository : IRepository<CategoryExercise>
    {
        private readonly IContext context;

        public CategoryExerciseRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<CategoryExercise> AddItem(CategoryExercise item)
        {
            await  context.CategoryExercises.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.CategoryExercises.Remove(await GetById(id));
           await context.Save();
        }

        public async Task<List<CategoryExercise>> GetAll()
        {
            return await context.CategoryExercises.ToListAsync();
        }

        public async Task<CategoryExercise> GetById(int id)
        {
            return await context.CategoryExercises.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<CategoryExercise> UpdateItem(int id, CategoryExercise item)
        {
            var CategoryExercise =await GetById(id);
            CategoryExercise.Id = item.Id;
            CategoryExercise.FitnessExerciseId = item.FitnessExerciseId;
            CategoryExercise.CategoryId=item.CategoryId;
            await context.Save();
            return CategoryExercise;
        }
    }
}
