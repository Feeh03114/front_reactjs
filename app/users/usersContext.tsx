'use client';
import { createContext } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextData{
    selectedUser: User;
    openModal: boolean;
    onCloseEditUser: () => void;
    onSave: (data: any) => void;
}

export const UserContext = createContext({} as UserContextData);
