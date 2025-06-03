using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class FitnessExercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Gif { get; set; }
        public int Duration { get; set; }
        public int StartingAge { get; set; }
        public int EndingAge { get; set;}
    }
}
