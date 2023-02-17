using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using EZ_Calorie.Models;

namespace EZ_Calorie.Models
{
    public class Meal
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Calories { get; set; }

        [Required]
        public decimal FatTotal { get; set; }

        [Required]
        public decimal Protein { get; set; }

        [Required]
        public decimal Carbs { get; set;}

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int MealTypeId { get; set; }

        public int UserId { get; set; }

        [Required]
        public MealType MealType { get; set; }

        public User User { get; set; }

    }
}
