namespace PhotographyWorld.Server.BindingModels.Picture
{
    public class AddPictureBindingModel
    {
        public IFormFile Picture { get; set; }

        public string Comment { get; set; }

        public string UserId { get; set; }
    }
}
