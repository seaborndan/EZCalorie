using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using EZ_Calorie.Models;

namespace EZ_Calorie.Models
{
    public class MealType
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
