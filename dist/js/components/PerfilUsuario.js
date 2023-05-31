app.component("user-profile", {
    props: ["categories"],
    data() {
        return {
            name: "Brandon Brenes",
            userName: "@bran",
            email: "brandon@gmail.com",
            userPicture: "images/IMG_20210408_013058.jpg",
            userPicturePreview: "images/IMG_20210408_013058.jpg",
            recetasColeccionadas: ["52851", "53011", "52955", "52948", "52952", "52981", "52924", "52804", "53019", "52939"],
        }
    },
    methods: {
        mostrarImagen: function(event) {
            let imagenSource = event.target.result;
            
            this.userPicturePreview = imagenSource;
        },
        procesarArchivo: function(event) {
            let imagen = event.target.files[0];
            let lector = new FileReader();
        
            lector.addEventListener('load', this.mostrarImagen, false);
        
            lector.readAsDataURL(imagen);
        },
        saveChanges: function() {
            this.userPicture= this.userPicturePreview;
        },
        discardChanges: function(){
            this.userPicturePreview= this.userPicture;
        }
    },
    template:
        /*html*/
        `
    <!-- Sección con la foto e info del usuario -->
    <section class="mt-xl-5 text-center">
        <div class="d-flex flex-column align-items-center">
            <h1>{{name}}</h1>
            <h3 class="fs-sm text-white">{{userName}}</h3>
        </div>
        <div class="d-flex justify-content-center">
            <div class="foto-usuario">
                <div class="foto-container">
                    <img v-bind:src="userPicture" alt="Foto usuario" id="foto_grande">
                </div>
                <button type="button" class="card-btn-green button-border ver-mas" title="Ver más"
                    data-bs-toggle="modal" data-bs-target="#modalInfoUsuario">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
            </div>
        </div>

        <div class="modal fade" id="modalInfoUsuario" tabindex="-1" aria-labelledby="modalInfoUsuarioLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title ms-4 fs-xsm" id="modalInfoUsuarioLabel">Información de usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            title="Salir sin guardar" v-on:click="discardChanges()"></button>
                    </div>
                    <div class="modal-body row">
                        <div class="text-start m-auto ms-4 col-md-8">
                            <h3 class="text-green fs-med mb-4">Brandon Josue Brenes</h3>
                            <p class="fs-sm" id="nombre_usuario">@bran</p>
                            <p class="fs-sm" id="correo">brandon@gmail.com</p>
                            <p class="fs-sm">Recetas guardadas: <span id="numero de recetas">{{recetasColeccionadas.length}}</span></p>
                        </div>
                        <div class="foto-usuario-sm d-flex m-auto mt-4 col-sm-1">
                            <div class="foto-container">
                                <img v-bind:src="userPicturePreview" alt="foto usuario" id="foto_usuario">
                            </div>
                            <button type="button" class="card-btn-green btn-cambiar-foto" title="Cambiar foto">
                                <label for="archivo">
                                    <input type="file" id="archivo" @change="procesarArchivo" class="sr-only" accept="image/*">
                                    <i class="fa-solid fa-pen"></i>
                                    <!-- <i class="mb-1 ms-1 fa-regular fa-pen-to-square"></i> -->
                                </label>
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn button-green-sm m-auto" v-on:click="saveChanges()" data-bs-dismiss="modal" >Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal -->
    </section>
    <!-- Sección con la foto e info del usuario -->

    <!--Recetas guardadas-->
    <main class="container">
        <h2 class="text-center text-black">Recetas coleccionadas</h2>
        <div class="cards-container">
                <!-- Filtro por categorías -->
                <div class="dropdown d-flex justify-content-end">
                    <button class="card-btn-green me-3" type="button" title="Filtrar" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="ri-equalizer-line"></i>
                    </button>
                    <ul class="dropdown-menu fs-4">
                        <li v-for="category in categories" :key="category"><button class="dropdown-item"
                                type="button">{{
                                category }}</button></li>
                    </ul>
                </div>
                <!-- Fin filtro por categorías -->

                <div class="row">
                    <!-- Tarjetas recetas -->
                    <div v-for="recipeId in recetasColeccionadas" :key="recipeId" class="col-md-3 p-4">
                <recipe-card :id="recipeId" :saved="true"></recipe-card>
            </div>
                </div>
                <!-- Botones prev y next -->
                <div class="row justify-content-end mb-5">
                    <button class="card-btn-green me-3" type="button" title="Prev">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button class="card-btn-green me-4" type="button" title="Next">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <!-- Botones prev y next -->
            </div>
    </main>
    <!--Fin recetas guardadas-->
    `
});