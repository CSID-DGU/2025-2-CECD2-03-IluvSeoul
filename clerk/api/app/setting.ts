export default class Setting {
    static isLive: boolean;
    static timezone: string = 'Asia/Seoul';
    static timeOffset: number = 9;
    static dailyResetOffset: number = 12;
    static serverName: string;
    static serverIp: string;

    static propertyMap: Map<string, string>;


    // TODO: read setting db
    static async init() {
        this.isLive = process.env.IS_LIVE === 'true';
    }
}