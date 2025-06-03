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
    public class FitnessExerciseRepository:IFitnessExerciseRepository
    {

        private readonly IContext context;

        public FitnessExerciseRepository(IContext context)
        {
            this.context = context;
        }


        public async Task<FitnessExercise> AddItem(FitnessExercise item)
        {
            await context.FitnessExercises.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task  DeleteItem(int id)
        {
            context.FitnessExercises.Remove(await GetById(id));
           await context.Save();
        }

        public async Task<List<FitnessExercise>>  GetAll()
        {
            return await context.FitnessExercises.ToListAsync();
        }

        public async Task<FitnessExercise>  GetById(int id)
        {
            return await context.FitnessExercises.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<FitnessExercise>> GetByTime(int id, List<CategoryFitness> ctgry, int time)
        {
            // אם תרצי מימוש אמיתי – צריך לקרוא לאלגוריתם או לבנות לוגיקה
            // כאן נחזיר את כל התרגילים כרגע כסימולציה:
            return await context.FitnessExercises.ToListAsync();
        }

        public async  Task<FitnessExercise> UpdateItem(int id, FitnessExercise item)
        {
            var FitnessExercise =await GetById(id);
            FitnessExercise.Id = item.Id;
            FitnessExercise.Description = item.Description;
            FitnessExercise.Gif = item.Gif;
            FitnessExercise.Duration = item.Duration;
            FitnessExercise.StartingAge = item.StartingAge;
            FitnessExercise.EndingAge = item.EndingAge;
            await context.Save();
            return FitnessExercise;
        }
    }
}

