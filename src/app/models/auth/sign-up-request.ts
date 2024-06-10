import { Credentials } from './../user/user-credentials';

export interface SignUpRequest extends Credentials {
    username: string,
    email: string,
    escom_id: string
}