import { PRIORITY, STATUS } from '../utils/types';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: STATUS;
  priority: PRIORITY;
}
