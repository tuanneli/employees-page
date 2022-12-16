import {makeAutoObservable} from "mobx";

export default class UsersStore {

    constructor() {
        makeAutoObservable(this)
    }

    _openPages: Array<number> = [1, 2, 3, 4];

    get openPages() {
        return this._openPages;
    }

    addOpenPage() {
        this._openPages.push(Math.max.apply(Math, this._openPages));
    }

    deleteOpenPage(num: number) {
        this._openPages = this._openPages.filter(number => number != num);
    }
}