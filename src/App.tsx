import * as React from 'react'
import './styles.css'
import setup from './image/setup.jpeg'
import { ClickCounter } from './Counter'

export interface AppsProps {
  userName: string
  lang: string
}

export default function App(props: AppsProps) {
  return (
    <div>
      <h2>Counter hello</h2>
      <img src={setup} alt="" />
      <ClickCounter />
    </div>
  )
}
