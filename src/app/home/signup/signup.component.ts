import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { emailValidator } from "../../shared/validator/email.validator";
import { GlobalFormValidator } from './global-form-validators';
import { PasswordEqual } from './password-equal.validator';
import { Signup } from './signup.model';
import { SignupService } from "./signup.service";
import { UserNotExistValidatorService } from "./user-not-exist.validator.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [UserNotExistValidatorService]
})
export class SignupComponent implements OnInit {

    signUpForm!: FormGroup;

    globalFormValidator = new GlobalFormValidator();

    @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private signupService: SignupService,
        private router: Router,
        private userNotExistValidatorService: UserNotExistValidatorService) {
    }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            name: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            email: [
                '',
                [Validators.required, emailValidator, Validators.minLength(3)]
            ],
            username: [
                '',
                [
                    Validators.required, Validators.minLength(3)
                ],
                this.userNotExistValidatorService.checkUserNameExists()
            ],
            password: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            passwordConfirmation: [
                '',
                [Validators.required]
            ]
        }, {
            validators: [PasswordEqual.validate]
        });

    }

    signup(): void {

        const signupUser = this.signUpForm.getRawValue() as Signup;

        signupUser.username = signupUser.username.toLowerCase().trim();

        this.signupService
            .createUser(signupUser)
            .subscribe(
                () => {
                    this.router.navigate(['']);
                },
                (error) => {
                    this.signUpForm.reset();
                    alert('Alguma coisa errada aconteceu');
                }

            );

    }

    getErrorMessage(field: string): string {
        if (this.signUpForm.get(field)?.hasError('required')) {
            return 'Campo obrigatório';
        }

        if (this.signUpForm.get(field)?.hasError('emailValidator')) {
            return 'Informe email no formato seuemail@provedor.xxx';
        }

        if (this.signUpForm.get(field)?.hasError('minlength')) {
            return `Tamanho mínimo ${this.signUpForm.get(field)?.errors?.minlength.requiredLength}`;
        }

        if (this.signUpForm.get(field)?.hasError('userNameExists')) {
            return 'Usuário já existente, por favor escolha outro';
        }

        return this.signUpForm.get(field)?.invalid ? `Campo não válido ${field}` : '';

    }

}