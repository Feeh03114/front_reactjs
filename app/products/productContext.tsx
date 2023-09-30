'use client';
import { createContext } from "react";



export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface ProductContextData{
    idProduct: number|undefined;
    viewProduct: boolean;
    handleViewProduct: (id: number) => void;
    onCloseViewProduct: () => void;
}

export const ProductContext = createContext({} as ProductContextData);