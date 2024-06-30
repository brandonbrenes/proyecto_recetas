const app = Vue.createApp({
    data() {
        return {
            categories: ["All"],
            selectedCategory: "All",
            recipes: [],//solo guarda el id de las recetas
            pageNumber: 1,
            numberOfRecipes: 0,
            isButtonPrevDisabled:true,
            isButtonNextDisabled:true
        }
    },
    beforeMount() {
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
            axios({
                method: 'get',
                url: "http://primer-proyecto.test/api/recipes/all"
            })
                .then(
                    (response) => {
                        this.numberOfRecipes = response.data.length;

                        if(this.numberOfRecipes>16 && this.pageNumber<Math.ceil(this.numberOfRecipes/16)){
                            this.isButtonNextDisabled=false;
                        }

                        let numero = 16 * (this.pageNumber - 1);

                        this.recipes=[];
                        for (numero; numero < 16 * this.pageNumber && numero < response.data.length; numero++) {

                            let recipe = response.data[numero];

                            this.recipes.push({
                                id: recipe.id,
                                name: recipe.name,
                                image: "http://localhost/primer-proyecto/public/storage/imgs/" + recipe.image,
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
        onClickPrev() {
            if(this.pageNumber>1){
                this.pageNumber--;
                this.fetchRecipes();

                this.isButtonNextDisabled=false;
                if(this.pageNumber<=1){
                    this.isButtonPrevDisabled=true;
                }
            }
        },
        onClickNext() {
            if(this.pageNumber<Math.ceil(this.numberOfRecipes/16)){
                this.pageNumber++;
                this.fetchRecipes();

                this.isButtonPrevDisabled=false;
                if(this.pageNumber>=Math.ceil(this.numberOfRecipes/16)){
                    this.isButtonNextDisabled=true;
                }
            }
        }
    }
})

// const datos = [
//     { nombre: 'Receta 1', ocasiones: ['cumpleaños', 'navidad'], categorias: ['postres', 'cenas'], dificultad: 'fácil' },
//     { nombre: 'Receta 2', ocasiones: ['navidad', 'día de la madre'], categorias: ['bebidas', 'desayuno'], dificultad: 'intermedio' },
//     // Aquí puedes agregar más datos de recetas
//   ];
  
//   function toggleOpciones(id) {
//     const opcionesDiv = document.getElementById(id);
//     opcionesDiv.style.display = opcionesDiv.style.display === 'none' ? 'block' : 'none';
//   }
  
//   function filtrar(opcion, valor) {
//     const resultados = datos.filter(receta => receta[opcion].includes(valor));
//     mostrarResultados(resultados);
//   }
  
//   function mostrarResultados(resultados) {
//     const resultadosDiv = document.getElementById('resultados');
//     resultadosDiv.innerHTML = '';
  
//     resultados.forEach(receta => {
//       const recetaDiv = document.createElement('div');
//       recetaDiv.textContent = receta.nombre;
//       resultadosDiv.appendChild(recetaDiv);
//     });
//   }

const emitter = mitt();
app.config.globalProperties.$test = emitter;