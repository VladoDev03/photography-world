using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Contracts
{
    public interface IUserServices
    {
        User Create(User user);

        User GetByUsername(string username);

        PasswordServiceModel CreatePasswordHash(string password);

        bool IsExisting(string username);

        bool VerifyPasswordHash(string password, byte[] hash, byte[] salt);

        string CreateToken(User user, string token);
    }
}
