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
    public class CategoryTrackRepository:IRepository<CategoryTrack>
    {
        private readonly IContext context;

        public CategoryTrackRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<CategoryTrack>  AddItem(CategoryTrack item)
        {
            await context.CategoryTracks.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.CategoryTracks.Remove( await GetById(id));
            await context.Save();
        }

        public async Task<List<CategoryTrack>>  GetAll()
        {
            return await context.CategoryTracks.ToListAsync();
        }

        public async Task<CategoryTrack>  GetById(int id)
        {
            return await context.CategoryTracks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<CategoryTrack> UpdateItem(int id, CategoryTrack item)
        {
            var CategoryTrack =await GetById(id);
            CategoryTrack.Id = item.Id;
            CategoryTrack.CategoryFitnessId = item.CategoryFitnessId;
            CategoryTrack.FitnessTrackId = item.FitnessTrackId;
            await context.Save();
            return CategoryTrack;
        }
    }
}
