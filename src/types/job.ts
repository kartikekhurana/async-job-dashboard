export type JobStatus = 'queued' | 'running' | 'success' | 'failed' | 'retrying' | 'dead_letter'

export interface Job {
    id : string;
    job_type : string;
    payload : Record<string,unknown>;
    status : JobStatus;
    retry_count : number;
    max_retries : number;
    error_message : string | null;
    created_at : string;
    updated_at : string;
}