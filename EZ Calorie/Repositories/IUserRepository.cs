using EZ_Calorie.Models;

namespace EZ_Calorie.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        User GetByFirebaseUserId(string firebaseUserId);
        void Update(User userProfile);
        User GetByEmail(string email);
    }
}