import { Injectable } from "@angular/core";
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SignupService } from './signup.service';


@Injectable()
export class UserNotExistValidatorService {

    constructor(private signupService: SignupService) {
    }

    checkUserNameExists() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(username => {                    
                    return this.signupService.checkUserNameExists(username?.toLowerCase().trim());
                }))
                .pipe(map(res => {
                    if (res) {
                        if (res.usuarioExiste) {
                            return { userNameExists: true }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }))
                .pipe(first());
        }
    }
}