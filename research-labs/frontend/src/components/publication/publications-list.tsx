"use client";

import { TooltipProvider } from "@/components/ui/tooltip"; // or the correct path
import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Search, Filter, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Status = "DRAFT" | "APPROVED" | "WAITING" | "DELETED";

const getAccessTokenCookie = (cookieName = "AccessTokenCookie") => {
  if (typeof document === "undefined") return null; // safety check for SSR
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(row => row.startsWith(cookieName + "="));
  return cookie ? cookie.split("=")[1] : null;
};
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
  doi?: string;
  abstract?: string;
}

interface PublicationsListProps {
  data: Publication[];
  showAdvancedFilters?: boolean;
}

const statusBadge = (status: Status) => {
  switch (status) {
    case "DRAFT":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Draft</Badge>;
    case "APPROVED":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
    case "WAITING":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
    case "DELETED":
      return <Badge variant="secondary" className="bg-red-100 text-red-800">Deleted</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const PublicationsList: React.FC<PublicationsListProps> = ({
  data,
  showAdvancedFilters = false
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [submitterNames, setSubmitterNames] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
    key: 'submittedAt',
    direction: 'descending'
  });

  const normalizedData = data.map((pub) => ({
    ...pub,
    submittedAt: Array.isArray(pub.submitted_at)
      ? parseDateArray(pub.submitted_at)
      : pub.submitted_at,
  }));

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ?
      <ChevronUp className="ml-1 h-4 w-4 inline" /> :
      <ChevronDown className="ml-1 h-4 w-4 inline" />;
  };

  const sortedData = [...normalizedData].sort((a, b) => {
    if (sortConfig.key === 'title') {
      return sortConfig.direction === 'ascending'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortConfig.key === 'journal') {
      return sortConfig.direction === 'ascending'
        ? a.journal.localeCompare(b.journal)
        : b.journal.localeCompare(a.journal);
    } else if (sortConfig.key === 'submittedAt') {
      return sortConfig.direction === 'ascending'
        ? new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        : new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    } else if (sortConfig.key === 'status') {
      return sortConfig.direction === 'ascending'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const filtered = sortedData.filter((pub) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      pub.title.toLowerCase().includes(searchText) ||
      pub.journal.toLowerCase().includes(searchText) ||
      pub.submitter_id.toLowerCase().includes(searchText) ||
      (submitterNames[pub.submitter_id]?.toLowerCase().includes(searchText)) ||
      pub.doi?.toLowerCase().includes(searchText) ||
      pub.abstract?.toLowerCase().includes(searchText);

    const matchesStatus =
      showDeleted
        ? true
        : statusFilter === "all"
          ? pub.status !== "DELETED"
          : pub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const token = getAccessTokenCookie();
  useEffect(() => {
    const fetchNames = async () => {
      const idsToFetch = Array.from(new Set(
        filtered.map(pub => pub.submitter_id).filter(id => !(id in submitterNames))
      ));

      const fetched: Record<string, string> = {};

      await Promise.all(idsToFetch.map(async (id) => {
        try {

          const res = await fetch(`http://127.0.0.1:6188/nodejs/api/profiles/users/username/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          });

          if (res.ok) {
            const json = await res.json();
            fetched[id] = json.data.username || `User ${id}`;
          } else {
            fetched[id] = `User ${id}`;
          }
        } catch {
          fetched[id] = `User ${id}`;
        }
      }));

      setSubmitterNames(prev => ({ ...prev, ...fetched }));
    };

    if (filtered.length > 0) {
      fetchNames();
    }
  }, [filtered]);

  return (
    <div className="w-full mx-auto px-4 overflow-x-auto">
      {/* Filter & Controls - now full width */}
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4 mx-0">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Search - full width */}
          <div className="flex-1 min-w-[400px]">
            <Label htmlFor="search" className="sr-only">Search publications</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title, journal, DOI, submitter or abstract..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-56"> {/* Slightly wider */}
            <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger id="status-filter" className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="WAITING">Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deleted Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showDeleted ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setShowDeleted(!showDeleted)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Deleted</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showDeleted ? "Hide deleted publications" : "Show deleted publications"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">Advanced filters coming soon</p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground my-2">
        Showing {filtered.length} of {normalizedData.length} publications
      </div>

      {/* Wider Table Container */}
      <div className="rounded-lg border overflow-hidden shadow-sm w-full mx-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full divide-y divide-gray-200">
            <colgroup>
              <col className="w-[40%]" /> {/* Title column takes 40% width */}
              <col className="w-[20%]" /> {/* Journal column */}
              <col className="w-[15%]" /> {/* Status column */}
              <col className="w-[15%]" /> {/* Submitter column */}
              <col className="w-[10%]" /> {/* Date column */}
            </colgroup>
            <thead className="bg-gray-50">
              <tr>
                {[
                  ['title', 'Title'],
                  ['journal', 'Journal'],
                  ['status', 'Status'],
                  ['submitter', 'Submitter'],
                  ['submittedAt', 'Submitted'],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => key !== 'submitter' && requestSort(key)}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${key !== 'submitter' ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  >
                    <div className="flex items-center">
                      {label} {key !== 'submitter' && getSortIndicator(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="h-8 w-8 text-gray-400" />
                      <p className="text-lg font-medium">No publications found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((pub) => (
                  <React.Fragment key={pub.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <Link
                            href={`/publications/${pub.id}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {pub.title}
                          </Link>
                          {pub.doi && (
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:underline mt-1"
                            >
                              DOI: {pub.doi}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {pub.journal}
                      </td>
                      <td className="px-6 py-4">
                        {statusBadge(pub.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <Link
                          href={`/profile/${pub.submitter_id}`}
                          className="text-primary hover:underline"
                        >
                          {submitterNames[pub.submitter_id] || `User ${pub.submitter_id}`}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(pub.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>

                    {pub.abstract && (
                      <tr>
                        <td colSpan={5} className="px-6 py-2 bg-gray-50">
                          <div className="text-sm text-gray-700">
                            <button
                              onClick={() => toggleAbstract(pub.id)}
                              className="text-primary hover:underline flex items-center gap-1 mb-1"
                            >
                              {expandedAbstracts[pub.id] ? (
                                <>
                                  <ChevronUp className="h-4 w-4" /> Hide abstract
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" /> Show abstract
                                </>
                              )}
                            </button>
                            {expandedAbstracts[pub.id] && (
                              <div className="prose prose-sm max-w-none p-2 bg-white rounded border">
                                {pub.abstract}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
