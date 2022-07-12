using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Models
{
    public class PasswordServiceModel
    {
        public byte[] Hash { get; set; }

        public byte[] Salt { get; set; }
    }
}
