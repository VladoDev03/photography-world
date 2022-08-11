using PhotographyWorld.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotographyWorld.Services.Contracts
{
    public interface ILikeService
    {
        Like AddLike(Like like);

        Like RemoveLike(string pictureId, string userId);

        List<Like> PictureLikes(string pictureId);
    }
}
