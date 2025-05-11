import AuthResult from "./data/auth.result";

export default abstract class AuthBase {
    abstract authorize(token: string): AuthResult;
    abstract login(data: any): string;
    abstract logout(): void;
}