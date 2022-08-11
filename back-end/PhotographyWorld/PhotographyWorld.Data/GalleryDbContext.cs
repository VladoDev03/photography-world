using Microsoft.EntityFrameworkCore;
using PhotographyWorld.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Data
{
    public class GalleryDbContext : DbContext
    {
        public GalleryDbContext(DbContextOptions<GalleryDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Picture> Pictures { get; set; }

        public DbSet<Like> Likes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Like>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.PictureId });
            });
        }
    }
}
