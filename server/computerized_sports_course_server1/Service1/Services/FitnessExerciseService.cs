using AutoMapper;
using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class FitnessExerciseService : IFitnessExerciseService
    {
        private readonly IRepository<FitnessExercise> repository;
        private readonly IAlgorithm algorithm; // <-- הוספנו את זה
        private IMapper mapper;


        public FitnessExerciseService(IRepository<FitnessExercise> repository,IAlgorithm algorithm, IMapper mapper)
        {
            this.repository = repository;
            this.algorithm = algorithm;
            this.mapper = mapper;
        }

        public async Task<FitnessExercise> AddItem(FitnessExercise item)
        {
            if (!string.IsNullOrEmpty(item.Gif)) // אם יש נתיב לקובץ GIF
            {
                var directoryPath = Path.Combine(Environment.CurrentDirectory, "gifs");
                var filePath = Path.Combine(directoryPath, Path.GetFileName(item.Gif)); // לוקחים רק את שם הקובץ

                // העתקת הקובץ אם הוא קיים במערכת (לדוגמה, מה-clients)
                if (File.Exists(item.Gif))
                {
                    File.Copy(item.Gif, filePath, true);
                }

                // עדכון הנתיב השמור
                item.Gif = Path.Combine("/gifs/", Path.GetFileName(item.Gif));
            }

            return await repository.AddItem(item);
        }



        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<FitnessExercise>> GetAll()
        {
            return await repository.GetAll();
        }

        public async Task<List<FitnessExercise>> GetByTime(int id, List<CategoryFitness> ctgry, int time)
        {
            return await algorithm.GetTrack(id, ctgry, time);

        }

        public async Task<FitnessExercise> GetById(int id)
        {
            return await repository.GetById(id);
        }

        public Task<FitnessExercise> UpdateItem(int id, FitnessExercise item)
        {
            return repository.UpdateItem(id, item);
        }
    }
}
