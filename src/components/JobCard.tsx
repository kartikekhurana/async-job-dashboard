'use client';

import { motion } from 'framer-motion';
import { Job } from '@/types/job';

const statusStyles: Record<string, { bg: string; border: string }> = {
  queued: { bg: 'var(--bg-card)', border: 'var(--border-default)' },
  running: { bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  retrying: { bg: 'var(--bg-card)', border: 'var(--border-default)' },
  success: { bg: 'var(--bg-card)', border: 'var(--border-default)' },
  failed: { bg: 'var(--danger-bg)', border: 'var(--danger-border)' },
  dead_letter: { bg: 'var(--danger-bg)', border: 'var(--danger-border)' },
};

const statusText: Record<string, string> = {
  queued: 'var(--text-muted)',
  running: 'var(--accent)',
  retrying: 'var(--warning)',
  success: 'var(--text-muted)',
  failed: 'var(--danger)',
  dead_letter: 'var(--danger)',
};

export default function JobCard({ job }: { job: Job }) {
  const isRunning = job.status === 'running';
  const isDead = job.status === 'dead_letter' || job.status === 'failed';
  const isSuccess = job.status === 'success';
  const style = statusStyles[job.status];

  return (
    <motion.div
      layoutId={job.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isSuccess ? 0.8 : 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1 }}
      className="rounded-lg p-3.5 mb-2.5"
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[14px] font-medium"
          style={{ fontFamily: 'var(--font-geist-sans)', color: isDead ? 'var(--danger-light)' : 'var(--text-primary)' }}
        >
          {job.job_type}
        </span>
        {isRunning && (
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        )}
      </div>

      <div className="text-[12px] mt-1.5" style={{ color: statusText[job.status] }}>
        {job.status === 'queued' && `retries ${job.retry_count}/${job.max_retries}`}
        {job.status === 'running' && 'processing…'}
        {job.status === 'retrying' && `retries ${job.retry_count}/${job.max_retries} · backing off`}
        {job.status === 'success' && new Date(job.updated_at).toLocaleTimeString()}
        {isDead && `retries ${job.retry_count}/${job.max_retries} · exhausted`}
      </div>

      {job.error_message && (
        <div
          className="text-[12px] mt-2 pt-2"
          style={{
            color: 'var(--text-muted)',
            borderTop: `1px solid ${isDead ? 'var(--danger-border-subtle)' : 'var(--border-subtle)'}`,
          }}
        >
          {job.error_message}
        </div>
      )}
    </motion.div>
  );
}