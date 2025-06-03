using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Service.Services
{
    public class FitnessTrackService : IService<FitnessTrack>
    {
        private readonly IRepository<FitnessTrack> repository;
        private readonly IAlgorithm algorithm;

        public FitnessTrackService(IRepository<FitnessTrack> repository, IAlgorithm algorithm)
        {
            this.repository = repository;
            this.algorithm = algorithm;
        }

        public async Task<FitnessTrack> AddItem(FitnessTrack item)
        {
            await repository.AddItem(item);
            return item;
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<FitnessTrack>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<FitnessTrack> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public async Task<FitnessTrack> GetByCategoryAndTime(int id, List<CategoryExercise> ctgry, int time)
        {
            var newTrack = new FitnessTrack
            {
                ClientId = id,
                date = DateTime.Now,
                Duration = time,
                TrackExercises = new List<TrackExercise>(),
            };

            await repository.AddItem(newTrack);
            return newTrack;
        }

        public Task<FitnessTrack> UpdateItem(int id, FitnessTrack item)
        {
            return repository.UpdateItem(id, item);
        }
    }
}
