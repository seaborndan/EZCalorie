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


        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
