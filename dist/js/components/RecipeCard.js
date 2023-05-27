app.component("recipe-card", {
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
            description: "Short descripción"
        }
    },
    mounted() {
        axios({
            method: 'get',
            url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.id
        })
            .then(
                (response) => {
                    //console.log(response.data);

                    let receta = response.data.meals[0];

                    this.image = receta.strMealThumb;
                    this.category = receta.strCategory;
                    this.name = receta.strMeal;
                }
            )
            .catch(
                error => console.log(error)
            );

    },
    methods:{
        onClicKViewRecipe() {
            this.$emit('recipedetails', this.id);
        }
    },
    template:
        /*html*/
        `<div class="card rounded-5 shadow-lg">
            <div class="card-img-container">
            <a href="receta.html" v-on:recipedetails="onClicRecipeDetails()"><img v-bind:src="image" class="rounded-top-5" alt="Imagen de la receta"></a>
            </div>
            <div class="card-body ">
                <h4 class="card-subtitle mb-2 text-muted">{{category}}</h4>
                <h3 class="card-title">{{name}}</h3>
                <p class="card-text">{{description}}</p>

                <div>
                    <div class="likes-number">
                        <p>{{likes_number}}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between p-4 pt-3 pb-3">
                        <button type="button" class="card-btn-green" title="Like">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button type="button" class="card-btn-green justify-content-center" title="Like">
                            <i class="far fa-bookmark"></i>
                        </button>
                        <button type="button" class="card-btn-green justify-content-end" title="Ver más">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`,
});