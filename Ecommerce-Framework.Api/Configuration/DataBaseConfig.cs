
using Ecommerce_Framework.Api.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Diagnostics.CodeAnalysis;



namespace Ecommerce_Framework.Api.Configuration
{
    [ExcludeFromCodeCoverage]
    public static class DataBaseConfig
    {
        public static void DataBaseRegister(this IServiceCollection services, IConfiguration configuration)
        {
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            IWebHostEnvironment env = serviceProvider.GetService<IWebHostEnvironment>();

         
           
                services.AddDbContext<EcommerceFrameworkContext>(options => options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Ecommerce-Framework.Api")));
          
        }

        public static void DataBaseRegister(this IApplicationBuilder app, IWebHostEnvironment env)
        {
           
                using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();              

                var ioasysFilmeContext = serviceScope.ServiceProvider.GetRequiredService<EcommerceFrameworkContext>();

                ioasysFilmeContext.Database.Migrate();

              
            
        }

   
    }
}
