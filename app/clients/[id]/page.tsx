import { notFound } from "next/navigation";
import { clients, getClient } from "@/lib/data";
import ClientDetail from "./ClientDetail";

export function generateStaticParams() {
  return clients.map((c) => ({ id: c.id }));
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id);
  if (!client) notFound();
  return <ClientDetail id={params.id} />;
}
