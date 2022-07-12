using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotographyWorld.Data.Migrations
{
    public partial class FixPicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pictures_Users_UserId",
                table: "Pictures");

            migrationBuilder.DropIndex(
                name: "IX_Pictures_UserId",
                table: "Pictures");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Pictures");

            migrationBuilder.RenameColumn(
                name: "ImagePublicId",
                table: "Pictures",
                newName: "PublicId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublicId",
                table: "Pictures",
                newName: "ImagePublicId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Pictures",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_UserId",
                table: "Pictures",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_Users_UserId",
                table: "Pictures",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
