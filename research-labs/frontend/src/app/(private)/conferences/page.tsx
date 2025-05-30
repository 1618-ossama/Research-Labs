import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import ConferencePublications from "@/components/conferences/pub-conf"; // adjust path if needed

interface Publication {
  id: string;
  title: string;
  journal: string;
  doi: string;
  status: string;
  visibility: string;
  submitter_id: string;
  conference_id: string;
  submitted_at: string;
}

interface Conference {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
}

export default async function ConferencePage({ params }: { params: { id: string } }) {
  const confRes = await fetch(`http://localhost:3009/api/conferences/${params.id}`);
  if (!confRes.ok) {
    return <div className="text-center py-10 text-red-500">Conference not found</div>;
  }
  const conferenceData = await confRes.json();

  const pubsRes = await fetch(`http://localhost:3009/api/conferences/${params.id}/publications`);
  let publications: Publication[] = [];
  if (pubsRes.ok) {
    publications = await pubsRes.json();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <Card>
        <CardContent className="p-6 space-y-2">
          <h1 className="text-3xl font-bold">{conferenceData.name}</h1>
          <p className="text-gray-600">{conferenceData.description}</p>
          <div className="flex items-center gap-4 text-gray-500 mt-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{conferenceData.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(conferenceData.start_date).toLocaleDateString()} -{" "}
                {new Date(conferenceData.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConferencePublications
        initialPublications={publications}
        conferenceId={conferenceData.id}
      />
    </div>
  );
}
