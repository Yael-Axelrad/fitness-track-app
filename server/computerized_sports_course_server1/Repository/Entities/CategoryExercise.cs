using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class CategoryExercise
    {
        public int Id { get; set; }
        public int FitnessExerciseId { get; set; }
        [ForeignKey("FitnessExerciseId")]
        public virtual FitnessExercise FitnessExercise { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual CategoryFitness CategoryFitness { get; set; }


    }
}
