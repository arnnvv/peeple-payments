"use server";
import { createHmac } from "crypto";
import { razorpay } from "./lib/payment";
export const razorpayOrderAction = async (
  amount: number,
  currency: string,
): Promise<string> => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency,
  });
  if (!order) throw new Error("Razorpay order action failed");
  if (!order.id) throw new Error("Razorpay order id not defined");
  return order.id;
};
export const razorpayVerifyAction = async ({
  orderCreationId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<{ message: string; isOk: boolean }> => {
  const razorpayKeySecret: string | undefined =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;
  if (!razorpayKeySecret || razorpayKeySecret.length === 0)
    throw new Error("Razorpay key secret not found");

  return createHmac("sha256", razorpayKeySecret)
    .update(orderCreationId + "|" + razorpayPaymentId)
    .digest("hex") === razorpaySignature
    ? { message: "payment verified successfully", isOk: true }
    : { message: "payment verification failed", isOk: false };
};
