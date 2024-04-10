import React, { useCallback, useEffect, useRef } from "react"
import useToggle from "./useToggle"
import { createPortal } from "react-dom"

interface ModalProps {
  children: React.ReactNode
}

const Modal = ({children}: ModalProps) => {
  const bodyRef = useRef<HTMLBodyElement>(document.getElementsByTagName('body')[0])

  return createPortal(<>
    <div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.3)'}}>
      <div style={{margin: '200px 100px', height: '300px', padding: '20px', background: '#fff', borderRadius: '20px'}}>
        {children}
      </div>
    </div>
  </>, bodyRef.current)
}

export default function TestForPortal() {
  const {status, toggle} = useToggle()

  return <>
    <button onClick={toggle}>toggle</button>
    {status && (<Modal>
      <div>this is modal content example</div>
       </Modal>)}
  </>
}