using EZ_Calorie.Models;
using System.Collections.Generic;

namespace EZ_Calorie.Repositories
{
    public interface IMealRepository
    {
        List<Meal> GetMeals(string firebaseId);

        void AddMeal(int userId, string name, decimal calories, decimal fatTotal, decimal protein, decimal carbs, int mealTypeId);

        void EditMeal(int id, string name, decimal calories, int mealTypeId);

        void DeleteMeal(int id);

    }
}