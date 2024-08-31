import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const { MERCADO_PAGO_ACCESS_TOKEN, NEXT_PUBLIC_BASE_URL } = process.env;

const api = axios.create({
  baseURL: "https://api.mercadopago.com/v1",
  headers: {
    Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
  },
});

type PaymentData = {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  notification_url?: string;
  payer: {
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      type: string;
      number: string;
    };
  };
};

const placeholder: PaymentData = {
  transaction_amount: 5.0,
  description: "Compra Teste",
  payment_method_id: "pix",
  payer: {
    email: "email_teste@exemplo.com",
    first_name: "Nome",
    last_name: "Sobrenome",
    identification: {
      type: "CPF",
      number: "01234567890",
    },
  },
};

export async function createPayment(paymentData: PaymentData | null) {
  try {
    const pagamentoData = placeholder;
    pagamentoData.notification_url = `${NEXT_PUBLIC_BASE_URL}/api/trpc/payment.webhook?source_news=webhooks`;
    console.log(pagamentoData.notification_url);

    const respostaPagamento = await api.post("/payments", pagamentoData, {
      headers: {
        "X-Idempotency-Key": uuidv4(),
      },
    });
    const { id, point_of_interaction } = respostaPagamento.data;

    console.log("Pagamento criado com sucesso:", id);
    console.log(
      "QR Code disponível em:",
      point_of_interaction.transaction_data.qr_code
    );
    console.log(
      "Imagem do QR Code:",
      point_of_interaction.transaction_data.qr_code_base64
    );

    return { id, point_of_interaction };
  } catch (error: any) {
    console.error(
      "Erro ao criar pagamento:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// async function verificarPagamento(id: string) {
//   try {
//     const respostaPagamento = await api.get(`/payments/${id}`);
//     console.log("Detalhes do pagamento:", respostaPagamento.data);

//     const status = respostaPagamento.data.status;
//     console.log("Status do pagamento:", status);

//     if (status === "approved") {
//       console.log("Pagamento aprovado!");
//     } else {
//       console.log("Pagamento ainda não aprovado.");
//     }
//   } catch (error: any) {
//     console.error(
//       "Erro ao verificar pagamento:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// async function main() {
//   //const id = await criarPagamento();
//   // Aguarde alguns segundos antes de verificar o status do pagamento
//   // setTimeout(async () => {
//   // 	await verificarPagamento(id);
//   // }, 10000); // 10 segundos
// }

// main().catch((error) => console.error("Erro na execução:", error.message));
