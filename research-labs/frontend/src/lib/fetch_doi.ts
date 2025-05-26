export interface DOIMetadata {
  title: string;
  authors: string[];
  journal: string;
  publishedDate: string;
  // add other fields you want
}

export async function fetchDOIMetadata(doi: string): Promise<DOIMetadata | null> {
  try {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    if (!res.ok) return null;

    const data = await res.json();
    const item = data.message;

    const authors = item.author?.map((a: any) => `${a.given} ${a.family}`) || [];

    return {
      title: item.title?.[0] || '',
      authors,
      journal: item['container-title']?.[0] || '',
      publishedDate: item.issued?.['date-parts']?.[0]?.join('-') || '',
    };
  } catch (error) {
    console.error('Error fetching DOI metadata:', error);
    return null;
  }
}
