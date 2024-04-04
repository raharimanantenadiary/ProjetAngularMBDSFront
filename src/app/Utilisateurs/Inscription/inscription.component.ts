import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatButtonModule} from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatInputModule,MatIconModule,FormsModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nomFormControl = new FormControl('', [Validators.required]);
  motDePasseFormControl = new FormControl('', [Validators.required]);
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
  }

  isPasswordNotEmpty(): boolean {
    const passwordValue = this.motDePasseFormControl.value;
    return typeof passwordValue === 'string' && passwordValue.length > 0;
  }
}
