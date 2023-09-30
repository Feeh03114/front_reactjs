'use client';

import { ComponentProps, ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface inputDefault extends ComponentProps<'input'> {}


interface InputProps extends ComponentProps<'input'> {
    label?: string;
    classLabel?: inputDefault['className'];
    classInput?:inputDefault['className'];
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    classInput, className, label, classLabel, error, ...rest
}:InputProps, ref) => {
    return(
        <div className={twMerge('w-full',className)}>
            <label className={twMerge('aria-hidden:hidden',classLabel)}
                aria-hidden={!label}
            >
                {label}
            </label>
            <input
                className={twMerge('bg-none border-2 border-black text-center w-full h-12',classInput)}
                ref={ref}
                {...rest}
            />
            {!!error&&<span className="text-red-500 text-sm">{error.message?.toString()}</span>}
        </div>
    )
};

export const Input = forwardRef(InputBase);