"use client"


import { useEffect, useState } from "react";
import { Metrics } from "@/types/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Users,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Utility component for metric cards
function MetricCard({
  title,
  value,
  change,
  icon,
  isPositive = true
}: {
  title: string;
  value: number | string;
  change?: string;
  icon: React.ReactNode;
  isPositive?: boolean;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {isPositive ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`ml-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("http://127.0.0.1:3009/api/metrics");
        if (!res.ok) throw new Error("Failed to fetch metrics");
        const data: Metrics = await res.json();
        setMetrics(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!metrics) return null;

  // Calculate some derived metrics
  const userGrowth7d = metrics.new_users_7d / (metrics.total_users - metrics.new_users_7d) * 100;
  const userGrowth30d = metrics.new_users_30d / (metrics.total_users - metrics.new_users_30d) * 100;
  const pubGrowth7d = metrics.new_publications_7d / (metrics.total_publications - metrics.new_publications_7d) * 100;
  const pubGrowth30d = metrics.new_publications_30d / (metrics.total_publications - metrics.new_publications_30d) * 100;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Live Data</span>
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.total_users.toLocaleString()}
          change={`${userGrowth30d.toFixed(1)}% last 30d`}
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard
          title="New Users (7d)"
          value={metrics.new_users_7d}
          change={`${userGrowth7d.toFixed(1)}%`}
          icon={<Activity className="h-4 w-4 text-green-500" />}
        />
        <MetricCard
          title="Total Publications"
          value={metrics.total_publications.toLocaleString()}
          change={`${pubGrowth30d.toFixed(1)}% last 30d`}
          icon={<FileText className="h-4 w-4 text-purple-500" />}
        />
        <MetricCard
          title="New Publications (7d)"
          value={metrics.new_publications_7d}
          change={`${pubGrowth7d.toFixed(1)}%`}
          icon={<BarChart2 className="h-4 w-4 text-orange-500" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Users Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>User Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <MetricCard
                title="New Users (30d)"
                value={metrics.new_users_30d}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Active Conferences"
                value={metrics.total_conferences}
                icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <h3 className="font-semibold mb-3">Users by Role & Status</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.users_by_role_status.map(([role, status, count], idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {status.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Publications Section */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Publication Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <MetricCard
                title="New Publications (30d)"
                value={metrics.new_publications_30d}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Upcoming Conferences"
                value={metrics.upcoming_conferences_30d}
                icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Publications by Status & Visibility</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.publications_by_status_visibility.map(([status, visibility, count], idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{status}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {visibility.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Lists Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              <span>Top Performers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Top Users by Publications</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.top_users_by_publications.slice(0, 5).map(({ 0: id, 1: username, 2: count }) => (
                      <TableRow key={id}>
                        <TableCell className="font-medium truncate max-w-[150px]">
                          {username || `User ${id.slice(0, 4)}`}
                        </TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Publications per Conference</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Conference</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.publications_per_conference.slice(0, 5).map(({ 0: id, 1: name, 2: count }) => (
                      <TableRow key={id}>
                        <TableCell className="font-medium truncate max-w-[150px]">
                          {name || `Conference ${id.slice(0, 4)}`}
                        </TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[80px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className={i === 1 ? "md:col-span-3" : "md:col-span-2"}>
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-6 w-[80px]" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
