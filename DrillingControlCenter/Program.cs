using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace DrillingControlCenter
{
    public class Program
    {
        private static LiteDatabase _db;

        public static void Main(string[] args)
        {
            _db = new LiteDatabase(@"drilling.db");
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });

        public static LiteDatabase GetDatabase()
        {
            return _db;
        }
    }
}