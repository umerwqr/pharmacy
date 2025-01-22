import express, { Request, Response, NextFunction } from "express";
const { body, param, query, validationResult } = require("express-validator");
import {
  addEntry,
  updateEntry,
  deleteEntry,
  viewAllEntries,
} from "../../controller/admin/clinic";
const {
  validateNumberParams,
  validateStringParams,
  validateEmail,
} = require("../../middleware/validator");

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
// Add Entry
router.post(
  "/addEntry",
  validateStringParams("name"),
  validateEmail("email"),
  validateStringParams("address"),
  validateNumberParams("phone"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    addEntry(req, res, next);
  }
);

// Update Entry
router.put(
  "/updateEntry",
  validateStringParams("name"),
  validateEmail("email"),
  validateStringParams("address"),
  validateNumberParams("phone"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    updateEntry(req, res, next);
  }
);

// Delete Entry
router.delete(
  "/deleteEntry",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    deleteEntry(req, res, next);
  }
);

router.get(
  "/viewAllEntries",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("pageSize")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Page size must be between 1 and 100"),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Pass pagination values to the viewAllEntries controller
    viewAllEntries(req, res, next);
  }
);

export default router;
