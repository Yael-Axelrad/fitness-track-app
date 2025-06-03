using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Repository.Entities;

namespace Service.Interface
{
    public interface IFitnessExerciseService : IService<FitnessExercise>
    {
        Task<List<FitnessExercise>> GetByTime(int id, List<CategoryFitness> categoryIds, int time);
    }
}

