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
exports.default = handler;
const patients_1 = __importDefault(require("../src/model/patients")); // Path to the model
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get page and pageSize from query params (default to 1 and 10)
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            // Calculate the skip value for pagination
            const skip = (page - 1) * pageSize;
            // Fetch paginated patient entries
            const patients = yield patients_1.default
                .find()
                .skip(skip) // Skip the first N records
                .limit(pageSize); // Limit the number of records returned
            // Get total number of entries for pagination metadata
            const totalEntries = yield patients_1.default.countDocuments();
            // Return paginated result with metadata
            return res.status(200).json({
                data: patients,
                pagination: {
                    totalEntries,
                    totalPages: Math.ceil(totalEntries / pageSize),
                    currentPage: page,
                    pageSize,
                },
            });
        }
        catch (error) { }
    });
}
