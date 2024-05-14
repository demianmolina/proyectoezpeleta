using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProyectoCelular.Migrations
{
    /// <inheritdoc />
    public partial class M1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Eliminado",
                table: "TipoEjercicios",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "EjerciciosFisicos",
                columns: table => new
                {
                    EjercicioFisicoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoEjercicioId = table.Column<int>(type: "int", nullable: false),
                    Inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EstadoEmocionalInicio = table.Column<int>(type: "int", nullable: false),
                    Observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EjerciciosFisicos", x => x.EjercicioFisicoID);
                    table.ForeignKey(
                        name: "FK_EjerciciosFisicos_TipoEjercicios_TipoEjercicioId",
                        column: x => x.TipoEjercicioId,
                        principalTable: "TipoEjercicios",
                        principalColumn: "TipoEjercicioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EjerciciosFisicos_TipoEjercicioId",
                table: "EjerciciosFisicos",
                column: "TipoEjercicioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EjerciciosFisicos");

            migrationBuilder.DropColumn(
                name: "Eliminado",
                table: "TipoEjercicios");
        }
    }
}
