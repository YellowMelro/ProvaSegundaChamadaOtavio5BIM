import jwt from "jsonwebtoken";

export async function generateJwt(user: any) {
    return await jwt.sign(user, "private key");
}

export async function velidateJwt(token: string) {
    return await jwt.verify(token, "private key");
}