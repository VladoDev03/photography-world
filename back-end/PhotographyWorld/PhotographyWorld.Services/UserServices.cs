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
            if (user == null)
            {
                throw new ArgumentNullException("User cannot be null.");
            }

            db.Users.Add(user);

            db.SaveChanges();

            return user;
        }

        public PasswordServiceModel CreatePasswordHash(string password)
        {
            if (password == null)
            {
                throw new ArgumentNullException("Password cannot be null.");
            }

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
            if (user == null)
            {
                throw new ArgumentNullException("User cannot be null.");
            }

            if (token == null)
            {
                throw new ArgumentNullException("Token cannot be null.");
            }

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
            if (userId == null)
            {
                throw new ArgumentNullException("User id cannot be null.");
            }

            return db.Users.FirstOrDefault(x => x.Id == userId);
        }

        public User GetByUsername(string username)
        {
            if (username == null)
            {
                throw new ArgumentNullException("Username cannot be null.");
            }

            return db.Users.FirstOrDefault(x => x.Username == username);
        }

        public bool IsExisting(string username)
        {
            if (username == null)
            {
                throw new ArgumentNullException("Username cannot be null.");
            }

            return GetByUsername(username) != null;
        }

        public bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            if (password == null)
            {
                throw new ArgumentNullException("Password cannot be null.");
            }

            using (HMACSHA512 hmac = new HMACSHA512(salt))
            {
                byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(hash);
            }
        }
    }
}
