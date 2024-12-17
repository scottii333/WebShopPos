// WebShopAcc Entity
using System.ComponentModel.DataAnnotations;

public class WebShopAcc
    {
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        public string? FullName { get; set; }
    }
