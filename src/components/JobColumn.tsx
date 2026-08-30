import { Job, JobStatus } from '@/types/job';
import JobCard from './JobCard';

const dotColor: Record<JobStatus, string> = {
  queued: 'bg-gray-400',
  running: 'bg-blue-500',
  retrying: 'bg-amber-500',
  success: 'bg-green-500',
  failed: 'bg-red-500',
  dead_letter: 'bg-red-700',
};

interface JobColumnProps {
  title: string;
  status: JobStatus;
  jobs: Job[];
}

export default function JobColumn({ title, status, jobs }: JobColumnProps) {
  return (
    <div className="w-64">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor[status]}`} />
        <span className="text-[11px] font-medium tracking-wide text-gray-500">
          {title.toUpperCase()}
        </span>
        <span className="text-[11px] ml-auto text-gray-400">{jobs.length}</span>
      </div>

      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}