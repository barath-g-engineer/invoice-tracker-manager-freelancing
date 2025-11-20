import type { Invoice } from "../types/invoice";

export function openWhatsAppForInvoice(invoice: Invoice) {
  const raw = invoice.clientPhone.trim();
  if (!raw) {
    alert("No client phone number found for this invoice.");
    return;
  }

  // remove spaces and non-digits except +
  const cleaned = raw.replace(/[^\d+]/g, "");

  const message = `Hi ${invoice.clientName},

Here is your invoice of ₹${invoice.amount}, due on ${invoice.dueDate}.

Please let me know once payment is done.`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${cleaned}?text=${encoded}`;

  const ok = confirm("Invoice downloaded. Open WhatsApp to send this to the client?");
  if (ok) {
    window.open(url, "_blank");
  }
}
