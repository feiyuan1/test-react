// @ts-nocheck
import { useRef } from "react"
import { fromJS } from "immutable"
import {produce} from "immer"

/**
 * case 1：尝试使用 new Proxy 来创建代理
 */
// const useProxy = function(){
//   const arr = [1, 2, 3]
//   const p = new Proxy(arr, {
//     get(target, property, reciever){
//       console.log('get-proxy: ', arguments)
//       return target[property]
//     },
//     set(target, i, value, reciever){
//       console.log('set-proxy: ', arguments)
//       target[i] = value
//       return true
//     }
//   })

//   const index1 = p[1]
//   // p[0] = 4
//   // console.log('p changed: ', p, index1)
//   // 从第 index 位开始 更新值，并且更新 length
//   p.splice(0, 1) 
// }

/**
 * case 2: 尝试使用代理模式 + new Proxy 解决 immutable 使用复杂的问题 -- 失败的
 */
const useImmutableState = function(initState = {
  todoList: [
    {id: 1, text: 'todo1'}
  ],
  filter: {
    status: 'all',
  },
  person: {
    name: "匿名用户",
  },
}, data){
  const recordRef = useRef(data || fromJS(initState))

  const state = new Proxy(initState, {
    get(target, prop, reciever){
      return recordRef.current.get(prop)
    },
    set(target, prop, value, reciever){
      recordRef.current = recordRef.current.set(prop, value)
      return true
    },
  })

  for(const prop in initState){
    // state[prop] = useImmutableState(state[prop], recordRef.current[prop])
  }

  return state
}

function useImmer(){

  const baseState = [
      {
          title: "Learn TypeScript",
          done: true
      },
      {
          title: "Try Immer",
          done: false
      }
  ]

  const nextState = produce(baseState, draftState => {
    console.log('isEqaul: ', draftState[0] === baseState[0])
      draftState.push({title: "Tweet about it"})
      draftState[1].done = true
  })

  console.log('part2-isEqaul: ', nextState)
}


export default function useProxyModel(){
  // useProxy()
  const state = useImmutableState()
  // state.name = 'test'
  // state.todoList.push({id: 2, text: 'todo2'})
  // state.person.name = 'pzq'
  console.log('get from state: ', state.person)

  // const map = fromJS({
  //   todoList: [
  //     {id: 1, text: 'todo1'}
  //   ],
  //   filter: {
  //     status: 'all',
  //   },
  //   person: {
  //     name: "匿名用户",
  //   },
  // })

  // const list = map.get('todoList').push({})
  // const map2 = map.set('todoList', list)
  // console.log('todolist: ', map2, map2.get('todoList'))

  // useImmer()
}

// case 3：使用代理模式实现图片预加载
export function useProxyImg(){
  const loadingUrl = ''

  const proxyImg = function(img){
    
    img.setSrc = (url) => {
      this.src = loadingUrl

      const node = new Image()
      node.onload = () => {
        this.src = url
      }
      node.src = url

    }
    
    return img
  }

  const img = proxyImg(document.createElement('img'))
  img.setSrc(url)
  document.body.appendChild(img)
}