using Microsoft.EntityFrameworkCore;

namespace backEnd.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<WebShopAcc> WebShopAcc { get; set; }
    }
}
