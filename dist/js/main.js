const app = Vue.createApp({
    data() {
        return {
            selectedId: "53058",
            recipesIds: [],//solo guarda el id de las recetas
            recetasColeccionadas: []
        }
    },
    mounted: function() {
        for(let i=0; i<16; i++){

            axios({
                method: 'get',
                url: 'https://www.themealdb.com/api/json/v1/1/random.php'
            })
            .then(
                (response) => {
                    let id= response.data.meals[0].idMeal;
                    this.recipesIds.push(id);
                }
            )
            .catch(
                error => console.log(error)
            )
        }
    }, methods:{
        onclickRecipeDetails(id){
            alert(id);
        }
    }
})

const emitter = mitt();
app.config.globalProperties.$test = emitter;
//app.config.globalProperties.$eventBus = emitter;
app.use(router);