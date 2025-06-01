"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export type Status = "DRAFT" | "APPROVED" | "WAITING" | "DELETED";

function parseDateArray(dateArray: number[]): string {
  const [year, dayOfYear, hour, minute, second] = dateArray;
  const date = new Date(Date.UTC(year, 0));
  date.setUTCDate(dayOfYear);
  date.setUTCHours(hour);
  date.setUTCMinutes(minute);
  date.setUTCSeconds(second);
  return date.toISOString();
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  status: Status;
  submitter_id: string;
  submitted_at: string | number[];
  submitterName?: string;
}

interface PublicationsListProps {
  data: Publication[];
}

const statusBadge = (status: Status) => {
  switch (status) {
    case "DRAFT":
      return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
    case "APPROVED":
      return <Badge className="bg-emerald-100 text-emerald-700">Approved</Badge>;
    case "WAITING":
      return <Badge className="bg-blue-100 text-blue-700">Waiting</Badge>;
    case "DELETED":
      return <Badge className="bg-red-100 text-red-700">Deleted</Badge>;
  }
};

export const PublicationsList: React.FC<PublicationsListProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleted, setShowDeleted] = useState(false);

  const normalizedData = data.map((pub) => ({
    ...pub,
    submittedAt: Array.isArray(pub.submitted_at)
      ? parseDateArray(pub.submitted_at)
      : pub.submitted_at,
  }));

  const filtered = normalizedData
    .filter((pub) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        pub.title.toLowerCase().includes(searchText) ||
        pub.journal.toLowerCase().includes(searchText) ||
        pub.submitter_id.toLowerCase().includes(searchText) ||
        pub.submitterName?.toLowerCase().includes(searchText);

      const matchesStatus =
        showDeleted
          ? true
          : statusFilter === "all"
            ? pub.status !== "DELETED"
            : pub.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4">

        <div className="w-full md:w-1/2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by title, journal, or submitter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="w-full md:w-1/4">
          <Label>Status</Label>
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="WAITING">Waiting</SelectItem>
            </SelectContent>


          </Select>


        </div>

          <div className="w-full md:w-auto flex items-center gap-2 mt-2 md:mt-6">
            <input
              type="checkbox"
              id="show-deleted"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
              className="accent-red-500"
            />
            <Label htmlFor="show-deleted" className="text-sm">Show Deleted</Label>
          </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Journal</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Submitter</th>
              <th className="text-left p-3">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-muted-foreground">
                  No publications found.
                </td>
              </tr>
            ) : (
              filtered.map((pub) => (
                <tr
                  key={pub.id}
                  className="border-b hover:bg-muted/40 transition-colors"
                >
                  <td className="p-3 max-w-xs truncate">
                    <Link
                      href={`/publications/${pub.id}`}
                      className="hover:underline text-primary font-medium"
                    >
                      {pub.title}
                    </Link>
                  </td>
                  <td className="p-3">{pub.journal}</td>
                  <td className="p-3">{statusBadge(pub.status)}</td>
                  <td className="p-3">
                    <code className="text-xs">
                      {pub.submitterName || pub.submitter_id}
                    </code>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {new Date(pub.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
