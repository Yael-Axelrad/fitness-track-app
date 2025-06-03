using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class FitnessTrack
    {
        public int Id { get; set; }
        public DateTime date { get; set; }
        public int ClientId { get; set; }

        [ForeignKey("ClientId")]
        public virtual Client Client { get; set; }
        public int Duration { get; set; }
        public virtual ICollection<TrackExercise>? TrackExercises { get; set; }


    }
}
