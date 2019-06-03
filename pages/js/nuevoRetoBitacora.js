$( document ).ready(function() {
    cargarNombre();
});

var identificacion = localStorage.getItem("idTipoAreaXBitacoraTipoBitacora");
var numIdentificacion = localStorage.getItem("numIdentificacion");

var porcentajeSalida =0;

function limpiar(){
  document.getElementById('txtNombre').value = "";
  document.getElementById('txtFecha').value = "";
  document.getElementById('txtPorcentaje').value = "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function agregarRetoBitacora(){

      var parametros = {
          opcion : "agregarRetoBitacora",
          nombre : $('#txtNombre').val(),
          fecha: $('#single_cal2').val(),
          Porcentaje: $('#txtPorcentaje').val(),
          id : identificacion
      };

      // Realizar la petición
      var post = $.post(
                            "php/mysql.php",    // Script que se ejecuta en el servidor
                            parametros,                              
                            siRespuesta    // Función que se ejecuta cuando el servidor responde
                            );  
      console.log($('#txtFecha').val());
}

function cargarNombre(){
  var parametros = {
      opcion : "cargarNombre",
      id: numIdentificacion
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                       parametros,                             
                       siRespuestacargarNombre    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarNombre(r){
  var doc = JSON.parse(r);
  var label = '<label id="lblNombre">Nombre: ';
  $("#lblNombre").html("");

  for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        label += obj.descripcion;
    }
  label += '</label>';
  $("#lblNombre").html(label);
}

function cargarTablaRetos(){
  var parametros = {
    opcion : "cargarTablaRetos",
    id: identificacion
  }

  var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                       parametros,                             
                       siRespuestacargarTabla    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarTabla(r){
  var doc = JSON.parse(r);
  for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        porcentajeSalida+= Number(obj.porcentaje);       
  }
  porcentajeSalida = porcentajeSalida/doc.length;
}

function actualizarPorcentajeSubBitacora(){   
    var parametros = {
        opcion : "actualizarPorcentajeSubBitacora",
        id : identificacion,
        porcentaje: porcentajeSalida
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuestaSalida    // Función que se ejecuta cuando el servidor responde
                          );  
}

function siRespuestaSalida(r){
  console.log("actualizado");
}

async function siRespuesta(r){
    limpiar();
    alert(r);
    cargarNombre();
    cargarTablaRetos();
    await sleep(1000);
    actualizarPorcentajeSubBitacora();
}