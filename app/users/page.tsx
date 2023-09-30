'use client';
import { User, UserContext } from "@/app/users/usersContext";
import api from "@/service/api";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { ModalUser, Row } from "./components";

export default function Users():JSX.Element {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>({} as User);
    const [users, setUsers] = useState<User[]>([] as User[]);

    const loadingUsers = async () => {
        try {
            const {data} = await api.get('usuarios');
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao carregar os usuários');
        }
    }

    useEffect(() => {
        loadingUsers();
    }, []);

    const toggleModal = () => setOpenModal((prevState) => !prevState);
    const handleEditUser = (id: number) => {
        const user = users.find((user) => user.id === id);
        setSelectedUser(user as User);
        toggleModal();
    }

    const onCloseEditUser = () => {
        toggleModal();
        setSelectedUser({} as User);
    }

    const deleteUser = (id: number) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    }

    const onSave = async (data: User) => {
        try {
            if(data.id)
            {
                await api.put(`usuarios/${data.id}`, data);
                toast.success('Usuário atualizado com sucesso');
            }
            else
            {
                await api.post('usuarios', data);
                toast.success('Usuário criado com sucesso');
            }
            await loadingUsers();
        } catch (error) {
            toast.error('Erro ao salvar o usuário');
        }
        finally{
            onCloseEditUser();
        }
    }

    return(
        <div className="flex flex-col gap-4 p-4 w-full">
            <UserContext.Provider
                value={{
                    selectedUser,
                    openModal,
                    onCloseEditUser,
                    onSave
                }}
            >   
                <ModalUser/>
            </UserContext.Provider>
           
            <div className="flex flex-row justify-between items-center">
                <h1 className="font-semibold text-xl">Listagem de usuários disponíveis</h1>
                <button className="flex gap-4 border-2 border-black justify-center items-center px-6 bg-red-200 py-2"
                    onClick={toggleModal}
                    disabled={openModal}
                >
                    <span className="font-semibold">
                        Adicionar
                    </span>
                    <FaPlus/>
                </button>
            </div>
            <div className="flex flex-col overflow-auto gap-4">
                {
                    users?.map((user) => (
                        <Row
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            onDelete={deleteUser}
                            onEdit={handleEditUser}
                        />
                    ))
                }
            </div>
        </div>
    )
}