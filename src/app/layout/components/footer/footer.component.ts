import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <ul>
          <li><i class="fab fa-whatsapp"></i></li>
          <li><i class="fab fa-linkedin"></i></li>
          <li><i class="fab fa-facebook"></i></li>
      </ul>
      &copy; Derechos reservados
    </footer>
  `,
  styles: `
    
  `
})
export class FooterComponent {

}
