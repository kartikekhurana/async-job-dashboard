import JobBoard from "@/components/JobBoard";
import JobForm from "@/components/JobForm";
import LiveJobBoard from "@/components/LiveJobBoard";
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
          <JobForm/>
          <LiveJobBoard initialJobs={jobs} />
        </main>
    )
}