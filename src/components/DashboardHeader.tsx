'use client';

import { Job } from '@/types/job';
import { WorkerStatus as WorkerStatusType } from '@/lib/api';

interface DashboardHeaderProps {
  jobs: Job[];
  workerstatus: WorkerStatusType;
  onNewJobClick: () => void;
}

export default function DashboardHeader({ jobs, workerstatus, onNewJobClick }: DashboardHeaderProps) {
  const done = jobs.filter((job) => job.status === 'success').length;
  const failed = jobs.filter((job) => job.status === 'dead_letter' || job.status === 'failed').length;
  const total = jobs.length;

  return (
    <div
      className="flex items-center justify-between px-6 py-5"
      style={{ borderBottom: '1px solid var(--border-default)' }}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <span className="relative w-2 h-2 inline-block">
            <span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: workerstatus.is_alive ? 'var(--success)' : 'var(--danger)' }}
            />
            <span
              className="absolute rounded-full"
              style={{
                inset: '-5px',
                border: `1px solid ${workerstatus.is_alive ? 'rgba(74,222,128,0.35)' : 'rgba(248,113,113,0.35)'}`,
              }}
            />
          </span>
          <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
            worker_01
          </span>
          <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            {workerstatus.is_alive ? 'alive' : 'offline'}
          </span>
        </div>

        <div className="w-px h-4" style={{ backgroundColor: 'var(--border-default)' }} />

        <div className="flex items-center gap-4 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          <span><span style={{ color: 'var(--success)' }}>{done}</span> done</span>
          <span><span style={{ color: 'var(--danger)' }}>{failed}</span> failed</span>
          <span><span style={{ color: 'var(--text-dim)' }}>{total}</span> total</span>
        </div>
      </div>

      <button
        onClick={onNewJobClick}
        className="text-[14px] font-medium rounded-lg px-4 py-2"
        style={{ backgroundColor: '#fafafa', color: 'var(--bg-page)' }}
      >
        + New job
      </button>
    </div>
  );
}