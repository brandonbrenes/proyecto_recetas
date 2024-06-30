app.component("user-profile", {
    props: ["categories"],
    data() {
        return {
            loading: false,
            userId: "",
            name: "",
            country: "",
            email: "",
            userPicture: "images/IMG_20210408_013058.jpg",
            userPicturePreview: "images/IMG_20210408_013058.jpg",
            savedRecipes: [],
            pageNumber: 1,
            numberOfRecipes: 0,
            isButtonPrevDisabled:true,
            isButtonNextDisabled:true
        }
    },

    mounted() {
        this.findUserData();
    },
    methods: {
        findUserData() {
            let token = localStorage.getItem('accessToken');
            let id = localStorage.getItem('userId');

            if (id === null || typeof id === 'undefined' || token === null || typeof token === 'undefined') {
                // No hay datos para la clave 'clave'
                Swal.fire({
                    title: 'Error!',
                    text: 'El usuario no se encuentra logeado',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = 'login.html';
                });
            } else {
                this.name = localStorage.getItem('name') + " " + localStorage.getItem('last_name');
                this.country = localStorage.getItem('country');
                this.email = localStorage.getItem('email');
                this.userId= id;

                this.fetchRecipes(this.userId);

                this.loading = true;
            }
        },

        fetchRecipes: function (user_id) {
            axios({
                method: 'get',
                url: "http://primer-proyecto.test/api/users/savedrecipes/" + user_id
            })
                .then(
                    (response) => {
                        // this.numberOfRecipes = response.data.length;

                        if (Array.isArray(response.data)) { // Verifica si es un arreglo

                            this.numberOfRecipes = response.data.length;

                            if(this.numberOfRecipes>16 && this.pageNumber<Math.ceil(this.numberOfRecipes/16)){
                                this.isButtonNextDisabled=false;
                            }
                            let numero = 16 * (this.pageNumber - 1);

                            this.savedRecipes = [];
                            for (numero; numero < 16 * this.pageNumber && numero < response.data.length; numero++) {

                                let recipe = response.data[numero];

                                this.savedRecipes.push({
                                    id: recipe.id,
                                    name: recipe.name,
                                    image: "http://localhost/primer-proyecto/public/storage/imgs/" + recipe.image,
                                    description: recipe.description,
                                    category: recipe.category,
                                    likes: recipe.likes
                                });
                            }
                        }
                    }
                )
                .catch(
                    error => console.log(error)
                )
        },

        mostrarImagen: function (event) {
            let imagenSource = event.target.result;
            this.userPicturePreview = imagenSource;
        },
        procesarArchivo: function (event) {
            let imagen = event.target.files[0];
            let lector = new FileReader();

            lector.addEventListener('load', this.mostrarImagen, false);

            lector.readAsDataURL(imagen);
        },
        saveChanges: function () {
            this.userPicture = this.userPicturePreview;
        },
        discardChanges: function () {
            this.userPicturePreview = this.userPicture;
        },
        onClickPrev() {
            if(this.pageNumber>1){
                this.pageNumber--;
                this.fetchRecipes(this.userId);

                this.isButtonNextDisabled=false;
                if(this.pageNumber<=1){
                    this.isButtonPrevDisabled=true;
                }
            }
        },
        onClickNext() {
            if(this.pageNumber<Math.ceil(this.numberOfRecipes/16)){
                this.pageNumber++;
                this.fetchRecipes(this.userId);

                this.isButtonPrevDisabled=false;
                if(this.pageNumber>=Math.ceil(this.numberOfRecipes/16)){
                    this.isButtonNextDisabled=true;
                }
            }
        }
    },
    template:
        /*html*/
        `
    <!-- Sección con la foto e info del usuario -->
    <div v-if="loading">
        <section class="mt-xl-5 text-center">
        <div class="d-flex flex-column align-items-center">
            <h1>{{name}}</h1>
            <h3 class="fs-sm text-white">{{email}}</h3>
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
        <!-- Inicio Modal para modificar datos del usuario -->
        <div class="modal fade" id="modalInfoUsuario" tabindex="-1" aria-labelledby="modalInfoUsuarioLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title ms-4 fs-xsm" id="modalInfoUsuarioLabel">Información de usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            title="Salir sin guardar" v-on:click="discardChanges()">
                        </button>
                    </div>
                    <div class="modal-body row">
                        <div class="text-start m-auto ms-4 col-md-8">
                            <h3 class="text-green fs-med mb-4">{{name}}</h3>
                            <p class="fs-sm"> Correo: {{email}}</p>
                            <p class="fs-sm"> Pais: {{country}}</p>
                            <p class="fs-sm">Recetas guardadas: <span id="numero de recetas">{{savedRecipes.length}}</span></p>
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

        <div v-if="savedRecipes.length>0" class="cards-container">
            <!-- Filtro por categorías -->
            <!--<div class="dropdown d-flex justify-content-end">
                <button class="card-btn-green me-3" type="button" title="Filtrar" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ri-equalizer-line"></i>
                </button>
                <ul class="dropdown-menu fs-4">
                    <li v-for="category in categories" :key="category">
                        <button class="dropdown-item"
                                type="button">{{category}}
                        </button>
                    </li>
                </ul>
            </div>-->
            <!-- Fin filtro por categorías -->

            <div class="row">
                <!-- Tarjetas recetas -->
                <div v-for="recipe in savedRecipes" class="col-md-3 p-4">
                    <recipe-card :id="recipe.id" :name="recipe.name" :image="recipe.image" :description="recipe.description" :category="recipe.category" :likes="recipe.likes" :saved="true"></recipe-card>
                </div>
            </div>
            <!-- Botones prev y next -->
            <div class="row justify-content-end mb-5">
            <div class="col-auto">
                <button :class="{ 'card-btn-green': true, 'disabled': isButtonPrevDisabled }" v-bind:disabled="isButtonPrevDisabled" v-on:click="onClickPrev" type="button" title="Prev">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
            <div class="col-auto align-self-center">
                <p class="fs-sm">{{pageNumber}}</p>
            </div>
            <div class="col-auto">
                <button :class="{ 'card-btn-green': true, 'disabled': isButtonNextDisabled }" v-bind:disabled="isButtonNextDisabled" v-on:click="onClickNext" class="me-4" type="button" title="Next">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        <!-- Botones prev y next -->
        </div>
        <h3 v-else class="fs-med text-center text-wine" style="margin-top:10rem; margin-bottom: 10rem;">No hay recetas coleccionadas</h3>

    </main>
    <!--Fin recetas guardadas-->

    <!-- inicio fin footer -->
    <footer>
        <div class="container d-flex justify-content-center">
            <ul class="row">
                <li class="col"><a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button"
                        title="Facebook" class="button-white-rouded p-md-2 pt-2">
                        <i class="fab fa-facebook-f min-w-20 text-center"></i>
                    </a>
                </li>
                <li class="col"><a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button"
                        title="Youtube" class="button-white-rouded p-md-2 pt-2">
                        <i class="fab fa-youtube min-w-20 text-center"></i>
                    </a>
                </li>
                <li class="col"><a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button"
                        title="Instagram" class="button-white-rouded p-md-2 pt-2">
                        <i class="fab fa-instagram min-w-20 text-center"> </i>
                    </a>
                </li>
                <li class="col"><a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button"
                        title="Twitter" class="button-white-rouded p-md-2 pt-2 me-4">
                        <i class="fab fa-twitter min-w-20 text-center"> </i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="text-center text-white">
            ©2023 Copyright:
            <a class="text-white" href="https://github.com/brandonbrenes/proyecto_recetas.git">Brandon Brenes</a>
        </div>
    </footer>
<!-- fin footer -->
    </div>
    
    `
});