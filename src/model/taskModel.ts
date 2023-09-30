import { PRIORITY, STATUS } from '../utils/types';

import { model, Schema, Document } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: STATUS;
  priority: PRIORITY;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

taskSchema.index({ title: 'text', description: 'text' });

export const Task = model<TaskDocument>('Task', taskSchema);

// export interface Task {
//   title: string;
//   description: string;
//   status: STATUS;
//   priority: PRIORITY;
//   createdAt: Date;
//   updatedAt: Date;
// }
