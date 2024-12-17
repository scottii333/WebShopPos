using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public required string Code { get; set; }

    [Required]
    [StringLength(255)]
    public required string Description { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
}
