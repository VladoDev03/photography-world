using Microsoft.EntityFrameworkCore;
using PhotographyWorld.Data;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services
{
    public class PictureServices : IPictureServices
    {
        private readonly GalleryDbContext db;

        public PictureServices(GalleryDbContext db)
        {
            this.db = db;
        }

        public Picture Create(Picture picture)
        {
            if (picture == null)
            {
                throw new ArgumentNullException("Picture cannot be null.");
            }

            db.Pictures.Add(picture);

            db.SaveChanges();

            return picture;
        }

        public Picture Delete(string pictureId)
        {
            if (pictureId == null)
            {
                throw new ArgumentNullException("Picture id cannot be null.");
            }

            Picture picture = GetById(pictureId);
            db.Pictures.Remove(picture);

            db.SaveChanges();

            return picture;
        }

        public List<Picture> GetAll()
        {
            return db.Pictures.Include(x => x.User).ToList();
        }

        public List<Picture> GetUserPictures(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException("User id cannot be null.");
            }

            return db.Pictures.Include(x => x.User).Where(x => x.UserId == userId).ToList();
        }

        public Picture GetById(string pictureId)
        {
            if (pictureId == null)
            {
                throw new ArgumentNullException("Picture id cannot be null.");
            }

            return db.Pictures.Include(x => x.User).FirstOrDefault(p => p.Id == pictureId);
        }

        public Picture Edit(string pictureId, string newDescription)
        {
            if (pictureId == null || newDescription == null)
            {
                throw new ArgumentNullException("Picture id cannot be null.");
            }

            Picture picture = db.Pictures.FirstOrDefault(p => p.Id == pictureId);

            picture.Description = newDescription;

            db.SaveChanges();

            return picture;
        }
    }
}
