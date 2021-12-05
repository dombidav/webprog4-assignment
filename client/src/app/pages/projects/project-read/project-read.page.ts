import {Component, OnDestroy, OnInit} from '@angular/core'
import {Project} from "../../../classes/Project.entity";
import {ProjectService} from "../project.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Task} from 'src/app/classes/Task.entity';
import {TaskService} from "../../tasks/task.service";

@Component({
  selector: 'app-project-read',
  templateUrl: './project-read.page.html',
  styleUrls: [ './project-read.page.scss' ],
})
export class ProjectReadPage implements OnInit, OnDestroy {
  private projectId$: Subscription
  private project$: Subscription

  projectId: string
  project: Project
  task: Task
  dialogOpen = false
  submitted = false
  draggedTask: Task;

  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
  ) {
    this.projectId$ = this.route.params.subscribe(params => this.projectId = params.id);
  }

  ngOnInit() {
    this.init()
  }

  init(){
    this.project$ = this.projectService.read(this.projectId)
      .subscribe(project => {
        this.project = project;
      });
    this.task = Task.factory({projectId: this.projectId})
  }

  ngOnDestroy() {
    this.projectId$.unsubscribe();
    this.project$.unsubscribe();
  }

  openAddTaskDialog() {
    this.dialogOpen = true
  }

  hideDialog() {
    this.dialogOpen = false
    this.submitted = false
  }

  saveTask() {
    if(this.task.name) {
      if (this.task.id) {
        this.taskService.edit(this.task).subscribe(() => this.init())
      } else {
        this.task.project_id = this.projectId
        this.taskService.add(this.task).subscribe(() => this.init())
      }
    }
  }

  dragStart(task: Task) {
    this.draggedTask = task
  }

  dragEnd() {
    this.draggedTask = null;
  }

  drop(status: 0|1|2|3) {
    this.draggedTask.status = status
    this.taskService.edit(this.draggedTask).subscribe(() => this.init())
  }
}
