import React from 'react'
import Styles from './title.module.css'
const Title = () => {
  return (
    <div className={Styles.container}>
    <header className={Styles.header}>
      <h1 id="title" className={Styles.text}>Field Property Information</h1>
    </header>
    </div>
  )
}

export default Title;