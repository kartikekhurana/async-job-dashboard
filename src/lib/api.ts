import { Job } from "@/types/job";

const API_URL = 'http://127.0.0.1:8000';

export interface WorkerStatus {
    is_alive : boolean;
    last_heartbeat : string | null;
}
export async function fetchJobs(): Promise<Job[]> {
    const res = await fetch(`${API_URL}/jobs/`);
    if(!res.ok){
        throw new Error('Failed to fetch jobs');
    }
    return res.json()
}

export async function fetchworkerStatus() : Promise<WorkerStatus>{
    const res = await fetch(`${API_URL}/worker/status`);
    if(!res.ok){
        throw new Error("Failed to fetch worker status");
    }
    return res.json();
}

