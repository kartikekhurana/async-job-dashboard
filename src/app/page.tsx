import JobBoard from "@/components/JobBoard";
import { fetchJobs } from "@/lib/api";



export default async function Home() {
  const jobs = await fetchJobs()

    return (
        <main className="min-h-screen p-8" style={{backgroundColor : "#fafafa" }}>
          <JobBoard jobs={jobs} />
        </main>
    )
}