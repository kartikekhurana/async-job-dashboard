import { WorkerStatus as WorkerStatusType } from '@/lib/api';

export default function WorkerStatus({status}: {status : WorkerStatusType}){
    return (
       <div className="flex items-center gap-2 mb-6">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status.is_alive ? 'bg-green-500' : 'bg-red-500'
        }`}
    />
    <span className='text-[11px] text-gray-500'>
    Worker {status.is_alive ? "Alive" : "Offline"}
      </span>
      </div>
    )
}