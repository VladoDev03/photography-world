using PhotographyWorld.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Data.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel()
        {
            Pictures = new List<PictureViewModel>();
        }

        public string Id { get; set; }

        public string Username { get; set; }

        public List<PictureViewModel> Pictures { get; set; }
    }
}
