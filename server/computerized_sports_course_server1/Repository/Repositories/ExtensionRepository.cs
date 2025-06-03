using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class ExtensionRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection service)
        {
            service.AddScoped<IRepository<CategoryExercise>, CategoryExerciseRepository>();
            service.AddScoped<IRepository<CategoryFitness>, CategoryFitnessRepository>();
            service.AddScoped<IRepository<CategoryTrack>, CategoryTrackRepository>();
            service.AddScoped<IRepository<Client>, ClientRepository>();
            service.AddScoped<IRepository<FitnessExercise>, FitnessExerciseRepository>();
            service.AddScoped<IRepository<FitnessTrack>, FitnessTrackRepository>();
            service.AddScoped<IRepository<TrackExercise>, TrackExerciseRepository>();
            return service;
        }

    }
}
