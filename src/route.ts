import express from 'express';
import { PRIORITY, STATUS } from '../utils/types';
import log from '../utils/logs';
import validator from '../utils/validator';
import { Task } from '../model/Task';
const router = express.Router();

const tasks: Task[] = [
  {
    id: 1,
    title: 'Study',
    description: 'Study is important',
    status: STATUS.TOSTART,
    priority: PRIORITY.HIGH,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Work',
    description: 'Work for Office',
    status: STATUS.DONE,
    priority: PRIORITY.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

router.get('/tasks', (req, res) => {
  // Handle the REST request and send the response
  const { sort } = req.query;
  try {
    if (tasks?.length) {
      let sortedTasks = tasks;
      if (sort === 'createdAt') {
        sortedTasks = tasks.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        );
        return res.status(200).json(sortedTasks);
      }
      if (sort === 'id') {
        sortedTasks = tasks.sort((a, b) => a.id - b.id);
        return res.status(200).json(sortedTasks);
      }
      return res.status(200).json(tasks);
    } else {
      return res.status(400).json('No tasks found');
    }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

router.get('/tasks/:id', (req, res) => {
  // Handle the REST request and send the response
  try {
    const taskSearched = tasks.filter(task => {
      if (task.id == Number(req.params.id)) {
        return task;
      }
    });
    log.info('taskSearched', taskSearched);
    if (taskSearched?.length) {
      return res.status(200).json(taskSearched);
    } else {
      return res.status(400).json('Task not found');
    }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

router.post('/tasks', (req, res) => {
  const userProvidedTasks = req.body;
  const taskValidity = validator.validateTask(userProvidedTasks);
  const taskId = req.body.id;
  const index = tasks.findIndex(task => task.id == Number(taskId));
  if (index >= 0) {
    return res.status(400).json(`Task already exists with id ${taskId}`);
  }
  if (taskValidity.status) {
    userProvidedTasks.createdAt = new Date();
    userProvidedTasks.updatedAt = new Date();
    tasks.push(userProvidedTasks);
    return res.status(200).json(tasks);
  } else {
    return res.status(400).json(`${taskValidity.message}`);
  }
});

router.put('/tasks/:id', (req, res) => {
  const userProvidedTasks = req.body;
  const idSearched = req.params.id;
  log.info('idSearched', idSearched);
  try {
    // Find the index of the object you want to replace
    const index = tasks.findIndex(task => task.id == Number(idSearched));
    log.info('index', index);
    //log.info('taskSearched', taskSearched);
    const taskValidity = validator.validateTask(userProvidedTasks);
    if (taskValidity.status && index >= 0) {
      // Replace the object at the index with a new object
      userProvidedTasks.createdAt = tasks[index].createdAt;
      userProvidedTasks.updatedAt = new Date();
      tasks.splice(index, 1, userProvidedTasks);
      return res.status(200).json(tasks);
    } else {
      return res.status(400).json(`Task not found or ${taskValidity.message}`);
    }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

router.delete('/tasks/:id', (req, res) => {
  const idSearched = req.params.id;
  log.info('idSearched', idSearched);
  try {
    // Find the index of the object you want to replace
    const index = tasks.findIndex(task => task.id == Number(idSearched));
    log.info('index', index);
    //log.info('taskSearched', taskSearched);
    if (index >= 0) {
      // Replace the object at the index with a new object
      tasks.splice(index, 1);
      return res.status(200).json('Task deleted successfully');
    } else {
      return res.status(400).json('Task not found');
    }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

router.get('/tasks/priority/:level', (req, res) => {
  const levelSearched = req.params.level;
  log.info('levelSearched', levelSearched);
  // Handle the REST request and send the response
  try {
    const taskSearched = tasks.filter(task => {
      if (task.priority == levelSearched) {
        return task;
      }
    });
    log.info('taskSearched', taskSearched);
    if (taskSearched?.length) {
      return res.status(200).json(taskSearched);
    } else {
      return res.status(400).json(`Tasks with ${levelSearched} not found`);
    }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

export default router;
