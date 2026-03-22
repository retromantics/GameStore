
using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.EndPoints;

public static class GameEndpoints
{

    const string GetGameEndpointName = "GetGame";
    private static readonly List<GameSummaryDto> games = [

        new (
            1,
            "The Legend of Zelda: Breath of the Wild",
            "Action-adventure",
            59.99m,
            new DateOnly(2017, 3, 3)),
        new (
            2,
            "Super Mario Odyssey",
            "Platform", 59.99m,
            new DateOnly(2017, 10, 27)),
        new (
            3,
            "Red Dead Redemption 2",
            "Action-adventure",
            59.99m,
            new DateOnly(2018, 10, 26)),
        new (
            4,
            "The Witcher 3: Wild Hunt",
            "Action RPG",
            39.99m,
            new DateOnly(2015, 5, 19)),
        new (
            5,
            "Minecraft",
            "Sandbox",
            26.95m,
            new DateOnly(2011, 11, 18))
    ];

    public static void MapGameEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");
        //GET /games
        group.MapGet("/", async (GameStoreContext dbContext)
        => await dbContext.Games
                            .Include(g => g.Genre)
                            .Select(
                                game => new GameSummaryDto(
                                    game.Id,
                                    game.Name,
                                    game.Genre!.Name,
                                    game.Price,
                                    game.ReleaseDate
                                ))
                            .AsNoTracking() // We use AsNoTracking because we are only reading data, we dont need to track changes to the entities, and it improves performance.
                            .ToListAsync());

        //GET /games/1
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(
                new GameDetailsDto(
                    game.Id,
                    game.Name,
                    game.GenreId,
                    game.Price,
                    game.ReleaseDate
                )
            );
        })
            .WithName(GetGameEndpointName);

        //POST /games
        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
        {
            Game game = new Game
            {
                Name = newGame.Name,
                GenreId = newGame.GenreId,
                Price = newGame.Price,
                ReleaseDate = newGame.ReleaseDate
            };

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            GameDetailsDto gameDetails = new GameDetailsDto(
                game.Id,
                game.Name,
                game.GenreId,
                game.Price,
                game.ReleaseDate
            );

            return Results.CreatedAtRoute(GetGameEndpointName, new { id = game.Id }, gameDetails);
            //return Results.Created("/games/" + game.Id, game);
        });

        //PUT /games/1
        group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games
                                        .FindAsync(id);

            if (existingGame is null)
            {
                return Results.NotFound(); // We also could choose to create the game if it doesnt exist, but for this example we will just return not found.
            }
            existingGame.Name = updatedGame.Name;
            existingGame.GenreId = updatedGame.GenreId;
            existingGame.Price = updatedGame.Price;
            existingGame.ReleaseDate = updatedGame.ReleaseDate;

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        //DELETE /games/1
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            // var index = games.FindIndex(g => g.Id == id);
            // games.RemoveAt(index);
            //For convention, we dont search for the game first, we just try to delete it. If it doesnt exist, we just return no content.
            // await dbContext.Games.Where(g => g.Id == id)
            //                     .ExecuteDeleteAsync();

            // return Results.NoContent();
            var rowsAffected = await dbContext.Games
                    .Where(g => g.Id == id)
                    .ExecuteDeleteAsync();

            if (rowsAffected == 0)
            {
                return Results.NotFound($"Game with id {id} not found");
            }

            return Results.NoContent();
        });

    }
}
