app.component("search", {
    props: ["categories"],
    data() {
        return {
            searchString: "",
            searchRecipesIds: []
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
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.searchString)
                .then(response => {
                    let recipes = response.data.meals;

                    console.log(recipes)
                    recipes.forEach(recipe => {
                        this.searchRecipesIds.push(recipe.idMeal);
                        console.log(recipe);
                    });
                })
                .catch(error => console.log(error));
        }
    }, template:
    /*html */`
    <section class="container">
    <h2 class="text-center text-black mt-5">Resultados: {{searchString}}</h2>

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
            <div v-for="recipeId in searchRecipesIds" :key="recipeId" class="col-md-3 p-4">
                <recipe-card v-bind:id="recipeId"></recipe-card>
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
</section>
    `
})