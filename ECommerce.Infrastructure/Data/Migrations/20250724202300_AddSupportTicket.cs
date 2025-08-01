using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSupportTicket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "SupportTickets");

            migrationBuilder.AddColumn<bool>(
                name: "IsResolved",
                table: "SupportTickets",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsResolved",
                table: "SupportTickets");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "SupportTickets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
