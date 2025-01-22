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
import User from "../../model/users"; // Path to the model
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new User instance
    const newUser = new User({
      name,
      email,
      password,
      role, // Make sure to hash the password before saving (not shown here)
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    next(error);
  }
};
