using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mock
{
    public class DataContext : DbContext, IContext
    {
        public DbSet<CategoryExercise> CategoryExercises { get; set; }
        public DbSet<CategoryFitness> CategoryFitnesses { get ; set ; }
        public DbSet<CategoryTrack> CategoryTracks { get; set ; }
        public DbSet<Client> Clients { get; set ; }
        public DbSet<FitnessExercise> FitnessExercises { get ; set ; }
        public DbSet<FitnessTrack> FitnessTracks { get ; set; }
        public DbSet<TrackExercise> TrackExercises { get ; set; }

        public async Task Save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-1VUANBN;database=sports_courseDb;trusted_connection=true;TrustServerCertificate=True");
        }
    }
}
