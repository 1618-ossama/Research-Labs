
// hooks/useConference.ts
import { useState, useEffect } from "react";
import { Conference } from "@/types/conference";
import { Publication } from "@/types/publication";

export function useConference(id: string) {
  const [conference, setConference] = useState<Conference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const confRes = await fetch(`http://localhost:3009/api/conferences/${id}`);
        if (!confRes.ok) throw new Error("Conference not found");

        const confData = await confRes.json();
        const pubsRes = await fetch(`http://localhost:3009/api/conferences/${id}/publications`);
        const pubs: Publication[] = pubsRes.ok ? await pubsRes.json() : [];

        setConference({ ...confData, publications: pubs });
      } catch (err: any) {
        setError(err.message || "Failed to fetch conference data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { conference, loading, error, setConference };
}
