import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prisma/prisma";
const { MERCADO_PAGO_ACCESS_TOKEN, NEXT_PUBLIC_BASE_URL } = process.env;

const api = axios.create({
  baseURL: "https://api.mercadopago.com/v1",
  headers: {
    Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
  },
});

type OrderData = {
  productId: string;
  customerName: string;
  customerPhone: string;
  customerCPF: string;
  customerEmail: string;
  status: string;
  paymentMethod: string;
};

export async function createPayment(orderData: OrderData) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: orderData.productId },
    });
    const paymentData = {
      transaction_amount: product?.price,
      description: product?.description,
      payment_method_id: orderData.paymentMethod,
      notification_url: `${NEXT_PUBLIC_BASE_URL}api/trpc/payment.webhook?source_news=webhooks`,
      payer: {
        email: orderData.customerEmail,
        first_name: orderData.customerName,
        identification: {
          type: "CPF",
          number: orderData.customerCPF,
        },
      },
    };

    const respostaPagamento = await api.post("/payments", paymentData, {
      headers: {
        "X-Idempotency-Key": uuidv4(),
      },
    });
    const { id, point_of_interaction } = respostaPagamento.data;
    const {
      qr_code,
      qr_code_base64,
    }: { qr_code?: string; qr_code_base64?: string } =
      point_of_interaction.transaction_data;

    console.log("Pagamento criado com sucesso:", id);
    return { qr_code, qr_code_base64 };
  } catch (error: any) {
    console.error(
      "Erro ao criar pagamento:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function verificarPagamento(id: string) {
  try {
    const respostaPagamento = await api.get(`/payments/${id}`);
    //console.log("Detalhes do pagamento:", respostaPagamento.data);

    const status = respostaPagamento.data.status;
    console.log("Status do pagamento:", status);

    if (status === "approved") {
      console.log("Pagamento aprovado!");
    } else {
      console.log("Pagamento ainda não aprovado.");
    }
    return respostaPagamento.data;
  } catch (error: any) {
    console.error(
      "Erro ao verificar pagamento:",
      error.response?.data || error.message
    );
    throw error;
  }

  async function requestRefund(paymentId: string, amount?: number) {
    try {
      // Data for the refund
      const refundData = {
        amount, // The amount is optional; if not provided, the refund will be full.
      };

      // Request the refund
      const refundResponse = await api.post(
        `/payments/${paymentId}/refunds`,
        refundData
      );

      console.log("Refund requested successfully:", refundResponse.data);

      return refundResponse.data;
    } catch (error: any) {
      console.error(
        "Error requesting refund:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

export async function requestRefund(paymentId: string, amount?: number) {
  try {
    // Data for the refund
    const refundData = {
      amount, // The amount is optional; if not provided, the refund will be full.
    };

    // Request the refund
    const refundResponse = await api.post(
      `/payments/${paymentId}/refunds`,
      refundData
    );

    console.log("Refund requested successfully:", refundResponse.data);

    return refundResponse.data;
  } catch (error: any) {
    console.error(
      "Error requesting refund:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// async function main() {
//   //const id = await criarPagamento();
//   // Aguarde alguns segundos antes de verificar o status do pagamento
//   // setTimeout(async () => {
//   // 	await verificarPagamento(id);
//   // }, 10000); // 10 segundos
// }

// main().catch((error) => console.error("Erro na execução:", error.message));
