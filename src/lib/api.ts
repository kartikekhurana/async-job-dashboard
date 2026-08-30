import { Job } from "@/types/job";

const API_URL = 'http://127.0.0.1:8000';

export async function fetchJobs(): Promise<Job[]> {
    const res = await fetch(`${API_URL}/jobs/`);
    if(!res.ok){
        throw new Error('Failed to fetch jobs');
    }
    return res.json()
}

