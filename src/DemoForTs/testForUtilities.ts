// Record

interface Animal {
  action: string
}

interface A extends Animal{
  name: 'A'
}

interface B extends Animal {
  type: 'B'
}

let C: A[]
let D: B[]
let F: Animal[]

const testA = C || D || F

const a = 'stirng' as string

