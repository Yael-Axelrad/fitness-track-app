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
    public class FitnessTrackRepository:IRepository<FitnessTrack>
    {

        private readonly IContext context;

        public FitnessTrackRepository(IContext context)
        {
            this.context = context;
        }


        public async  Task<FitnessTrack> AddItem(FitnessTrack item)
        {
            context.FitnessTracks.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.FitnessTracks.Remove( await GetById(id));
            await context.Save();
        }

        public async Task<List<FitnessTrack>>  GetAll()
        {
            return await context.FitnessTracks.ToListAsync();
        }

        public async Task<FitnessTrack>  GetById(int id)
        {
            return await context.FitnessTracks.FirstOrDefaultAsync(x => x.ClientId == id);
        }

        public async Task<FitnessTrack> UpdateItem(int id, FitnessTrack item)
        {
            var FitnessTrack =await GetById(id);
            FitnessTrack.Id = item.Id;
            FitnessTrack.date = item.date;
            FitnessTrack.ClientId = item.ClientId;
            FitnessTrack.Duration = item.Duration;
            FitnessTrack.TrackExercises = item.TrackExercises;
            await context.Save();
            return FitnessTrack;
        }
    }
}

