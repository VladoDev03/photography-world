using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Contracts
{
    public interface ICloudinaryServices
    {
        string UploadImage(byte[] data, string path);

        void DeleteImage(string publicId);

        string GetDownloadLink(string url);

        string FindPicturePublicIdById(string id);

        Task<byte[]> GetImageBytes(IFormFile file);
    }
}
