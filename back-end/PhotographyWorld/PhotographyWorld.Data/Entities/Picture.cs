using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Data.Entities
{
    public class Picture : BaseEntity
    {
        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime TimeCreated { get; set; }

        public string DownloadUrl { get; set; }

        public string PublicId { get; set; }

        public bool IsDownloadable { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
