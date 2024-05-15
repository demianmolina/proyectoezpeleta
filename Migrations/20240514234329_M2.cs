using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoCelular.Migrations
{
    /// <inheritdoc />
    public partial class M2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstadoEmocionalFin",
                table: "EjerciciosFisicos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstadoEmocionalFin",
                table: "EjerciciosFisicos");
        }
    }
}
