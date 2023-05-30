app.component("nav-var", {
    props: ["categories"],
    template:
        /*html*/
        `<nav class="navbar navbar-expand-lg">
        <a class="navbar-brand me-4" href="index.html">
            <img src="images/logo.svg" alt="logo" width="100">
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./registro.html">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./login.html">Login</a>
                </li>
                <li class="cuadro-seleccion"></li>
            </ul>
            <div class="d-flex m-2">
                <form class="d-flex" role="search">
                    <div class=" dropdown m-auto">
                        <a class="nav-link dropdown-toggle me-3" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            filtro
                        </a>
                        <ul class="dropdown-menu fs-4">
                            <li v-for="category in categories" :key="category" class="dropdown-item">{{ category }}
                            </li>
                        </ul>
                    </div>
                    <input class="form-control me-2 search-bar fs-4" type="search" placeholder="Buscar"
                        aria-label="Search">
                    <button class="button-green-rouded" type="submit" title="search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                <a class="button-white-rouded p-md-2 pt-2" type="button" href="perfil-usuario.html" title="perfil">
                    <i class="fa-solid fa-user"></i>
                </a>
            </div>
        </div>
    </nav>`

})