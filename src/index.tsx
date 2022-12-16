import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import UsersStore from "./store/UsersStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

interface IStore {
    usersStore: UsersStore
}

const usersStore = new UsersStore();

export const Context = createContext<IStore>({
    usersStore
})

root.render(
    <Context.Provider value={{
        usersStore
    }}>
        <App/>
    </Context.Provider>
);

