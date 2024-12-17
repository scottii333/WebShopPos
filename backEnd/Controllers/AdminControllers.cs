using Microsoft.AspNetCore.Mvc;

namespace backEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        // GET: api/Admin
        [HttpGet]
        public IActionResult GetSampleData()
        {
            // Return some sample data
            var sampleData = new[]
            {
                new { Id = 1, Name = "Admin 1", Role = "Super Admin" },
                new { Id = 2, Name = "Admin 2", Role = "Moderator" }
            };

            return Ok(sampleData);
        }
    }
}
