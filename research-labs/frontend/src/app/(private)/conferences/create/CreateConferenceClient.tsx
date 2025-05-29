
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  userId: string | null;
};

type Publication = {
  id: string;
  title: string;
};

export default function CreateConferenceClient({ userId }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPubs, setSelectedPubs] = useState<Set<string>>(new Set());

  useEffect(() => {

    fetch('http://localhost:3009/api/publications')
      .then(res => res.json())
      .then(data => setPublications(data));
  }, []);

  const togglePublication = (id: string) => {
    setSelectedPubs(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!userId) {
    alert('User ID not found in cookies.');
    return;
  }

  const toPrimitiveDateTime = (date: string) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const res = await fetch('http://localhost:3009/api/conferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      description,
      location,
      start_date: toPrimitiveDateTime(startDate),
      end_date: toPrimitiveDateTime(endDate),
    }),
  });

  if (!res.ok) {
    alert('Failed to create conference.');
    return;
  }

  const newConference = await res.json();


  if (selectedPubs.size > 0) {
    const linkRes = await fetch('http://127.0.0.1:3009/api/conference/link-publication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conference_id: newConference,
        publication_ids: Array.from(selectedPubs),
        user_id: userId,
      }),
    });

    if (!linkRes.ok) {
      alert('Failed to link publications.');
      return;
    }
  }

  router.push(`/conferences/${newConference}`);
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Conference</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Conference Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            className="border p-2 rounded w-1/2"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            className="border p-2 rounded w-1/2"
          />
        </div>

        <div>
          <h3 className="font-medium">Optional Publications</h3>
          <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-2">
            {publications.map(pub => (
              <label key={pub.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPubs.has(pub.id)}
                  onChange={() => togglePublication(pub.id)}
                />
                {pub.title}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Conference
        </button>
      </form>
    </div>
  );
}
