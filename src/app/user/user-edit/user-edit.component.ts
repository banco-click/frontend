import { Router } from '@angular/router';
import { UserService } from './../../shared/service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validator/email.validator';
import { UserAuthService } from './../../core/user-auth/user-auth.service';
import { User } from '../../shared/service/user/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user!: User;

  allowEdit = false;

  editForm!: FormGroup;

  constructor(
    private userAuthService: UserAuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, emailValidator, Validators.minLength(3)]
      ]
    });

    this.userAuthService.getUserAuth().subscribe(userAuth => {
      if (userAuth) {
        this.user = userAuth?.user;
        this.editForm.patchValue({ email: this.user.email });
        this.allowEdit = true;
      }
    });

  }

  edit(): void {
    const email = this.editForm.get('email')?.value;
    this.userService.updateEmail(this.user.id, email)
      .subscribe(user => {
        this.user = user;
        this.userAuthService.updateUser(user);
        this.router.navigate(['main']);
      });
  }

  getErrorMessage(field: string): string {
    if (this.editForm.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.editForm.get(field)?.hasError('emailValidator')) {
      return 'Informe email no formato seuemail@provedor.xxx';
    }

    if (this.editForm.get(field)?.hasError('minlength')) {
      return `Tamanho mínimo ${this.editForm.get(field)?.errors?.minlength.requiredLength}`;
    }

    return this.editForm.get(field)?.invalid ? `Campo não válido ${field}` : '';

  }

}
