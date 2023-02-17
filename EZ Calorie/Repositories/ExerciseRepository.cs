using EZ_Calorie.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using EZ_Calorie.Utils;
using Microsoft.Extensions.Hosting;
using System.Xml.Linq;
using System;

namespace EZ_Calorie.Repositories
{
    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Exercise> GetExercises(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ex.Id, ex.Name, ex.Date, ex.CaloriesBurned, ex.UserId,
                               uu.Id, uu.FirebaseUserId
                        FROM Exercise ex
                              LEFT JOIN [User] uu on ex.UserId = uu.Id
                        WHERE ex.Date <= SYSDATETIME() AND uu.FirebaseUserId = @firebaseId";


                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    var Exercises = new List<Exercise>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Exercises.Add(new Exercise()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            CaloriesBurned = DbUtils.GetDecimalYee(reader, "CaloriesBurned"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId")
                            },

                        });
                    }
                    reader.Close();

                    return Exercises;
                }
            }
        }

        public void AddExercise(int userId, string name, decimal calories)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Exercise (
                        Name,
                        CaloriesBurned,
                        Date,
                        UserId
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @name,
                        @calories,
                        @date,
                        @userId)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", name);
                    DbUtils.AddParameter(cmd, "@Calories", calories);
                    DbUtils.AddParameter(cmd, "@Date", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();


                }
            }
        }

        public void EditExercise(int id, string name, decimal calories)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Exercise
                                        SET Name = @name,
                                            CaloriesBurned = @calories
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@name", name);
                    DbUtils.AddParameter(cmd, "@calories", calories);
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteExercise(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Exercise WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }

}