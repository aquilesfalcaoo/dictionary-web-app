import { DictionaryService } from './service/dictionary.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    word: new FormControl('', Validators.required),
  });

  constructor(private service: DictionaryService) {}

  showDropdown = () => {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown?.classList.toggle('active');
  };

  searchWord = () => {
    const typedWord: any = this.form.get('word')?.value;
    this.service.search(typedWord).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (errorMessage: HttpErrorResponse) => console.error(errorMessage),
      complete: () => console.log('Observable completado.'),
    });
  };
}
