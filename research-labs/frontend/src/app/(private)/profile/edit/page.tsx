'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { userApi } from '@/lib/api/users';
import { User } from '@/lib/types';

export default function EditUserPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
    first_name: '',
    last_name: '',
    phone: '',
    affiliation: '',
    bio: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)userId=([^;]*)/);
    if (match) {
      setUserId(decodeURIComponent(match[1]));
    }
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allowedFields: (keyof User)[] = [
      'username',
      'email',
      'password_hash',
      'first_name',
      'last_name',
      'bio',
      'photo_url',
      'role',
      'status',
      'affiliation',
    ];

    const cleanedData: Partial<User> = {};

    for (const key of allowedFields) {
      const value = formData[key];
      if (typeof value === 'string' && value.trim() !== '') {
        cleanedData[key] = value;
      } else if (value !== null && value !== undefined) {
        cleanedData[key] = value;
      }
    }

    try {
      await userApi.updateUser(userId, cleanedData);
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Username" value={formData.username} onChange={handleChange('username')} />
        <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange('email')} />
        <Input type="password" placeholder="New Password" value={formData.password_hash} onChange={handleChange('password_hash')} />
        <Input placeholder="First Name" value={formData.first_name} onChange={handleChange('first_name')} />
        <Input placeholder="Last Name" value={formData.last_name} onChange={handleChange('last_name')} />
        <Input placeholder="Phone Number" value={formData.phone} onChange={handleChange('phone')} />
        <Input placeholder="Affiliation" value={formData.affiliation} onChange={handleChange('affiliation')} />
        <Textarea placeholder="Bio" value={formData.bio} onChange={handleChange('bio')} />
        <Button type="submit" disabled={!userId}>Update Profile</Button>
        {message && <p className="text-sm mt-2 text-muted-foreground">{message}</p>}
      </form>
    </div>
  );
}
