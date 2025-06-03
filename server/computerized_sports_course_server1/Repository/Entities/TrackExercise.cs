using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class TrackExercise
    {
        public int Id { get; set; }
        public int TrackId { get; set; }
        [ForeignKey("TrackId")]
        public virtual FitnessTrack FitnessTrack { get; set; }
        public int FitnessExerciseId { get; set; }
        [ForeignKey("FitnessExerciseId")]
        public virtual FitnessExercise FitnessExercise { get; set; }

        public int Mark { get; set; }


    }
}
