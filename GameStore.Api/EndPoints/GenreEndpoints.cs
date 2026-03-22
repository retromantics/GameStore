using System;
using GameStore.Api.Data;
using GameStore.Api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class GenreEndpoints
{
    public static void MapGenreEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/genres");

        //Get All
        group.MapGet("/", async (GameStoreContext dbContext) =>
        {
            return await dbContext.Genres
                                .Select(g => new GenreDto(g.Id, g.Name))
                                .AsNoTracking()
                                .ToListAsync();
        });
    }
}
