import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validator/email.validator';
import { UserAuthService } from './../../core/user-auth/user-auth.service';
import { User } from './../../core/user/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user!: User;

  editForm!: FormGroup;

  constructor(
    private userAuthService: UserAuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userAuthService.getUserAuth().subscribe(userAuth => {
      if (userAuth) {
        this.user = userAuth?.user;
      }
    });

    this.editForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, emailValidator, Validators.minLength(3)]
      ]
    })

  }

}
