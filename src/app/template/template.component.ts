import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,FooterComponent,SidebarComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

  isTokenExpired: boolean = false;

  constructor(
    private router: Router, private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.isTokenExpired = this.authService.isTokenExpired();
    if (this.isTokenExpired) {
      this.router.navigate(['/login']);
    }
  }
}