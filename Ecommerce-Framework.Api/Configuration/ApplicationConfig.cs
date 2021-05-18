using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Diagnostics.CodeAnalysis;

namespace Ecommerce_Framework.Api.Configuration
{
    [ExcludeFromCodeCoverage]
    public static class ApplicationConfig
    {
        public static void ApplicationRegister(this IServiceCollection services)
        {
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
           {
               options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
           });

            services.AddSpaStaticFiles(configuration =>
            {
              //  configuration.RootPath = "ClientApp/dist";
            });

            services.AddSignalR();

            services.AddDatabaseDeveloperPageExceptionFilter();
        }

        public static void ApplicationRegister(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
              app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
           if (!env.IsDevelopment())
           {
                app.UseSpaStaticFiles();
          }

            app.UseRouting();
            app.UseGlobalExceptionHandlerMiddleware();
            app.UseEndpoints(endpoints =>
            {
       
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
           {
          spa.Options.SourcePath = "ClientApp";

           if (env.IsDevelopment())
              {
              spa.UseAngularCliServer(npmScript: "start");
          }
         });
        }
    }
}
