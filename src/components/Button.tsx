import React from "react";

const Button = (props: any) => {
  return (
    <a href="/map">
      <div className="ghost-button">
        <a href="/map">
          {props.children}
          <span className="shift">›</span>
        </a>
        <div className="mask"></div>
      </div>
    </a>
  );
};

export default Button;
