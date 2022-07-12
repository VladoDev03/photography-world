using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using PhotographyWorld.Data;
using PhotographyWorld.Data.ConfigurationModels;
using PhotographyWorld.Data.Entities;
using PhotographyWorld.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services
{
    public class CloudinaryServices : ICloudinaryServices
    {
        private GalleryDbContext db;
        private Cloudinary cloudinary;

        public CloudinaryServices(
            GalleryDbContext db,
            CloudinaryConfigurationModel cloudinaryConfiguration)
        {
            this.db = db;
            Account account = SetUpCloudinaryAccount(cloudinaryConfiguration);
            cloudinary = new Cloudinary(account);
        }

        public void DeleteImage(string publicId)
        {
            if (publicId == null)
            {
                return;
            }

            DeletionParams param = new DeletionParams(publicId)
            {
                ResourceType = ResourceType.Image,
                PublicId = publicId
            };

            cloudinary.Destroy(param);
        }

        public string FindPicturePublicIdById(string id)
        {
            Picture profilePicture = db.Pictures.FirstOrDefault(p => p.Id == id);

            if (profilePicture == null)
            {
                return null;
            }

            return profilePicture.PublicId;
        }

        public string GetDownloadLink(string url)
        {
            string[] arr = url.Split("/").Skip(2).ToArray();

            StringBuilder sb = new StringBuilder();

            sb.Append("https://");

            foreach (string item in arr)
            {
                if (item == "upload")
                {
                    sb.Append($"{item}/fl_attachment/");
                }
                else
                {
                    sb.Append($"{item}/");
                }
            }

            string result = sb.ToString();
            result = result.Remove(result.Length - 1);

            return result;
        }

        public string UploadImage(byte[] data, string path)
        {
            Stream stream = new MemoryStream(data);

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(Guid.NewGuid().ToString(), stream),
                Folder = path,
                PublicId = Guid.NewGuid().ToString()
            };

            ImageUploadResult uploadResult = cloudinary.Upload(uploadParams);

            string url = uploadResult.SecureUrl.AbsoluteUri;
            string id = uploadResult.PublicId;

            return $"{url}*{id}";
        }

        public async Task<byte[]> GetImageBytes(IFormFile file)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                byte[] img = memoryStream.ToArray();

                return img;
            }
        }

        private Account SetUpCloudinaryAccount(CloudinaryConfigurationModel cloudinaryConfiguration)
        {
            Account account = new Account(
                cloudinaryConfiguration.Cloud,
                cloudinaryConfiguration.ApiKey,
                cloudinaryConfiguration.ApiSecret);

            return account;
        }
    }
}
