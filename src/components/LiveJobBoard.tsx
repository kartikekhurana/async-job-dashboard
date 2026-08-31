'use client';

import { useState, useEffect } from 'react';
import JobBoard from './JobBoard';
import DashboardHeader from './DashboardHeader';
import NewJobModal from './NewJobModal';
import { Job } from '@/types/job';
import { WorkerStatus } from '@/lib/api';

export default function LiveJobBoard({
  initialJobs,
  initialWorkerStatus,
}: {
  initialJobs: Job[];
  initialWorkerStatus: WorkerStatus;
}) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
      const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;
     const ws = new WebSocket(`${WS_URL}/ws/jobs`);

    ws.onmessage = (event) => {
      const updatedJob: Job = JSON.parse(event.data);
      setJobs((current) => {
        const exists = current.some((j) => j.id === updatedJob.id);
        return exists
          ? current.map((j) => (j.id === updatedJob.id ? updatedJob : j))
          : [...current, updatedJob];
      });
    };

    return () => ws.close();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-panel)' }}>
      <DashboardHeader jobs={jobs} workerstatus={initialWorkerStatus} onNewJobClick={() => setModalOpen(true)} />
      <JobBoard jobs={jobs} />
      <NewJobModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}