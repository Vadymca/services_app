using Microsoft.EntityFrameworkCore;
using services_app.Services;

namespace services_app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSingleton<IServiceUsers, ServiceUsers>();
            builder.Services.AddControllers();
            builder.Services.AddDbContext<UserContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            var app = builder.Build();
            app.UseStaticFiles();
            app.UseRouting();
            app.MapControllers();
            app.Run();
        }
    }
}
