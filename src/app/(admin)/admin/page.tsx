import RecentPosts from "@/modules/admin/pages/dashboard/recent-post"
import ActivityCard from "@/modules/admin/pages/dashboard/activity-card"
import TopStatsCards from "@/modules/admin/pages/dashboard/top-stats-cards"
import MetricsCards from "@/modules/admin/pages/dashboard/metrics-cards"
import UpcomingScheduleList from "@/modules/admin/pages/dashboard/upcoming-schedule-list"

export default function Dashboard() {
  return (
    <div className="py-6">
      <article className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        <section className="space-y-6 xl:col-span-2">
          <TopStatsCards />
          <MetricsCards />
          <RecentPosts />
        </section>

        <section className="space-y-6">
          <ActivityCard />
          <UpcomingScheduleList />
        </section>
      </article>
    </div>
  )
}
