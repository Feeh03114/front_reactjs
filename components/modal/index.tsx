import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps extends ComponentProps<'div'> {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({
    isOpen=false,
    onClose,
    className,
    ...rest
}:ModalProps):JSX.Element {
    return(
        <div className={twMerge("fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center z-10 aria-hidden:hidden", 
            className)}
            aria-hidden={!isOpen}
            onClick={onClose}
            {...rest}
        >
            {rest.children}
        </div>
    )
}

interface ModalContentProps extends ComponentProps<'div'> {}

export function ModalContent({className, children, ...rest}:ModalContentProps):JSX.Element {
    return(
        <div className={twMerge('bg-white' ,className)} {...rest}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    )
}