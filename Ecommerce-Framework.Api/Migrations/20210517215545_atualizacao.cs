using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce_Framework.Api.Migrations
{
    public partial class atualizacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Img",
                schema: "EcommerceFramework",
                table: "Produto",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Img",
                schema: "EcommerceFramework",
                table: "Produto");
        }
    }
}
