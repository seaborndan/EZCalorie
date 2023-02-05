using System.ComponentModel.DataAnnotations;

namespace EZ_Calorie.Models
{
    public class UserRole
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int AUTHOR_ID => 2;
    }
}