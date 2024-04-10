import { useCallback, useState } from "react"

export default function useToggle(init: boolean = false){
  const [status, setStatus] = useState(init || false)

  const toggle = () => {
    setStatus(!status)
  }

  return {status, toggle}
}