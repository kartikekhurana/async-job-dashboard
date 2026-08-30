import { Job, JobStatus } from '@/types/job';
import JobColumn from './JobColumn';

const columns: {title : string , status : JobStatus}[] = [
    {title : "Queued" , status : 'queued'},
    {title : "Running" , status : 'running'},
    {title : "Retrying" , status : 'retrying'},
    { title: 'Success', status: 'success' },
    { title: 'Dead Letter', status: 'dead_letter' },
]

export default function JobBoard({jobs} : {jobs : Job[]}){
    return (
        <div className='flex gap-6'>
            {
                columns.map((col)=>(
                    <JobColumn 
                    key={col.status}
                    title={col.title}
                    status={col.status}
                    jobs={jobs.filter(jobs =>jobs.status === col.status)}
                    />
                ))
            }
        </div>
    )
}
