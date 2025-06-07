"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpenIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react"

export type RawStatus = "DRAFT" | "APPROVED" | "WAITING";

export interface Publication {
  id: string;
  title: string;
  journal: string;
  status: RawStatus;
  submitter_id: string;
  submiited_at: string;  // Note the typo as returned by the API
}



interface PublicationCardProps {
  publication: Publication
}



import Link from "next/link";

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Link href={`/publications/${publication.id}`} passHref legacyBehavior>
      <a className="block hover:bg-muted/50 rounded-md transition-colors">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{publication.title}</CardTitle>
                <CardDescription className="mt-1">
                  {publication.journal} • {publication.year}
                </CardDescription>
              </div>
              {publication.isOpenAccess && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Open Access
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{["John"].join(", ")}</p>

            <p className="text-sm mb-4">{publication.abstract}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpenIcon className="h-4 w-4" />
                <span>{publication.citations} citations</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    DOI
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
