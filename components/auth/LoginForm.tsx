"use client";
import { ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormCard from "./FormCard";
import { Submit } from "./submit";
import { LoginSchema } from "@/schemas/auth";
import useFormValidate from "@/hooks/useFormValiate";
import { TLoginFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { useActionState  } from "react";
import { toast } from "react-hot-toast";
import { login } from "@/action/login";

export function LoginForm() {
    const [error, action] = useActionState(login, undefined);
    const {errors, validateField} = useFormValidate<TLoginFormError>(LoginSchema);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value);
    };
    useEffect(() => {
        if(error?.errorMessages){
            toast.error(error.errorMessages);
        }
    }, [error]);

    return (
    <FormCard 
        title="로그인" 
        footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}>
            <form action={action} className="space-y-6">
                {/* 이메일 */}
                <div className="space-y-1">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        error = {!!errors?.email}
                        placeholder="example@example.com" onChange={handleChange}/>
                        {errors?.email && <FormMessage message={errors?.email[0]}/>}
                </div>
                {/* 비밀번호 */}
                <div className="space-y-1">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        error = {!!errors?.password}
                        placeholder="**********" onChange={handleChange}/>
                        {errors?.password && <FormMessage message={errors?.password[0]}/>}
                </div>
                <Submit className="w-full">로그인</Submit>
            </form>
    </FormCard>
    );
}