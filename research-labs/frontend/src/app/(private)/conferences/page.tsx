'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Conference = {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
};

type Publication = {
  id: string;
  title: string;
  journal: string;
  doi: string;
  status: string;
  visibility: string;
  submitted_at: string;
  conference_id: string | null;
};

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [publicationsByConference, setPublicationsByConference] = useState<Record<string, Publication[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch conferences
        const confRes = await fetch('http://localhost:3009/api/conferences');
        if (!confRes.ok) throw new Error('Failed to fetch conferences');
        const confData: Conference[] = await confRes.json();
        setConferences(confData);

        // For each conference, fetch linked publications
        const pubsByConf: Record<string, Publication[]> = {};

        await Promise.all(
          confData.map(async (conf) => {
            // Assuming you have an endpoint like /api/conferences/{id}/publications
            const pubsRes = await fetch(`http://localhost:3009/api/conferences/${conf.id}/publications`);
            if (!pubsRes.ok) {
              pubsByConf[conf.id] = [];
              return;
            }
            const pubsData: Publication[] = await pubsRes.json();
            pubsByConf[conf.id] = pubsData;
          })
        );

        setPublicationsByConference(pubsByConf);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="p-8 text-gray-600">Loading...</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Conferences</h1>
      {conferences.map((conf) => (
        <div key={conf.id} className="border rounded-xl shadow-sm p-6 bg-white space-y-3">
          <Link href={`/conferences/${conf.id}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              {conf.name}
            </h2>
          </Link>
          <p className="text-gray-700">{conf.description}</p>
          <p className="text-sm text-gray-500">
            📍 {conf.location} | 🗓{' '}
            {new Date(conf.start_date).toLocaleDateString()} –{' '}
            {new Date(conf.end_date).toLocaleDateString()}
          </p>

          <div className="pt-2">
            <h3 className="text-md font-medium">Publications</h3>
            {publicationsByConference[conf.id]?.length ? (
              <ul className="mt-2 space-y-2">
                {publicationsByConference[conf.id].map((pub) => (
                  <li key={pub.id} className="border p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <strong className="text-gray-800">{pub.title}</strong>
                      <span className="text-xs text-gray-500">
                        {pub.status} | {pub.visibility}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{pub.journal}</p>

                      <Link href={`publications/${pub.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 underline"
                      >
                        View Publication 
                      </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm italic">
                No publications linked to this conference yet.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
