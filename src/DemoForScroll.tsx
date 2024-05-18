import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'

const produceList = (start) => {
  const result = []
  for(let i = 0; i < 5; i++) {
    result.push({
      index: start + i,
      text: `list-itemi-${start} - ${i}`
    })
  }
  console.log('result: ', result)

  return result
}


export default function DemoForScroll(){
  const [list, setList] = useState([])
  const [shouldFetch, setShouldFetch] = useState(false)
  const placeholderRef = useRef(null)
  const parentRef = useRef(null)

  const loadMore = () => {
    setShouldFetch(false)
    if(list.length){
      setList(oldList => [...oldList, ...produceList(list.length)])
      return
    }
    setList(produceList(0))
  }

  useEffect(() => {
    if(shouldFetch){
      loadMore()
    }
  }, [shouldFetch, loadMore])

  console.log('render-list: ', list)

  useLayoutEffect(() => {
    const io = new IntersectionObserver((entries) => {
      // console.log('entries: ', entries)
      entries.forEach(entry => {
        if(entry.target === placeholderRef.current && entry.isIntersecting){
          console.log('add data....')
          setShouldFetch(true)
        }
      })
    }, {
      root: parentRef.current,
      threshold: 0,
      rootMargin: '0px 0px 100px 0px'
    })

    io.unobserve(placeholderRef.current)
    io.observe(placeholderRef.current)

    return function(){
      io.disconnect()
    }
  }, [])

  return <div style={{height: '300px', overflow: 'scroll'}} ref={parentRef}>
    {list.length > 0 && list.map(({index, text}) => <p key={index} style={{height: '30px'}}>{text}</p>)}
    <div ref={placeholderRef}></div>
    {/* 可能是一个 loading */}
  </div>
}