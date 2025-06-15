
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DocumentFile {
  id: string;
  file_path: string;
  uploaded_at: string;
}

const getFileExtension = (filename: string | undefined) => {
  if (!filename) return "";
  return filename.split(".").pop()?.toLowerCase() || "";
};

const isImage = (filename: string | undefined) => {
  const ext = getFileExtension(filename);
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
};

const isPDF = (filename: string | undefined) => getFileExtension(filename) === "pdf";

const Documents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Filtra os arquivos exibidos conforme a ordem
  const sortedFiles = [...files].sort((a, b) =>
    sortOrder === "desc"
      ? new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      : new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
  );

  // Fetch documents for logged user
  useEffect(() => {
    if (!user?.id) return;
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        toast({ title: "Erro ao buscar documentos", description: error.message, variant: "destructive" });
      } else {
        setFiles(data);
      }
    };
    fetchDocuments();
  }, [user, toast]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      toast({ title: "Precisa estar logado para enviar arquivos.", variant: "destructive" });
      return;
    }
    const file = inputFileRef.current?.files?.[0];
    if (!file) {
      toast({ title: "Nenhum arquivo selecionado!", variant: "destructive" });
      return;
    }
    setUploading(true);
    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file);
    if (uploadError) {
      toast({ title: "Erro ao fazer upload", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { error: dbError, data: dbData } = await supabase
      .from("documents")
      .insert([{ file_path: filePath, user_id: user.id }])
      .select()
      .single();
    if (dbError) {
      toast({ title: "Erro ao salvar registro", description: dbError.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    toast({ title: "Arquivo enviado com sucesso!" });
    setFiles((prev) => [dbData, ...prev]);
    if (inputFileRef.current) inputFileRef.current.value = "";
    setUploading(false);
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"img" | "pdf" | null>(null);
  const [previewFilename, setPreviewFilename] = useState<string | null>(null);

  const handlePreview = async (file_path: string) => {
    const filename = file_path.split("/").pop();
    if (!filename) return;
    setPreviewFilename(filename);

    const { data, error } = await supabase.storage.from("documents").download(file_path);
    if (error || !data) {
      toast({ title: "Erro ao carregar visualização", description: error?.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    if (isImage(filename)) {
      setPreviewType("img");
      setPreviewUrl(url);
    } else if (isPDF(filename)) {
      setPreviewType("pdf");
      setPreviewUrl(url);
    } else {
      setPreviewType(null);
      setPreviewUrl(null);
      toast({ title: "Preview não suportado para este tipo de arquivo." });
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewType(null);
    setPreviewFilename(null);
  };

  const handleDownload = async (file_path: string) => {
    const { data, error } = await supabase.storage.from("documents").download(file_path);
    if (error || !data) {
      toast({ title: "Erro ao baixar arquivo", description: error?.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = file_path.split("/").pop() || "arquivo";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-10">
        <h1 className="font-bold text-2xl mb-6">Documentos</h1>
        <form onSubmit={handleUpload} className="flex gap-2 mb-8 items-center">
          <Input ref={inputFileRef} type="file" accept="*/*" disabled={uploading} />
          <Button type="submit" disabled={uploading}>
            {uploading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-gray-600 text-sm">Ordenar por data:</span>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as "desc" | "asc")}
            className="border rounded px-2 py-1 bg-white text-gray-800 text-sm"
          >
            <option value="desc">Mais recentes</option>
            <option value="asc">Mais antigos</option>
          </select>
        </div>
        <div>
          <h2 className="text-lg mb-4 font-semibold text-gray-800">Seus arquivos enviados</h2>
          {files.length === 0 && (
            <div className="text-gray-500 italic">Nenhum arquivo enviado.</div>
          )}
          <ul className="space-y-3">
            {sortedFiles.map((doc) => {
              const filename = doc.file_path.split("/").pop();
              return (
                <li key={doc.id} className="flex justify-between items-center border rounded bg-white px-4 py-2">
                  <span className="truncate max-w-[160px]">{filename}</span>
                  <div className="flex items-center gap-2">
                    {(isImage(filename) || isPDF(filename)) && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handlePreview(doc.file_path)}
                        type="button"
                        className="min-w-[36px]"
                      >
                        Visualizar
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc.file_path)}>
                      Download
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* Modal de visualização */}
          {previewUrl && previewType && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
                  onClick={closePreview}
                  title="Fechar"
                >
                  ×
                </button>
                <div className="mb-3 font-semibold text-sm text-gray-700 truncate">{previewFilename}</div>
                {previewType === "img" && (
                  <img src={previewUrl} alt={previewFilename || "Preview"} className="max-h-[70vh] max-w-full mx-auto rounded" />
                )}
                {previewType === "pdf" && (
                  <iframe
                    src={previewUrl}
                    title={previewFilename || "Preview PDF"}
                    className="w-full min-h-[65vh] rounded border"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
