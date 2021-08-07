using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
	[Authorize]
	public class UsersController : BaseApiController
	{
		private readonly IUserRepository _userRepository;
		private readonly IMapper _mapper;

		public UsersController(IUserRepository userRepository, IMapper mapper)
		{
			_userRepository = userRepository;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
		{

			var users = await _userRepository.GetMembersAsync();
			return Ok(users);
		}

		[HttpGet("{username}")]
		public async Task<ActionResult<MemberDTO>> GetUser(string username)
		{
			var user = await _userRepository.GetMemberByUsernameAsync(username);
			return user;
		}

		[HttpPut]
		public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
		{
			var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			var user = await _userRepository.GetUserByUsernameAsync(username);
			_mapper.Map(memberUpdateDTO, user);
			_userRepository.Update(user);

			if (await _userRepository.SaveAllAsync())
				return NoContent();
			return BadRequest("Fail to update user");
		}

		private bool ClaimType(System.Security.Claims.Claim obj)
		{
			throw new NotImplementedException();
		}
	}
}
