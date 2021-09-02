import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { UserService } from '../../shared/service/user/user.service';
import { UserAuth } from './user-auth';
import { User } from "src/app/shared/service/user/user";

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    private userSubject = new BehaviorSubject<UserAuth | null>(null);
    userAuth!: UserAuth;

    constructor(
        private tokenService: TokenService,
        private userService: UserService) {
        if (tokenService.hasToken()) {
            this.decodeAndNotify();
        }
    }

    setToken(token: string): void {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUserAuth(): Observable<UserAuth | null> {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify(): void {
        const token = this.tokenService.getToken();
        if (token) {
            this.userAuth = jwt_decode(token) as UserAuth;
            this.userService.get(this.userAuth.user_id)
                .subscribe(user => {
                    this.userAuth.user = user;
                    this.userSubject.next(this.userAuth);
                });
        }
    }

    logout(): void {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    updateUser(user: User): void {
        this.userAuth.user = user;
        this.userSubject.next(this.userAuth);
    }

}