window.onload = MostrarListadoEjercicios();

function MostrarListadoEjercicios() {

    console.log("Mostrar")

    $.ajax({
        url: '../../EjerciciosFisicos/MostrarListadoEjercicios',
        data: {},
        type: 'POST',
        dataType: 'json',

        success: function (Ejercicios) {
            $("#ModalEjercicioFisico").modal("hide");
            LimpiarModal()
            let contenidoTabla = ``;

            $.each(Ejercicios, function (Index, Ejercicio) {

                console.log(Ejercicio);

                contenidoTabla
                 += `
                    <tr>
                     <td class="text-center">${Ejercicio.ejercicioNombre}</td>
                        <td class="text-center">${Ejercicio.inicioString}</td>
                     <td class="text-center">${Ejercicio.finString}</td>
                     <td class="text-center">${Ejercicio.estadoEmocionalInicio}</td>
                     <td class="text-center">${Ejercicio.estadoEmocionalFin}</td>
                     <td class="text-center">${Ejercicio.observaciones}</td>
                     <td class="text-center">
                     <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${Ejercicio.ejercicioFisicoID})" style="black">
                     Editar
                     </button>
                     </td>
                     <td class="text-center">
                     <button type="button" class="btn btn-success" onclick="ValidarEliminarEjercicioFisico(${Ejercicio.ejercicioFisicoID})">
                     Eliminar
                     </button>
                     </td>
                    </tr>
                 `;
            });
            document.getElementById("tbody-ejerciciosfisicos").innerHTML = contenidoTabla;
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function GuardadoEjerciciosFisicos() {
    let ejercicioFisicoID = document.getElementById("EjercicioFisicoID").value;
    let tipoEjercicioID = document.getElementById("TipoEjercicioId").value;
    let inicio = document.getElementById("FechaInicio").value;
    let fin = document.getElementById("FechaFin").value;
    let estadoEmocionalInicio = document.getElementById("EstadoEmocionalInicio").value;
    let estadoEmocionalFin = document.getElementById("EstadoEmocionalFin").value;
    let observaciones = document.getElementById("Observaciones").value;

    $.ajax({
        url: '../../EjerciciosFisicos/GuardadoEjerciciosFisicos',
        data: {
            EjercicioFisicoID: ejercicioFisicoID,
            TipoEjercicioId: tipoEjercicioID,
            Inicio: inicio,
            Fin: fin,
            EstadoEmocionalInicio: estadoEmocionalInicio,
            EstadoEmocionalFin: estadoEmocionalFin,
            Observaciones: observaciones
        },
        type: 'POST',
        dataType: 'json',

        success: function (resultado) {
            if (resultado != "") {
                alert = ("resultado");
            }
            MostrarListadoEjercicios();
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });
}

function AbrirModalEditar(ejercicioFisicoID) {
    $.ajax({
        url: '../../EjerciciosFisicos/TraerListaEjercicios',
        data: { ejercicioFisicoID: ejercicioFisicoID },
        type: 'POST',
        dataType: 'json',

        success: function (EjercicioFisico) {
            let ejercicio = EjercicioFisico[0];
            document.getElementById("EjercicioFisicoID").value = ejercicioFisicoID;
            $("#ModalTitulo").text("Editar Ejercicio Físico");
            document.getElementById("TipoEjercicioId").value = ejercicio.tipoEjercicioID;
            document.getElementById("FechaInicio").value = ejercicio.inicio;
            document.getElementById("FechaFin").value = ejercicio.fin;
            document.getElementById("EstadoEmocionalInicio").value = ejercicio.estadoEmocionalInicio;
            document.getElementById("EstadoEmocionalFin").value = ejercicio.estadoEmocionalFin;
            document.getElementById("Observaciones").value = ejercicio.observaciones;

            $("#ModalEjercicioFisico").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function EliminarEjercicioFisico(EjercicioFisicoID) {
    console.log(EjercicioFisicoID)
    $.ajax({
        url: '../../EjerciciosFisicos/EliminarEjerciciosFisicos',
        data: { EjercicioFisicoID: EjercicioFisicoID },
        type: 'POST',
        dataType: 'json',

        success: function (resultado) {
            MostrarListadoEjercicios();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });
}

function ValidarEliminarEjercicioFisico(EjercicioFisicoID) {
    // Solicita confirmación al usuario
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir este cambio!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            EliminarEjercicioFisico(EjercicioFisicoID)
          Swal.fire({
            title: "Eliminado!",
            text: "El registro fue eliminado.",
            icon: "success"
          });
        }
      });
}



function NuevoEjercicioFisico() {
    $("#ModalTitulo").text("Nuevo Ejercicio Fisico");
}

function LimpiarModal() {
    document.getElementById("EjercicioFisicoID").value = 0;
    document.getElementById("TipoEjercicioId").value = 0;
    document.getElementById("FechaInicio").value = "";
    document.getElementById("EstadoEmocionalInicio").value = 0;
    document.getElementById("FechaFin").value = "";
    document.getElementById("EstadoEmocionalFin").value = 0;
    document.getElementById("Observaciones").value = "";
}
