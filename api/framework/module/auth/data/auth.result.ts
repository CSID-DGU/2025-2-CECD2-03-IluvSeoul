export default class AuthResult {
    isSuccess: boolean;
    playerUid: number;

    constructor(playerUid?: number, isSuccess?: boolean) {
        this.isSuccess = isSuccess;
        this.playerUid = playerUid;
    }
}