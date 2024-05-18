import React from "react";
import { Button } from "antd";
import styles from './AntdDemo.module.css'

export default function CssModuleDemo(){
  console.log('styles: ', styles)

  return <div className={styles.AntdDemo + ' AntdDemo'}>
    <Button type="primary">Primary</Button>
    {/* <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="link">Link</Button> */}
  </div>
}