import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['Metal Gear', Validators.required],
        ['Final Fantasy', Validators.required]
      ],
      Validators.minLength(2)
    ),
  });

  newFavorite = this.formBuilder.control('', Validators.required);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.formBuilder.control( newGame, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number){
    this.favoriteGames.removeAt(index);
  }
  // newFavorite = new FormControl('', Validators.required):

  // isValidFieldInArray(formArray: FormArray, index: number){
  //   return (
  //     formArray.controls[index].errors && formArray.controls[index].touched
  //   );
  // }
}
