import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section id="profile">
      <div>
          <img src="avatar.jpg" alt="avatar" />
          <p>Hola Juan!</p>
      </div>
      <div>
          <h2>20</h2>
          seguidores
      </div>
      <div>
          <h2>5</h2>
          publicaciones
      </div>
      <div>
          <h2>100</h2>
          solicitudes
      </div>
    </section>
    <section id="gallery">
        <ul>
            <li><img src="image1.jpg" alt="photo"></li>
            <li><img src="image2.jpg" alt="photo"></li>
            <li><img src="image3.jpg" alt="photo"></li>
            <li><img src="image4.jpg" alt="photo"></li>
            <li><img src="image5.jpg" alt="photo"></li>
            <li><img src="image6.jpg" alt="photo"></li>
            <li><img src="image7.jpg" alt="photo"></li>
            <li><img src="image8.jpg" alt="photo"></li>
            <li><img src="image9.jpg" alt="photo"></li>
            <li><img src="image10.jpg" alt="photo"></li>
        </ul>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
