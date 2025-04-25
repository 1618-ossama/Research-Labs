"use client";

import React, { useState } from "react";
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

// Define the `PublicationInput` type
interface PublicationInput {
  title: string;
  journal: string;
  status: "DRAFT" | "APPROVED" | "WAITING";
  submitter_id: string;
}

const SubmitPublicationForm = () => {
  const [title, setTitle] = useState<string>("");
  const [journal, setJournal] = useState<string>("");
  const [status, setStatus] = useState<"DRAFT" | "APPROVED" | "WAITING">(
    "DRAFT",
  );
  const [submitterId, setSubmitterId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const publicationData: PublicationInput = {
      title,
      journal,
      status,
      submitter_id: submitterId,
    };

    try {
      const res = await fetch("http://127.0.0.1:3009/api/publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicationData),
      });

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to submit publication");
      }

      // Redirect or show success message
      router.push("/publications"); // redirect to publication list page
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Submit a New Publication</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="journal">Journal</Label>
          <Input
            id="journal"
            type="text"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "DRAFT" | "APPROVED" | "WAITING")}
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

        <div>
          <Label htmlFor="submitterId">Submitter ID</Label>
          <Input
            id="submitterId"
            type="text"
            value={submitterId}
            onChange={(e) => setSubmitterId(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Publication"}
        </Button>
      </form>
    </div>
  );
};

export default SubmitPublicationForm;
