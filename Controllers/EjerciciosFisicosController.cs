using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProyectoCelular.Models;
using ProyectoCelular.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ProyectoCelular.Controllers;

[Authorize]
public class EjerciciosFisicosController : Controller
{

    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public EjerciciosFisicosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        // Crear una lista de SelectListItem que incluya el elemento adicional
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]" }
        };

        // Obtener todas las opciones del enum
        var enumValues = Enum.GetValues(typeof(EstadoEmocional)).Cast<EstadoEmocional>();

        // Convertir las opciones del enum en SelectListItem
        selectListItems.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString().ToUpper()
        }));

        // Pasar la lista de opciones al modelo de la vista
        ViewBag.EstadoEmocionalInicio = selectListItems.OrderBy(t => t.Text).ToList();
        ViewBag.EstadoEmocionalFin = selectListItems.OrderBy(t => t.Text).ToList();

        var tipoEjercicios = _context.TipoEjercicios.ToList();
        tipoEjercicios.Add(new TipoEjercicio { TipoEjercicioId = 0, Descripcion = "[SELECCIONE...]" });
        ViewBag.TipoEjercicioId = new SelectList(tipoEjercicios.OrderBy(c => c.Descripcion), "TipoEjercicioId", "Descripcion");

        return View();
    }

    public JsonResult MostrarListadoEjercicios(int? id)
    {
        List<VistaEjercicios> MostrarEjercicios = new List<VistaEjercicios>();

        var ejerciciosFisicos = _context.EjerciciosFisicos.ToList();
        if (id != null)
        {
            ejerciciosFisicos = ejerciciosFisicos.Where(e => e.EjercicioFisicoID == id).ToList();
        }

        var Ejercicio = _context.TipoEjercicios.ToList();

        foreach (var ejercicioFisico in ejerciciosFisicos)
        {
            var ejercicio = Ejercicio.Where(e => e.TipoEjercicioId == ejercicioFisico.TipoEjercicioId).Single();

            var mostrarEjercicios = new VistaEjercicios
            {
                EjercicioFisicoID = ejercicioFisico.EjercicioFisicoID,
                TipoEjercicioID = ejercicioFisico.TipoEjercicioId,
                EjercicioNombre = ejercicio.Descripcion,
                InicioString = ejercicioFisico.Inicio.ToString("dd/MM/yyyy HH:mm"),
                FinString = ejercicioFisico.Fin.ToString("dd/MM/yyyy HH:mm"),
                EstadoEmocionalInicio = Enum.GetName(typeof(EstadoEmocional), ejercicioFisico.EstadoEmocionalInicio),
                EstadoEmocionalFin = Enum.GetName(typeof(EstadoEmocional), ejercicioFisico.EstadoEmocionalFin),
                Observaciones = ejercicioFisico.Observaciones
            };
            MostrarEjercicios.Add(mostrarEjercicios);
        }

        return Json(MostrarEjercicios);
    }

    public JsonResult GuardadoEjerciciosFisicos(int EjercicioFisicoID, int TipoEjercicioId, DateTime Inicio, DateTime Fin, EstadoEmocional EstadoEmocionalInicio, EstadoEmocional EstadoEmocionalFin, string? Observaciones)
    {

        string resultado = "";

        if (EjercicioFisicoID == 0)
        {
            var EjercicioFisico = new EjercicioFisico
            {
                EjercicioFisicoID = EjercicioFisicoID,
                TipoEjercicioId = TipoEjercicioId,
                Inicio = Inicio,
                Fin = Fin,
                EstadoEmocionalInicio = EstadoEmocionalInicio,
                EstadoEmocionalFin = EstadoEmocionalFin,
                Observaciones = Observaciones
            };
            _context.Add(EjercicioFisico);
            _context.SaveChanges();

            resultado = "Se guardo el ejercicio con exito";
        }
        else
        {
            var ejercicioFisicoEditar = _context.EjerciciosFisicos.Where(e => e.EjercicioFisicoID == EjercicioFisicoID).SingleOrDefault();

            {
                var existeEjercicioFisico = _context.EjerciciosFisicos.Where(e => e.EjercicioFisicoID == EjercicioFisicoID).Count();
                {
                    ejercicioFisicoEditar.EjercicioFisicoID = EjercicioFisicoID;
                    ejercicioFisicoEditar.TipoEjercicioId = TipoEjercicioId;
                    ejercicioFisicoEditar.Inicio = Inicio;
                    ejercicioFisicoEditar.Fin = Fin;
                    ejercicioFisicoEditar.EstadoEmocionalInicio = EstadoEmocionalInicio;
                    ejercicioFisicoEditar.EstadoEmocionalFin = EstadoEmocionalFin;
                    ejercicioFisicoEditar.Observaciones = Observaciones;
                    _context.SaveChanges();

                    resultado = "EJERCICIO INGRESADO";
                }
            }
        }

        return Json(resultado);


    }

    public JsonResult TraerListaEjercicios(int? EjercicioFisicoID)
    {
        var EjerciciosFisicos = _context.EjerciciosFisicos.ToList();

        if (EjercicioFisicoID != null)
        {
            EjerciciosFisicos = EjerciciosFisicos.Where(e => e.EjercicioFisicoID == EjercicioFisicoID).ToList();
        }

        return Json(EjerciciosFisicos.ToList());
    }

    public JsonResult EliminarEjerciciosFisicos(int EjercicioFisicoID)
    {
       var EjercicioFisico = _context.EjerciciosFisicos.Find(EjercicioFisicoID);
        _context.Remove(EjercicioFisico);
        _context.SaveChanges();

        return Json(true);
    }
}