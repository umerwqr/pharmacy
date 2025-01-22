import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // To automatically add createdAt and updatedAt fields
  }
);

const Patient = mongoose.model("Patients", entrySchema);

export default Patient;
