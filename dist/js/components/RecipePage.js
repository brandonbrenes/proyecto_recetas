app.component("recipe-page", {
    data() {
        return {
            recipeId: "",
            likes_number: 0,
            image: "",
            category: "",
            name: "",
            instructions: "",
            ingredients: ""
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.recipeId = urlParams.get('id');
        this.fetchRecipe();
    },
    methods: {
        fetchRecipe() {
            // Realiza la petición HTTP para obtener los detalles de la receta
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.recipeId)
                .then(response => {
                    // Actualiza los datos de la receta en el componente
                    let recipe = response.data.meals[0];
                    this.$data.image = recipe.strMealThumb;
                    this.$data.category = recipe.strCategory;
                    this.$data.name = recipe.strMeal;
                    this.$data.instructions = recipe.strInstructions;

                    let ingredientsList = "";
                    for (let i = 1; i <= 20; i++) {
                        if (recipe["strIngredient" + i] != "" && recipe["strIngredient" + i] != null) {
                            ingredientsList += recipe["strMeasure" + i] + " - " + recipe["strIngredient" + i] + "\n";
                        }
                    }
                    this.$data.ingredients = ingredientsList;
                })
                .catch(error => console.log(error));
        }
    },
    template:
    /*html */
    `<!-- Fin header -->
    <header class="container">
    <!-- Inicio nav -->
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand me-4" href="index.html">
            <img src="images/logo.svg" alt="logo" width="100">
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./registro.html">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./login.html">Login</a>
                </li>
                <li class="cuadro-seleccion"></li>
            </ul>
            <div class="d-flex m-2">
                <form class="d-flex" role="search">
                    <div class=" dropdown m-auto">
                        <a class="nav-link dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            filtro
                        </a>
                        <ul class="dropdown-menu fs-4">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <input class="form-control me-2 search-bar fs-4" type="search" placeholder="Buscar"
                        aria-label="Search">
                    <button class="button-green-rouded" type="submit" title="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                <a class="button-white-rouded p-md-2 pt-2" type="button" href="perfil-usuario.html" title="perfil">
                    <i class="fa-solid fa-user"></i>
                </a>
            </div>
        </div>
    </nav>
    <!-- Fin nav -->
</header>
<!-- Fin header --><section class="container">
      <div class="d-flex justify-content-center row">
        <h1 class="container text-green text-center text-flex">{{ name }}</h1>
        <div class="img-container">
          <div class="img-receta">
            <img :src="image" alt="Imagen receta">
          </div>
          <div class="botones-receta">
            <div class="d-grid">
              <button type="button" class="card-btn-green button-border mb-4" title="Guardar">
                <i class="far fa-bookmark"></i>
              </button>
              <button type="button" class="card-btn-green button-border" title="Like">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
          <div class="botones-receta">
            <div class="d-grid">
              <button type="button" class="card-btn-green button-border mb-4" title="Like">
                <i class="far fa-bookmark"></i>
              </button>
              <button type="button" class="card-btn-green button-border" title="Like">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="cuadros-container">
      <div class="container">
        <section class="mb-5">
          <h2 class="text-green text-center mb-4">Ingredientes</h2>
          <div class="cuadro-texto">
            <p>{{ ingredients }}</p>
          </div>
        </section>
        <section class="mt-5 mb-5">
          <h2 class="text-green text-center mb-4">Instrucciones</h2>
          <div class="cuadro-texto">
            <p>{{ instructions }}</p>
          </div>
        </section>
      </div>

      <!-- inicio fin footer -->
      <footer>
        <div class="container d-flex justify-content-center">
          <ul class="row">
            <li class="col">
              <a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button" title="Facebook" class="button-white-rouded p-md-2 pt-2">
                <i class="fab fa-facebook-f min-w-20 text-center"></i>
              </a>
            </li>
            <li class="col">
              <a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button" title="Youtube" class="button-white-rouded p-md-2 pt-2">
                <i class="fab fa-youtube min-w-20 text-center"></i>
              </a>
            </li>
            <li class="col">
              <a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button" title="Instagram" class="button-white-rouded p-md-2 pt-2">
                <i class="fab fa-instagram min-w-20 text-center"> </i>
              </a>
            </li>
            <li class="col">
              <a href="https://github.com/brandonbrenes/proyecto_recetas.git" type="button" title="Twitter" class="button-white-rouded p-md-2 pt-2 me-4">
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
    </div>
  `
});