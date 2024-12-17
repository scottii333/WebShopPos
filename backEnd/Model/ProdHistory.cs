using System;
using System.ComponentModel.DataAnnotations;

public class ProdHistory
{
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public required string ProductCode { get; set; }

    [Required]
    public int QuantitySold { get; set; }

    [Required]
    public DateTime SaleDate { get; set; }
}
