'use client';

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Select from "react-select"; // <-- import react-select
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Publication {
  id: string;
  title: string;
  journal: string;
  doi: string;
  status: string;
  visibility: string;
  submitter_id: string;
  conference_id: string | null;
  submitted_at: string;
}

interface Conference {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: number[];
  end_date: number[];
  publications: Publication[];
}

export default function ConferencePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const conferenceId = unwrappedParams.id;

  const [conference, setConference] = useState<Conference | null>(null);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [selectedPub, setSelectedPub] = useState<{ value: string; label: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const confRes = await fetch(`http://localhost:3009/api/conferences/${conferenceId}`);
        if (!confRes.ok) throw new Error("Conference not found");
        const confData = await confRes.json();

        const pubsRes = await fetch(`http://localhost:3009/api/conferences/${conferenceId}/publications`);
        let pubs: Publication[] = [];
        if (pubsRes.ok) {
          pubs = await pubsRes.json();
        }

        setConference({ ...confData, publications: pubs });

        const allPubsRes = await fetch(`http://localhost:3009/api/publications?unlinked=true`);
        if (!allPubsRes.ok) throw new Error("Failed to fetch all publications");
        const allPubsData: Publication[] = await allPubsRes.json();
        setAllPublications(allPubsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [conferenceId]);

async function handleAddPublication() {
  if (!selectedPub || !conference) return;

  setAdding(true);
  try {
    const res = await fetch(`http://localhost:3009/api/conference/link-publication`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conference_id: conference.id,
        publication_ids: [selectedPub.value],  
        user_id: "the-user-uuid",  
      }),
    });
    if (!res.ok) throw new Error("Failed to add publication");

    const newPub = allPublications.find((p) => p.id === selectedPub.value);
    if (newPub) {
      setConference({
        ...conference,
        publications: [...conference.publications, { ...newPub, conference_id: conference.id }],
      });
      setAllPublications(allPublications.filter((p) => p.id !== selectedPub.value));
      setSelectedPub(null);
      // alert("Publication added!");
    }
  } catch (error) {
    alert("Not Added");
  } finally {
    setAdding(false);
  }
}

  if (loading) return <p className="p-8 text-gray-600 text-center">Loading...</p>;
  if (!conference) return <p className="p-8 text-red-600 text-center">Conference not found</p>;

  const formatDate = (dateArr: number[]) => {
    const [year, month, day, hour, minute, second] = dateArr;
    return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString();
  };

  // Map allPublications to react-select format
  const selectOptions = allPublications.map((pub) => ({
    value: pub.id,
    label: pub.title,
  }));

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
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
              <span>
                {formatDate(conference.start_date)} - {formatDate(conference.end_date)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Publications</h2>
        <div className="grid gap-4">
          {conference.publications.length > 0 ? (
            conference.publications.map((pub) => (
              <Link key={pub.id} href={`/publications/${pub.id}`} passHref>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
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
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No publications linked to this conference.</p>
          )}
        </div>
      </section>

      {/* Add Publication Section */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          Add Publication to Conference
        </h3>
        <div className="flex gap-3 items-center max-w-md">
          <div className="flex-grow">
            <Select
              options={selectOptions}
              value={selectedPub}
              onChange={setSelectedPub}
              isDisabled={adding || allPublications.length === 0}
              placeholder="Select a publication..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
            />
          </div>
          <Button
            onClick={handleAddPublication}
            disabled={!selectedPub || adding}
            className="flex items-center gap-2"
            variant="default"
          >
            {adding ? "Adding..." : "Add"}
          </Button>
        </div>
      </section>
    </div>
  );
}
