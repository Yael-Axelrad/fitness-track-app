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
    public class TrackExerciseRepository:ITrackExerciseRepository
    {
        private readonly IContext context;


        //async Task<Category>
        public TrackExerciseRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<TrackExercise>  AddItem(TrackExercise item)
        {
            await context.TrackExercises.AddAsync(item);
            await  context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            context.TrackExercises.Remove(await GetById(id));
            await  context.Save();
        }

        public async Task<List<TrackExercise>>  GetAll()
        {
            return await context.TrackExercises
        .Include(t => t.FitnessTrack)
        .Include(t => t.FitnessExercise) // אם גם זה רלוונטי
        .ToListAsync();
            //return await context.TrackExercises.ToListAsync();
        }

        public async Task<TrackExercise>  GetById(int id)
        {
            return await context.TrackExercises.FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<object> GetByIdTrack(int id)
        {
            return await context.TrackExercises
            .Include(te => te.FitnessExercise)
            .Where(te => te.TrackId == id)
            .Select(te => new
            {
                ExerciseName = te.FitnessExercise.Name,
                te.Mark
            })
            .ToListAsync();

        }


        public async Task<TrackExercise>  UpdateItem(int id, TrackExercise item)
        {
            var TrackExercise =await GetById(id);
            TrackExercise.Id = item.Id;
            TrackExercise.TrackId = item.TrackId;
            TrackExercise.FitnessExerciseId = item.FitnessExerciseId;
            TrackExercise.Mark = item.Mark;
            await context.Save();
            return TrackExercise;
        }
    }
}


