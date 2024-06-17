import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";
import { generateHash } from "../utils/BcryptUtils";

class UserController {
    constructor() {}

    async listUsers(req: Request, res: Response) {
      try {
        const users = await UserDataBaseService.listDBUsers();
        res.json({
          status: "ok",
          users: users,
        });
        return;
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
        return;
      }
    }
  
    async createUser(req: Request, res: Response) {
      const {email, name, id_telegram, password} = req.body;

      if (!email|| !id_telegram || !password) {
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
        const newuser = await UserDataBaseService.insertDBUser({
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
  
    async updateUser(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
        return;
      }
  
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
        const updatedUser = await UserDataBaseService.updateDBUser(
          {
            name: name,
            email: email,
            id_telegram: id_telegram,
            password: hashPassword as string,
          },
          id
        );
        res.json({
          status: "ok",
          newuser: updatedUser,
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
  
    async deleteUser(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
        return;
      }
  
      try {
        const response = await UserDataBaseService.deleteDBUser(id);
        if (response) {
          res.json({
            status: "ok",
            message: "usuário deletado com sucesso",
          });
          return;
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
        return;
      }
    }
}

export default new UserController();