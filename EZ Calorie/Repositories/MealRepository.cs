using EZ_Calorie.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using EZ_Calorie.Utils;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EZ_Calorie.Repositories
{
    public class MealRepository : BaseRepository, IMealRepository
    {
        public MealRepository(IConfiguration configuration) : base(configuration) { }

        public List<Meal> GetMeals(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT me.Id, me.Name, me.Calories, me.FatTotal, me.Protein, me.Carbs, me.Date, me.MealTypeId, me.UserId,
                               mt.Name AS UserRoleName, mt.Id,
                               uu.Id, uu.FirebaseUserId
                        FROM Meal me
                              JOIN MealType mt on me.MealTypeId = mt.Id
                              LEFT JOIN [User] uu on me.UserId = uu.Id
                        WHERE me.Date <= SYSDATETIME() AND uu.FirebaseUserId = @firebaseId";


                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    var Meals = new List<Meal>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Meals.Add(new Meal()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Calories = DbUtils.GetDecimalYee(reader, "Calories"),
                            FatTotal = DbUtils.GetDecimalYee(reader, "FatTotal"),
                            Protein = DbUtils.GetDecimalYee(reader, "Protein"),
                            Carbs = DbUtils.GetDecimalYee(reader, "Carbs"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            MealType = new MealType()
                            {
                                Id = DbUtils.GetInt(reader, "MealTypeId"),
                                Name = DbUtils.GetString(reader, "UserRoleName"),
                            },
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId")
                            },

                        });
                    }
                    reader.Close();

                    return Meals;
                }
            }
        }

        public void EditMeal(int id, string name, decimal calories, int mealTypeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Meal
                                        SET Name = @name,
                                            Calories = @calories,
                                            MealTypeId = @mealTypeId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@name", name);
                    DbUtils.AddParameter(cmd, "@calories", calories);
                    DbUtils.AddParameter(cmd, "@mealTypeId", mealTypeId);
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddMeal(int userId, string name, decimal calories, decimal fatTotal, decimal protein, decimal carbs, int mealTypeId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Meal (
                        Name,
                        Calories,
                        FatTotal,
                        Protein,
                        Carbs,
                        Date,
                        MealTypeId,
                        UserId
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @Name,
                        @Calories,
                        @FatTotal,
                        @Protein,
                        @Carbs,
                        @Date,
                        @MealTypeId,
                        @UserId)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", name);
                    DbUtils.AddParameter(cmd, "@Calories", calories);
                    DbUtils.AddParameter(cmd, "@FatTotal", fatTotal);
                    DbUtils.AddParameter(cmd, "@Protein", protein);
                    DbUtils.AddParameter(cmd, "@Carbs", carbs);
                    DbUtils.AddParameter(cmd, "@Date", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@MealTypeId", mealTypeId);

                    cmd.ExecuteNonQuery();


                }
            }
        }

        public void DeleteMeal(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Meal WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

}