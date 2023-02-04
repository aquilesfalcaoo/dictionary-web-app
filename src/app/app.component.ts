import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showDropdown = () => {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown?.classList.toggle('active');
  };
}
