app.component("recipe-page", {
  data() {
    return {
      isLiked: false,
      isSaved: false,
      recipeId: "",
      likes_number: 10,
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
    fetchRecipe() {axios.get('http://primer-proyecto.test/api/recipes/recipe/' + this.recipeId)
        .then(response => {
          let recipe = response.data[0][0];

          this.image = "http://localhost/primer-proyecto/public/storage/imgs/"+recipe.image;
          this.category = recipe.category;
          this.name = recipe.name;
          this.likes_number= recipe.likes;
          this.instructions = recipe.preparation_instructions
          ;

          let ingredientsArray= response.data[1];
          let ingredientText = '';

          ingredientsArray.forEach((ingredient) => {
            const { description, amount, measurement_unit } = ingredient;
            const ingredientString = `${amount} ${measurement_unit} ${description}`;
            ingredientText += `${ingredientString}\n`;
          });

          this.ingredients = ingredientText;
        })
        .catch(error => console.log(error));
    },
    onClickLike() {
      if (this.isLiked) {
        this.likes_number--;
        this.isLiked = false;
      } else {
        this.likes_number++;
        this.isLiked = true;
      }
    },
    onClickSave() {
      if (this.isSaved) {
        this.isSaved = false;
      } else {
        this.isSaved = true;
      }
    }
  },
  template:
    /*html */
    `<section class="container">
      <div class="d-flex justify-content-center row">
        <h1 class="container text-green text-center text-flex">{{ name }}</h1>
        <div class="img-container">
          <div class="img-receta">
            <img :src="image" alt="Imagen receta">
          </div>
          <div class="botones-receta">
            <div class="d-grid">
              <button type="button" class="card-btn-green button-border mb-4" v-bind:class="{ 'active': isSaved }" v-on:click="onClickSave()" title="Guardar receta">
                <i class="fas fa-bookmark"></i>
              </button>
              <button type="button" class="card-btn-green button-border mb-2" v-bind:class="{ 'active': isLiked }" v-on:click="onClickLike()" title="Like">
                <i class="fas fa-heart"></i>
              </button>
              <p class="text-center text-light">{{likes_number}}</p>
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