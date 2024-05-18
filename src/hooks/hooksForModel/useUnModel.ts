// 任务状态的流转 与 更新后通知到：任务管理器、活动
const taskType = {
  fullfilled: 1,
  rejected: 2,
  pending: 0
}

const TaskCreator = function(id, manager){
  this.taskStatus = taskType.pending
  this.taskId = id
  this.activities = []
  this.taskManager = manager
}

TaskCreator.prototype.update = function(newStatus){
  this.taskStatus = newStatus

  if(newStatus === taskType.fullfilled){
    this.activities.forEach(activity => activity.notify(this.taskId))
    this.taskManager.release(this.taskId)
  } else {
    // other logic
  }
}

const activityCreator = function(name, taskId){
  this.taskId = taskId
  this.name = name
  this.show = false
}

activityCreator.prototype.notify = function(taskId) {
  this.show = taskId === this.taskId
  console.log('this.show: ', this.show)
}

const singleManager = function(){
  let instance = null

  function TaskManager(){
    this.tasks = []
  }
  TaskManager.prototype.release = function(taskId){
    this.tasks = this.tasks.filter(task => taskId !== task.taskId)
  }

  return function() {
    if(instance){
      return instance
    }
    instance = new TaskManager()
    return instance
  }
}

export default function useUnModel(){
  const taskManager = singleManager()()
  const task = new TaskCreator(1, taskManager)
}