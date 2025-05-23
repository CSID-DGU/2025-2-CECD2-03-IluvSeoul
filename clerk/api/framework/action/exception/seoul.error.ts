export default class SeoulError extends Error {
    constructor(message: string) {
        super('');
        this.name = this.constructor.name;
        this.stack = message + " : " + this.stack //also you can replace this with anything you want
    }
};