window.onload = ListadoTipoEjercicios();

function ListadoTipoEjercicios() {

    $.ajax({

        // la URL para la petición
        url: '../../TipoEjercicios/ListadoTipoEjercicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (tipoDeEjercicios) {

            $("#ModalTipoEjercicio").modal("hide");
            LimpiarModal();
            //$("#tbody-tipoejercicios").empty();
            let contenidoTabla = ``;

            $.each(tipoDeEjercicios, function (index, tipoDeEjercicio) {

                contenidoTabla += `
                <tr>
                    <td>${tipoDeEjercicio.descripcion}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="AbrirModalEditar(${tipoDeEjercicio.tipoEjercicioId})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger" onclick="ValidarEliminarRegistro(${tipoDeEjercicio.tipoEjercicioId})">
                    Eliminar
                    </button>
                    </td>
                </tr>
             `;
            });

            document.getElementById("tbody-tipoejercicios").innerHTML = contenidoTabla;



        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }







    });


}

function LimpiarModal() {
    document.getElementById("TipoEjercicioId").value = 0;
    document.getElementById("descripcion").value = "";
}

function NuevoRegistro() {
    $("#ModalTitulo").text("Nuevo Tipo de Ejercicio");
}

function AbrirModalEditar(tipoEjercicioId) {


    $.ajax({

        // la URL para la petición
        url: '../../TipoEjercicios/ListadoTipoEjercicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { tipoEjercicioId },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (tipoDeEjercicios) {
            let tipoDeEjercicio = tipoDeEjercicios[0];

            document.getElementById("TipoEjercicioId").value = tipoEjercicioId;
            $("#ModalTitulo").text("Editar Tipo de Ejercicio");
            document.getElementById("descripcion").value = tipoDeEjercicio.descripcion;
            $("#ModalTipoEjercicio").modal("show");


        },


        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existio un problema al consultar el registro para ser modificado')

        }



    });


}

function GuardarRegistro() 
{

    //GUARDAMOS EN UNA VARIABLE LO ESCRITO EN EL INPUT DESCRIPCION
    let tipoEjercicioID = document.getElementById("TipoEjercicioId").value;
    let descripcion = document.getElementById("descripcion").value;
    //POR UN LADO PROGRAMAR VERIFICACIONES DE DATOS EN EL FRONT CUANDO SON DE INGRESO DE VALORES Y NO SE NECESITA VERIFICAR EN BASES DE DATOS
    //LUEGO POR OTRO LADO HACER VERIFICACIONES DE DATOS EN EL BACK, SI EXISTE EL ELEMENTO SI NECESITAMOS LA BASE DE DATOS.
    console.log(descripcion);

    $.ajax({
        // la URL para la petición
        url: '../../TipoEjercicios/GuardarTipoEjercicio',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { tipoEjercicioID: tipoEjercicioID, descripcion: descripcion },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) 
        {

            if (resultado != "") {
                alert(resultado);
            }
            ListadoTipoEjercicios();

        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) 
        {
            console.log('Disculpe, existió un problema al guardar el registro');

        }
    });

}

function EliminarRegistro(tipoEjercicioId) {
        console.log (tipoEjercicioId)
    $.ajax({

          // la URL para la petición
          url: '../../TipoEjercicios/EliminarTipoEjercicio',
          // la información a enviar
          // (también es posible utilizar una cadena de datos)
          data: { TipoEjercicioId: tipoEjercicioId },
          // especifica si será una petición POST o GET
          type: 'POST',
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (resultado) {
            ListadoTipoEjercicios();
          },

          // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.')
        }

    });

    (function() {
        var Nav;
      
        Nav = {
          init: function() {
            this.setup();
            return this.uiBind();
          },
          setup: function() {
            return $('#mainnav').find('li:not(:last-child)').toggleClass('invisible');
          },
          uiBind: function() {
            return $(document).on('click', '#mainnav', function(e) {
              e.preventDefault();
              return $(this).find('li:not(:last-child)').toggleClass('animate').toggleClass('invisible');
            });
          }
        };
      
        Nav.init();
      
      }).call(this);
      
    
}

function ValidarEliminarRegistro(TipoEjercicioId) {
    // Solicita confirmación al usuario
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir este cambio!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminado!"
      }).then((result) => {
        if (result.isConfirmed) {
            EliminarRegistro(TipoEjercicioId)
          Swal.fire({
            title: "Eliminar",
            text: "El ejercicio fue eliminado.",
            icon: "success"
          });
        }
      });
}
