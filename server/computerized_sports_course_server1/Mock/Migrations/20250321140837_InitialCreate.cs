using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryFitnesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryFitnesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FitnessExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gif = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    StartingAge = table.Column<int>(type: "int", nullable: false),
                    EndingAge = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitnessExercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FitnessTracks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitnessTracks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FitnessTracks_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FitnessExerciseId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryExercises_CategoryFitnesses_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CategoryFitnesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryExercises_FitnessExercises_FitnessExerciseId",
                        column: x => x.FitnessExerciseId,
                        principalTable: "FitnessExercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryTracks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FitnessTrackId = table.Column<int>(type: "int", nullable: false),
                    CategoryFitnessId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryTracks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryTracks_CategoryFitnesses_CategoryFitnessId",
                        column: x => x.CategoryFitnessId,
                        principalTable: "CategoryFitnesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryTracks_FitnessTracks_FitnessTrackId",
                        column: x => x.FitnessTrackId,
                        principalTable: "FitnessTracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrackExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrackId = table.Column<int>(type: "int", nullable: false),
                    FitnessExerciseId = table.Column<int>(type: "int", nullable: false),
                    Mark = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackExercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackExercises_FitnessExercises_FitnessExerciseId",
                        column: x => x.FitnessExerciseId,
                        principalTable: "FitnessExercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrackExercises_FitnessTracks_TrackId",
                        column: x => x.TrackId,
                        principalTable: "FitnessTracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryExercises_CategoryId",
                table: "CategoryExercises",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryExercises_FitnessExerciseId",
                table: "CategoryExercises",
                column: "FitnessExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTracks_CategoryFitnessId",
                table: "CategoryTracks",
                column: "CategoryFitnessId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTracks_FitnessTrackId",
                table: "CategoryTracks",
                column: "FitnessTrackId");

            migrationBuilder.CreateIndex(
                name: "IX_FitnessTracks_ClientId",
                table: "FitnessTracks",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackExercises_FitnessExerciseId",
                table: "TrackExercises",
                column: "FitnessExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackExercises_TrackId",
                table: "TrackExercises",
                column: "TrackId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryExercises");

            migrationBuilder.DropTable(
                name: "CategoryTracks");

            migrationBuilder.DropTable(
                name: "TrackExercises");

            migrationBuilder.DropTable(
                name: "CategoryFitnesses");

            migrationBuilder.DropTable(
                name: "FitnessExercises");

            migrationBuilder.DropTable(
                name: "FitnessTracks");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
