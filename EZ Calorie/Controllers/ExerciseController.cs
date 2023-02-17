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
    [Authorize]


    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IUserRepository _userRepository;
        public ExerciseController(IExerciseRepository ExerciseRepository, IUserRepository userRepository)
        {
            _exerciseRepository = ExerciseRepository;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllExercises()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_exerciseRepository.GetExercises(firebaseUserId));
        }

        [HttpPost("addExercise")]
        public IActionResult AddExercise([FromQuery] string name, [FromQuery] decimal calories)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User currentUser = _userRepository.GetByFirebaseUserId(UUID);

            _exerciseRepository.AddExercise(currentUser.Id, name, calories);
            return NoContent();

        }

        [HttpPut("editExercise")]

        public IActionResult EditExercise([FromQuery] int id, [FromQuery] string name, [FromQuery] decimal calories)
        {
            _exerciseRepository.EditExercise(id, name, calories);
            return NoContent();
        }

        [HttpDelete("deleteExercise")]

        public IActionResult DeleteMeal([FromQuery] int id)
        {
            _exerciseRepository.DeleteExercise(id);
            return NoContent();
        }
    }
}