using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    
    public class CategoryFitnessRepository:IRepository<CategoryFitness>
    {
        private readonly IContext context;

        public CategoryFitnessRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<CategoryFitness>  AddItem(CategoryFitness item)
        {
            await context.CategoryFitnesses.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.CategoryFitnesses.Remove(await GetById(id));
            await  context.Save();
        }

        public  async Task<List<CategoryFitness>> GetAll()
        {
            return await context.CategoryFitnesses.ToListAsync();
        }

        public async Task<CategoryFitness>  GetById(int id)
        {
            return await context.CategoryFitnesses.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<CategoryFitness>  UpdateItem(int id, CategoryFitness item)
        {
            var CategoryFitness = await GetById(id);
            CategoryFitness.Id = item.Id;
            CategoryFitness.Name = item.Name;
            await context.Save();
            return CategoryFitness;
        }
    }
}
