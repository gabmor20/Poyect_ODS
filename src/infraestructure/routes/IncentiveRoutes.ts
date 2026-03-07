import { Router } from "express";
import { IncentiveController } from "../controller/IncentiveController";

/**

 * @param controller 
 */
export function createIncentiveRouter(controller: IncentiveController): Router {
  const router = Router();

 
  router.get("/calcular/:userId/:year", (req, res) => controller.calculate(req, res));

  return router;
}



