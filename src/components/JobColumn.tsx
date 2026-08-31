import { AnimatePresence } from 'framer-motion';
import { Job, JobStatus } from '@/types/job';
import JobCard from './JobCard';

const columnConfig: Record<JobStatus, { color: string; underline: string }> = {
  queued: { color: 'var(--queued)', underline: 'var(--border-subtle)' },
  running: { color: 'var(--accent)', underline: 'linear-gradient(90deg, var(--accent), var(--border-subtle))' },
  retrying: { color: 'var(--warning)', underline: 'var(--border-subtle)' },
  success: { color: 'var(--success)', underline: 'var(--border-subtle)' },
  failed: { color: 'var(--danger)', underline: 'var(--border-subtle)' },
  dead_letter: { color: 'var(--danger)', underline: 'var(--border-subtle)' },
};

interface JobColumnProps {
  title: string;
  status: JobStatus;
  jobs: Job[];
  isLast?: boolean;
}

export default function JobColumn({ title, status, jobs, isLast }: JobColumnProps) {
  const config = columnConfig[status];

  return (
    <div style={{ borderRight: isLast ? 'none' : '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="text-[12px] font-semibold" style={{ color: config.color, letterSpacing: '0.06em' }}>
          {title.toUpperCase()}
        </span>
        <span className="text-[13px]" style={{ color: 'var(--text-dim)' }}>
          {String(jobs.length).padStart(2, '0')}
        </span>
      </div>

      <div className="h-0.5 mx-4 mb-4" style={{ background: config.underline }} />

      <div className="px-3 pb-3 min-h-[80px]">
        <AnimatePresence>
          {jobs.length === 0 ? (
            <div className="text-[12px] px-1 py-2" style={{ color: 'var(--text-dim)' }}>
              No jobs
            </div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}