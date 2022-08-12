using PhotographyWorld.Data.Entities;
using PhotographyWorld.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Mappers
{
    public static class UserModelMapper
    {
        public static UserViewModel ToViewModel(this User user)
        {
            return new UserViewModel()
            {
                Id = user.Id,
                Username = user.Username
            };
        }
    }
}
