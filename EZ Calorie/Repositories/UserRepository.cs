using EZ_Calorie.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using EZ_Calorie.Utils;

namespace EZ_Calorie.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.Email, up.UserRoleId,
                               uu.Name AS UserRoleName
                        FROM [User] up
                               LEFT JOIN UserRole uu on up.UserRoleId = uu.Id
                        WHERE up.FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                            UserRole = new UserRole()
                            {
                                Id = DbUtils.GetInt(reader, "UserRoleId"),
                                Name = DbUtils.GetString(reader, "UserRoleName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.Email, up.UserRoleId,
                               uu.Name AS UserRoleName
                        FROM [User] up
                               LEFT JOIN UserRole uu on up.UserRoleId = uu.Id
                        WHERE up.Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                            UserRole = new UserRole()
                            {
                                Id = DbUtils.GetInt(reader, "UserRoleId"),
                                Name = DbUtils.GetString(reader, "UserRoleName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void Add(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseUserId, CurrentWeight, GoalWeight, DisplayName, 
                                                                 Email, DailyCaloriesRequired, UserRoleId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @CurrentWeight, @GoalWeight, @DisplayName, 
                                                @Email, @DailyCaloriesRequired, @UserRoleId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@CurrentWeight", userProfile.CurrentWeight);
                    DbUtils.AddParameter(cmd, "@GoalWeight", userProfile.GoalWeight);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DailyCaloriesRequired", userProfile.DailyCaloriesReqiored);
                    DbUtils.AddParameter(cmd, "@UserRoleId", userProfile.UserRoleId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [User]
                                        SET Displayname = @displayName,
                                            CurrentWeight = @currentWeight,
                                            GoalWeight = @goalWeight,
                                            Email = @email,
                                            DailyCaloriesRequired = @dailyCaloriesRequired,
                                            UserRoleId = @userRoleId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@displayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@currentWeight", userProfile.CurrentWeight);
                    DbUtils.AddParameter(cmd, "@goalWeight", userProfile.GoalWeight);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@DailyCaloriesRequired", userProfile.DailyCaloriesReqiored);
                    DbUtils.AddParameter(cmd, "@userRoleId", userProfile.UserRoleId);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
