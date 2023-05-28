const app = Vue.createApp({
    data() {
        return {
            categories: ["All"],
            selectedCategory: "All",
            recipesIds: [],//solo guarda el id de las recetas
            selectedId: "53058",
            recetasMasVotadas: [],
            recetasColeccionadas: ["52851", "53011", "52955", "52948", "52952", "52981", "52924", "52804", "53019", "52939"]
        }
    },
    mounted: function () {
        recipesIds= [];
        axios({
            method: 'get',
            url: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        })
            .then(
                (response) => {
                    let items = response.data.meals;

                    items.forEach(item => {
                        this.categories.push(item.strCategory);
                    });
                    //this.recipesIds.push(id);
                }
            )
            .catch(
                error => console.log(error)
            )

        for (let i = 0; i < 16; i++) {

            axios({
                method: 'get',
                url: 'https://www.themealdb.com/api/json/v1/1/random.php'
            })
                .then(
                    (response) => {
                        let id = response.data.meals[0].idMeal;
                        this.recipesIds.push(id);
                    }
                )
                .catch(
                    error => console.log(error)
                )
        }
    }
})

const emitter = mitt();
app.config.globalProperties.$test = emitter;