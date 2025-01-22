"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { body, param, query, validationResult } = require("express-validator");
const clinic_1 = require("../../controller/admin/clinic");
const { validateNumberParams, validateStringParams, validateEmail, } = require("../../middleware/validator");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Add Entry
router.post("/addEntry", validateStringParams("name"), validateEmail("email"), validateStringParams("address"), validateNumberParams("phone"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    (0, clinic_1.addEntry)(req, res, next);
}));
// Update Entry
router.put("/updateEntry", validateStringParams("name"), validateEmail("email"), validateStringParams("address"), validateNumberParams("phone"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    (0, clinic_1.updateEntry)(req, res, next);
}));
// Delete Entry
router.delete("/deleteEntry", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    (0, clinic_1.deleteEntry)(req, res, next);
}));
router.get("/viewAllEntries", [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
    query("pageSize")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Page size must be between 1 and 100"),
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Pass pagination values to the viewAllEntries controller
    (0, clinic_1.viewAllEntries)(req, res, next);
}));
exports.default = router;
