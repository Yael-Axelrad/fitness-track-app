using AutoMapper;
using AutoMapper;
using Repository.Entities;
using System;
using System.Buffers.Text;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Http;

namespace Service.Services
{
    public class MyMapper : Profile
    {
        string DirectoryUrl = Path.Combine(Environment.CurrentDirectory, "Images");

        public MyMapper()
        {
            // מיפוי בין FitnessExerciseDto ל-FitnessExercise
            CreateMap<FitnessExerciseDto, FitnessExercise>()
                .ForMember(dest => dest.Gif, opt => opt.MapFrom(src => SaveGif(src.ImageFile)));
        }

        // שיטה לשמירת ה-GIF בשרת והחזרת הנתיב
        private string SaveGif(IFormFile file)
        {
            if (file != null)
            {
                var filePath = Path.Combine(DirectoryUrl, file.FileName);
                Directory.CreateDirectory(DirectoryUrl);  // יצירת תיקיית תמונות אם לא קיימת
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return filePath; // מחזיר את הנתיב לקובץ שנשמר
            }
            return null;
        }
    }

}