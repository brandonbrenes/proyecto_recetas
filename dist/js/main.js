const app = Vue.createApp({
    data() {
        return {
            categories: ["All"],
            selectedCategory: "All",
            recipes: [],//solo guarda el id de las recetas
            top10: []
        }
    },
    beforeMount() {
        this.fetchTop10();
        this.fetchCategories();
        this.fetchRecipes();
    },
    methods: {
        fetchCategories() {
            axios({
                method: 'get',
                url: 'http://primer-proyecto.test/api/recipes/categories'
            })
                .then(
                    (response) => {
                        let items = response.data;

                        items.forEach(item => {
                            this.categories.push(item.category);
                        });
                    }
                )
                .catch(
                    error => console.log(error)
                )
        },
        fetchRecipes: function () {
            recipes = [];

                axios({
                    method: 'get',
                    url: "http://primer-proyecto.test/api/recipes/all"
                })
                .then(
                    (response) => {
                        
                        for (let numero = 0; numero < 16; numero++) {
                            
                            let recipe = response.data[numero];

                            this.recipes.push({
                                id: recipe.id,
                                name: recipe.name,
                                image: "http://localhost/primer-proyecto/public/storage/imgs/"+recipe.image,
                                description: recipe.description, 
                                category: recipe.category,
                                likes: recipe.likes
                            });
                        }
                    }
                )
                .catch(
                    error => console.log(error)
                )
        },
        fetchTop10: function () {
            axios({
                method: 'get',
                url: "http://primer-proyecto.test/api/recipes/top10"
            })
            .then(
                (response) => {
                    for (let numero = 0; numero < 10; numero++) {
                        let recipe = response.data[numero];
                        this.top10.push({
                            id: recipe.id,
                            name: recipe.name,
                            image: "http://localhost/primer-proyecto/public/storage/imgs/"+recipe.image,
                            description: recipe.description, 
                            category: recipe.category,
                            likes: recipe.likes
                        });
                    }
                    
                    
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