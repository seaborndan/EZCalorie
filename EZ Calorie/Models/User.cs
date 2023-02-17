using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using EZ_Calorie.Models;

namespace EZ_Calorie.Models
{
    public class User
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public decimal CurrentWeight { get; set; }

        public decimal? GoalWeight { get; set; }

        public decimal DailyCaloriesReqiored { get; set; }

        [Required]
        public int UserRoleId { get; set; }
        public UserRole UserRole { get; set; }

        public decimal Height { get; set; }

    }
}