class ReporteUI {
    constructor(reporte) {
        this.reporte = reporte;
        this.container = document.createElement('div');
        this.nombreTxt = document.createElement('p');
        this.emailTxt = document.createElement('p');
        this.telefonoTxt = document.createElement('p');
        this.cedulaTxt = document.createElement('p');
        this.reporteTxt = document.createElement("p");
        this.timeStampTxt = document.createElement('p');
        this.estadoTxt = document.createElement('p');

        this.container.appendChild(this.nombreTxt);
        this.container.appendChild(this.emailTxt);
        this.container.appendChild(this.telefonoTxt);
        this.container.appendChild(this.cedulaTxt);
        this.container.appendChild(this.reporteTxt);
        this.container.appendChild(this.timeStampTxt);
        this.container.appendChild(this.estadoTxt);
        this.container.classList.add("container");
        this.nombreTxt.classList.add("h2");

        


        if (this.reporte !== null) {
            this.nombreTxt.innerText = this.reporte.nombre + " " + this.reporte.apellido;
            this.emailTxt.innerText = this.reporte.email;
            this.telefonoTxt.innerText = this.reporte.telefono;
            this.cedulaTxt.innerText = this.reporte.cedula;
            this.reporteTxt.innerText = this.reporte.reporteLlamada;
            this.timeStampTxt.innerText = "Hecho por " + this.reporte.autor + " - " + this.reporte.fecha.getDate() + "/" + this.reporte.fecha.getMonth() + "/" + this.reporte.fecha.getFullYear() + " "+ this.reporte.fecha.getHours()+ ":" + this.reporte.fecha.getMinutes();
            this.estadoTxt.innerText = this.reporte.estado;
        }
        this.container.reporte = this.reporte;

    }
}