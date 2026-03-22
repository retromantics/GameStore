using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider
                            .GetRequiredService<GameStoreContext>();

        dbContext.Database.Migrate();
    }

    public static void AddGameStoreDb(this WebApplicationBuilder builder)
    {
        var provider = builder.Configuration["DatabaseProvider"]
            ?? throw new InvalidOperationException(
                "'DatabaseProvider' not defined in config. Use 'sqlite' or 'postgres'.");

        switch (provider.ToLower())
        {
            case "sqlite":
                var sqliteConn = builder.Configuration
                    .GetConnectionString("Sqlite")
                    ?? throw new InvalidOperationException(
                        "ConnectionString 'Sqlite' not found.");

                builder.Services.AddSqlite<GameStoreContext>(
                    sqliteConn,
                    optionsAction: options => options.UseSeeding(SeedGenres)
                );
                break;

            case "postgres":
                var pgConn = builder.Configuration
                    .GetConnectionString("Postgres")
                    ?? throw new InvalidOperationException(
                        "ConnectionString 'Postgres' not found.");

                builder.Services.AddNpgsql<GameStoreContext>(
                    pgConn,
                    optionsAction: options => options.UseSeeding(SeedGenres)
                );
                break;

            default:
                throw new InvalidOperationException(
                    $"DatabaseProvider '{provider}' not supported. Use 'sqlite' or 'postgres'.");
        }
    }

    private static void SeedGenres(DbContext context, bool _)
    {
        if (!context.Set<Genre>().Any())
        {
            context.Set<Genre>().AddRange(
                new Genre { Name = "Action" },
                new Genre { Name = "Adventure" },
                new Genre { Name = "RPG" },
                new Genre { Name = "Strategy" },
                new Genre { Name = "Sports" }
            );

            context.SaveChanges();
        }
    }
}