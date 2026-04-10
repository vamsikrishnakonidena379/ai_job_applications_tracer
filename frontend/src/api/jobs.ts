
import type { Job } from '../types/Job';

const API_JOBS_URL="http://localhost:5000/api/jobs";

export const fetchJobs= async(): Promise<Job[]> =>{
    const res=await fetch(API_JOBS_URL,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,

        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch jobs");
    }
    return res.json();
}


