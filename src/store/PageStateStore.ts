import {makeAutoObservable} from "mobx";
import {IEmployee} from "../types/UsersTypes";
import {EmployeesService} from "../api/API";
import EmployeesPage from "../components/main/EmployeesPage";
import {v4 as uuid} from "uuid";

export default class PageStateStore {

    constructor() {
        makeAutoObservable(this)
    }

    _categoriesToShow: Array<{ id: number, name: string }> = [{id: 1, name: 'id'}, {id: 2, name: 'name'},
        {id: 3, name: 'sex'}, {id: 4, name: 'job'}, {id: 5, name: 'birthday'}];

    get categoriesToShow() {
        return this._categoriesToShow;
    }

    _categoriesToShowInfo: Array<{ id: number, name: string }> = [{id: 1, name: 'id'}, {id: 2, name: 'name'},
        {id: 3, name: 'sex'}, {id: 4, name: 'job'}, {id: 5, name: 'birthday'}];

    get categoriesToShowInfo() {
        return this._categoriesToShowInfo;
    }

    _sortByWord = "";

    get sortByWord() {
        return this._sortByWord;
    }

    _toggle = true;

    get toggle() {
        return this._toggle;
    }

    _currentListOfPages: IEmployee[] = [];

    get currentListOfPages() {
        return this._currentListOfPages;
    }

    _currentPage = 1;

    get currentPage() {
        return this._currentPage;
    }

    setToggle(bool: boolean) {
        this._toggle = bool;
    }

    setSortByWord(word: string) {
        this._sortByWord = word;
    }

    setCurrentListOfPages(list: IEmployee[]) {
        this._currentListOfPages = list;
    }

    setCategoriesToShow(list: Array<{ id: number, name: string }>) {
        this._categoriesToShow = list.sort((a, b) => a.id - b.id)
    }

    setCategoriesToShowInfo(list: Array<{ id: number, name: string }>) {
        this._categoriesToShowInfo = list.sort((a, b) => a.id - b.id)
    }

    setCurrentPage(num: number) {
        this._currentPage = num;
    }
}