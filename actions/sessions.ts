"use server";

import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    id: string;
    name: string;
}

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

export const verify = async (session: string | undefined = "") => {
    try {
        const {payload} = await jwtVerify<SessionPayload>(session, encodedKey, {
            algorithms: ["HS256"]
        });

        return payload as SessionPayload

    } catch(error) {
        console.error("토큰 검증에 실패했습니다.", error);
    }
};