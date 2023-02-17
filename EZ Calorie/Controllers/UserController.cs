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
    

    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository UserRepository)
        {
            _userRepository = UserRepository;
        }

        [HttpGet("{firebaseUserId}")]
        [Authorize]
        public IActionResult GetUser(string firebaseUserId) 
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var User = _userRepository.GetByFirebaseUserId(firebaseUserId);

            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);
        }

        [HttpGet("userDetails/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var userProfile = _userRepository.GetByEmail(email);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("followers")]
        public IActionResult GetFollowers()
        {
            var currentUser = GetCurrentUser();
            return Ok(_userRepository.GetFollowers(currentUser.Id));
        }

        [HttpGet("following")]
        public IActionResult GetFollowing()
        {
            var currentUser = GetCurrentUser();
            return Ok(_userRepository.GetFollowing(currentUser.Id));
        }

        [HttpDelete("unfollow")]
        public IActionResult Unfollow([FromQuery] int id) 
        {
            var currentUser = GetCurrentUser();
            _userRepository.Unfollow(id, currentUser.Id);
            return NoContent();
        }

        [HttpGet("followList")]
        public IActionResult GetFollowList()
        {
            var currentUser = GetCurrentUser();
            return Ok(_userRepository.GetFollowList(currentUser.Id));
        }

        [HttpPost("followUser")]
        public IActionResult FollowUser([FromQuery] int followingId)
        {

            var currentUser = GetCurrentUser();
            Follow follow = new Follow()
            {
                FollowerId = currentUser.Id,
                FollowingId = followingId
            };

            _userRepository.FollowUser(follow);
            return NoContent(); 

        }


        [HttpPost]
        public IActionResult Post(User User)
        {
            User.UserRoleId = UserRole.AUTHOR_ID;
            _userRepository.Add(User);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = User.FirebaseUserId },
                User);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, User User)
        {
            var currentUser = GetCurrentUser();
            if (currentUser.UserRole.Name != "Admin")
            {
                return Unauthorized();
            }

            if (id != User.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(User);
            return NoContent();

        }

        [HttpPut("dispEdit")]
        public IActionResult EditDisplayName([FromQuery] int id, [FromQuery] string oldName, [FromQuery] string newDisplayName)
        {
            var currentUser = GetCurrentUser();

            if (id != currentUser.Id)
            {
                return BadRequest();
            }

            _userRepository.EditDisplayName(id, oldName, newDisplayName);
            return NoContent();

        }

        [HttpPut("currWeightEdit")]
        public IActionResult EditCurrentWeight([FromQuery] int id, [FromQuery] int oldWeight, [FromQuery] int newWeight)
        {
            var currentUser = GetCurrentUser();

            if (id != currentUser.Id)
            {
                return BadRequest();
            }

            _userRepository.EditCurrWeight(id, oldWeight, newWeight);
            return NoContent();

        }

        [HttpPut("currGoalEdit")]
        public IActionResult EditGoalWeight([FromQuery] int id, [FromQuery] int oldGoal, [FromQuery] int newGoal)
        {
            var currentUser = GetCurrentUser();

            if (id != currentUser.Id)
            {
                return BadRequest();
            }

            _userRepository.EditGoalWeight(id, oldGoal, newGoal);
            return NoContent();

        }

        [HttpPut("addGoalWeight")]

        public IActionResult AddGoalWeight([FromQuery] int id, [FromQuery] int newGoal)
        {
            var currentUser = GetCurrentUser();

            if (id != currentUser.Id)
            {
                return BadRequest();
            }

            _userRepository.AddGoalWeight(id, newGoal);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
