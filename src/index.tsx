import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import EmployeeStore from "./store/EmployeeStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

interface IStore {
    employeeStore: EmployeeStore
}

const employeeStore = new EmployeeStore();

export const Context = createContext<IStore>({
    employeeStore
})

root.render(
    <Context.Provider value={{
        employeeStore
    }}>
        <App/>
    </Context.Provider>
);

