'use client';
import Modal, { ModalContent } from "@/components/modal";
import api from "@/service/api";
import { useContext, useEffect, useState } from "react";
import { GoEye } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { Product, ProductContext } from "./productContext";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    onView?: (id: number) => void;
}

export function Row({id, name, price=0, onView}:ProductProps):JSX.Element {
    return(
        <tr>
            <td className="border-2 border-dashed border-black p-2">
                {name}
            </td>
            <td className="border-2 border-dashed border-black p-2 w-3/12">
                <div className="flex flex-row gap-2 items-center justify-end">
                    {
                        price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                    }
                </div>
            </td>
            <td className="border-2 border-dashed border-black p-2">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <button className="bg-red-300 border p-2 border-black"
                        onClick={onView&&(() => onView(id))}
                    >
                        <GoEye size={20} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export function ModalViewProduct():JSX.Element {
    const {viewProduct, onCloseViewProduct, idProduct} = useContext(ProductContext);
    const [infoProduct, setInfoProduct] = useState<Product>({} as Product);
    
    const loadingProduct = async () => {
        try {
            const {data} = await api.get(`produtos/${idProduct}`);
            setInfoProduct(data);
        } catch (error) {
            toast.error('Erro ao carregar o produto');
        }
    }

    useEffect(() => {
        if(idProduct !== undefined && viewProduct) loadingProduct();
    }, [viewProduct])

    return(
        <Modal
            isOpen={viewProduct}
            onClose={onCloseViewProduct}
        >
            <ModalContent
                className="w-1/2 p-4 h-1/2 border-2 border-black"
            >
                <header className="flex items-center gap-5 justify-between pb-2 border-b-2 border-black">
                    <div className="flex items-center gap-5">
                        <h1 className="text-xl font-semibold">
                            {infoProduct?.name}
                        </h1>
                        <span className="border-2 border-black px-6 bg-green-300 font-semibold">
                            {infoProduct?.price?.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                        </span>
                    </div>
                    <button className="text-black"
                        onClick={onCloseViewProduct}
                    >
                        <MdClose/>
                    </button>
                </header>
                <main
                    className="pt-10 text-sm"
                >
                    <p>
                        {infoProduct?.description}
                    </p>
                </main>
            </ModalContent>
        </Modal>
    )
}