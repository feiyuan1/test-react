import React from "react";
import { Button } from "antd";
import './AntdDemo.css'

export default function AntdDemo(){
  return <div className="AntdDemo">
  <Button type="primary">Primary</Button>
  <Button>Default</Button>
  <Button type="dashed">Dashed</Button>
  <Button type="link">Link</Button>
</div>
}