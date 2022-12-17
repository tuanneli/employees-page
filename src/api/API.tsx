import {AxiosResponse} from "axios";
import {$host, baseURL} from "./http";
import {IEmployee} from "../types/UsersTypes";

export class EmployeesService {
    static async fetchEmployee(): Promise<IEmployee[]> {
        const response = await $host.get<IEmployee[]>(`${baseURL}/tasks`);
        // console.log(response.data)
        return response.data;
    }

    static async createEmployee({id, name, sex, job, birthday}: IEmployee) {
        await $host.post(`${baseURL}/tasks`, {id, name, sex, job, birthday});
    }

    static async deleteEmployee(id: string) {
        await $host.delete(`${baseURL}/tasks/${id}`);
    }
}
