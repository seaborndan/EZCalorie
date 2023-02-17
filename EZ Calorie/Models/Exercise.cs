using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using EZ_Calorie.Models;

namespace EZ_Calorie.Models
{
    public class Exercise
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal CaloriesBurned { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

    }
}