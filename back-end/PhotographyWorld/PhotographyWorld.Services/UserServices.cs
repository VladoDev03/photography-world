using Microsoft.IdentityModel.Tokens;
using PhotographyWorld.Data;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Contracts;
using PhotographyWorld.Services.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services
{
    public class UserServices : IUserServices
    {
        private readonly GalleryDbContext db;

        public UserServices(GalleryDbContext db)
        {
            this.db = db;
        }

        public User Create(User user)
        {
            db.Users.Add(user);

            db.SaveChanges();

            return user;
        }

        public PasswordServiceModel CreatePasswordHash(string password)
        {
            PasswordServiceModel resultPassword = new PasswordServiceModel();

            using (HMACSHA512 hmac = new HMACSHA512())
            {
                resultPassword.Salt = hmac.Key;
                resultPassword.Hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            return resultPassword;
        }

        public string CreateToken(User user, string token)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            JwtSecurityToken generatedToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            string jwt = new JwtSecurityTokenHandler().WriteToken(generatedToken);

            return jwt;
        }

        public User GetById(string userId)
        {
            return db.Users.FirstOrDefault(x => x.Id == userId);
        }

        public User GetByUsername(string username)
        {
            return db.Users.FirstOrDefault(x => x.Username == username);
        }

        public bool IsExisting(string username)
        {
            return GetByUsername(username) != null;
        }

        public bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (HMACSHA512 hmac = new HMACSHA512(salt))
            {
                byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(hash);
            }
        }
    }
}
