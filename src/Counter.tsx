import * as React from 'react'

export const ClickCounter = () => {
  const [count, setCounter] = React.useState(0)
  return (
    <div>
      <button onClick={() => setCounter((c) => c + 1)}>+ Quantity</button>
      <h3>{count}</h3>
      <button onClick={() => setCounter((c) => c - 1)}>- Quantity</button>
    </div>
  )
}
