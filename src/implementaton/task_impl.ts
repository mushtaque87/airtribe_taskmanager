import client from '../db';
import { Task } from '../model/Task';
import log from '../utils/logs';

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
