
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Conference {
  id: string;
  name: string;
  location?: string;
  start_date: string;  // ISO string or Date string
  end_date?: string;   // optional
  description?: string;
  website?: string;
}

interface ConferenceCardProps {
  conference: Conference;
}

export function ConferenceCard({ conference }: ConferenceCardProps) {
  // Format date range nicely
  const formatDateRange = (start: string, end?: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    const startDate = new Date(start).toLocaleDateString(undefined, options);
    const endDate = end ? new Date(end).toLocaleDateString(undefined, options) : null;
    return endDate ? `${startDate} - ${endDate}` : startDate;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 space-y-2">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">{conference.name}</h3>
        </div>
        {conference.location && (
          <p className="text-sm text-muted-foreground">Location: {conference.location}</p>
        )}
        <p className="text-sm text-muted-foreground">
          Dates: {formatDateRange(conference.start_date, conference.end_date)}
        </p>
        {conference.description && (
          <p className="text-sm">{conference.description}</p>
        )}
        {conference.id && (
          <a

            href={`/conferences/${conference.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Go To Conference
          </a>
        )}
      </CardContent>
    </Card>
  );
}
