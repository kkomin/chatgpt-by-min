"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";
import { user } from "@/db/schema";
import db from "@/db";
import { redirect } from "next/navigation";

export const signUp = async(_:any, formData:FormData) => {
    //1. 필드 중요성
    const validatedFields = SignUpSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validatedFields.success){
        return {
            errorMessages: "잘못된 입력값이 있습니다.",
        };
    }
    //2. 존재하는 사용자인지 체크
    const {email, name, password} = validatedFields.data;

    //4. 성공 여부 반환
    try {
        const existingUser = await getUserByEmail(email);
    
        if(existingUser){
            return {
                errorMessages: "이미 가입된 사용자입니다.",
            };
        }
    
        const hasehdPassword = await bcrypt.hash(password, 10);
        //3. db에 insert
        await db.insert(user).values({name, email, password: hasehdPassword});
    } catch(error) {
        console.error(error)
        return {errorMessage: "알 수 없는 오류가 발생했습니다."};
    }
    redirect("/login");
};