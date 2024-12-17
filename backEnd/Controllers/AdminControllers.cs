using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backEnd.Data;

namespace backEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }

        // POST: api/Admin/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register(WebShopAccounts account)
        {
            try
            {
                // Check if the database can connect
                if (!_context.Database.CanConnect())
                {
                    return StatusCode(500, "Database connection failed.");
                }

                // Ensure the AdminAcc table exists
                var tableExists = await _context.Database.ExecuteSqlRawAsync(
                    "IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'WebShopAcc') BEGIN CREATE TABLE WebShopAcc (Id INT IDENTITY(1,1) PRIMARY KEY, Email NVARCHAR(255) NOT NULL UNIQUE, Password NVARCHAR(255) NOT NULL, Username NVARCHAR(255)) END"
                );

                if (_context.WebShopAcc == null)
                {
                    return StatusCode(500, "WebShopAcc DbSet is not initialized.");
                }

                // Check if email already exists
                var existingAccount = await _context.WebShopAcc.FirstOrDefaultAsync(a => a.Email == account.Email);
                if (existingAccount != null)
                {
                    return BadRequest("Email already exists.");
                }

                // Add the new account
                _context.WebShopAcc.Add(account);
                await _context.SaveChangesAsync();

                return Ok("Account created successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        // POST: api/Admin/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] WebShopAccounts loginRequest)
        {
            if (_context.WebShopAcc == null)
            {
                return StatusCode(500, "WebShopAccounts table does not exist.");
            }

            // Find the user by email and password
            var account = await _context.WebShopAcc.FirstOrDefaultAsync(a => a.Email == loginRequest.Email && a.Password == loginRequest.Password);

            if (account == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(new { Message = "Login successful.", Username = account.Username });
        }

        // GET: api/Admin/AllAccounts
        [HttpGet("AllAccounts")]
        public async Task<IActionResult> GetAllAccounts()
        {
            try
            {
                if (_context.WebShopAcc == null)
                {
                    return StatusCode(500, "WebShopAcc table is not initialized.");
                }

                // Fetch all admin account usernames
                var accounts = await _context.WebShopAcc
                    .Select(a => new { a.Username, a.Email })
                    .ToListAsync();

                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("AddAdmin")]
        public async Task<IActionResult> AddAdmin(WebShopAccounts newAdmin)
        {
            try
            {
                // Check if the database can connect
                if (!_context.Database.CanConnect())
                {
                    return StatusCode(500, "Database connection failed.");
                }

                // Ensure WebShopAcc table exists
                var tableExists = await _context.Database.ExecuteSqlRawAsync(
                    "IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'WebShopAcc') BEGIN CREATE TABLE WebShopAcc (Id INT IDENTITY(1,1) PRIMARY KEY, Email NVARCHAR(255) NOT NULL UNIQUE, Password NVARCHAR(255) NOT NULL, Username NVARCHAR(255)) END"
                );

                if (_context.WebShopAcc == null)
                {
                    return StatusCode(500, "WebShopAcc table is not initialized.");
                }

                // Check if email already exists
                var existingAdmin = await _context.WebShopAcc.FirstOrDefaultAsync(a => a.Email == newAdmin.Email);
                if (existingAdmin != null)
                {
                    return BadRequest("Email already exists.");
                }

                // Add new admin account
                _context.WebShopAcc.Add(newAdmin);
                await _context.SaveChangesAsync();

                return Ok("Admin added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            try
            {

                 Console.WriteLine($"Received: Code={product.Code}, Description={product.Description}, Quantity={product.Quantity}, Price={product.Price}");
                // Check if the table exists, and create it if not
                await _context.Database.ExecuteSqlRawAsync(@"
                    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'AddProd' AND xtype = 'U')
                    CREATE TABLE AddProd (
                        Id INT IDENTITY(1,1) PRIMARY KEY,
                        Code NVARCHAR(50) NOT NULL,
                        Description NVARCHAR(255) NOT NULL,
                        Quantity INT NOT NULL,
                        Price DECIMAL(18,2) NOT NULL
                    )");

                // Add product to the table
                _context.AddProd.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Product added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred: {ex.Message}" });
            }
        }

        // GET: api/Products
        [HttpGet("FetchProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.AddProd.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred: {ex.Message}" });
            }
        }
    }



}
