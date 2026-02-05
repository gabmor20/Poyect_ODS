import express, {type Request, type Response} from "express";

class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.routes();
    }

    private routes(): void{
        this.app.get("/", (req: Request, res: Response)=> res.send("Hello World!"));
         this.app.get("/health", (req: Request, res: Response)=> res.send("Health check OK!"));
    }

    getApp(){
        return this.app;
    }
}

export default new App().getApp();