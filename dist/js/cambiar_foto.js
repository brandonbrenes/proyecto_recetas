function mostrarImagen(event) {
    let imagenSource = event.target.result;
    let previewImage = document.getElementById('foto_usuario');
    let imagenGrande =document.getElementById('foto_grande');

    previewImage.src = imagenSource;
    imagenGrande.src= imagenSource;
}

function procesarArchivo(event) {
    let imagen = event.target.files[0];
    let lector = new FileReader();

    lector.addEventListener('load', mostrarImagen, false);

    lector.readAsDataURL(imagen);
}

document.getElementById('archivo').addEventListener('change', procesarArchivo, false);