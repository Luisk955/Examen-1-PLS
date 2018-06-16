'use strict';
window.addEventListener('load', init, false);

function init() {

    var urlBase = 'https://gallopintocalladmin.firebaseio.com/reportes.json';
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
    requestAllReportes();

    function requestAllReportes() {
        var request = new XMLHttpRequest();
        request.open('GET', urlBase, true);
        request.onreadystatechange = requestAllReportesCallBack;
        request.send();
    }

    function requestAllReportesCallBack(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status == 200) {
                reportes = [];
                var reportesData = JSON.parse(request.responseText);
                for (const key in reportesData) {
                    var reporteData = reportesData[key];
                    // var editable = false;
                    // if (reporteData.owner === owner) {
                    //     editable = true;
                    // }
                    // var date = new Date(reporteData.timestamp);
                    var reporte = new Reporte(key, reporteData.nombre, reporteData.apellido, reporteData.telefono, reporteData.email, reporteData.cedula, reporteData.reporteLlamada, reporteData.fecha, reporteData.autor);
                    reportes.push(reporte);
                }
                mostrarReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }


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