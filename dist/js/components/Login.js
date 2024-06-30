app.component("login", {
    data() {
        return {
          email: "",
          password: "",
          message: ""
        }
    },methods: {
        submitForm() {          
          const data = {
            email: this.email,
            password: this.password
          };

          axios.post("http://primer-proyecto.test/api/users/login", data)
            .then(response => {

              if(response.data.code === 200){
                this.message= response.data.message;

                localStorage.setItem('accessToken', response.data.accessToken);

                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('last_name', response.data.user.last_name);
                localStorage.setItem('country', response.data.user.country);
                localStorage.setItem('email', response.data.user.email);
    
                Swal.fire({
                  title: this.message,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then(() => {
                  window.location.href = 'perfil-usuario.html';
                });
                
              }else{

              }
            })
            .catch(error => {
              console.error(error);
              Swal.fire({
                title: 'Error!',
                text: 'No se logeo el usuario',
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
                    <h1>Login</h1>
                    <form class="needs-validation" @submit.prevent="submitForm">
                        <div class="form-group was-validated">
                        <input class="form-control" type="email" v-model="email" placeholder="Correo electrónico" required>
                        </div>
                        <div class="form-group was-validated mt-5 mb-3">
                        <input class="form-control" type="password" v-model="password" placeholder="Contraseña" required>
                        </div>

                        <div class="mb-3 mt-3">
                        <a class="text-wine me-5" href="registro.html">Registrarse</a>
                        <a class="text-wine" href="recuperar-password.html">Recuperar contraseña</a>
                        </div>

                        <input class="button-green" type="submit" value="Ingresar" href="index.html">
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