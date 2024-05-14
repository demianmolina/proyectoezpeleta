using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoCelular.Models;

public class TipoEjercicio
{

    [Key]
    public int TipoEjercicioId { get; set; }

    public string? Descripcion { get; set; }
    public bool Eliminado { get; set; }
    public virtual ICollection<EjercicioFisico> EjercicioFisicos { get; set; }
    
}
