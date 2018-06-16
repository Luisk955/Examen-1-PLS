class Reporte{
    constructor(pFbkey,pNombre, pApellido, pTelefono, pEmail, pCedula, pReporteLlamada, pFecha, pAutor, pEditable){
        this.fbkey = pFbkey;
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.telefono = pTelefono;
        this.email = pEmail;
        this.cedula = pCedula;
        this.reporteLlamada = pReporteLlamada;
        this.estado = 'Pendiente';
        this.autor = pAutor;
        this.editable = pEditable;
        if (pFecha === null) {
            this.fecha = new Date();
        } else {
            this.fecha = new Date(pFecha);
        }
    }
}