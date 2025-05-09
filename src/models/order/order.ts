import mongoose from "mongoose";
import { OrderInterface } from "./types/orderInterface";
import { OrderState } from "./types/orderState";
import { OrderPaymentMethod } from "./types/orderPaymentMethod";
import { AdditionalInfoSchema } from "./types/additionalInfo";
import { NormalAddressSchema } from "./types/normalAddress";
import { LegalAddressSchema } from "./types/legalAddress";
import { Client } from "../client/client";
import { DeliveryMethod } from "./types/deliveryMethod";
import { nanoid } from "nanoid";
import { DeliveryDetailsSchema } from "./types/deliveryDetails";
import { CartProductsSchema } from "./types/cartProducts";

// Order Schema
const OrderSchema = new mongoose.Schema<OrderInterface>({
    custom_id: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(8)
    },
    products: [{
        type: CartProductsSchema,
        required: true
    }],
    client: {
        type: 'ObjectId',
        ref: "Client",
        required: true
    },
    additional_info: {
        type: AdditionalInfoSchema,
        required: true
    },
    state: {
        type: String,
        enum: OrderState,
        required: true,
        default: OrderState.NotPaid
    },
    payment_method: {
        type: String,
        enum: OrderPaymentMethod,
        required: true
    },
    delivery_method: {
        type: String,
        enum: DeliveryMethod,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    delivery_details: {
        type: DeliveryDetailsSchema,
        required: false
    }
}, {timestamps: true});

OrderSchema.pre("findOneAndDelete", async function(next) {
    try {
      const orderId = this.getQuery()._id;
      const order = await this.model.findById(orderId);
      
      if (order && order.client) {
        await Client.updateOne(
          { _id: order.client },
          { $pull: { orders: order._id } }
        );
      }
      next();
    } catch (error) {
      console.error(error);
    }
  });

OrderSchema.path<mongoose.Schema.Types.Subdocument>('additional_info.billing_address').discriminator('NATURAL', NormalAddressSchema);
OrderSchema.path<mongoose.Schema.Types.Subdocument>('additional_info.billing_address').discriminator('LEGAL', LegalAddressSchema);

const Order = mongoose.models.Order || mongoose.model<OrderInterface>("Order", OrderSchema);

export { Order };