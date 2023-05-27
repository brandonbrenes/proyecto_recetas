app.component('recipe-page', {
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            likes_number: 0,
            image: "",
            category: "",
            name: "",
            instructions: "",
            ingredients: ""
        }
    },
    mounted() {
      this.fetchRecipe();
    },
    methods: {
      fetchRecipe() {
        // Realiza la petición HTTP para obtener los detalles de la receta
        axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.id)
          .then(response => {
            // Actualiza los datos de la receta en el componente
            let recipe = response.data.meals[0];
            this.image = recipe.strMealThumb;
            this.category = recipe.strCategory;
            this.name = recipe.strMeal;
            this.instructions = recipe.strInstructions;
  
            let ingredientsList = "";
            for (let i = 1; i <= 20; i++) {
              if (recipe["strIngredient" + i] != "" && recipe["strIngredient" + i] != null) {
                ingredientsList += recipe["strMeasure" + i] + " - " + recipe["strIngredient" + i] + "\n";
              }
            }
            this.ingredients = ingredientsList;
          })
          .catch(error => console.log(error));
      }
    },
    template:
        /*html*/
        `<section class="container">
        <div class="d-flex justify-content-center row">
            <h1 class="container text-green text-center text-flex">{{name}}</h1>
            <div class="img-container">
                <div class="img-receta">
                    <img v-bind:src="image" alt="Imagen receta">
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
                    <p>{{ingredients}}</p>
                </div>
            </section>
            <section class="mt-5 mb-5">
                <h2 class="text-green text-center mb-4">Instrucciones</h2>
                <div class="cuadro-texto">
                    <p>{{instructions}}</p>
                </div>
            </section>
        </div>

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
                <a class="text-white" href="https://github.com/brandonbrenes/proyecto_recetas.git">Brandon
                    Brenes</a>
            </div>
        </footer>
    </div>`,
});