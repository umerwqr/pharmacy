/**
 * File:    Validator.ts
 *
 * Author1:  Muhammad Umer Waqar
 * Date:     Dec 2023
 * Partner:  I worked alone
 * Course:   Vrda1
 *
 * Summary of File:
 *
 *   This file contains code relating to admin who can add, update, delete entry of patient and view all entries.
 *
 */
import { Response, Request, NextFunction } from "express";
import patient from "../../model/patients"; // Path to the model

// Add a new patient entry
const addEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address, phone, email } = req.body;
    // Create a new Entry
    const newEntry = new patient({
      name,
      address,
      phone,
      email,
    });

    // Save the entry to the database
    await newEntry.save();
    return res.status(200).json({ message: "Entry Added Successfully" });
  } catch (error) {
    next(error);
  }
};

// Update an existing patient entry
const updateEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, address, phone, email } = req.body;

    // Find the patient by ID and update the fields
    const updatedEntry = await patient.findByIdAndUpdate(
      id,
      { name, address, phone, email },
      { new: true } // Return the updated document
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res
      .status(200)
      .json({ message: "Clinic updated successfully", data: updatedEntry });
  } catch (error) {
    next(error);
  }
};

// Delete a patient entry
const deleteEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    // Find and delete the patient by ID
    const deletedEntry = await patient.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({ message: "Clinic deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// View all patient entries with pagination
const viewAllEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get page and pageSize from query params (default to 1 and 10)
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    // Calculate the skip value for pagination
    const skip = (page - 1) * pageSize;

    // Fetch paginated patient entries
    const patients = await patient
      .find()
      .skip(skip) // Skip the first N records
      .limit(pageSize); // Limit the number of records returned

    // Get total number of entries for pagination metadata
    const totalEntries = await patient.countDocuments();

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
  } catch (error) {
    next(error);
  }
};

export { addEntry, updateEntry, deleteEntry, viewAllEntries };
