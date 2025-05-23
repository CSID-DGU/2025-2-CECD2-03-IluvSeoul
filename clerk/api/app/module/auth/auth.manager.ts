import AuthBase from "../../../framework/module/auth/auth.base";
import AuthResult from "../../../framework/module/auth/data/auth.result";
import jwt from 'jsonwebtoken';

export default class AuthManager extends AuthBase {
    constructor() {
        super();
    }

    static readonly privateKey: string = '';
    static readonly publicKey: string = '5WFC2HTV3T';
    authorize(token: string): AuthResult {
        try {
            const decoded = jwt.verify(token, AuthManager.privateKey);
            const auth = new AuthResult();
            auth.playerUid = decoded['player_uid'];
            auth.isSuccess = true;
            return auth;
        } catch (error) {
            return new AuthResult(-1, false);
        }
    }
    login(data: any): string {
        // TODO access token, refresh token 처리하기
        return jwt.sign(data, AuthManager.publicKey, {algorithm: 'RS256'});
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }
    //
}