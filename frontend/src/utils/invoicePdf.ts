import { jsPDF } from "jspdf";
import type { Invoice } from "../types/invoice";

export function downloadInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice", 20, 20);

  doc.setFontSize(12);
  let y = 35;

  doc.text(`Client: ${invoice.clientName}`, 20, y);
  y += 8;
  doc.text(`Phone: ${invoice.clientPhone}`, 20, y);
  y += 8;
  doc.text(`Amount: ₹${invoice.amount}`, 20, y);
  y += 8;
  doc.text(`Due Date: ${invoice.dueDate}`, 20, y);
  y += 8;
  doc.text(`Status: ${invoice.status}`, 20, y);
  y += 8;
  doc.text("Description:", 20, y);
  y += 8;

  const split = doc.splitTextToSize(invoice.description, 170);
  doc.text(split, 20, y);

  const fileName = `invoice-${invoice.clientName.replace(/\s+/g, "-")}-${invoice.dueDate}.pdf`;
  doc.save(fileName);
}
