'use client';
import Modal, { ModalContent } from "@/components/modal";
import { PiPencil } from "react-icons/pi";

import { Input } from "@/components/input";
import api from "@/service/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { UserContext } from "./usersContext";

interface RowProps{
    id:number;
    name:string;
    onEdit?: (id:number) => void;
    onDelete?: (id:number) => void;
}

export function Row({
    id,
    name,
    onEdit,
    onDelete
}:RowProps):JSX.Element{
    return(
        <div className="border-2 border-black rounded-2xl flex items-center justify-between p-4 h-20">
            <span className="font-semibold">
                {name}
            </span>
            <div className="flex gap-2">
                <button className="bg-red-300 border-2 p-2 border-black"
                    onClick={onEdit&&(() => onEdit(id))}
                >
                    <PiPencil size={20} />
                </button>
                <button className="bg-red-300 border-2 p-2 border-black"
                    onClick={onDelete&&(() => onDelete(id))}
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
        </div>
    )
}

export function ModalUser():JSX.Element{
    const {
        openModal,
        selectedUser,
        onCloseEditUser,
        onSave
    } = useContext(UserContext);
    const schema= yup.object().shape({
        id: yup.number().optional(),
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().required('Email é obrigatório').email('Email inválido'),
    });
    const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

    const loadindUser = async () => {
        try {
            const {data} = await api.get(`usuarios/${selectedUser.id}`);
            reset(data);
        } catch (error) {
            toast.error('Erro ao carregar o usuário');
        }
    }

    useEffect(() => {
        if(openModal && Object.keys(selectedUser).length > 0) loadindUser();
        else reset({
            name: '',
            email: ''
        });
    },[openModal]);

    return(
        <Modal
            isOpen={openModal}
            onClose={onCloseEditUser}
        >
            <ModalContent
                className="flex flex-col gap-4 p-4 w-1/2 border-2 border-black"
            >
                <header className="flex items-center gap-5 justify-between pb-2 border-b-2 border-black">
                    <h1 className="text-xl font-semibold">
                        {Object.keys(selectedUser).length > 0 ? 'Editar usuário' : 'Adicionar usuário'}
                    </h1>
                    <button className="text-black"
                        onClick={onCloseEditUser}
                        disabled={isSubmitting}
                    >
                        <MdClose/>
                    </button>
                </header>
                <form className="flex flex-col gap-4" id='formUser' onSubmit={handleSubmit(onSave)}>
                    <Input
                        placeholder="Insira o nome do usuário"
                        {...register('name')}
                        error={errors.name}
                    />
                    <Input
                        placeholder="Insira o email do usuário"
                        {...register('email')}
                        error={errors.email}
                    />
                </form>
                <footer className="flex flex-row gap-4 items-center w-full">
                    <button
                        className="border-2 border-black p-2 w-full bg-red-300 font-semibold"
                        onClick={onCloseEditUser}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        className="border-2 border-black p-2 w-full bg-green-300 font-semibold"
                        disabled={isSubmitting}
                        type="submit"
                        form="formUser"
                    >
                       {Object.keys(selectedUser).length > 0 ? 'Alterar' : 'Adicionar'}
                    </button>
                </footer>
            </ModalContent>
        </Modal>
    )
}