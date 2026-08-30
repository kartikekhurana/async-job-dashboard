'use client';

import { useState, useEffect } from 'react';
import JobBoard from './JobBoard';
import { Job } from '@/types/job';


export default function LiveJobBoard({initialJobs} : {initialJobs: Job[]}){
const [jobs , setJobs] = useState<Job[]>(initialJobs);
useEffect(()=>{
const ws = new WebSocket('ws://127.0.0.1:8000/ws/jobs');

ws.onmessage = (event) =>{
    const updatedJob : Job = JSON.parse(event.data);

     setJobs((currentJobs) => {
        const exists = currentJobs.some((job) => job.id === updatedJob.id);

        if (exists) {
          return currentJobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
          );
        } else {
          return [...currentJobs, updatedJob];
        }
      });
    }
    return ()=>{
        ws.close();
    }
  },[])

return <JobBoard jobs={jobs} />
}