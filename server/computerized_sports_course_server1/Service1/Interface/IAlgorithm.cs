using Repository.Entities;

namespace Service.Interface
{
    public interface IAlgorithm
    {
        Task<List<FitnessExercise>> GetTrack(int clientId, List<CategoryFitness> categoryList, int time);
    }
}
