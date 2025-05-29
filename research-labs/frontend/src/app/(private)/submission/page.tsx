'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function SubmissionPage() {
  const router = useRouter()

  const handleClick = (path: string) => () => {
    router.push(path)
  }

  const options = [
    { title: 'New Publication', path: '/publications/create' },
    { title: 'New Conference', path: '/conference/create' },
    { title: 'New Group', path: '/group/create' }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8">What would you like to create?</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {options.map(option => (
          <Card
            key={option.path}
            className="cursor-pointer hover:shadow-xl transition duration-200 ease-in-out"
            onClick={handleClick(option.path)}
          >
            <CardContent className="p-6 flex items-center justify-center">
              <span className="text-xl font-semibold">{option.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
