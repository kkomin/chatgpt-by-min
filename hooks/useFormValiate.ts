import { useState } from "react";
import { set, ZodObject, ZodRawShape } from "zod";

export default function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
    // errors -> use
    const [errors, setErrors] = useState<Partial<T>>();
    
    const validateField = (name:string, value:string) => {
        setErrors({
            ...errors,
            [name]: undefined,
        });

        const parsedValue = schema.pick({ [name]: true }).safeParse({ 
            [name]: value 
        });

        if(!parsedValue.success) {
            setErrors({
                ...errors,
                ...parsedValue.error.flatten().fieldErrors
            });
        }
    };

    return { errors, validateField };
}