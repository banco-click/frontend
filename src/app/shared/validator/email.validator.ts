import { AbstractControl } from '@angular/forms';

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export function emailValidator(control: AbstractControl) {
    if (control.value.trim() && !re.test(String(control.value).toLowerCase())) {
        return { emailValidator: true } 
    } else {
        return null;
    }
}
