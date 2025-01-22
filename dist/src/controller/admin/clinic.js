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
exports.viewAllEntries = exports.deleteEntry = exports.updateEntry = exports.addEntry = void 0;
const patients_1 = __importDefault(require("../../model/patients")); // Path to the model
// Add a new patient entry
const addEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone, email } = req.body;
        // Create a new Entry
        const newEntry = new patients_1.default({
            name,
            address,
            phone,
            email,
        });
        // Save the entry to the database
        yield newEntry.save();
        return res.status(200).json({ message: "Entry Added Successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.addEntry = addEntry;
// Update an existing patient entry
const updateEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, address, phone, email } = req.body;
        // Find the patient by ID and update the fields
        const updatedEntry = yield patients_1.default.findByIdAndUpdate(id, { name, address, phone, email }, { new: true } // Return the updated document
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res
            .status(200)
            .json({ message: "Clinic updated successfully", data: updatedEntry });
    }
    catch (error) {
        next(error);
    }
});
exports.updateEntry = updateEntry;
// Delete a patient entry
const deleteEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        // Find and delete the patient by ID
        const deletedEntry = yield patients_1.default.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Clinic deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEntry = deleteEntry;
// View all patient entries with pagination
const viewAllEntries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    catch (error) {
        next(error);
    }
});
exports.viewAllEntries = viewAllEntries;
