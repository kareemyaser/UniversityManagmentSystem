using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityCRUDApp.Migrations
{
    public partial class ThreeLineCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Universities_universityId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "universityId",
                table: "Students",
                newName: "UniversityId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_universityId",
                table: "Students",
                newName: "IX_Students_UniversityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Universities_UniversityId",
                table: "Students",
                column: "UniversityId",
                principalTable: "Universities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Universities_UniversityId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "UniversityId",
                table: "Students",
                newName: "universityId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_UniversityId",
                table: "Students",
                newName: "IX_Students_universityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Universities_universityId",
                table: "Students",
                column: "universityId",
                principalTable: "Universities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
