# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copiar el csproj correctamente
COPY GameStore.Api/GameStore.Api.csproj ./GameStore.Api/

# Restaurar dependencias
RUN dotnet restore ./GameStore.Api/GameStore.Api.csproj

# Copiar todo el proyecto
COPY . .

# Publicar
WORKDIR /app/GameStore.Api
RUN dotnet publish -c Release -o /publish

# Etapa runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "GameStore.Api.dll"]
