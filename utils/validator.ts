import { Task } from '../model/Task';

class Validator {
  // This class is used to validate the data that is being sent to the server
  static validateTask(task: Task) {
    if (
      // Check if the task has all the required properties
      task?.hasOwnProperty('id') &&
      task?.hasOwnProperty('title') &&
      task?.hasOwnProperty('description') &&
      task?.hasOwnProperty('status') &&
      task?.hasOwnProperty('priority')
    ) {
      return {
        status: true,
        message: 'task has been added',
      };
    } else {
      return {
        status: false,
        message: 'task info is malformed, please provided all the parameters',
      };
    }
  }
}

export default Validator;
