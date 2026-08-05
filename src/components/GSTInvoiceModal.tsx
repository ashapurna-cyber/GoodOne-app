import React from 'react';
import { useApp } from '../context/AppContext';
import { generateGSTInvoice } from '../utils/invoiceGenerator';
import { X, Printer, Download, ShieldCheck, Building2 } from 'lucide-react';

export const GSTInvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder } = useApp();

  if (!invoiceOrder) return null;

  const invoice = generateGSTInvoice(invoiceOrder);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative my-8 space-y-6 print:shadow-none print:border-none print:m-0 print:w-full">
        {/* Modal Controls (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-800">GST Tax Invoice Preview</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Invoice Document */}
        <div id="printable-invoice" className="space-y-6 text-xs text-slate-800">
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <div className="text-2xl font-black italic text-blue-600">
                Good<span className="text-yellow-500 not-italic">One</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Retail E-Commerce Pvt. Ltd.
              </p>
              <p className="text-[11px] text-slate-600 max-w-xs mt-1">
                {invoice.sellerDetails.address}
              </p>
              <p className="text-[11px] font-bold text-slate-700 mt-1">
                GSTIN: {invoice.sellerDetails.gstin} | PAN: {invoice.sellerDetails.pan}
              </p>
            </div>

            <div className="text-right">
              <span className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-widest inline-block mb-2">
                TAX INVOICE
              </span>
              <p className="font-extrabold text-sm text-slate-900">
                Invoice No: {invoice.invoiceNumber}
              </p>
              <p className="text-slate-500">Invoice Date: {invoice.invoiceDate}</p>
              <p className="text-slate-500">Order ID: {invoice.orderId}</p>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Billed & Shipped To:</span>
              <h4 className="font-extrabold text-slate-900 text-sm">{invoice.buyerDetails.name}</h4>
              <p className="text-slate-600 mt-0.5">{invoice.buyerDetails.address}</p>
              <p className="text-slate-600 mt-0.5">Phone: {invoice.buyerDetails.phone}</p>
              <p className="text-slate-600">Email: {invoice.buyerDetails.email}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Place of Supply:</span>
              <p className="font-bold text-slate-800">{invoiceOrder.shippingAddress.state} (State Code 29)</p>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-2">Reverse Charge:</span>
              <p className="font-bold text-slate-800">NO</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-[11px] font-bold text-slate-700 uppercase">
                  <th className="p-2 border border-slate-200">Sl</th>
                  <th className="p-2 border border-slate-200">Description</th>
                  <th className="p-2 border border-slate-200">HSN</th>
                  <th className="p-2 border border-slate-200 text-center">Qty</th>
                  <th className="p-2 border border-slate-200 text-right">Taxable Val</th>
                  <th className="p-2 border border-slate-200 text-right">CGST (9%)</th>
                  <th className="p-2 border border-slate-200 text-right">SGST (9%)</th>
                  <th className="p-2 border border-slate-200 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.slNo} className="border border-slate-200">
                    <td className="p-2 border border-slate-200 font-medium">{item.slNo}</td>
                    <td className="p-2 border border-slate-200 font-bold">{item.description}</td>
                    <td className="p-2 border border-slate-200">{item.hsnCode}</td>
                    <td className="p-2 border border-slate-200 text-center font-bold">{item.qty}</td>
                    <td className="p-2 border border-slate-200 text-right">₹{item.taxableValue.toLocaleString('en-IN')}</td>
                    <td className="p-2 border border-slate-200 text-right">₹{item.cgstAmount.toLocaleString('en-IN')}</td>
                    <td className="p-2 border border-slate-200 text-right">₹{item.sgstAmount.toLocaleString('en-IN')}</td>
                    <td className="p-2 border border-slate-200 text-right font-black">₹{item.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-right font-medium text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Taxable Value:</span>
                <span>₹{invoice.totalTaxableValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Central Tax (CGST 9%):</span>
                <span>₹{invoice.totalCGST.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">State Tax (SGST 9%):</span>
                <span>₹{invoice.totalSGST.toLocaleString('en-IN')}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount Savings:</span>
                  <span>- ₹{invoice.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t-2 border-slate-900 pt-2 flex justify-between font-black text-sm text-slate-900">
                <span>Grand Total:</span>
                <span className="text-blue-600">₹{invoice.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Declaration */}
          <div className="border-t border-slate-200 pt-4 flex items-end justify-between text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Terms & Conditions:</p>
              <p>1. Goods once sold can be replaced within 7 days under warranty policy.</p>
              <p>2. This is a computer generated tax invoice and requires no physical signature.</p>
            </div>

            <div className="text-center font-bold text-slate-700">
              <div className="h-10 border-b border-slate-300 w-32 mx-auto mb-1 flex items-center justify-center italic text-blue-600 text-xs">
                GoodOne Authorized
              </div>
              <span>Authorized Signatory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
