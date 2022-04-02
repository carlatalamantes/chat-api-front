import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showError:Boolean=false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.loginService.login(data).subscribe( {
        complete: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {console.error(err)
        this.showError=true;}
      });
    } else {
      this.form.markAllAsTouched()
    }
  }

}
