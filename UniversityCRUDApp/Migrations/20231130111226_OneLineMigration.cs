using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityCRUDApp.Migrations
{
    public partial class OneLineMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "universityId",
                table: "Students",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Students_universityId",
                table: "Students",
                column: "universityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Universities_universityId",
                table: "Students",
                column: "universityId",
                principalTable: "Universities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Universities_universityId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_universityId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "universityId",
                table: "Students");
        }
    }
}
