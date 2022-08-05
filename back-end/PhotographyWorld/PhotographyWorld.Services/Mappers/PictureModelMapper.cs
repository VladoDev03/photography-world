using PhotographyWorld.Data.Entities;
using PhotographyWorld.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Mappers
{
    public static class PictureModelMapper
    {
        public static PictureViewModel ToViewModel(this Picture picture)
        {
            return new PictureViewModel()
            {
                Id = picture.Id,
                Url = picture.Url,
                Description = picture.Description,
                User = picture.User.ToViewModel(),
                TimeCreated = picture.TimeCreated
            };
        }
    }
}
