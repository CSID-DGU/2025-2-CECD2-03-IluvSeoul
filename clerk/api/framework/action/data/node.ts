import Bean from "./bean";

class Node {
    ///////////
    // single
    ///////////
    static string(key: string, value: string): Node {
        return new Node(key, `"${value}"`);
    }
    static bool(key: string, value: boolean): Node {
        return new Node(key, value.toString());
    }
    static number(key: string, value: number): Node {
        return new Node(key, value.toString());
    }
    static map(key: string, value: Map<string, any>): Node {
        if (value === null) {
            return null;
        }
        return new Node(key, JSON.stringify(Object.fromEntries(value)));
    }
    static bean(key: string, value: Bean): Node {
        if (value === null) {
            return null;
        }
        return Node.map(key, value.getResponseMap());
    }

    ///////////
    // list
    ///////////
    static beanList(key: string, value: Array<Bean>): Node {
        if (value === null || value.length === 0) {
            return null;
        }
        return new Node(key, JSON.stringify(value.map(e => Object.fromEntries(e.getResponseMap()))));
    }
    static nodeList(key: string, value: Array<Node>): Node {
        return new Node(key, JSON.stringify(value));
    }

    ///////////
    // instance
    ///////////
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
    toString(): string {
        return `"${this.key}":${this.value}`;
    }
}

export default Node;