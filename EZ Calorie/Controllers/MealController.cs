using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Security.Claims;
using EZ_Calorie.Models;
using EZ_Calorie.Repositories;

namespace EZ_Calorie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class MealController : ControllerBase
    {
        private readonly IMealRepository _mealRepository;
        private readonly IUserRepository _userRepository;
        public MealController(IMealRepository MealRepository, IUserRepository userRepository)
        {
            _mealRepository = MealRepository;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllMeals()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_mealRepository.GetMeals(firebaseUserId));
        }

        [HttpPost("addMeal")]
        public IActionResult AddMeal([FromQuery] string name, [FromQuery] decimal calories, [FromQuery] decimal fatTotal, [FromQuery] decimal protein, [FromQuery] decimal carbs, [FromQuery] int mealTypeId)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User currentUser = _userRepository.GetByFirebaseUserId(UUID);

            _mealRepository.AddMeal(currentUser.Id, name, calories, fatTotal, protein, carbs, mealTypeId);
            return NoContent();

        }

        [HttpPut("editMeal")]

        public IActionResult EditMeal([FromQuery] int id, [FromQuery] string name, [FromQuery] decimal calories, [FromQuery] int mealTypeId)
        {
            _mealRepository.EditMeal(id, name, calories, mealTypeId);
            return NoContent();
        }

        [HttpDelete("deleteMeal")]
        
        public IActionResult DeleteMeal([FromQuery] int id)
        {
            _mealRepository.DeleteMeal(id);
            return NoContent();
        }

    }
}
