using PhotographyWorld.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Contracts
{
    public interface IPictureServices
    {
        List<Picture> GetAll();

        List<Picture> GetUserPictures(string userId);

        Picture GetById(string pictureId);

        Picture Create(Picture picture);

        Picture Delete(string pictureId);

        Picture Edit(string pictureId, string newDescription);
    }
}
