// Promise.all([p1, p2]).then([res1, res2])

type Result<T extends any[] = any[]> = {
  [key in keyof T] : Awaited<T[key]>
}

// promises: [...T]
// promises: T
// 有啥区别呢？
const myAll = <T extends any[]>(promises: [...T]):Promise<Result<T>> => {
  return new Promise((res, rej) => {
    const results = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then((result: Awaited<typeof promise>) => {
        results[index] = result
        count++
  
        if(count === promises.length){
          res(results as Result<T>)
        }
      }).catch(rej)
    })
  })
  
}

let a: Promise<number>
let b: Promise<string>
const result = myAll([a, b])
const result1 = Promise.all([a, b])

export default function usePromiseAll(promises: Promise<any>[]){
  // return Promise.myAll(promises)
  return Promise.all(promises)
}