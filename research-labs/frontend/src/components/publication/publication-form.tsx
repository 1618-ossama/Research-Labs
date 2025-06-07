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
import { Card } from "@/components/ui/card";
import { FiExternalLink, FiPlus } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  userId: string;
}

type Status = "DRAFT" | "APPROVED" | "WAITING";
type Visibility = "PUBLIC" | "PRIVATE";

interface Conference {
  id: string;
  name: string;
}

const fetchConferences = async (): Promise<Conference[]> => {
  const res = await fetch(`http://127.0.0.1:3009/api/conferences`);
  if (!res.ok) throw new Error("Failed to fetch conferences");
  return res.json();
};

const fetchDOIMetadata = async (doi: string) => {
  try {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.message;
    return {
      title: item.title?.[0] || "",
      journal: item["container-title"]?.[0] || "",
      abstract: item.abstract || "",
    };
  } catch {
    return null;
  }
};

const SubmitPublicationForm = ({ userId }: Props) => {
  const [formData, setFormData] = useState({
    doi: "",
    title: "",
    journal: "",
    abstract: "",
    status: "DRAFT" as Status,
    visibility: "PRIVATE" as Visibility,
    conferenceId: "" as string | null,
  });

  const [conferences, setConferences] = useState<Conference[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [doiLoading, setDoiLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchConferences()
      .then(setConferences)
      .catch(() => setError("Failed to load conferences"));
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFetchDOI = async () => {
    if (!formData.doi.trim()) return;
    setDoiLoading(true);
    setError(null);

    const meta = await fetchDOIMetadata(formData.doi.trim());
    setDoiLoading(false);

    if (meta) {
      setFormData((prev) => ({
        ...prev,
        title: meta.title,
        journal: meta.journal,
        abstract: meta.abstract.replace(/<\/?jats:[^>]+>/g, ""), // Clean XML tags if any
      }));
    } else {
      setError("Could not fetch metadata for this DOI.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.title.trim() || !formData.journal.trim() || !formData.abstract.trim()) {
      setError("Title, Journal, and Abstract are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:3009/api/publications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          journal: formData.journal.trim(),
          abstract: formData.abstract.trim(),
          doi: formData.doi.trim() || "0",
          status: formData.status,
          visibility: formData.visibility,
          submitter_id: userId,
          conference_id: formData.conferenceId || null,
        }),
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
    <div className="max-w-md mx-auto py-8">
      <Card className="p-6 shadow-sm">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Submit New Publication</h2>
          <p className="text-sm text-muted-foreground">Add your research work to the repository</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* DOI */}
          <div className="space-y-2">
            <Label htmlFor="doi">DOI</Label>
            <div className="flex gap-2">
              <Input
                id="doi"
                placeholder="10.xxxx/xxxx"
                value={formData.doi}
                onChange={(e) => handleChange("doi", e.target.value)}
                onBlur={handleFetchDOI}
                disabled={doiLoading || loading}
                className="flex-grow"
              />
              <Button
                type="button"
                onClick={handleFetchDOI}
                disabled={doiLoading || loading || !formData.doi.trim()}
                variant="outline"
                size="icon"
              >
                {doiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FiExternalLink className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Auto-fill metadata from DOI</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Journal */}
          <div className="space-y-2">
            <Label htmlFor="journal">Journal *</Label>
            <Input
              id="journal"
              value={formData.journal}
              onChange={(e) => handleChange("journal", e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract *</Label>
            <Textarea
              id="abstract"
              rows={5}
              value={formData.abstract}
              onChange={(e) => handleChange("abstract", e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Status and Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v: Status) => handleChange("status", v)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="WAITING">Waiting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select
                value={formData.visibility}
                onValueChange={(v: Visibility) => handleChange("visibility", v)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conference */}
          <div className="space-y-2">
            <Label>Conference</Label>
            <Select
              value={formData.conferenceId || ""}
              onValueChange={(v) => handleChange("conferenceId", v === "none" ? "" : v)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {conferences.map((conf) => (
                  <SelectItem key={conf.id} value={conf.id}>
                    {conf.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <FiPlus className="mr-2 h-4 w-4" />
                Submit Publication
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SubmitPublicationForm;
