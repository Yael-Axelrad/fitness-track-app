using Microsoft.AspNetCore.Http;

public class FitnessExerciseDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public byte[]? Gif { get; set; } // כאן יהיה ה-GIF בתור byte[]
    public int Duration { get; set; }
    public int StartingAge { get; set; }
    public int EndingAge { get; set; }
    public IFormFile? ImageFile { get; set; } // כאן הקובץ של ה-GIF
}
