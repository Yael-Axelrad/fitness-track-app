using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class TrackExerciseService :ITrackExerciseService
    {
        private readonly ITrackExerciseRepository repository;

        public TrackExerciseService(ITrackExerciseRepository repository)
        {
            this.repository = repository;
        }

        public async Task<TrackExercise> AddItem(TrackExercise item)
        {
            await repository.AddItem(item);
            return item;
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<TrackExercise>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<TrackExercise> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public async Task<object> GetByIdTrack(int idTrack)
        {

            return await repository.GetByIdTrack(idTrack);
        }

        public Task<TrackExercise> UpdateItem(int id, TrackExercise item)
        {
            return repository.UpdateItem(id, item);
        }
    }
}
