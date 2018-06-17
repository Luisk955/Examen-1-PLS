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
    var btnEditar = document.getElementById('btnEditar');
    var btnEliminar = document.getElementById('btnEliminar');
    var btnCancelar = document.getElementById('btnCancelar');
    var pEstadoReporte = document.getElementById('pEstadoReporte');
    var divEstadoRep = document.getElementById('divEstadoRep');
    var btnCambiarEstado = document.getElementById('btnCambiarEstado');
    var reportes = [];
    var autor = 'TRY';
    var selectedReporteUI = null;

    btnEditar.hidden = true;
    btnEliminar.hidden = true;
    btnCancelar.hidden = true;
    divEstadoRep.hidden = true;


    btnGuardar.onclick = crearReporte;
    btnEditar.onclick = editarReporte;
    btnEliminar.onclick = eliminarReporte;
    btnCambiarEstado.onclick = cambiarEstadoReporte;

    // btnCancelar.onclick = cancelar;




    requestAllReportes();


    //read reports

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
                    var reporte = new Reporte(key, reporteData.nombre, reporteData.apellido, reporteData.telefono, reporteData.email, reporteData.cedula, reporteData.reporteLlamada, reporteData.fecha, reporteData.autor, reporteData.editable);
                    reporte.setEstado(reporteData.estado);
                    reportes.push(reporte);
                }
                mostrarReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    function mostrarReportes() {
        var reportesCont = document.getElementById('reportes');
        reportesCont.innerHTML = "";
        reportes.forEach(reporte => {
            var reporteUI = new ReporteUI(reporte);
            reporteUI.container.onclick = selectReporte;

            reportesCont.appendChild(reporteUI.container);
            console.log(reportes);
        });
    }

    //read reports


    //create reports

    function crearReporte() {
        var reporte = new Reporte(null, txtNombre.value, txtApellido.value, txtEmail.value, txtTelefono.value, txtCedula.value, txtReporte.value, null, autor, true);

        var request = new XMLHttpRequest();
        request.open('POST', urlBase, true);
        request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        request.onreadystatechange = crearReporteCallBack;
        request.send(JSON.stringify(reporte));
        cleanUI();
    }

    function crearReporteCallBack(event) {
        var request = event.target;
        mostrarReportes();
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    //create reports


    //update reports

    function editarReporte() {
        var request = new XMLHttpRequest();
        request.open('PATCH', urlBase, true);
        request.onreadystatechange = editarReporteCallback;
        request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

        var reporte = selectedReporteUI.reporte;
        var fbkey = reporte.fbkey;
        reporte.fbkey = null;
        reporte.fecha = new Date();

        reporte.nombre = txtNombre.value;
        reporte.apellido = txtApellido.value;
        reporte.email = txtEmail.value;
        reporte.telefono = txtTelefono.value;
        reporte.cedula = txtCedula.value;
        reporte.reporteLlamada = txtReporte.value;

        var reporteJson = '{' + JSON.stringify(fbkey) + ':' + JSON.stringify(reporte) + '}';

        console.log(reporteJson);
        request.send(reporteJson);

        // removeSelectedReportStyle();
        cleanUI();
    }

    function editarReporteCallback(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    function cambiarEstadoReporte() {
        var request = new XMLHttpRequest();
        request.open('PATCH', urlBase, true);
        request.onreadystatechange = cambiarEstadoReporteCallback;
        request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        var reporte = selectedReporteUI.reporte;
        var fbkey = reporte.fbkey;
        var fecha = new Date();
        reporte.fecha = fecha;
        reporte.fbkey = null;

        if (reporte.estado === 'Pendiente') {

            reporte.estado = 'Resuelto';

            var reporteJson = '{' + JSON.stringify(fbkey) + ':' + JSON.stringify(reporte) + '}';

            console.log(reporteJson);
            request.send(reporteJson);
            removeSelectedReportStyle();
            cleanUI();

        } else if (reporte.estado === 'Resuelto') {
            if (reporte.autor === autor) {
                reporte.estado = 'Pendiente';
                var reporteJson = '{' + JSON.stringify(fbkey) + ':' + JSON.stringify(reporte) + '}';

                console.log(reporteJson);
                request.send(reporteJson);
                removeSelectedReportStyle();
                cleanUI();
            } else {
                console.log('Permiso denegado.');
            }
        } else {
            console.log('Permiso denegado.');
        }

    }

    function cambiarEstadoReporteCallback(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    //update reports


    //delete reports

    function eliminarReporte() {
        if (confirm('¿Está seguro que desea eliminar el reporte?')) {
            var url = 'https://gallopintocalladmin.firebaseio.com/reportes/' + selectedReporteUI.reporte.fbkey + '.json';
            var request = new XMLHttpRequest();
            request.open('Delete', url, true);
            request.onreadystatechange = eliminarReporteCallback;
            request.send();
            removeSelectedReportStyle();
            cleanUI();
        }
    }

    function eliminarReporteCallback(event) {
        var request = event.target;
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                requestAllReportes();
            } else {
                console.log('Error on request: ', request.status);
            }
        }
    }

    //delete reports


    //styles

    function cleanUI() {
        txtNombre.value = '';
        txtApellido.value = '';
        txtEmail.value = '';
        txtTelefono.value = '';
        txtCedula.value = '';
        txtReporte.value = '';
        pEstadoReporte.innerHTML = '';

    }

    function selectReporte(event) {
        removeSelectedReportStyle();
        if (event.target.reporte) {
            selectedReporteUI = event.target;
            txtNombre.value = selectedReporteUI.reporte.nombre;
            txtApellido.value = selectedReporteUI.reporte.apellido;
            txtEmail.value = selectedReporteUI.reporte.email;
            txtTelefono.value = selectedReporteUI.reporte.telefono;
            txtCedula.value = selectedReporteUI.reporte.cedula;
            txtReporte.value = selectedReporteUI.reporte.reporteLlamada;
            btnEditar.hidden = false;
            divEstadoRep.hidden = false;
            btnCancelar.hidden = false;
            btnCambiarEstado.hidden = false;
            btnGuardar.hidden = true;
            pEstadoReporte.innerHTML = "Estado de la llamada: " + selectedReporteUI.reporte.estado;

            if (selectedReporteUI.reporte.estado === 'Resuelto') {
                btnEliminar.hidden = false;
                btnCambiarEstado.hidden = true;
                if (selectedReporteUI.reporte.autor === autor) {
                    btnCambiarEstado.hidden = false;
                }
                else{
                    btnEditar.hidden = true;

                }
            }

            selectedReporteUI.classList.add('selectedReporte');
        }
    }

    function removeSelectedReportStyle() {
        if (selectedReporteUI != null) {
            selectedReporteUI.classList.remove('selectedReporte');
            btnCancelar.hidden = true;
            btnEditar.hidden = true;
            btnEliminar.hidden = true;
            btnCancelar.hidden = true;
            btnCambiarEstado.hidden = true;
            divEstadoRep.hidden = true;
            btnGuardar.hidden = false;
        }
    }

    //styles
}