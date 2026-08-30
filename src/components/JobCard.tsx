import { Job } from '@/types/job';

const statusColor: Record<string, string> = {
  queued: 'text-gray-500',
  running: 'text-blue-600',
  retrying: 'text-amber-600',
  success: 'text-green-600',
  failed: 'text-red-600',
  dead_letter: 'text-red-700',
};

export default function JobCard({ job }: { job: Job }) {
  const isRunning = job.status === 'running';

  return (
    <div
      className={`bg-white rounded-lg p-3 mb-2 border ${
        isRunning ? 'border-blue-300' : 'border-gray-200'
      }`}
    >
      <div className="text-[13px] font-medium mb-1.5 text-gray-900" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        {job.job_type}
      </div>
      <div
        className={`text-[11px] ${statusColor[job.status]}`}
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        retries {job.retry_count}/{job.max_retries}
      </div>

      {job.error_message ? (
        <div className="text-[11px] mt-1.5 pt-1.5 border-t border-gray-100 text-gray-500">
          {job.error_message}
        </div>
      ) : (
        <div className="text-[11px] mt-1 text-gray-400">
          {new Date(job.updated_at).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}