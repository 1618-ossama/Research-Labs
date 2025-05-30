import { cookies } from 'next/headers';
import CreateConferenceClient from './CreateConferenceClient';

export default function CreateConferencePage() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value || null;

  return <CreateConferenceClient userId={userId} />;
}
