
export async function sendInviteEmail({
  email,
  name,
  role,
  inviteUrl,
}: {
  email: string;
  name: string;
  role: string;
  inviteUrl: string;
}) {
  const res = await fetch(
    "https://ebbrpjoahugmkvuoafvx.functions.supabase.co/send-invite-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role, inviteUrl }),
    }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erro ao enviar convite por email");
  }

  return await res.json();
}
