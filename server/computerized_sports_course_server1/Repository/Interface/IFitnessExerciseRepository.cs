using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IFitnessExerciseRepository : IRepository<FitnessExercise>
    {
        Task<List<FitnessExercise>> GetByTime(int id, List<CategoryFitness> ctgry, int time);
    }
}
