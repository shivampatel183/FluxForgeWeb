export interface Project {
  id: string;
  repoFullName: string;
  defaultBranch: string;
  createdAt: string;
  status?: 'active' | 'building' | 'failed';
  lastRun?: string;
}
