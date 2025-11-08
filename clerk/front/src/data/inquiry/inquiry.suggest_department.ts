export default class InquirySuggestDepartment {
    inquiry_id: number;
    suggest_department_id: number;
    constructor(data: any) {
        this.inquiry_id = data.inquiry_id;
        this.suggest_department_id = data.suggest_department_id;
    }
}