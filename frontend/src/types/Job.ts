export interface Job{
    id: number;
    company: string;
    role: string;
    status: 'applied' | 'interview' | 'offer' | 'rejected';
    notes?: string;
    created_at: string;
}