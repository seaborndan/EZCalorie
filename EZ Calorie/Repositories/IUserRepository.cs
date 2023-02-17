using EZ_Calorie.Models;
using System.Collections.Generic;

namespace EZ_Calorie.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        User GetByFirebaseUserId(string firebaseUserId);
        void Update(User userProfile);
        User GetByEmail(string email);

        void EditPersonalDetails(int id, string oldName, string newDisplayName, decimal oldHeight, decimal newHeight);

        void EditGoalWeight(int id, int oldGoal, int newGoal);

        void EditCurrWeight(int id, int oldWeight, int newWeight);

        void AddGoalWeight(int id, int newGoal);

        List<User> GetFollowers(int id);

        List<User> GetFollowing(int id);

        void Unfollow(int id, int currentUserId);

        List<User> GetFollowList(int id);

        void FollowUser(Follow follow);
    }
}