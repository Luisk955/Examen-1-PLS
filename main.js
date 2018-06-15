'use strict';
window.addEventListener('load', init, false);

function init() {

    var urlBase = 'https://gallopintoadmin.firebaseio.com/reportes.json';
    var txtNombre = document.getElementById('txtNombre');
    var txtApellido = document.getElementById('txtApellido');
    var txtEmail = document.getElementById('txtEmail');
    var txtTelefono = document.getElementById('txtTelefono');
    var txtCedula = document.getElementById('txtCedula');
    var txtReporte = document.getElementById('txtReporte');
    var btnGuardar = document.getElementById('btnGuardar');
    var reportes = [];
    var autor = 'Luisk';

    btnGuardar.onclick = crearReporte;
    mostrarReportes();

    function crearReporte() {
        var reporte = new Reporte(null, txtNombre.value, txtApellido.value, txtEmail.value, txtTelefono.value, txtCedula.value, txtReporte.value, null, autor);

        reportes.push(reporte);
        cleanUI();
        mostrarReportes();

    }

    function mostrarReportes() {
        var reportesCont = document.getElementById('reportes');
        reportesCont.innerHTML = "";
        reportes.forEach(reporte => {
            var reporteUI = new ReporteUI(reporte);
            // if (reporteUI.post.editable) {
            //     reporteUI.container.onclick = selectPost;
            // }

            reportesCont.appendChild(reporteUI.container);
            console.log(reportes);
        });
    }

    function cleanUI() {
        txtNombre.value = '';
        txtApellido.value = '';
        txtEmail.value = '';
        txtTelefono.value = '';
        txtCedula.value = '';
        txtReporte.value = '';
    }

}