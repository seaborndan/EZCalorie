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
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.Email, up.UserRoleId, up.Height,
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

        public List<User> GetFollowList(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.GoalWeight, up.Email, up.UserRoleId,
                               ff.FollowerId, ff.FollowingId
                        FROM [User] up
                               LEFT JOIN Follow ff on NOT ff.FollowingId = @id
                        WHERE NOT up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var FollowList = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        FollowList.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            CurrentWeight = DbUtils.GetDecimalYee(reader, "CurrentWeight"),
                            GoalWeight = DbUtils.GetDecimalYee(reader, "GoalWeight"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserRole = new UserRole()
                            {

                            }
                        });
                    }
                    reader.Close();

                    return FollowList;
                }
            }
        }

        public List<User> GetFollowers(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.GoalWeight, up.Email, up.UserRoleId,
                               ff.FollowerId, ff.FollowingId
                        FROM [User] up
                               LEFT JOIN Follow ff on up.Id = ff.FollowerId
                        WHERE ff.FollowingId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var Followers = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Followers.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            CurrentWeight = DbUtils.GetDecimalYee(reader, "CurrentWeight"),
                            GoalWeight = DbUtils.GetDecimalYee(reader, "GoalWeight"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserRole = new UserRole()
                            {

                            }
                        });
                    }
                    reader.Close();

                    return Followers;
                }
            }
        }

        public List<User> GetFollowing(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.GoalWeight, up.Email, up.UserRoleId,
                               ff.FollowerId, ff.FollowingId
                        FROM [User] up
                               LEFT JOIN Follow ff on up.Id = ff.FollowingId
                        WHERE ff.FollowerId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var Following = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Following.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            CurrentWeight = DbUtils.GetDecimalYee(reader, "CurrentWeight"),
                            GoalWeight = DbUtils.GetDecimalYee(reader, "GoalWeight"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserRole = new UserRole()
                            {

                            }
                        });
                    }
                    reader.Close();

                    return Following;
                }
            }
        }

        public void FollowUser(Follow follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                        cmd.CommandText = @"INSERT INTO Follow (FollowerId, FollowingId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@id, @followingId)";
                    DbUtils.AddParameter(cmd, "@id", follow.FollowerId);
                    DbUtils.AddParameter(cmd, "@followingId", follow.FollowingId);


                    follow.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Unfollow(int id, int currentUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Follow WHERE FollowingId = @id AND FollowerId = @currentUserId
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@currentUserId", currentUserId);

                    cmd.ExecuteNonQuery();
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
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.CurrentWeight, up.GoalWeight, up.Email, up.UserRoleId, up.Height,
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
                            CurrentWeight = DbUtils.GetDecimalYee(reader, "CurrentWeight"),
                            GoalWeight = DbUtils.GetNullableDecimal(reader, "GoalWeight"),
                            Height = DbUtils.GetDecimalYee(reader, "Height"),
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

        public void EditPersonalDetails(int id, string oldName, string newDisplayName, decimal oldHeight, decimal newHeight)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET [DisplayName] = @NewDisplayName, Height = @NewHeight
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@NewDisplayName", newDisplayName);
                    DbUtils.AddParameter(cmd, "@NewHeight", newHeight);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditCurrWeight(int id, int oldWeight, int newWeight)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET [CurrentWeight] = @NewWeight
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@NewWeight", newWeight);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditGoalWeight(int id, int oldGoal, int newGoal)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET [GoalWeight] = @NewGoal
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@NewGoal", newGoal);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddGoalWeight(int id, int newGoal)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET [GoalWeight] = @NewGoal
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@NewGoal", newGoal);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
