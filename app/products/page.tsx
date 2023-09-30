'use client';

import api from "@/service/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalViewProduct, Row } from "./components";
import { Product, ProductContext } from "./productContext";

export default function Products():JSX.Element {
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [viewProduct, setViewProduct] = useState(false);
    const [idProduct, setIdProduct] = useState<number|undefined>(undefined);

    const handleViewProduct = (id: number) => {
        setIdProduct(id);
        setViewProduct(true);
    }

    const onCloseViewProduct = () => {
        setViewProduct(false);
        setIdProduct(undefined);
    }
    
    const loadingProducts = async () => {
        try {
            const {data} = await api.get('produtos');
            setProducts(data);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao carregar os produtos');
        }
    }

    useEffect(() => {
        loadingProducts();
    }, []);

    return(
        <div className="flex flex-col gap-4 p-4 w-full">
            <ProductContext.Provider
                value={{
                    idProduct,
                    viewProduct,
                    handleViewProduct,
                    onCloseViewProduct
                }}
            >
                
                <ModalViewProduct/>
            </ProductContext.Provider>
            <h1 className="font-semibold text-xl">Listagem de produto disponíveis</h1>
            <div className='overflow-auto'>
                <table className="table-auto w-full border-2 border-dashed border-black">
                    <thead className="bg-red-100">
                        <tr>
                            <th className="border-2 border-dashed border-black">Nome do produto</th>
                            <th className="border-2 border-dashed border-black">Preço do produto</th>
                            <th className="border-2 border-dashed border-black">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => (
                                <Row 
                                    key={index} 
                                    {...item} 
                                    onView={handleViewProduct}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}