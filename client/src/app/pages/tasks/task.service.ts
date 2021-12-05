import { Injectable } from '@angular/core';
import {CrudService} from "../../classes/CrudService.generic";
import {ITask, Task} from "../../classes/Task.entity";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CrudService<ITask, Task>{
  get factory() {
    return Task.factory
  }

  getBody(entity: Task) {
    return {
      name: entity.name,
      description: entity.description,
      status: entity.status,
      assignee_id: entity.assignee_id,
      reporter_id: entity.reporter_id,
      parent_id: entity.parent_id,
      project_id: entity.project_id,
    }
  }

  get uri(): string {
    return 'tasks'
  }

}
