export default class Routes {
    path: string;
    component: any;
    constructor(path: string, component: any) {
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