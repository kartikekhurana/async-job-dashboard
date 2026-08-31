'use client';

import { useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface NewJobModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewJobModal({ open, onClose }: NewJobModalProps) {
  const [jobType, setJobType] = useState('');
  const [payload, setPayload] = useState('{}');
  const [maxRetries, setMaxRetries] = useState(3);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
    } catch {
      setError('Payload must be valid JSON');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/jobs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_type: jobType, payload: parsedPayload, max_retries: maxRetries }),
      });
      if (!res.ok) throw new Error('failed');

      setJobType('');
      setPayload('{}');
      setMaxRetries(3);
      onClose();
    } catch {
      setError('Failed to submit job. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
      >
        <div className="text-[17px] font-semibold mb-5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-geist-sans)' }}>
          New job
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] mb-2" style={{ color: 'var(--text-muted)' }}>job type</label>
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
              placeholder="send_email"
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none"
              style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-[12px] mb-2" style={{ color: 'var(--text-muted)' }}>payload (json)</label>
            <input
              type="text"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none"
              style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-[12px] mb-2" style={{ color: 'var(--text-muted)' }}>max retries</label>
            <input
              type="number"
              value={maxRetries}
              onChange={(e) => setMaxRetries(Number(e.target.value))}
              min={1}
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none"
              style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
            />
          </div>

          {error && <div className="text-[13px]" style={{ color: 'var(--danger)' }}>{error}</div>}

          <div className="flex gap-2.5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-[14px] rounded-lg py-2.5"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 text-[14px] font-medium rounded-lg py-2.5 disabled:opacity-50"
              style={{ backgroundColor: '#fafafa', color: 'var(--bg-page)' }}
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}