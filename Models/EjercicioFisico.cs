using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Humanizer;
using ProyectoCelular.Models;

namespace ProyectoCelular.Models
{

    public class EjercicioFisico
    {
        [Key]

        public int EjercicioFisicoID { get; set; }

        public int TipoEjercicioId { get; set; }

        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }

        public EstadoEmocional EstadoEmocionalInicio { get; set; }

        public string? Observaciones { get; set; }


        public virtual TipoEjercicio TipoEjercicio { get; set; }

}

public class VistaEjercicios {
    public int IdEjercicioFisico { get; set; }
    public int TipoEjercicioID { get; set; }
    public string? EjercicioNombre { get; set; }
    public string InicioString { get; set; }
    public string FinString { get; set; }
    public string? EstadoEmocionalInicio { get; set; }
    public string? EstadoEmocionalFin { get; set; }
    public string? Observaciones { get; set; }
}

public enum EstadoEmocional
{
    Feliz = 1,
    Triste,
    Enojado,
    Ansioso,
    Estresado,
    Relajado,
    Aburrido,
    Emocionado,
    Agobiado,
    Confundido,
    Optimista,
    Pesimista,
    Motivado,
    Cansado,
    Eufórico,
    Agitado,
    Satisfecho,
    Desanimado
}


// public class VistaSumaEjercicioFisico
// {
//     public string? TipoEjercicioNombre { get; set; }    
//     public int TotalidadMinutos { get; set; }
//     public int TotalidadDiasConEjercico { get; set; }
//     public int TotalidadDiasSinEjercicio {get; set; }

//     public List<VistaEjercicioFisico>? DiasEjercicios { get; set; } 
// }
// public class VistaEjercicioFisico
// {
//     public int Anio { get; set; }

//     public string? Mes { get; set;}
//     public string? Dia { get; set; }
//     public int CantidadMinutos {get; set; }
    
// }

public class VistaEstadoEmocional {

    public int IdEstadoEmocional { get; set; }
    public string? Descripcion { get; set; }
}

}