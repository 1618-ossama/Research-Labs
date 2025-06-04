'use client';

import { useEffect, useState } from 'react';
import { Calendar, MapPin, FileText, Users, ChevronDown, Plus, Check } from 'lucide-react';

type Props = {
  userId: string | null;
};

type Publication = {
  id: string;
  title: string;
};

export default function CreateConferenceClient({ userId }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPubs, setSelectedPubs] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPublications, setShowPublications] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3009/api/publications')
      .then(res => res.json())
      .then(data => setPublications(data))
      .catch(err => console.error('Failed to fetch publications:', err));
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
    if (!userId) return;

    setIsSubmitting(true);

    try {
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_RUST_BACKEND_URL}/api/conferences`, {
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
        throw new Error('Failed to create conference');
      }

      const newConference = await res.json();

      if (selectedPubs.size > 0) {
        const linkRes = await fetch(`${process.env.NEXT_PUBLIC_RUST_BACKEND_URL}/api/conference/link-publication`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conference_id: newConference,
            publication_ids: Array.from(selectedPubs),
            user_id: userId,
          }),
        });

        if (!linkRes.ok) {
          throw new Error('Failed to link publications');
        }
      }

      alert('Conference created successfully!');
    } catch (error) {
      console.error('Error creating conference:', error);
      alert('Failed to create conference. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Create Conference
          </h1>
          <p className="text-gray-600">Organize your next academic gathering</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                Conference Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter conference name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-gray-400"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                <FileText className="inline w-4 h-4 mr-1" />
                Description
              </label>
              <textarea
                placeholder="Describe your conference objectives and themes"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-gray-400 resize-none"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Conference venue or city"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-100">
              <button
                type="button"
                onClick={() => setShowPublications(!showPublications)}
                className="flex items-center justify-between w-full text-left group"
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="font-semibold text-gray-700">Link Publications</span>
                  <span className="ml-2 text-sm text-gray-500">({selectedPubs.size} selected)</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showPublications ? 'rotate-180' : ''}`} />
              </button>

              <div className={`mt-4 space-y-3 transition-all duration-300 overflow-hidden ${showPublications ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {publications.map(pub => (
                    <label
                      key={pub.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={selectedPubs.has(pub.id)}
                          onChange={() => togglePublication(pub.id)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${selectedPubs.has(pub.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 group-hover:border-blue-400'
                          }`}>
                          {selectedPubs.has(pub.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {pub.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                Create Conference
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Creating...</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
