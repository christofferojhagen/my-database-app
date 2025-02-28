using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

[Index(nameof(Email), IsUnique = true)]
public class CustomerEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string CustomerName { get; set; } = null!;   
    public string Email { get; set; } = null!;

    public ICollection<ProjectEntity> Projects { get; set; } = [];
}
