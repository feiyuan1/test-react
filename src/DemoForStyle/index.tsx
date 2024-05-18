import React from "react"
import { getMultModule } from "../utils/requireContext"

// 需要安装 webpack 环境变量相关的类型声明 @types/webpack-dev，否则 ts 报错：context not in NodeRequire
export default function DemoForStyle(){
  const modules = getMultModule(require.context('./', false, /(?<!\/index)\.(jsx|tsx)$/))

  return <>
    {modules.map(({default: Component}) => <Component />)}
  </>
}