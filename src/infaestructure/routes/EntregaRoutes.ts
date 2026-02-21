import { Router } from "express";
import { EntregaController } from "../controller/entregaController";
import { createEntregaValidation } from "../util/entrega-validation";
import { updateEntregaValidation } from "../util/entrega-update-validation";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

const router = Router();

/**
 * =========================================
 * CREAR ENTREGA
 * =========================================
 * POST /entregas
 */
router.post(
  "/",
  createEntregaValidation,
  validateRequest,
  EntregaController.create
);

/**
 * =========================================
 * ACTUALIZAR ESTADO
 * =========================================
 * PUT /entregas/:id
 */
router.put(
  "/:id",
  updateEntregaValidation,
  validateRequest,
  EntregaController.updateEstado
);
/**
 * =========================================
 * OBTENER TODAS LAS ENTREGAS
 * =========================================
 * GET /entregas
 */
router.get("/", EntregaController.getAll);

/**
 * =========================================
 * OBTENER ENTREGAS POR BENEFICIARIO
 * =========================================
 * GET /entregas/beneficiario/:id
 */
router.get(
  "/beneficiario/:id",
  EntregaController.getByBeneficiario
);

/**
 * =========================================
 * OBTENER ENTREGA POR ID
 * =========================================
 * GET /entregas/:id
 */
router.get(
  "/:id",
  EntregaController.getById
);


export default router;