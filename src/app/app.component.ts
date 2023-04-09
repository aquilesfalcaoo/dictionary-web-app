import { DictionaryService } from './service/dictionary.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Dictionary } from './models/dictionary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public word$ = new BehaviorSubject<any>([]);
  public dictionary!: Dictionary;
  public form = new FormGroup({
    word: new FormControl('', Validators.required),
  });
  public showNotFoundContent: boolean = false;

  constructor(private service: DictionaryService) { }

  public showDropdown = () => {
    const dropdown = document.querySelector('.dropdown-content');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  };

  public toggleTheme = () => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.toggle('black-theme');
    }
  };

  public playAudio = () => {
    const playSound = document.getElementById('word-audio') as HTMLMediaElement;
    playSound.play();
  }

  public searchWordOnClick() {
    this.searchWord();
  }

  public searchWord = (event: KeyboardEvent | null = null) => {
    if (event && event.key !== 'Enter') return;
    const wordControl = this.form.get('word');
    let typedWord: string | undefined;
    if (wordControl instanceof AbstractControl) {
      typedWord = wordControl.value !== null ? wordControl.value : undefined;
    }
    this.service.search(typedWord ?? '')
      .pipe(
        catchError(() => {
          this.showNotFoundContent = true;
          return of([]);
        })
      )
      .subscribe(res => {
        this.word$.next(res);
        console.log(this.word$);
      });
  };
}
