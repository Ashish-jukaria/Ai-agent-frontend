import { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FASTAPI_URL = "http://localhost:8000";

export default function PdfUploader() {
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const { getToken } = useAuth();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadingPdf(true);
    setUploadStatus("Uploading...");

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${FASTAPI_URL}/upload-pdf`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setUploadStatus("PDF uploaded and stored successfully!");
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch {
      setUploadStatus("Upload failed.");
    } finally {
      setUploadingPdf(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="border-border/60 bg-linear-to-r from-slate-50 to-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Knowledge Base Context (PDF)</p>
              <p className="text-xs text-muted-foreground">Upload documents to enrich the assistant’s answers.</p>
            </div>
          </div>

          <Button size="sm" variant="secondary" className="relative h-10 cursor-pointer rounded-full border border-border/70 bg-background px-4 shadow-sm" disabled={uploadingPdf}>
            {uploadingPdf ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="mr-1.5 h-3.5 w-3.5" />
            )}
            {uploadingPdf ? "Uploading..." : "Upload File"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploadingPdf}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </Button>
        </div>
      </Card>

      {uploadStatus && (
        <div className="flex items-center gap-1.5 px-1">
          <Badge variant={uploadStatus.includes('Stored') ? "default" : "destructive"} className="rounded-full text-[11px]">
            {uploadStatus.includes('Stored') ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <AlertCircle className="mr-1 h-3 w-3" />
            )}
            {uploadStatus}
          </Badge>
        </div>
      )}
    </div>
  );
}
