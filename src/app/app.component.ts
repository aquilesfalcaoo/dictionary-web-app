import { DictionaryService } from './service/dictionary.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public subscription: Subscription = new Subscription();
  public form = new FormGroup({
    word: new FormControl('', Validators.required),
  });

  constructor(private service: DictionaryService) {}

  public showDropdown = () => {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown?.classList.toggle('active');
  };

  public toggleTheme = () => {
    const body = document.querySelector('body');
    body?.classList.toggle('black-theme');
  };

  public searchWord = () => {
    const typedWord: any = this.form.get('word')?.value;
    this.subscription = this.service.search(typedWord).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => console.log('Observable completado.'),
    });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
