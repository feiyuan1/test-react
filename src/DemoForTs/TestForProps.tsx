import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import useToggle from './useToggle'

type TestProps = {
  mode: string
}

export default function TestForProps({mode}: TestProps){
  return <>now in mode {mode}</>
}

// export default function TestForProps: React.FunctionComponent<TestProps> ({mode}){
//   return <>now in mode ${mode}</>
// }

/**
 * TestForState
 */
type User = {
  name: string
}

export const TestForHook = () => {
  const [count, setCount] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)
  const {status, toggle} = useToggle()

  useEffect(() => {
    setCount(1)
  }, [])

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    setCount(count => ++count)
  }, [])

  const addUser = useCallback((person?: User) => {
    setUser(person || {
      name: 'bala'
    })
  }, [])

  const handleUserClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if(count > 5){
      addUser({
        name: 'countMore'
      })
      return 
    }
    addUser()
  }, [addUser, count])

  const handleClickSynthetic = (event: React.SyntheticEvent) => {}

  return <>
    {count}
    <button onClick={handleClick}>count++</button>
    currentUser: {JSON.stringify(user)}
    <button onClick={handleUserClick}>adduser</button>
    currentStatus: {status}
    <button onClick={toggle}>toggle</button>
    <button onClick={handleClickSynthetic}>type event</button>
  </>
}

const ChildForRef = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref}>child node</div>
})

export const TestForRef = () => {
  const tempRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<number>(null)
  const childRef = useRef<HTMLDivElement>(null)

  const changeCount = () => {
    countRef.current = (countRef.current || 0) + 1
  }

  return <div ref={tempRef}>
    balaba
  </div>
}

const ReUseTestProps = (props: React.ComponentProps<typeof TestForProps>)=>{
  return <>123</>
}

<ReUseTestProps mode=''/>
