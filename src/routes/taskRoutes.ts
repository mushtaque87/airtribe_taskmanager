import express from 'express';
import { PRIORITY, STATUS } from '../utils/types';
import log from '../utils/logs';
import validator from '../utils/validator';
import { Task } from '../model/taskModel';
import {
  createTask,
  deleteTask,
  getTaskById,
  // getTaskById,
  getTasks,
  updateTask,
  // updateTask,
} from '../controllers/taskController';

//import { getTasks, searchTasks, createTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;

/*
router.get('/tasks', async (req, res) => {
  // Handle the REST request and send the response
  const { sort } = req.query;
  const tasks = await getTasks();
  log.info('Task from DB', tasks);
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

router.get('/tasks/:id', async (req, res) => {
  // Handle the REST request and send the response

  try {
    // const tasks = await getTasks();
    // const taskSearched = tasks.filter(task => {
    //   if (task.id == Number(req.params.id)) {
    //     return task;
    //   }
    // });
    //log.info('id searcged', Number(req.params.id));
    //const taskId = req.params.id;
    const idSearched = req.params.id;
    log.info('idSearched', idSearched);

    const taskSearched = await getTaskById(Number(idSearched));
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

router.post('/tasks', async (req, res) => {
  const userProvidedTasks = req.body;
  const taskValidity = validator.validateTask(userProvidedTasks);
  let tasks = await getTasks();
  const taskId = req.body.id;
  const index = tasks.findIndex(task => task.id == Number(taskId));
  if (index >= 0) {
    return res.status(400).json(`Task already exists with id ${taskId}`);
  }
  if (taskValidity.status) {
    userProvidedTasks.createdAt = new Date();
    userProvidedTasks.updatedAt = new Date();
    // tasks.push(userProvidedTasks);
    const taskId = await createTask(userProvidedTasks);
    log.info('taskId **', taskId);
    tasks = await getTasks();
    return res.status(200).json(tasks);
  } else {
    return res.status(400).json(`${taskValidity.message}`);
  }
});

router.put('/tasks/:id', async (req, res) => {
  const userProvidedTasks = req.body;
  const idSearched = req.params.id;
  log.info('idSearched', idSearched);
  try {
    const tasks = await getTasks();
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

router.delete('/tasks/:id', async (req, res) => {
  const idSearched = req.params.id;
  log.info('idSearched', idSearched);
  try {
    //const tasks = await getTasks();
    // Find the index of the object you want to replace
    // const index = tasks.findIndex(task => task._id == Number(idSearched));
    // log.info('index', index);
    // //log.info('taskSearched', taskSearched);
    // if (index >= 0) {
    // Replace the object at the index with a new object
    //tasks.splice(index, 1);
    const deleted = await deleteTask(idSearched);
    log.info('deleted **', deleted);
    return res.status(200).json('Task deleted successfully');
    // } else {
    //   return res.status(400).json('Task not found');
    // }
  } catch (error) {
    return res.status(500).json('Endpoint Failed');
  }
});

router.get('/tasks/priority/:level', async (req, res) => {
  const levelSearched = req.params.level;
  log.info('levelSearched', levelSearched);
  // Handle the REST request and send the response
  try {
    const tasks = await getTasks();
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
*/
