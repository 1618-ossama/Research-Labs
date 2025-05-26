"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  userId: string;
}

const fetchConferences = async () => {
  return [
    { id: "11111111-1111-1111-1111-111111111111", name: "Conference A" },
    { id: "22222222-2222-2222-2222-222222222222", name: "Conference B" },
  ];
};

async function fetchDOIMetadata(doi: string) {
  try {
    const res = await fetch(
      `https://api.crossref.org/works/${encodeURIComponent(doi)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.message;
    return {
      title: item.title?.[0] || "",
      journal: item["container-title"]?.[0] || "",
    };
  } catch {
    return null;
  }
}

const SubmitPublicationForm = ({ userId }: Props) => {
  const [doi, setDoi] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [journal, setJournal] = useState<string>("");
  const [status, setStatus] = useState<"DRAFT" | "APPROVED" | "WAITING">(
    "DRAFT"
  );
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PRIVATE");
  const [conferenceId, setConferenceId] = useState<string | undefined>(undefined);
  const [conferences, setConferences] = useState<{ id: string; name: string }[]>(
    []
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [doiLoading, setDoiLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchConferences().then(setConferences).catch(() => {
      setError("Failed to load conferences");
    });
  }, []);

  const handleFetchDOI = async () => {
    if (!doi.trim()) return;
    setDoiLoading(true);
    setError(null);
    const meta = await fetchDOIMetadata(doi.trim());
    setDoiLoading(false);

    if (meta) {
      setTitle(meta.title);
      setJournal(meta.journal);
    } else {
      setError("Could not fetch metadata for this DOI.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !journal.trim()) {
      setError("Title and Journal are required.");
      setLoading(false);
      return;
    }

    const publicationData = {
      title: title.trim(),
      journal: journal.trim(),
      doi: doi.trim() || "0",
      status,
      visibility,
      submitter_id: userId,
      conference_id: conferenceId || null,
    };

    try {
      const res = await fetch("http://127.0.0.1:3009/api/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publicationData),
      });

      if (!res.ok) throw new Error("Failed to submit publication");

      router.push("/publications");
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Submit a New Publication
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* DOI + Fetch */}
        <div>
          <Label htmlFor="doi" className="mb-2 block font-medium text-gray-700">
            DOI
          </Label>
          <div className="flex gap-3">
            <Input
              id="doi"
              type="text"
              placeholder="Enter DOI"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              onBlur={handleFetchDOI}
              disabled={doiLoading || loading}
              className="flex-grow"
            />
            <Button
              type="button"
              onClick={handleFetchDOI}
              disabled={doiLoading || loading || !doi.trim()}
              className="whitespace-nowrap"
            >
              {doiLoading ? "Fetching..." : "Fetch"}
            </Button>
          </div>
        </div>

        {/* Title */}
        <div>
          <Label
            htmlFor="title"
            className="mb-2 block font-medium text-gray-700"
          >
            Title *
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Journal */}
        <div>
          <Label
            htmlFor="journal"
            className="mb-2 block font-medium text-gray-700"
          >
            Journal *
          </Label>
          <Input
            id="journal"
            type="text"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Status */}
        <div>
          <Label
            htmlFor="status"
            className="mb-2 block font-medium text-gray-700"
          >
            Status
          </Label>
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "DRAFT" | "APPROVED" | "WAITING")
            }
            disabled={loading}
          >
            <SelectTrigger className="w-full" aria-labelledby="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="WAITING">Waiting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Visibility */}
        <div>
          <Label
            htmlFor="visibility"
            className="mb-2 block font-medium text-gray-700"
          >
            Visibility
          </Label>
          <Select
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as "PUBLIC" | "PRIVATE")
            }
            disabled={loading}
          >
            <SelectTrigger className="w-full" aria-labelledby="visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLIC">Public</SelectItem>
              <SelectItem value="PRIVATE">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conference */}
        <div>
          <Label
            htmlFor="conference"
            className="mb-2 block font-medium text-gray-700"
          >
            Conference (optional)
          </Label>
          <Select
            value={conferenceId || ""}
            onValueChange={(value) =>
              setConferenceId(value === "" ? undefined : value)
            }
            disabled={loading}
          >
            <SelectTrigger className="w-full" aria-labelledby="conference">
              <SelectValue placeholder="Select conference" />
            </SelectTrigger>
            <SelectContent>
              {/* Use empty string value for None option */}
              <SelectItem value="none">None</SelectItem>
              {conferences.map((conf) => (
                <SelectItem key={conf.id} value={conf.id}>
                  {conf.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Publication"}
        </Button>
      </form>
    </div>
  );
};

export default SubmitPublicationForm;
