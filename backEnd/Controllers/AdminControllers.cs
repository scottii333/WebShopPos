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
   
   


   
   
   
   
    }
}
