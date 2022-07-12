namespace PhotographyWorld.Server.BindingModels
{
    public class AddPictureBindingModel
    {
        public IFormFile Picture { get; set; }

        public string Comment { get; set; }
    }
}
