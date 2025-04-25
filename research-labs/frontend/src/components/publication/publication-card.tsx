"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Status = "DRAFT" | "APPROVED" | "WAITING";

export interface Publication {
  id: string;
  title: string;
  journal: string;
  status: Status;
  submitter_id: string;
  submiited_at: string; // Keep the typo unless backend is fixed
}

interface PublicationCardProps {
  publication: Publication;
}

const statusBadge = (status: Status) => {
  switch (status) {
    case "DRAFT":
      return (
        <Badge variant="outline" className="border-yellow-400 text-yellow-700">
          Draft
        </Badge>
      );
    case "APPROVED":
      return (
        <Badge variant="outline" className="border-green-400 text-green-700">
          Approved
        </Badge>
      );
    case "WAITING":
      return (
        <Badge variant="outline" className="border-blue-400 text-blue-700">
          Waiting
        </Badge>
      );
  }
};

export const PublicationCard: React.FC<PublicationCardProps> = (
  { publication },
) => {
  const { title, journal, status, submitter_id, submiited_at } = publication;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{title}</span>
          {statusBadge(status)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Journal:</strong> {journal}
        </p>
        <p className="text-xs text-muted-foreground">
          Submitted by <code>{submitter_id}</code> on{" "}
          {new Date(submiited_at).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};
