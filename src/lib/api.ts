import { Job } from "@/types/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface WorkerStatus {
    is_alive : boolean;
    last_heartbeat : string | null;
}
export async function fetchJobs(): Promise<Job[]> {
    const res = await fetch(`${API_URL}/jobs/`,{
        cache : 'no-store'
    });
    if(!res.ok){
        throw new Error('Failed to fetch jobs');
    }
    return res.json()
}

export async function fetchWorkerStatus() : Promise<WorkerStatus>{
    const res = await fetch(`${API_URL}/worker/status`,{
        cache : "no-store"
    });
    if(!res.ok){
        throw new Error("Failed to fetch worker status");
    }
    return res.json();
}

