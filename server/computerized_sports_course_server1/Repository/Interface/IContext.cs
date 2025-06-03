using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IContext
    {

        public DbSet<CategoryExercise> CategoryExercises { get; set; }

        public DbSet<CategoryFitness> CategoryFitnesses { get; set; }

        public DbSet<CategoryTrack> CategoryTracks { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<FitnessExercise> FitnessExercises { get; set;}

        public DbSet<FitnessTrack> FitnessTracks { get; set; }

        public DbSet<TrackExercise> TrackExercises { get; set; }


        public Task Save();

    }
}
