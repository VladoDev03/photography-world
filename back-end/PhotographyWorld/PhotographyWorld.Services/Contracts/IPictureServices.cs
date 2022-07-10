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

        Picture GetById(string pictureId);
    }
}
