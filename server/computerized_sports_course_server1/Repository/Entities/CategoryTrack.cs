using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class CategoryTrack
    {
        public int Id { get; set; }
        public int FitnessTrackId { get; set; }
        [ForeignKey("FitnessTrackId")]
        public virtual FitnessTrack FitnessTrack { get; set; }
        public int CategoryFitnessId { get; set; }
        [ForeignKey("CategoryFitnessId")]
        public virtual CategoryFitness CategoryFitness { get; set; }



    }
}
