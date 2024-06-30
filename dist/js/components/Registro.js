app.component("registro", {
    data() {
        return {
            name: "",
            last_name:"",
            email: "",
            password: "",
            country: "",
          message: ""
        }
    },methods: {
        submitForm() {          
          const data = {
            name: this.name,
            last_name:this.last_name,
            email: this.email,
            password: this.password,
            country: this.country,
          };

          axios.post("http://primer-proyecto.test/api/users/register", data)
            .then(response => {

              if(response.data.code === 200){
    
                Swal.fire({
                  title: "El usuario ha sido registrado exitosamente",
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
                
              }else{

                console.log(response);
                Swal.fire({
                    title: 'Error!',
                    text: 'No se registró el usuario',
                    icon: 'error'
                  })
              }
            })
            .catch(error => {
              console.error(error);
              Swal.fire({
                title: 'Error!',
                text: 'No se registró el usuario',
                icon: 'error'
              })
            });
        }
    },
    template:
    /*html*/
    `
    <div class="container">
        <div class="row mt-5">
            <div class="m-auto col-md-6">
                <section>
                    <h1>Registro</h1>
                            <form class="needs-validation" @submit.prevent="submitForm">
                                <div class="form-group was-validated mt-5 mb-3">
    
                                </div>
                                <div class="form-group was-validated mt-5 mb-3">
                                    <input class="form-control" id="name" v-model="name" placeholder="Nombre" required>
                                </div>

                                <div class="form-group was-validated mt-5 mb-3">
                                    <input class="form-control" id="last_name"  v-model="last_name" placeholder="Apellido" required>
                                </div>

                                <div class="form-group was-validated mt-5 mb-3">
                                    <input class="form-control" type="email" v-model="email" id="email" placeholder="Correo electrónico"
                                        required>
                                </div>

                                <div class="form-group was-validated mt-5 mb-3">
                                    <input class="form-control" id="country" v-model="country" placeholder="Pais" required>
                                </div>
    
                                <div class="form-group was-validated mt-5 mb-3">
                                    <input class="form-control" type="password" id="password" v-model="password" placeholder="Contraseña"
                                        required>
                                </div>
    
                                <div class="mb-3 mt-3">
                                    <a class="text-wine me-5" href="registro.html">Login</a>
                                    <a class="text-wine" href="recuperar-password.html">Recuperar contraseña</a>
                                </div>
                                <input class="button-green" type="submit" value="Registrarse" id="registrarse" href="index.html">
                            </form>
                </section>
            </div>
            <div class="col-md-6">
                <img class="img-fluid" src="images/Spaghetti.png" alt="Spaguetti">
            </div>
        </div>
    </div>
    `
})