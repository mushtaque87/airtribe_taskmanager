import express from 'express';
import { STATUS } from '../utils/types';
import log from '../utils/logs';
import validator from '../utils/validator';
const router = express.Router();

const tasks = [
  {
    id: 1,
    title: 'Study',
    description: 'Study is important',
    status: STATUS.TOSTART,
  },
  {
    id: 2,
    title: 'Work',
    description: 'Work for Office',
    status: STATUS.DONE,
  },
];

router.get('/tasks', (req, res) => {
  // Handle the REST request and send the response
  return res.status(200).json(tasks);
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
  if (validator.validateTask(userProvidedTasks).status) {
    tasks.push(userProvidedTasks);
    return res.status(200).json(tasks);
  } else {
    return res.status(400).json(validator.validateTask(userProvidedTasks));
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
    if (validator.validateTask(userProvidedTasks).status && index >= 0) {
      // Replace the object at the index with a new object
      tasks.splice(index, 1, userProvidedTasks);
      return res.status(200).json(tasks);
    } else {
      return res.status(400).json('Task not found');
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

export default router;
