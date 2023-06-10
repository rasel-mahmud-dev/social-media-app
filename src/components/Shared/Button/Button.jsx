import React, {FC} from 'react';

const Button = ({className, type="button", children, ...attr}) => {
  return <button  type={type} className={"btn " + className} {...attr} >{children}</button>
};

export default Button;