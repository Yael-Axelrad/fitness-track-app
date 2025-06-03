using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System;

namespace Service.Algorithm
{
    public class DinamicTrack : IAlgorithm
    {
        private readonly IRepository<FitnessExercise> exercise;
        private readonly IRepository<Client> client;
        private readonly IRepository<TrackExercise> trackExerciseRepo;

        public DinamicTrack(IRepository<FitnessExercise> exercise, IRepository<TrackExercise> trackExerciseRepo, IRepository<Client> client)
        {
            this.exercise = exercise;
            this.trackExerciseRepo = trackExerciseRepo;
            this.client = client;
        }

        public async Task<List<FitnessExercise>> GetTrack(int idClient, List<CategoryFitness> categoryList, int time)
        {
            int[,] marks = await ExerciseMarks(idClient, categoryList, time);

            var allExercises = await exercise.GetAll();
            Client clientData = await client.GetById(idClient);
            int? clientAge = clientData.Age;

            var filteredExercises = allExercises
                .Where(e => clientAge.HasValue && e.StartingAge <= clientAge && e.EndingAge >= clientAge)
                .ToList();

            Dictionary<int, int> exerciseScores = new Dictionary<int, int>();
            Dictionary<int, int> exerciseTimes = new Dictionary<int, int>();

            for (int i = 0; i < marks.GetLength(1); i++)
            {
                int id = marks[0, i];
                int score = marks[1, i];

                exerciseScores[id] = score;

                var ex = filteredExercises.FirstOrDefault(e => e.Id == id);
                if (ex != null)
                {
                    exerciseTimes[id] = ex.Duration;
                }
            }

            List<FitnessExercise> track = CreateTrack(time, filteredExercises, exerciseScores, exerciseTimes);
            return track;
        }

        public async Task<int[,]> ExerciseMarks(int idClient, List<CategoryFitness> categoryList, int time)
        {
            var exercises = await exercise.GetAll();
            Client Client = await client.GetById(idClient);
            int? clientAge = Client.Age;

            var filteredExercises = exercises
                .Where(e => clientAge.HasValue && e.StartingAge <= clientAge && e.EndingAge >= clientAge)
                .ToList();

            int[,] mark = new int[2, filteredExercises.Count];

            var categoryNames = categoryList.Select(c => c.Name).ToHashSet();

            var clientTrackExercises = await trackExerciseRepo.GetAll();
            var clientExercises = clientTrackExercises
                .Where(t => t.FitnessTrack.ClientId == idClient)
                .ToList();

            var clientExerciseCounts = clientExercises
                .GroupBy(t => t.FitnessExerciseId)
                .ToDictionary(g => g.Key, g => g.Count());

            var clientLastScores = clientExercises
                .GroupBy(t => t.FitnessExerciseId)
                .ToDictionary(g => g.Key, g => g.OrderByDescending(t => t.FitnessTrack.date).First().Mark);

            int i = 0;
            foreach (var exercise in filteredExercises)
            {
                mark[0, i] = exercise.Id;

                bool belongsToCategory = categoryList.Any(c =>
                    c.Id == exercise.Id &&
                    categoryNames.Contains(c.Name)
                );

                int baseScore = belongsToCategory ? 10 : 1;

                int lastScore = clientLastScores.ContainsKey(exercise.Id) ? clientLastScores[exercise.Id] : 0;

                int exerciseCount = clientExerciseCounts.ContainsKey(exercise.Id) ? clientExerciseCounts[exercise.Id] : 0;

                int exerciseCountScore = 0;
                if (exerciseCount == 0)
                {
                    exerciseCountScore = 4;
                }
                else if (exerciseCount < 10)
                {
                    exerciseCountScore = 2;
                }

                int finalScore = (10 - lastScore + baseScore + exerciseCount);

                mark[1, i] = finalScore;

                i++;
            }

            return mark;
        }

        public static List<FitnessExercise> CreateTrack(
            int time,
            List<FitnessExercise> exercises,
            Dictionary<int, int> exerciseScores,
            Dictionary<int, int> exerciseTimes)
        {
            int n = exercises.Count;
            int[,] dp = new int[n + 1, time + 1];
            bool[,] selected = new bool[n + 1, time + 1];

            for (int i = 1; i <= n; i++)
            {
                for (int j = time; j >= exerciseTimes[exercises[i - 1].Id]; j--)
                {
                    int exerciseId = exercises[i - 1].Id;
                    int includeExercise = exerciseScores[exerciseId] + dp[i - 1, j - exerciseTimes[exerciseId]];
                    int excludeExercise = dp[i - 1, j];

                    if (includeExercise > excludeExercise)
                    {
                        dp[i, j] = includeExercise;
                        selected[i, j] = true;
                    }
                    else
                    {
                        dp[i, j] = excludeExercise;
                    }
                }
            }

            List<FitnessExercise> selectedExercises = new List<FitnessExercise>();
            int remainingTime = time;

            for (int i = n; i > 0 && remainingTime > 0; i--)
            {
                if (selected[i, remainingTime])
                {
                    FitnessExercise chosenExercise = exercises[i - 1];
                    selectedExercises.Add(chosenExercise);
                    remainingTime -= exerciseTimes[chosenExercise.Id];
                }
            }

            return selectedExercises;
        }
    }
}
