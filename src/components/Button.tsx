import React from 'react'

const Button = (props: any) => {
  return (
    <div className="ghost-button">
      <a href="/map">
        {props.children}
        <span className="shift">›</span>
      </a>
      <div className="mask"></div>
    </div>
  )
}

export default Button;