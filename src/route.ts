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
  log.info('POST /tasks', req.body);
  const userProvidedTasks = req.body;
  if (validator.validateTask(userProvidedTasks).status) {
    tasks.push(userProvidedTasks);
    return res.status(200).json(tasks);
  } else {
    return res.status(400).json(validator.validateTask(userProvidedTasks));
  }
});

export default router;
