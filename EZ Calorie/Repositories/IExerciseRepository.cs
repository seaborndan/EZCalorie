using EZ_Calorie.Models;
using System.Collections.Generic;

namespace EZ_Calorie.Repositories
{
    public interface IExerciseRepository
    {
        List<Exercise> GetExercises(string firebaseId);

        void AddExercise(int userId, string name, decimal calories);

        void EditExercise(int id, string name, decimal calories);

        void DeleteExercise(int id);
    }
}