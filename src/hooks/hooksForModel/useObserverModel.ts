// //@ts-nocheck

// // interface NewableFunction {
// //   new (...args: any[]): any;
// // }
/**
 * case 1：标准的观察者模式的 demo
 */
// // 被观察者
// const Publish = function () {
//   // 保存所有订阅的观察者
//   this.list = []
//   this.value = null
//   return this
// }

// Publish.prototype.subscribe = function(sub) {
//   this.list.push(sub)
// }

// Publish.prototype.update = function(value) {
//   this.value = value

//   this.list.forEach((sub: typeof Sub) => {
//     sub.notify(this.value)
//   });
// }

// Publish.prototype.cancel = function(sub){
//   this.list = this.list.filter(item => item !== sub)
// }

// // 观察者
// const Sub = function(){
//   this.value = null
//   return this
// }

// // 由 Publish instance 来调用该方法，通知观察者
// Sub.prototype.notify = function(value){
//   this.value = value
//   console.log('recieved change')
// }

// export default function useObserverModel(){
//   const pub = new Publish()
//   const sub = new Sub()
//   pub.subscribe(sub)
//   pub.update(123)
// }

// case 2: 任务状态的流转 与 更新后通知到：任务管理器、活动
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

export default function useObserverModel(){
  const taskManager = singleManager()()
  const task = new TaskCreator(1, taskManager)
}

/**
 * case 3: 使用观察者模式实现 IntersectionObserver
 */
const MyIntersectionObserver = function(callback, options){
  this.observer = []
  this.options = options
  this.callback = callback
}   

MyIntersectionObserver.prototype.observe = function(target){
  this.observer.push(target)
  setTimeout(() => {
    this.notify(target)
  }, this.options.timeout)
}

MyIntersectionObserver.prototype.notify = function(target){
  target.active()
  this.callback(this.observer)
}

const createElem = function({name}){
  return {
    isActive: false,
    name,
    active(){
      this.isActive = true
    }
  }
}

// test cases
export function useIntersectionObserver(){
  const io = new MyIntersectionObserver(function(elems){
    elems.forEach(elem => {
      const {isActive} = elem
      if(isActive){
        console.log(elem.name)
      }
    }) 
  }, {root: createElem({name: 'root-elem'}), timeout: 1000})
  
  io.observe(createElem({name: 'elem-1'}))
  setTimeout(() => io.observe(createElem({name: 'elem-2'})), 3000)
}