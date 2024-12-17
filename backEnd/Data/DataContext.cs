using Microsoft.EntityFrameworkCore;

namespace backEnd.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<WebShopAccounts>? WebShopAcc { get; set; } = null!;

         public DbSet<Product> AddProd { get; set; } = null!;

          protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure precision for Price in AddProd table
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}
