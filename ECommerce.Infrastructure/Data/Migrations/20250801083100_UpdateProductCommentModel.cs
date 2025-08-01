using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductCommentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "ProductComments",
                newName: "Comment");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "ProductComments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ProductComments");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "ProductComments",
                newName: "Content");
        }
    }
}
