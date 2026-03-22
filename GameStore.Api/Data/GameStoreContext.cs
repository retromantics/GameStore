using System;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace GameStore.Api.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options)
    : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Genre> Genres => Set<Genre>();
}
