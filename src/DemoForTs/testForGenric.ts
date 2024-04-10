// type TestType = {test: boolean}
// 传递类型
// function Test<TestType>(){} 

interface HaveLength {
  length: number
}
// Type 为类型定义一个名称
type TestGeneric<Type extends HaveLength> = (arg: Type) => Type
type FunctionType = (arg: string) => string

// function testForFunction(arg):TestGeneric<string>{return arg}

// testForFunction(1)

// 将 Array<number> 传递到泛型中
type nolength = TestGeneric<Array<number>>
interface LiteralGeneric {
  <Type>(arg: Type): Type
}

// error
// function literalGeneric: LiteralGeneric(arg){
//   return arg
// }

// ok
// const literalGeneric: LiteralGeneric = (arg) => {
//   return arg
// }

type getValue<T, Key extends keyof T> = (arg: T, key: Key) => T[Key]
type keys = keyof Object

// const getValueFun = <T, Key extends keyof T>(arg: T, key: Key):T[Key] => {
//   return arg[key]
// }

function getValueFun<T>(arg: T, key:  keyof T): T[ keyof T] {
  return arg[key]
}

// 当使用泛型的时候，没有指定具体的类型，ts 会通过类型推断，判断出 Type 的类型
getValueFun({a: '1'}, 'a')

// 也可以指定类型 
getValueFun<Array<any>>([1, 2, '3'], 
  2
)

// function testGeneric: TestGeneric<string>(a){
//   return a
// }

// type GenericArray<Type> = Type[]

// type genericArray = GenericArray<number>