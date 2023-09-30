import { PRIORITY, STATUS } from '../utils/types';

export interface Task {
  title: string;
  description: string;
  status: STATUS;
  priority: PRIORITY;
  createdAt: Date;
  updatedAt: Date;
}
