'use client';

import { useState } from "react";
const API_URL = 'http://127.0.0.1:8000';

export default function JobForm(){
const [jobType , setJobType] = useState('');
const [payload , setPayload] = useState('{}');
const [maxRetries , setMaxRetries] = useState(3);
const [error , setError] = useState<string | null>("");
const [submitting , setsubmitting] = useState(false);


async function handleSubmit(e : React.FormEvent){
    e.preventDefault();
    setError(null);

    let parsePayload;
    try{
        parsePayload = JSON.parse(payload);
    }catch{
        setError('payload must be a valid JSON');
        return;
    }

    setsubmitting(true);

    try{
        const res = await fetch(`${API_URL}/jobs/`,{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                job_type: jobType,
                payload : parsePayload,
                max_retries : maxRetries
            })
        });
        if(!res.ok){
            throw new Error('Failed to submit job');
        }
        setJobType('');
        setPayload('{}');
        setMaxRetries(3);
        window.location.reload();
    }catch{
        setError('Failed to submit job. Is the backend running?')
    }finally{
        setsubmitting(false);
    }
}
return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end mb-8 flex-wrap">
        <div>
            <label className="block text-[11px] text-gray-500 mb-1">Job Type</label>
            <input
            type="text"
            value={jobType}
            onChange={(e)=>setJobType(e.target.value)}
            required
            placeholder="send_email"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] w-40"
            />
        </div>
        <div>
        <label className="block text-[11px] text-gray-500 mb-1">Payload (JSON)</label>
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] w-56"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        />
      </div>

      <div>
        <label className="block text-[11px] text-gray-500 mb-1">Max retries</label>
        <input
          type="number"
          value={maxRetries}
          onChange={(e) => setMaxRetries(Number(e.target.value))}
          min={1}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] w-20"
        />
      </div>
      <button type="submit" disabled={submitting} className="bg-gray-900 text-white text-[13px] rounded-lg px-4 py-1.5 disabled:opacity-50">
        {submitting ? 'Submitting...' : 'Submit Job'}
      </button>
      {
        error && <p className="text-[12px] text-red-600 w-full">{error}</p>
      }
    </form>
)

}