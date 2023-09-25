import express from 'express';
import { STATUS } from '../utils/types';
import log from '../utils/logs';
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
  const taskSearched = tasks.filter(task => {
    if (task.id == Number(req.params.id)) {
      return task;
    }
  });
  log.info('taskSearched', taskSearched);
  return res.json(taskSearched);
});

export default router;
