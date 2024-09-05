import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    @if (true) {
      <header>
          <h1>InstaPic</h1>
      </header>
    }
    @else {
      <header>
        <nav>
            <h1>InstaPic</h1>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="">Subir fotos</a></li>
                <li><a href="">Buscar</a></li>
                <li><a href="index.html">Cerrar sesión</a></li>
            </ul>
        </nav>
    </header>
    }
  `,
  styles: `
    header {
      background-color: #219edc;
      color: white;
      padding: 15px;
      text-align: center;
      border-radius: 10px;
      margin-bottom: 5px;
    }

    nav{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  nav a{
      text-decoration: none;
      color: white;
  }

  nav a:hover{
      color: #023047;
  }


  nav ul {
      display: flex;
      gap: 50px;
  }

  ul{
      list-style: none;
      padding: 0;
  }

  @media (max-width: 650px) {
    #profile {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    nav ul{
        gap: 20px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    nav ul li {
        margin: 10px 0;
        text-align: center;
    }
}

@media (max-width: 490px) {
    #profile {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        text-align: center;
    }
    #profile h2, p{
        margin: 0;
    }
}
  `
})
export class HeaderComponent {

}
