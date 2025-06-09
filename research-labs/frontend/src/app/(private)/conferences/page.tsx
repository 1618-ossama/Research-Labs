'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Conference } from '@/types/conference';
import { Publication } from '@/types/publication';


// Improved date array to Date conversion
const arrayToDate = (dateArray: number[]): Date => {
  if (!dateArray || dateArray.length < 2) return new Date();

  const [year, dayOfYear, hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = dateArray;
  const date = new Date(year, 0); // Start with Jan 1 of the year
  date.setDate(dayOfYear); // Add the day of year (1-365)
  date.setHours(hours, minutes, seconds, milliseconds);
  return date;
};

// Format date for display (e.g. "May 15, 2024")
const formatDate = (dateArray: number[]): string => {
  const date = arrayToDate(dateArray);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Improved date range formatting
const formatDateRange = (startArray: number[], endArray: number[]): string => {
  const startDate = arrayToDate(startArray);
  const endDate = arrayToDate(endArray);

  // If same year and month, show "May 15-22, 2024"
  if (startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}-${endDate.getDate()}, ${startDate.getFullYear()}`;
  }

  // If same year but different months, show "May 15 - Jun 2, 2024"
  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} - ${endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}, ${startDate.getFullYear()}`;
  }

  // Different years, show full dates "Dec 30, 2023 - Jan 2, 2024"
  return `${startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })} - ${endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
};

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [publicationsByConference, setPublicationsByConference] = useState<Record<string, Publication[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch conferences
        const confRes = await fetch('http://127.0.0.1:6188/rust/api/conferences');
        if (!confRes.ok) throw new Error('Failed to fetch conferences');
        const confData: Conference[] = await confRes.json();
        setConferences(confData);

        // For each conference, fetch linked publications
        const pubsByConf: Record<string, Publication[]> = {};

        await Promise.all(
          confData.map(async (conf) => {
            const pubsRes = await fetch(`http://127.0.0.1:6188/rust/api/conferences/${conf.id}/publications`);
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-500 h-12 w-12"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Conference Publications
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Browse academic conferences and their associated publications
          </p>
        </div>

        <div className="space-y-8">
          {conferences.map((conf) => {
            const isUpcoming = arrayToDate(conf.end_date) > new Date();

            return (
              <div
                key={conf.id}
                className="transition-all duration-300 hover:shadow-lg rounded-2xl overflow-hidden bg-white shadow-md"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <Link href={`/conferences/${conf.id}`} className="group">
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {conf.name}
                      </h2>
                    </Link>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isUpcoming ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600">{conf.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {conf.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDateRange(conf.start_date, conf.end_date)}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Publications
                    </h3>

                    {publicationsByConference[conf.id]?.length ? (
                      <ul className="mt-4 space-y-3">
                        {publicationsByConference[conf.id].map((pub) => (
                          <li
                            key={pub.id}
                            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{pub.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{pub.journal}</p>
                              </div>
                              <div className="mt-2 sm:mt-0 flex items-center space-x-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${pub.status === 'published'
                                  ? 'bg-green-100 text-green-800'
                                  : pub.status === 'submitted'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                  }`}>
                                  {pub.status}
                                </span>
                                <Link
                                  href={`publications/${pub.id}`}
                                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                  View
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-4 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="mt-2 text-sm font-medium text-gray-900">No publications yet</h4>
                        <p className="mt-1 text-sm text-gray-500">This conference doesn't have any linked publications.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
