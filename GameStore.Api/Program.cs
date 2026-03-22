
using GameStore.Api.Data;
using GameStore.Api.Endpoints;
using GameStore.Api.EndPoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();
builder.AddGameStoreDb();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// just for development, in production you should be more restrictive with CORS
app.UseCors("AllowAll");


app.MapGameEndpoints();
app.MapGenreEndpoints();
app.MigrateDb();

app.Run();
