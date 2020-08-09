import jsPDF from "jspdf";
import "jspdf-autotable";
import T2W from "numbers2words";
import capitalizeFirstLetter from "./capitalizeFirstLetter";
import dayjs from "dayjs";
const INVGenerator = (dataArray) => () => {
  const invoice = dataArray.invoice;
  console.log("invoice", invoice);
  var now = dayjs();
  var translator = new T2W("EN_US");
  let data = [];
  let col = [
    { dataKey: "count", header: "Item" },
    { dataKey: "no", header: "Product No" },
    { dataKey: "des", header: "Description" },
    { dataKey: "qty", header: "Qty" },
    { dataKey: "price", header: "Price" },
    { dataKey: "amount", header: "Amount" },
  ];

  var doc = new jsPDF("p", "pt");
  doc.page = 1;
  var totalPagesExp = "{total_pages_count_string}";
  var width = doc.internal.pageSize.getWidth();
  var height = doc.internal.pageSize.getHeight();

  var header = function () {
    var str = doc.internal.getNumberOfPages().toString();
    if (typeof doc.putTotalPages === "function") {
      str = str + " of " + totalPagesExp;
    }
    doc.setFontSize(23);
    doc.setFontStyle("bold");
    doc.text(width - 150, 50, "INVOICE");

    doc.setFontSize(10);
    doc.setFontStyle("bold");
    doc.text(50, 100, "Bill To:");
    doc.setFontStyle("normal");
    doc.text(100, 100, invoice.salesOrder.shop.nameEn);
    doc.text(100, 115, invoice.salesOrder.shop.deliverAddress);
    doc.text(100, 130, "");
    doc.text(100, 145, "");
    doc.setFontStyle("bold");
    doc.text(50, 165, "Attn:");
    doc.setFontStyle("normal");
    doc.text(100, 165, invoice.salesOrder.shop.customer.nameEn);
    doc.setFontStyle("bold");
    doc.text(50, 180, "Tel:");
    doc.setFontStyle("normal");
    doc.text(100, 180, invoice.salesOrder.shop.phone ? invoice.salesOrder.shop.phone.toString() : "");
    doc.setFontStyle("bold");
    doc.text(200, 180, "Fax:");
    doc.setFontStyle("normal");
    doc.text(250, 180, invoice.salesOrder.shop.phone ? invoice.salesOrder.shop.phone.toString() : "");

    doc.setFontStyle("bold");
    doc.text(350, 100, "Date:");
    doc.setFontStyle("normal");
    doc.text(410, 100, now.format("DD/MMM/YYYY"));

    doc.setFontStyle("bold");
    doc.text(350, 115, "REF. No.:");
    doc.setFontStyle("normal");
    doc.text(410, 115, invoice.code);
    doc.setFontStyle("bold");
    doc.text(350, 130, "Cust. ID:");
    doc.setFontStyle("normal");
    doc.text(410, 130, invoice.salesOrder.shop.customer.code);
    doc.setFontStyle("bold");
    doc.text(350, 145, "Pay term:");
    doc.setFontStyle("normal");
    doc.text(410, 145, "");
    doc.setFontStyle("bold");
    doc.text(350, 160, "Ship Date:");
    doc.setFontStyle("normal");
    doc.text(410, 160, dayjs(invoice.shipmentDate).format("DD/MMM/YYYY"));
    doc.setFontStyle("bold");
    doc.text(350, 175, "Salesman:");
    doc.setFontStyle("normal");
    doc.text(410, 175, "");
    doc.setFontStyle("bold");
    doc.text(350, 190, "Page:");
    doc.setFontStyle("normal");
    doc.text(410, 190, str);

    doc.setLineWidth(1.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(50, 200, width - 50, 200);
    doc.line(50, 220, width - 50, 220);
  };

  var footer = function () {
    doc.setFontSize(7);
    doc.text(width - 40, height - 30, "Page - " + doc.page);
    doc.page++;
  };

  var options = {
    beforePageContent: header,
    afterPageContent: footer,
    theme: "striped",
    columnStyles: {
      count: { columnWidth: 30 },
      no: { columnWidth: 70 },
      des: { columnWidth: 270 },
      qty: { columnWidth: 30 },
      price: { columnWidth: 40 },
      amount: { columnWidth: 50, halign: "right" },
    },

    headStyles: { fillColor: false, textColor: "black" },
    style: { cellWidth: "auto" },
    margin: { top: 200, bottom: 100, horizontal: 50 },
  };

  invoice.salesOrder.products.map((item, index) => {
    let b = {
      count: index + 1,
      no: item.product.code,
      des: item.product.nameEn,
      qty: item.quantity,
      price: item.price,
      amount: item.totalPrice,
    };
    data.push(b);
  });

  doc.autoTable(col, data, options);
  doc.setFontSize(10);
  doc.setFontStyle("normal");
  doc.text(412, doc.autoTable.previous.finalY + 12, "Sub-total :");
  doc.text(width - 53 - 5 * invoice.salesOrder.subtotal.toFixed(1).toString().length, doc.autoTable.previous.finalY + 12, invoice.salesOrder.subtotal.toFixed(1).toString());
  doc.text(376, doc.autoTable.previous.finalY + 27, "Discount Amount :");
  doc.text(width - 47 - 5 * (invoice.salesOrder.discountAmount.toFixed(1).toString().length + 1), doc.autoTable.previous.finalY + 27, invoice.salesOrder.discountAmount.toFixed(1).toString());
  doc.text(400, doc.autoTable.previous.finalY + 47, "Grand Total :");
  doc.text(width - 53 - 5 * invoice.salesOrder.grandTotal.toFixed(1).toString().length, doc.autoTable.previous.finalY + 47, invoice.salesOrder.grandTotal.toFixed(1).toString());

  if (invoice.salesOrder.grandTotal === parseInt(invoice.salesOrder.grandTotal, 10)) {
    doc.text(50, doc.autoTable.previous.finalY + 70, "Say: Hong Kong Dollar " + capitalizeFirstLetter(translator.toWords(invoice.salesOrder.grandTotal)) + " ONLY.");
  } else {
    const strings = invoice.salesOrder.grandTotal.toFixed(1).toString().split(".");
    doc.text(50, doc.autoTable.previous.finalY + 70, "Say: Hong Kong Dollar " + capitalizeFirstLetter(translator.toWords(parseInt(strings[0]))) + " And " + capitalizeFirstLetter(translator.toWords(parseInt(strings[1] * 10))) + " CENTS ONLY.");
  }
  doc.setFontStyle("bold");
  doc.text(50, doc.autoTable.previous.finalY + 87, "Shipterm :");
  doc.setFontStyle("normal");
  doc.text(100, doc.autoTable.previous.finalY + 87, "Standard Delivery");
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(455, doc.autoTable.previous.finalY, width - 50, doc.autoTable.previous.finalY);
  doc.line(455, doc.autoTable.previous.finalY + 33, width - 50, doc.autoTable.previous.finalY + 33);
  doc.line(455, doc.autoTable.previous.finalY + 50, width - 50, doc.autoTable.previous.finalY + 50);
  doc.line(455, doc.autoTable.previous.finalY + 52, width - 50, doc.autoTable.previous.finalY + 52);
  doc.setLineWidth(1.5);
  doc.setDrawColor(0, 0, 0);
  doc.line(50, doc.autoTable.previous.finalY + 76, width - 50, doc.autoTable.previous.finalY + 76);
  doc.line(50, doc.autoTable.previous.finalY + 91, width - 50, doc.autoTable.previous.finalY + 91);
  doc.setFillColor(255, 255, 255);
  doc.rect(90, doc.autoTable.previous.finalY + 110, 430, 150, "FD");
  doc.setFontStyle("bold");
  doc.text(280, doc.autoTable.previous.finalY + 128, "REMARK");
  doc.setLineWidth(1);
  doc.line(100, doc.autoTable.previous.finalY + 134, 510, doc.autoTable.previous.finalY + 134);
  doc.line(100, doc.autoTable.previous.finalY + 248, 510, doc.autoTable.previous.finalY + 248);
  doc.text(100, doc.autoTable.previous.finalY + 145, "Payment Method: Cheque or Bank-In");
  doc.text(100, doc.autoTable.previous.finalY + 157, "Account Name: Petgo Trading Limited");
  doc.text(100, doc.autoTable.previous.finalY + 169, "Account No.: 741-149611-838");
  doc.text(100, doc.autoTable.previous.finalY + 181, "Bank Name: HSBC Hong Kong Bank Code: 004");
  doc.text(100, doc.autoTable.previous.finalY + 193, "SWIFT: HSBCHKHHHKH");
  doc.text(100, doc.autoTable.previous.finalY + 205, "*For Cheques, please write your Invoice No. on the back of the cheque.");
  doc.text(100, doc.autoTable.previous.finalY + 217, "*For Bank-In, please provide the Bank-In Slip to Petgo Trading Limited.");
  doc.text(100, doc.autoTable.previous.finalY + 229, "Cash");
  doc.text(100, doc.autoTable.previous.finalY + 241, "Cash On Delivery.");

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }
  doc.save("InvoiceGen.pdf");
};

export default INVGenerator;
