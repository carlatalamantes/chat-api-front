import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router) {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        agreeTermsConditions: [false, Validators.requiredTrue],
      },
      {
        validators: this.matchPasswords.bind(this),
      }
    );
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.form.valid) {
      const { name, email,password } = this.form.getRawValue();
      this.signupService.signup({name,email,password}).subscribe( {
        complete: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => console.error(err)
      });

    } else {
      this.form.markAllAsTouched()
    }
  }


  //Custom validator
  matchPasswords() {
    if (!this.form) return;
    const { password, confirmPassword } = this.form.getRawValue();
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
}
