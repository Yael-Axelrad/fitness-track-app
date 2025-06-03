using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Repository.Repositories;
using Repository.Entities;


namespace Service.Services
{
    public static class ExtensionService
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            service.AddRepository();
            service.AddScoped<IService<Client>, ClientService>();

            service.AddScoped<IService<CategoryExercise>, CategoryExerciseService>();

            service.AddScoped<IService<CategoryFitness>, CategoryFitnessService>();

            service.AddScoped<IService<CategoryTrack>, CategoryTrackService>();

            service.AddScoped<IService<FitnessExercise>, FitnessExerciseService>();

            service.AddScoped<IService<FitnessTrack>, FitnessTrackService>();

            service.AddScoped<IService<TrackExercise>, TrackExerciseService>();

            //...
            return service;

        }
    }
}
