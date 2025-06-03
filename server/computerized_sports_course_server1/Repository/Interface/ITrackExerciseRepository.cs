using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface ITrackExerciseRepository : IRepository<TrackExercise>
    {
        Task<object> GetByIdTrack(int idTrack);

    }
}
