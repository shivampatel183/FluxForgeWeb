import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './signin.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Matches UserMainEntity
  registerData = {
    displayName: '',
    email: '',
    passwordHash: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        alert(response);
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Registration failed'),
    });
  }
}
