import RequestObject from "../object/request.object";
import Node from "../action/data/node";
import SeoulError from "../action/exception/seoul.error";

export default class Print {
    private static successData = `{"status":200,"message":"success"}`;

    static json(robj: RequestObject): void;
    static json(robj: RequestObject, ...data: string[]): void;
    static json(robj: RequestObject, ...data: Node[]): void;
    static json(robj: RequestObject, data: string): void;
    static json(robj: RequestObject, ...data: any[]): void {
        let str: string = null;
        data = data.filter(e => e !== null && e !== undefined)
        if (data.length === 0) {
            str = Print.successData;
        } else if (typeof data[0] === 'string') {
            str = `{${data.join(',')}}`;
        } else if (data[0] instanceof Node) {
            str = `{${data.map(e => e.toString()).join(',')}}`;
        } else {
            throw new SeoulError('invalid_string' + data[0]);
        }


        robj.res.setHeader('Content-Type', 'application/json; charset=utf-8');
        robj.res.statusCode = 200;
        robj.res.write("{\"response\":");
        if (str !== null) {
            robj.res.write(str);
        }
        robj.res.write(",\"time\":" + robj.now);
        robj.res.write("}");
        robj.res.end();
    }
}