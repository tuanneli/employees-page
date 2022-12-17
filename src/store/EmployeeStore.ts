import {makeAutoObservable} from "mobx";
import {IEmployee} from "../types/UsersTypes";
import {EmployeesService} from "../api/API";

export default class EmployeeStore {

    _isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    _categoriesToShow: Array<string> = [];

    get categoriesToShow() {
        return this._categoriesToShow;
    }

    _employees: Array<IEmployee> = [];

    get employees() {
        return this._employees;
    }

    _openPages: Array<number> = [1];

    get openPages() {
        return this._openPages;
    }

    setCategoriesToShow(list: Array<string>) {
        this._categoriesToShow = list;
    }

    setEmployees(employees: IEmployee[]) {
        this._employees = employees;
    }

    addOpenPage() {
        console.log(Math.max.apply(Math, this._openPages))
        if (Math.max.apply(Math, this._openPages) > 0) {
            this._openPages.push(Math.max.apply(Math, this._openPages) + 1);
        } else {
            this._openPages.push(1)
        }
    }

    deleteOpenPage(num: number) {
        this._openPages = this._openPages.filter(number => number != num);
    }

    shiftOpenPage() {
        this._openPages.shift();
    }

    async fetchEmployees() {
        try {
            this._isLoading = true;
            const response = await EmployeesService.fetchEmployee();
            this.setEmployees(response);
            this._categoriesToShow = Object.keys(this._employees[0]);
        } catch (e: any) {
            console.log("Error");
            console.log(e);
        } finally {
            this._isLoading = false;
        }
    }
}