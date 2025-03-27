import mongoose from "mongoose";
import { ClientInterface } from "./types/clientInterface";

// User Schema
const ClientSchema = new mongoose.Schema<ClientInterface>({
  email: {
    type: String,
    required: true,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  }]
});

const Client = mongoose.models.Client || mongoose.model<ClientInterface>("Client", ClientSchema);

export { Client };