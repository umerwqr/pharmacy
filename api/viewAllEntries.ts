import { Response, Request, NextFunction } from "express";
import patient from "../src/model/patients"; // Path to the model

export default async function handler(req: Request, res: Response) {
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
  } catch (error) {}
}
