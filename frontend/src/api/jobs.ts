
import type { Job } from '../types/Job';

const API_JOBS_URL="http://localhost:5000/api/jobs";

export const fetchJobs= async(status?: string): Promise<Job[]> =>{
    const url=status? `${API_JOBS_URL}?status=${status}`:API_JOBS_URL;
    const res=await fetch(url,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,

        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch jobs");
    }
    return res.json();
}


