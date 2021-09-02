import { User } from '../../shared/service/user/user';

export interface UserAuth {    
    user_id: number;
    exp: number;
    user: User;
}