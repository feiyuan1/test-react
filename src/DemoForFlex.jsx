import { useState } from "react"

export default function DemoForFlex(){
  const [list, setList] = useState(new Array(8).fill('item'))
  /**
   * 当父级宽度不定时，保证一行 3 个，且间距固定 20px，超出换行 
   * =》子级非定宽，且为正方形
   * 
   */
  return <div>
  <div style={{display: 'inline-flex', flexWrap: 'wrap', width: '50vw', background: 'rgba(0,0,0,0.2)', margin: '0 -10px'}}>
    {list.map((item, index) => (
      <div key={index} style={{flex: '1 0 calc(33.33% - 20px)', margin: '10px', background: '#aaccbb', flexShrink: 0}}>
        <div style={{width: '100%', paddingTop: '100%'}}></div>
      </div>
    ))}
  </div>
  </div>
}