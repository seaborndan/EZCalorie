using System.ComponentModel.DataAnnotations;

namespace EZ_Calorie.Models
{
    public class Follow
    {
        public int Id { get; set; }

        [Required]
        public int FollowerId { get; set; }

        [Required]
        public int FollowingId { get; set; }
    }
}
