import client from '../db';

import log from '../utils/logs';

import { Request, Response } from 'express';
import { Task } from '../model/taskModel';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    log.info('getTaskById', id);
    //const tasks = await Task.find({ $text: { $search: id } });
    const task = await Task.findOne({ _id: id });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, priority, status } = req.body;
    const task = new Task({ title, description, priority, status });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    log.info('updateTask', req.body);
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, updatedAt: new Date() },
      { new: true },
    );
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    const deleted = await task.deleteOne({ _id: id });
    res.json({ message: `Task deleted successfully ${deleted}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/*

export async function createTask(task: Task) {
  const db = client.db('task-manager');
  const result = await db.collection('tasks').insertOne(task);
  return result.insertedId;
}

export async function getTasks() {
  const db = client.db('task-manager');
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
}

export async function getTaskById(id: Object) {
  const db = client.db('task-manager');
  const task = await db.collection('tasks').findOne({ _id: id });
  return task;
}

export async function updateTask(id: Object, updates: Task) {
  const db = client.db('task-manager');
  const result = await db
    .collection('tasks')
    .updateOne({ _id: id }, { $set: updates });
  return result.modifiedCount;
}

export async function deleteTask(id: Object) {
  log.info('deleteTask', id);
  const db = client.db('task-manager');
  const result = await db.collection('tasks').deleteOne({ _id: id });
  return result.deletedCount;
}
*/
