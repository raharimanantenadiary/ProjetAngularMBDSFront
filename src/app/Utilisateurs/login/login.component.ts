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
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatInputModule,MatIconModule,FormsModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
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
