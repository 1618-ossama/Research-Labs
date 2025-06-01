'use client';

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Select from "react-select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, PlusCircle, ArrowUpRight, Link as LinkIcon, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [visibilityFilter, setVisibilityFilter] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [confRes, pubsRes, allPubsRes] = await Promise.all([
          fetch(`http://localhost:3009/api/conferences/${conferenceId}`),
          fetch(`http://localhost:3009/api/conferences/${conferenceId}/publications`),
          fetch(`http://localhost:3009/api/publications?unlinked=true`)
        ]);

        if (!confRes.ok) throw new Error("Conference not found");
        const confData = await confRes.json();

        let pubs: Publication[] = [];
        if (pubsRes.ok) {
          pubs = await pubsRes.json();
        }

        let allPubs: Publication[] = [];
        if (allPubsRes.ok) {
          allPubs = await allPubsRes.json();
        }

        setConference({ ...confData, publications: pubs });
        setAllPublications(allPubs);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load conference data");
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
        toast.success("Publication added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add publication");
    } finally {
      setAdding(false);
    }
  }

  const formatDateRange = (startArr: number[], endArr: number[]) => {
    const [startYear, startDay] = startArr;
    const [endYear, endDay] = endArr;
    
    const startDate = new Date(startYear, 0);
    startDate.setDate(startDay);
    
    const endDate = new Date(endYear, 0);
    endDate.setDate(endDay);

    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: startDate.getFullYear() !== endDate.getFullYear() ? 'numeric' : undefined
    };

    const startStr = startDate.toLocaleDateString('en-US', options);
    const endStr = endDate.toLocaleDateString('en-US', options);

    return `${startStr} - ${endStr}`;
  };

  const selectOptions = allPublications.map((pub) => ({
    value: pub.id,
    label: `${pub.title} (${pub.journal})`,
  }));

  // Filter publications based on search and filters
  const filteredPublications = conference?.publications.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pub.journal.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(pub.status);
    const matchesVisibility = visibilityFilter.length === 0 || visibilityFilter.includes(pub.visibility);
    
    return matchesSearch && matchesStatus && matchesVisibility;
  }) || [];

  const statusOptions = Array.from(new Set(conference?.publications.map(p => p.status) || []));
  const visibilityOptions = Array.from(new Set(conference?.publications.map(p => p.visibility) || []));

  if (loading) return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );

  if (!conference) return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Conference not found</h1>
      <p className="mt-4 text-gray-600">
        The conference you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/conferences" className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to conferences
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <Link href="/conferences" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          ← Back to all conferences
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{conference.name}</h1>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Conference Details</h2>
              <p className="text-gray-600">{conference.description}</p>
              
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{conference.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>{formatDateRange(conference.start_date, conference.end_date)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium mb-2">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{conference.publications.length}</p>
                  <p className="text-sm text-gray-500">Publications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {new Set(conference.publications.map(p => p.submitter_id)).size}
                  </p>
                  <p className="text-sm text-gray-500">Contributors</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold">Publications</h2>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search publications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="px-2 py-1 text-sm font-medium">Status</div>
                {statusOptions.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={(checked) => {
                      setStatusFilter(checked
                        ? [...statusFilter, status]
                        : statusFilter.filter((f) => f !== status)
                      );
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
                <div className="px-2 py-1 text-sm font-medium mt-2">Visibility</div>
                {visibilityOptions.map((visibility) => (
                  <DropdownMenuCheckboxItem
                    key={visibility}
                    checked={visibilityFilter.includes(visibility)}
                    onCheckedChange={(checked) => {
                      setVisibilityFilter(checked
                        ? [...visibilityFilter, visibility]
                        : visibilityFilter.filter((f) => f !== visibility)
                      );
                    }}
                  >
                    {visibility}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredPublications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-lg line-clamp-2">
                        <Link 
                          href={`/publications/${pub.id}`} 
                          className="hover:underline group-hover:text-blue-600 transition-colors"
                        >
                          {pub.title}
                        </Link>
                      </h3>
                      {pub.doi && pub.doi !== "0" && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 ml-2 transition-colors"
                          title="Open DOI"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-1">{pub.journal}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={pub.status === 'published' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {pub.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {pub.visibility}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div>
                        Submitted: {new Date(pub.submitted_at).toLocaleDateString()}
                      </div>
                      {pub.doi && pub.doi !== "0" && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          <span className="truncate max-w-[100px]">DOI</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mx-auto max-w-md space-y-2">
                <h3 className="text-lg font-medium">No publications found</h3>
                <p className="text-sm text-gray-500">
                  {searchTerm || statusFilter.length > 0 || visibilityFilter.length > 0
                    ? "Try adjusting your search or filters"
                    : "This conference doesn't have any linked publications yet."}
                </p>
                {(searchTerm || statusFilter.length > 0 || visibilityFilter.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter([]);
                      setVisibilityFilter([]);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="border-t pt-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-blue-600" />
              Add Publication
            </h3>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Select a publication from your library to link to this conference
                  </p>
                  
                  <div className="flex gap-3 items-center">
                    <div className="flex-grow">
                      <Select
                        options={selectOptions}
                        value={selectedPub}
                        onChange={setSelectedPub}
                        isDisabled={adding || allPublications.length === 0}
                        placeholder={allPublications.length === 0 ? "No available publications" : "Select a publication..."}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable
                        noOptionsMessage={() => "No publications available"}
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: '42px',
                            borderColor: '#e2e8f0',
                            '&:hover': {
                              borderColor: '#cbd5e1',
                            },
                          }),
                        }}
                      />
                    </div>
                    <Button
                      onClick={handleAddPublication}
                      disabled={!selectedPub || adding}
                      className="flex-shrink-0"
                    >
                      {adding ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </span>
                      ) : "Add"}
                    </Button>
                  </div>
                  
                  {allPublications.length === 0 && (
                    <div className="text-center py-4 text-sm text-gray-500">
                      All your publications are already linked to conferences. 
                      <Link href="/publications/new" className="ml-2 text-blue-600 hover:underline">
                        Create a new publication
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
