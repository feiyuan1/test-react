// @ts-nocheck

/**
 * case 1：
 * 发布者：eventname
 * 订阅者：回调
 * 管理中心：EventManager 提供了注册&触发的 API
 */
const EventManager = function(){
  const events = {}

  const addEventListener = function(name, callback){
    if(!events[name]){events[name] = []}
    events[name].push(callback)
  }

  const on = function(name) {
    if(!events[name]) {return}
    events[name].forEach(callback => callback())
  }

  return {on, addEventListener}
}

// const Pub = function(manager){
//   this.value = null
//   this.manager = manager
//   this.manager.initPub(this)
// }

// Pub.prototype.update = function (value) {
//   this.value = value
//   this.manager.publish(this.value, this)
// }

// const Sub = function(){
//   this.value = null
// }

// Sub.prototype.notify = function(value){
//   console.log('notify: ', value)
//   this.value = value
// }

// const Manager = function() {
//   this.list = {} // 多个 pub-sub; ket-pub value-sub
// }

// Manager.prototype.initPub = function(pub){
//   this.list[pub] = []
// }

// Manager.prototype.subscribe = function(sub, pub){
//   this.list[pub].push(sub)
//   sub.notify(pub.value)
// }

// Manager.prototype.publish = function(value, pub){
//   this.list[pub].forEach(sub => {
//     sub.notify(value)
//   })
// }

// export default function useSubModel(){
//   const manager = new Manager()
//   const pub = new Pub(manager)
//   pub.update('456')
//   const sub = new Sub()
//   manager.subscribe(sub, pub)
//   pub.update('123')

// }


// case 2
// 聊天室
// 调度中心
// 聊天室存在多个用户，每个用户发送的消息应该被广播给所有用户

// const message = {
//   content: '', // 消息内容
//   userId: '', // 消息的发送者
//   roomId: '' // 消息所属聊天室
// }

// 接收消息提醒 & 显示消息
const User = function(userId,  handler){
  this.handler = handler
  this.userId = userId
  this.messages = []

  this.handler.join(userId)

  // 需要显示聊天室中其他人的消息
  // 这里传递当前用户信息的好处是：不需要由 User 来管理自己的回调
  this.handler.subscribe('*', {userId: this.userId, callback: message => {
      this.displayMessage(message)
  }})
}

User.prototype.sendMessage = function(message){
  this.handler.send({content: message, userId: this.userId})
}

User.prototype.displayMessage = function({userId, content}){
  this.messages.push(content)
  console.log('message from: ', this.messages, userId)
}

User.prototype.out = function(){
  this.handler.unSubscribe(this.userId, '*')
}

// TODO 这里的屏蔽和之前的注册回调逻辑不匹配
// 注册：'*'
// 屏蔽：'userId'
User.prototype.avoid = function(userId){
  this.handler.unSubscribe(this.userId, userId)
}

const getMessageHandler = function(){
  let handler = null

  const CreateHandler = function(){
    this.users = {
      '*': []
    }

    // this.callbacks = []
    // const relations = {}
  }

  // const subscriber = {userId, callback}
  CreateHandler.prototype.subscribe = function(userId, subscriber){
    // if(userId === '*'){
    //   Object.values(this.users).forEach(callbacks => callbacks.push(callback))
    //   return
    // }
    this.users[userId].push(subscriber)
  }

  CreateHandler.prototype.send = function({userId, content}) {
    this.users[userId].forEach(subscriber => subscriber.callback({userId, content}))
    this.users['*'].forEach(subscriber => subscriber.callback({userId, content}))
  }

  CreateHandler.prototype.join = function (userId) {
    this.users[userId] = []
  }

  // 只屏蔽某人的消息 - 只清除某一个 userId 下注册的回调
  // 退出聊天 - 该用户所有注册的回调需要清除 & 订阅该用户的回调也需要清除
  CreateHandler.prototype.unSubscribe = function(userId, avoider){
    // 退出聊天
    if(avoider === '*'){
      // 订阅该用户的回调也需要清除
      delete this.users[userId]
    }

    // 只屏蔽某人的消息
    this.users[avoider] = this.users[avoider].filter(subscriber => subscriber.userId !== userId)
    console.log('unsubscrbe: ',userId,  this.users)
  }

  return function(){
    if(handler){
      return handler
    }

    handler = new CreateHandler()
    return handler
  }
}


export default function useSubModel(){
  const messageHandler = getMessageHandler()()
  const user1 = new User('1', messageHandler)
  const user2 = new User('2', messageHandler)
  user1.sendMessage('hi 2')
  user2.sendMessage('hello 1')
  console.log('user 3joined')
  const user3 = new User('3', messageHandler)
  user3.sendMessage('hi 1&2')
  user1.out()
  user2.sendMessage('hi 3!!!!')
  const user4 = new User('4', messageHandler)
  user2.sendMessage('hi 444444')
  user4.avoid('3')
  user3.sendMessage('hi only 2')

}