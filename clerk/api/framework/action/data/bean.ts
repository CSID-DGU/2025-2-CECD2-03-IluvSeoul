import Node from "./node";

export default interface Bean {
    getResponseMap(): Map<string, any>;
}