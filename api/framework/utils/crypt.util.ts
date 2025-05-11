import * as crypto from "crypto";

export namespace CryptUtil {
    const secretKey = Buffer.from('d8381d6b7d02559c8a1f23d28e3f87b9', 'utf-8');
    const iv = Buffer.from('ef7bed2c145b1019');
    const t = crypto.randomBytes(1);
    export function encrypt(value: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // IV를 암호문과 함께 전달해야 복호화 시 사용 가능
        return iv.toString('hex') + ':' + encrypted;
    }
    export function decrypt(value: string): string {
        const [ivHex, encrypted] = value.split(':');
        const ivBuffer = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, ivBuffer);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}