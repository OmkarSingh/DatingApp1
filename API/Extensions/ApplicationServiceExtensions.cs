﻿using API.Data;
using API.Interface;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
	public static class ApplicationServiceExtensions
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<ITokenService, TokenService>();

			services.AddDbContext<DataContext>(options =>
			{
				options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
			});

			return services;
		}
	}
}