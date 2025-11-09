export default class DepartmentTag {
    department_id: number;
    tag_id: number;
    constructor(data: any) {
        this.department_id = data.department_id
        this.tag_id = data.tag_id
    }
}