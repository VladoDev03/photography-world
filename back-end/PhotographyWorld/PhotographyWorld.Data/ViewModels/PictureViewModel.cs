using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Data.ViewModels
{
    public class PictureViewModel
    {
        public string Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public UserViewModel User { get; set; }
    }
}
