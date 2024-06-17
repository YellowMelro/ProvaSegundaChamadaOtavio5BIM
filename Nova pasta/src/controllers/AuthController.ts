import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() {}


    async signUp(req: Request, res: Response) {

        const {email, name, id_telegram, password} = req.body;

        if (!email || !id_telegram || !password) {
            res.json({
              status: "error",
              message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(password);

        if (!hashPassword) {
            res.json({
            status: "error",
            message: "Erro ao criptografar a senha ...",
            });
            return;
        }

        try {
            const newuser = await AuthService.signUp({
                name: name,
                email: email,
                id_telegram: id_telegram,
                password: hashPassword as string,
            });
            res.json({
                status: "ok",
                newuser: newuser,
            });
            return;
            
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
            return;
        }
         
    }

    async signIn() {
        
    }

    async signOut() {
        
    }


}