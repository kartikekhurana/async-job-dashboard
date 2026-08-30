import JobBoard from "@/components/JobBoard";
import WorkerStatus from "@/components/WorkerStatus";
import { fetchJobs , fetchworkerStatus } from "@/lib/api";



export default async function Home() {
  const [jobs , workerStatus] = await Promise.all([
    fetchJobs(),
    fetchworkerStatus()
  ])

    return (
        <main className="min-h-screen p-8" style={{backgroundColor : "#fafafa" }}>
          <WorkerStatus status={workerStatus} />
          <JobBoard jobs={jobs} />
        </main>
    )
}