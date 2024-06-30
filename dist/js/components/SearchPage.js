app.component("search", {
    props: ["categories"],
    data() {
        return {
            searchString: "",
            recipesFounds: [],
            message: ""
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.searchString = urlParams.get('searchString');
        this.searchRecipes();
    },
    methods: {
        searchRecipes() {
            // Realiza la petición HTTP para obtener los detalles de la receta
            axios.get('http://primer-proyecto.test/api/recipes/searchbyname/' + this.searchString)
                .then(response => {
                    let recipes = response.data;

                    if (Array.isArray(recipes)) { // Verifica si es un arreglo
                        recipes.forEach(recipe => {
                          this.recipesFounds.push({
                            id: recipe.id,
                            name: recipe.name,
                            image: "http://localhost/primer-proyecto/public/storage/imgs/" + recipe.image,
                            description: recipe.description,
                            category: recipe.category,
                            likes: recipe.likes
                          });
                        });
                    }else{
                        this.message=response.data.message;
                        console.log(this.message);
                    }
                })
                .catch(error => console.log(error));
        }
    }, template:
    /*html */`
    <section class="container">
    <h2 class="text-center text-black mt-5">Resultados de {{searchString}}: {{recipesFounds.length}}</h2>

    <div v-if="recipesFounds.length > 0" class="cards-container">
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
            <div v-for="recipe in recipesFounds" :key="recipe" class="col-md-3 p-4">
                <recipe-card :id="recipe.id" :id="recipe.id" :name="recipe.name" :image="recipe.image" :category="recipe.category" :likes="recipe.likes"></recipe-card>
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
    <div v-else-if="message != ''" class="text-center mt-5 mb-5">
        <img src="images/lupa_triste.svg" class="img-fluid" alt="Lupa triste" style="max-height: 40rem;">
        <h2 class="text-center text-black mt-4 mb-5">{{message}}</h2>
    </div>  
</section>
    `
})