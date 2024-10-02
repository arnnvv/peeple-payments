"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { useSetRecoilState } from "recoil";
import { canSubmitAtom } from "@/lib/atoms";
import { razorpayOrderAction, razorpayVerifyAction } from "@/action";
import { checkIfUserHasBasicPlan, updateUserPlan } from "@/lib/userplan";

enum Plan {
    BASIC = "basic",
    PREMIUM = "premium",
}

export default function P(): JSX.Element {
    const setCanSubmit = useSetRecoilState(canSubmitAtom);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { slug } = useParams(); // Get the slug from the URL
    const currency: string = "INR";
    let amount: number;

    useEffect(() => {

        const initiatePayment = async (): Promise<void> => {
            console.log("mamta")
            console.log(`slug ki value ${slug[0]}`) // Log the slug value
            const [email, plan] = String(slug).split('-');
            const decodedEmail = decodeURIComponent(email);

            console.log(decodedEmail); // "ayush_g@ar.iitr.ac.in"
            console.log(plan);
            // Determine the amount based on the plan
            if (plan === Plan.BASIC) {
                amount = 39;
            } else if (plan === Plan.PREMIUM) {
                console.log("yahan pahucha hoon me")
                const hasBasicPlan = await checkIfUserHasBasicPlan(email);
                console.log("plan dekhnege", hasBasicPlan) // API call to check
                amount = hasBasicPlan ? 40 : 79;
            } else {
                throw new Error("Invalid plan");
            }

            const orderId: string | undefined = await createOrderId(amount, currency);
            if (!orderId) throw new Error("Razorpay order id not defined");
            const key_id: string | undefined = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!key_id || key_id.length === 0) throw new Error("Razorpay key id not defined");

            try {
                const paymentObject = new (window as any).Razorpay({
                    key: key_id,
                    amount: amount * 100,
                    currency,
                    name: "Spam CHK",
                    description: "Not a Spam",
                    order_id: orderId,
                    handler: async (res: { razorpay_payment_id: string, razorpay_signature: string }): Promise<void> => {
                        const result = await razorpayVerifyAction({
                            orderCreationId: orderId,
                            razorpayPaymentId: res.razorpay_payment_id,
                            razorpaySignature: res.razorpay_signature,
                        });

                        if (result.isOk) {
                            // Update the user's plan in the database
                            await updateUserPlan(email, plan);
                            toast.success(result.message, {
                                id: "verify",
                                action: {
                                    label: "Dismiss",
                                    onClick: (): string | number => toast.dismiss("verify"),
                                },
                            });
                            setCanSubmit(true);
                            router.push("/");
                        } else {
                            toast.error(result.message, {
                                id: "not-verified",
                                action: {
                                    label: "Dismiss",
                                    onClick: (): string | number => toast.dismiss("not-verified"),
                                },
                            });
                        }
                    },
                    theme: {
                        color: "#3399cc",
                    },
                });

                paymentObject.on("payment.failed", (response: { error: { description: string } }) => {
                    toast.error(response.error.description, {
                        id: "payment-failed",
                        action: {
                            label: "Dismiss",
                            onClick: (): string | number => toast.dismiss("payment-failed"),
                        },
                    });
                });

                setLoading(false);
                paymentObject.open();
            } catch (e) {
                console.error(e);
            }
        };

        initiatePayment();
    }, [slug]); // Add slug to the dependency array

    const createOrderId = async (
        amount: number,
        currency: string,
    ): Promise<string | undefined> => {
        try {
            const id: string = await razorpayOrderAction(amount, currency);
            return id;
        } catch (e) {
            console.error(e);
        }
    };





    return (
        <section className="container h-screen flex flex-col justify-center items-center gap-10">
            {loading ? (
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Processing Payment...</h1>
            ) : (
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Payment Completed</h1>
            )}
        </section>
    );
}
