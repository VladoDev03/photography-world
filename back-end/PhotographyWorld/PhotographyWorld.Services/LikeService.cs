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
    public class LikeService : ILikeService
    {
        private readonly GalleryDbContext db;

        public LikeService(GalleryDbContext db)
        {
            this.db = db;
        }

        public Like AddLike(Like like)
        {
            db.Likes.Add(like);

            db.SaveChanges();

            return like;
        }

        public List<Like> PictureLikes(string pictureId)
        {
            return db.Likes.Where(x => x.PictureId == pictureId).ToList();
        }

        public Like RemoveLike(string pictureId, string userId)
        {
            Like like = db.Likes.FirstOrDefault(x => x.PictureId == pictureId && x.UserId == userId);
            db.Likes.Remove(like);

            db.SaveChanges();

            return like;
        }
    }
}
