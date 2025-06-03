using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ITrackExerciseService: IService<TrackExercise>
    {

        Task<object> GetByIdTrack(int idTrack);
    }
}
