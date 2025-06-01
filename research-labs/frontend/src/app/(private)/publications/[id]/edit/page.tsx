"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

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

const VALID_STATUSES = ["DRAFT", "APPROVED", "WAITING", "DELETED"];
const VALID_VISIBILITIES = ["PUBLIC", "PRIVATE"];

export default function EditPublicationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const publicationId = params.id;

  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form fields state
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [doi, setDoi] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [visibility, setVisibility] = useState("PRIVATE");
  const [conferenceId, setConferenceId] = useState<string | "">( "");

  // Fetch publication data on mount
  useEffect(() => {
    async function fetchPublication() {
      try {
        const res = await fetch(`http://localhost:3009/api/publications/${publicationId}`);
        if (!res.ok) throw new Error("Failed to fetch publication");
        const data: Publication = await res.json();
        setPublication(data);
        setTitle(data.title);
        setJournal(data.journal);
        setDoi(data.doi);
        setStatus(data.status);
        setVisibility(data.visibility);
        setConferenceId(data.conference_id || "");
      } catch (error) {
        toast.error("Failed to load publication");
      } finally {
        setLoading(false);
      }
    }
    fetchPublication();
  }, [publicationId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!journal.trim()) {
      toast.error("Journal is required");
      return;
    }
    if (!VALID_STATUSES.includes(status)) {
      toast.error("Invalid status");
      return;
    }
    if (!VALID_VISIBILITIES.includes(visibility)) {
      toast.error("Invalid visibility");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:3009/api/publications/${publicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          journal,
          doi,
          status,
          visibility,
          conference_id: conferenceId || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update publication");

      toast.success("Publication updated successfully");
      router.push(`/publications/${publicationId}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update publication");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-center py-10">Loading publication...</p>;
  if (!publication) return <p className="text-center py-10 text-red-500">Publication not found</p>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <Link href={`/publications/${publicationId}`} className="text-blue-600 hover:underline">
        ← Back to publication details
      </Link>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Edit Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="journal" className="block text-sm font-medium text-gray-700">
                Journal <span className="text-red-500">*</span>
              </label>
              <textarea
                id="journal"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="doi" className="block text-sm font-medium text-gray-700">
                DOI
              </label>
              <input
                id="doi"
                type="text"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                maxLength={60}
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                required
              >
                {VALID_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                Visibility <span className="text-red-500">*</span>
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                required
              >
                {VALID_VISIBILITIES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="conference_id" className="block text-sm font-medium text-gray-700">
                Conference ID
              </label>
              <input
                id="conference_id"
                type="text"
                value={conferenceId}
                onChange={(e) => setConferenceId(e.target.value)}
                placeholder="UUID or leave empty"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href={`/publications/${publicationId}`}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
