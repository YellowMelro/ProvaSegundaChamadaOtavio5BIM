import { Request, Response } from "express";
import PostDataBaseService from "../services/PostDataBaseService";


class PostController {
    constructor() {}

    async listPosts(req: Request, res: Response) {
      try {
        const posts = await PostDataBaseService.listDBPosts;
        res.json({
          status: "ok",
          users: posts,
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async createPost(req: Request, res: Response) {
      const {title, content, published, authorId} = req.body;

  
      if (!title || !published || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
        return;
      }
  
      try {
        const newpost = await PostDataBaseService.insertDBPost({
            title: title,
            content: content,
            published: published,
            author: { connect: { id: authorId } },
        });
        res.json({
          status: "ok",
          newuser: newpost,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async updatePost(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      const {title, content, published, authorId} = req.body;
      if (!title || !published || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
      }
  
      try {
        const updatedPost = await PostDataBaseService.updateDBPost(
          {
            title: title,
            content: content,
            published: published,
            author: { connect: { id: authorId } },
          },
          id
        );
        res.json({
          status: "ok",
          newuser: updatedPost,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async deletePost(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      try {
        const response = await PostDataBaseService.deleteDBPost(id);
        if (response) {
          res.json({
            status: "ok",
            message: "Post deletado com sucesso",
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
}

export default new PostController();