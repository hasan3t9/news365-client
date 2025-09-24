import React, { useState } from "react";
import axiosInstance from "../../../Hook/useAxios"; // your configured axios instance
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";
import axios from "axios";

export default function OCRUploader() {
  // ---------- OCR States ----------
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- PDF States ----------
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  // ---------- OCR Handlers ----------
  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first!");
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:2000/uploadOcr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(res.data.text.trim());
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet([{ Text: text }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OCR Text");
    XLSX.writeFile(wb, "ocr_text.xlsx");
  };

  const downloadCSV = () => {
    const ws = XLSX.utils.json_to_sheet([{ Text: text }]);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ocr_text.csv");
  };

  const downloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph({ children: [new TextRun(text)] })],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "ocr_text.docx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("ocr_text.pdf");
  };

  // ---------- PDF Handlers ----------
  const handlePdfChange = (e) => setPdfFile(e.target.files[0]);

  const handlePdfUpload = async () => {
    if (!pdfFile) return alert("Please select a PDF file first!");
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      setPdfLoading(true);
      const res = await axiosInstance.post("/pdf-to-excel", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pdf_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Error processing PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 max-w-4xl space-y-16">
      {/* ---------------- OCR Section ---------------- */}
      <section className="p-6 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OCR Image Upload
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Processing..." : "Upload & Extract Text"}
          </button>
        </div>

        {text && (
          <div className="mt-4 p-4 border rounded bg-white shadow-sm">
            <h3 className="font-semibold mb-2">Extracted Text:</h3>
            <textarea
              value={text}
              readOnly
              rows={6}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={downloadExcel}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Download Excel
              </button>
              <button
                onClick={downloadCSV}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Download CSV
              </button>
              <button
                onClick={downloadWord}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Download DOCX
              </button>
              <button
                onClick={downloadPDF}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </section>

      {/* --------------- PDF to Excel Section --------------- */}
      <section className="p-6 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-center">
          PDF to Excel / CSV
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            onClick={handlePdfUpload}
            disabled={pdfLoading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            {pdfLoading ? "Processing..." : "Upload & Download Excel"}
          </button>
        </div>
      </section>
    </div>
  );
}
