export default class Routes {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }

    toRoute() {
        return {
            path: this.path,
            component: this.component
        };
    }
}