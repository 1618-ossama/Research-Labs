'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; 
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  journal: string;
  doi: string;
  status: string;
  visibility: string;
  submitter_id: string;
  conference_id: string;
  submitted_at: string;
}

interface Conference {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;  // assuming ISO string
  end_date: string;    // assuming ISO string
  publications: Publication[];
}

interface Props {
  params: {
    id: string;
  };
}

export default function ConferencePage({ params }: Props) {
  const [conference, setConference] = useState<Conference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Controlled input state for adding a publication
  const [newPubId, setNewPubId] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Fetch conference + publications data once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const confRes = await fetch(`http://localhost:3009/api/conferences/${params.id}`);
        if (!confRes.ok) {
          setError("Conference not found");
          setLoading(false);
          return;
        }
        const confData = await confRes.json();

        const pubsRes = await fetch(`http://localhost:3009/api/conferences/${params.id}/publications`);
        let pubs: Publication[] = [];
        if (pubsRes.ok) {
          pubs = await pubsRes.json();
        }

        setConference({ ...confData, publications: pubs });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch conference data.");
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  // Add publication handler
async function addPublication() {
  if (!newPubId.trim()) {
    setAddError("Please enter a publication ID.");
    return;
  }
  setAdding(true);
  setAddError(null);

  try {
      console.log("========");
      console.log(params.id);
      console.log("========");
    const res = await fetch(`http://localhost:3009/api/conference/link-publication`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conference_id: params.id,
        publication_ids: [newPubId.trim()],
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setAddError(data.error || "Failed to add publication.");
      setAdding(false);
      return;
    }

    // Backend might return something like success or list of linked publications.
    // Assuming it returns the linked publications list:
    const linkedPubs: Publication[] = await res.json();

    // Add the newly linked publication(s) to the state:
    setConference((conf) =>
      conf
        ? {
            ...conf,
            publications: [...conf.publications, ...linkedPubs],
          }
        : null,
    );

    setNewPubId("");
  } catch {
    setAddError("Network error while adding publication.");
  } finally {
    setAdding(false);
  }
}
  // Optional: remove publication locally & on backend
  async function removePublication(pubId: string) {
    if (!conference) return;

    try {
      const res = await fetch(`http://localhost:3009/api/conferences/${params.id}/publications/${pubId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to remove publication.");
        return;
      }
      setConference({
        ...conference,
        publications: conference.publications.filter((p) => p.id !== pubId),
      });
    } catch {
      alert("Network error while removing publication.");
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!conference) return null;

  // Parse dates for display
  const startDate = new Date(conference.start_date);
  const endDate = new Date(conference.end_date);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">

      {/* Conference info */}
      <Card>
        <CardContent className="p-6 space-y-2">
          <h1 className="text-3xl font-bold">{conference.name}</h1>
          <p className="text-gray-600">{conference.description}</p>
          <div className="flex items-center gap-4 text-gray-500 mt-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{conference.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add publication */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Add Publication to Conference</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Publication ID"
            className="border rounded px-3 py-1 flex-grow"
            value={newPubId}
            onChange={(e) => setNewPubId(e.target.value)}
            disabled={adding}
          />
          <button
            onClick={addPublication}
            disabled={adding}
            className={`px-4 rounded text-white ${adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
        {addError && <p className="text-red-600 mt-1">{addError}</p>}
      </div>

      {/* Publications list */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Publications</h2>
        {conference.publications.length > 0 ? (
          <div className="grid gap-4">
            {conference.publications.map((pub) => (
              <Card key={pub.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200 relative">
                <CardContent className="p-4 space-y-1">
                  <h3 className="text-xl font-bold">
                    {pub.doi && pub.doi !== "0" ? (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <p className="text-gray-600">{pub.journal}</p>
                  {pub.doi && pub.doi !== "0" && (
                    <p className="text-sm text-gray-400">
                      DOI:{" "}
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {pub.doi}
                      </a>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{pub.status}</Badge>
                    <Badge variant="secondary">{pub.visibility}</Badge>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removePublication(pub.id)}
                    className="absolute top-2 right-2 text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No publications linked to this conference.</p>
        )}
      </div>
    </div>
  );
}
