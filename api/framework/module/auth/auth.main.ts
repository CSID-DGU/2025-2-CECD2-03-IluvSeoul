import AuthResult from "./data/auth.result";
import AuthBase from "./auth.base";

export default class AuthMain {
    static authManager: AuthBase;
    static init(authManager: AuthBase) {
        AuthMain.authManager = authManager;
    }

    static authorize(token: string): AuthResult {
        return AuthMain.authManager.authorize(token);
    }

    static login(data: string): void {
        AuthMain.authManager.login(data);
    }

    static logout(): void {
        AuthMain.authManager.logout();
    }
}