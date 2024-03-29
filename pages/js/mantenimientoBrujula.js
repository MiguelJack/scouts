$( document ).ready(function() {
    cargarNivelesBrujula();
    cargarSubnivelesBrujula();
});

var arrayNiveles = []
var arraySubniveles = []

function cargarNivelesBrujula(){
	var parametros = {
		opcion : "cargarNivelesBrujula"
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuestacargarNiveles    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarNiveles(r){
	var doc = JSON.parse(r);
	var salida = '<select class="form-control" tabindex="-1" id="cbNiveles">';                   
	$("#cbNiveles").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.descripcion+'</option>';
        arrayNiveles[i] = obj.idTipoBitacora;
    }
    salida += "</select>";
    $("#cbNiveles").html(salida);
}

function agregarNivelBrujula(){
	if (document.getElementById('txtNombre').value == "") {
		alert('El nombre del nivel es requerido');
	}else{	
		var parametros = {
	        opcion : "agregarNivelBrujula",
	        txtNombre: $('#txtNombre').val(),
	    };

	    // Realizar la petición
		var post = $.post(
	                          "php/mysql.php",    // Script que se ejecuta en el servidor
		                      parametros,    	                       
		                      siRespuestaNivel    // Función que se ejecuta cuando el servidor responde
	                          );
	}
}

function limpiar(){
	document.getElementById('txtNombre').value = "";
	document.getElementById('txtNombreMod').value = "";
	document.getElementById('txtNombreSub').value = "";
	document.getElementById('txtNombreSubMod').value = "";
}

function editarNivelBrujula(){
	if (document.getElementById('txtNombreMod').value == "") {
		alert('El nombre actualizado del nivel es requerido');
	}else{
	    var id = arrayNiveles[document.getElementById('cbNiveles').selectedIndex];
	    console.log(id);
	    var parametros = {
	        opcion : "editarNivelBrujula",
	        id : id,
	        txtNombre: $('#txtNombreMod').val(),
	    };

	    // Realizar la petición
	    var post = $.post(
	                          "php/mysql.php",    // Script que se ejecuta en el servidor
	                          parametros,                              
	                          siRespuestaNivel    // Función que se ejecuta cuando el servidor responde
	                          );  
	}
}

function siRespuestaNivel(r){
    limpiar();
    alert(r);
    cargarNivelesBrujula();
    cargarSubnivelesBrujula();
}


function cargarSubnivelesBrujula(){
	var parametros = {
		opcion : "cargarSubnivelesBrujula"
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuestacargarSubniveles    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuestacargarSubniveles(r){
	var doc = JSON.parse(r);
	var salida = '<select class="form-control" tabindex="-1" id="cbSubniveles">';                   
	$("#cbSubiveles").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.descripcion+'</option>';
        arraySubniveles[i] = obj.idTipoArea;
    }
    salida += "</select>";
    $("#cbSubniveles").html(salida);
}

function agregarSubnivelBrujula(){
	if (document.getElementById('txtNombreSub').value == "") {
		alert('El nombre del subnivel es requerido');
	}else{	
		var parametros = {
	        opcion : "agregarSubnivelBrujula",
	        txtNombre: $('#txtNombreSub').val(),
	    };

	    // Realizar la petición
		var post = $.post(
	                          "php/mysql.php",    // Script que se ejecuta en el servidor
		                      parametros,    	                       
		                      siRespuestaNivel    // Función que se ejecuta cuando el servidor responde
	                          );
	}
}


function editarSubnivelBrujula(){
	if (document.getElementById('txtNombreSubMod').value == "") {
		alert('El nombre actualizado del subnivel es requerido');
	}else{
	    var id = arraySubniveles[document.getElementById('cbSubniveles').selectedIndex];
	    console.log(id);
	    var parametros = {
	        opcion : "editarSubnivelBrujula",
	        id : id,
	        txtNombre: $('#txtNombreSubMod').val(),
	    };

	    // Realizar la petición
	    var post = $.post(
	                          "php/mysql.php",    // Script que se ejecuta en el servidor
	                          parametros,                              
	                          siRespuestaNivel    // Función que se ejecuta cuando el servidor responde
	                          );  
	}
}
