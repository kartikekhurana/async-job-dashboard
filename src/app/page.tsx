import JobBoard from "@/components/JobBoard";
import { Job } from "@/types/job";

const mockJobs: Job[] = [
  { id: '1', job_type: 'send_email', payload: {}, status: 'queued', retry_count: 0, max_retries: 3, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', job_type: 'resize_image', payload: {}, status: 'running', retry_count: 0, max_retries: 3, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', job_type: 'generate_report', payload: {}, status: 'retrying', retry_count: 2, max_retries: 3, error_message: 'timeout', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '4', job_type: 'cleanup_temp', payload: {}, status: 'success', retry_count: 0, max_retries: 3, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export default function Home() {
    return (
        <main className="min-h-screen p-8" style={{backgroundColor : "#fafafa" }}>
          <JobBoard jobs={mockJobs} />
        </main>
    )
}