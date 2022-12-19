import {makeAutoObservable} from "mobx";
import {IEmployee} from "../types/UsersTypes";
import {EmployeesService} from "../api/API";
import EmployeesPage from "../components/main/EmployeesPage";
import {v4 as uuid} from "uuid";
import PageStateStore from "./PageStateStore";

export default class EmployeeStore {

    _isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    _openPages: Array<{
        id: string,
        EmployeesPage: typeof EmployeesPage,
        store: typeof PageStateStore.prototype
    }> = [{
        id: uuid(),
        EmployeesPage,
        store: new PageStateStore
    }]

    get openPages() {
        return this._openPages;
    }

    _currentOpenPageId: string = this._openPages[0].id;

    get currentOpenPageId() {
        return this._currentOpenPageId;
    }

    _employees: Array<IEmployee> = [];

    get employees() {
        return this._employees;
    }

    setCurrentOpenPageId(id: string) {
        this._currentOpenPageId = id;
    }

    setEmployees(employees: IEmployee[]) {
        this._employees = employees;
    }

    addOpenPage() {
        this._openPages.push({id: uuid(), EmployeesPage, store: new PageStateStore})
    }

    deleteOpenPage(id: string) {
        this._openPages = this._openPages.filter(item => item.id !== id);
    }

    shiftOpenPage() {
        this._openPages.shift();
    }

    async fetchEmployees() {
        try {
            this._isLoading = true;
            const response = await EmployeesService.fetchEmployee();
            this.setEmployees(response);
        } catch (e: any) {
            console.log("Error");
            console.log(e);
        } finally {
            this._isLoading = false;
        }
    }
}