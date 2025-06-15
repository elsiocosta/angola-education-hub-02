
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

const Documents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Fetch documents for logged user
  useEffect(() => {
    if (!user?.id) return;
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });
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
    // Save file to storage (bucket: "documents", path: "user_id/filename")
    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    // Crie bucket "documents" no painel do Supabase se ainda não existir
    const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file);
    if (uploadError) {
      toast({ title: "Erro ao fazer upload", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    // Salva registro na tabela documents
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

  const handleDownload = async (file_path: string) => {
    const { data, error } = await supabase.storage.from("documents").download(file_path);
    if (error || !data) {
      toast({ title: "Erro ao baixar arquivo", description: error?.message, variant: "destructive" });
      return;
    }
    // Baixa usando a API do navegador
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
        <div>
          <h2 className="text-lg mb-4 font-semibold text-gray-800">Seus arquivos enviados</h2>
          {files.length === 0 && (
            <div className="text-gray-500 italic">Nenhum arquivo enviado.</div>
          )}
          <ul className="space-y-3">
            {files.map((doc) => (
              <li key={doc.id} className="flex justify-between items-center border rounded bg-white px-4 py-2">
                <span className="truncate">{doc.file_path.split("/").pop()}</span>
                <Button size="sm" variant="outline" onClick={() => handleDownload(doc.file_path)}>
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
