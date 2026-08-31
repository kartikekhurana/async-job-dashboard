import LiveJobBoard from "@/components/LiveJobBoard";
import { fetchJobs , fetchWorkerStatus } from "@/lib/api";



export default async function Home() {
  const [jobs , workerStatus] = await Promise.all([
    fetchJobs(),
    fetchWorkerStatus()
  ])

    return (
         <main className="min-h-screen p-8">
          <LiveJobBoard initialJobs={jobs} initialWorkerStatus={workerStatus} />
         </main>
    )
}