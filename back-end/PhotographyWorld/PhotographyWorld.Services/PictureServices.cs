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

        public List<Picture> GetAll()
        {
            return db.Pictures.ToList();
        }
    }
}
