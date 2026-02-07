import express, {type Request, type Response} from "express";
import userRoutes from "../routes/UserRoutes"; 


  class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.app.use(express.json()); 
        this.routes();
    }

   private routes(): void {
    this.app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
    this.app.get("/health", (req: Request, res: Response) => res.send("Health check OK!"));


    this.app.use("/users", userRoutes); 
}

    getApp(){
        return this.app;
    }
}

export default new App().getApp();