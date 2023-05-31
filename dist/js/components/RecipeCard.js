app.component("recipe-card", {
    props: {
        id: {
            type: String
        },
        cardType: {
            type: String,
            default: "standard card"
        },
        liked: {
            type: Boolean,
            default: false
        },
        saved: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isLiked: this.liked,
            isSaved: this.saved,
            likes_number: 0,
            image: "",
            category: "",
            name: "",
            description: "Esta descripción es muy larga para hacer la prueba"
        }
    },
    mounted() {
        axios({
            method: 'get',
            url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.id
        })
            .then((response) => {
                let receta = response.data.meals[0];

                this.image = receta.strMealThumb;
                this.category = receta.strCategory;
                this.name = receta.strMeal;
            })
            .catch(error => console.log(error));

    },
    methods: {
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
        /*html*/
        `<div v-if="cardType == 'standard card'" class="card rounded-5 shadow-lg">
            <div class="card-img-container">
              <a :href="'receta.html?id=' + id"><img v-bind:src="image" class="rounded-top-5" alt="Imagen de la receta"></a>
            </div>
            <div class="card-body">
              <h4 class="card-subtitle mb-2 text-muted">{{category}}</h4>
              <div class="card-header">
                <h3 class="card-title">{{name}}</h3>
                <p class="card-text">{{description}}</p>
              </div>
              <div>
                <div class="likes-number">
                  <p>{{likes_number}}</p>
                </div>
                <div class="card-footer d-flex justify-content-between p-4 pt-3 pb-2">
                  <button type="button" class="card-btn-green" v-bind:class="{ 'active': isLiked }" title="Like" v-on:click="onClickLike()">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button type="button" class="card-btn-green justify-content-center" v-bind:class="{ 'active': isSaved }" title="Save" v-on:click="onClickSave()">
                    <i class="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <a v-else-if="cardType === 'slider card'" :href="'receta.html?id=' + id" class="swiper-slide tranding-slide">
            <div class="tranding-slide-img">
                <img v-bind:src="image">
            </div>
            <div class="tranding-slide-content">
                <div class="tranding-slide-content-bottom">
                    <h2 class="food-name">
                        {{name}}
                    </h2>
                    <h3 class="food-rating">
                        <span>{{category}}</span>
                    </h3>
                </div>
            </div>
        </a>`
        ,
});