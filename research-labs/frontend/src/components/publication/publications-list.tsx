"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export type Status = "DRAFT" | "APPROVED" | "WAITING";

export interface Publication {
  id: string;
  title: string;
  journal: string;
  status: Status;
  submitterId: string;
  submittedAt: string; // ISO string
}

interface PublicationsListProps {
  data: Publication[];
}

const statusBadge = (status: Status) => {
  switch (status) {
    case "DRAFT":
      return <Badge className="bg-yellow-200 text-yellow-800">Draft</Badge>;
    case "APPROVED":
      return <Badge className="bg-green-200 text-green-800">Approved</Badge>;
    case "WAITING":
      return <Badge className="bg-blue-200 text-blue-800">Waiting</Badge>;
  }
};

export const PublicationsList: React.FC<PublicationsListProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 items-center gap-4 p-4 border-b bg-muted text-sm font-medium">
        <div>Title</div>
        <div>Journal</div>
        <div>Status</div>
        <div>Submitter</div>
        <div>Submitted At</div>
      </div>

      {data.map((pub) => (
        <div
          key={pub.id}
          className="grid grid-cols-5 items-center gap-4 p-4 border-b hover:bg-muted transition"
        >
          <Link
            href={`/publications/${pub.id}`}
            className="hover:underline font-medium text-primary"
          >
            {pub.title}
          </Link>
          <div>{pub.journal}</div>
          <div>{statusBadge(pub.status)}</div>
          <div>
            <code className="text-xs">{pub.submitterId}</code>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(pub.submittedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};
