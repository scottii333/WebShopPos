// WebShopAcc Entity
using System.ComponentModel.DataAnnotations;

public class WebShopAccounts
    {
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        public string? Username { get; set; }
    }
