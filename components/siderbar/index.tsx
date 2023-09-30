/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';
import { usePathname, useRouter } from "next/navigation";

interface SiderBarProps {
    children?: React.ReactNode;
}

interface RouterProps {
    name: string;
    title: string;
    route: string;
}

const router: RouterProps[] = [
    {
        name: 'Início',
        title: 'Página inicial',
        route: '/'
    },
    {
        name: 'Produtos',
        title: 'Produtos',
        route: '/products'
    },
    {
        name: 'Usuários',
        title: 'Usuários',
        route: '/users'
    }
]

export default function SiderBar({
    children,
}: SiderBarProps) {
    const routerNext = useRouter();
    const pathname = usePathname();


    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="h-full w-1/6 basis-1/6 flex flex-col items-center bg-red-100 gap-4">
                <h1 className=" font-semibold">Desafio Viamakes</h1>
                {
                    router?.map((item, index) => (
                        <button 
                            key={index}
                            className=" w-4/5 h-10 flex flex-row items-center justify-center border border-black font-semibold bg-red-300
                            aria-checked:bg-cyan-100
                            "
                            aria-checked={pathname === item.route}
                            onClick={() => routerNext.push(item.route)}
                        >
                            <span>{item.name}</span>
                        </button>
                    ))
                }
            </div>
            <div className="w-5/6 flex flex-col">
                <div className="h-16 py-10 flex items-center justify-center font-bold text-3xl bg-cyan-100 border-2 border-dashed border-black">
                    <h1>{router.find(item => item.route === pathname)?.title}</h1>
                </div>
                <main className="w-full overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
} 