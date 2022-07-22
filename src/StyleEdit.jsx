import React, { useState } from "react";

const style = {
  border: '1px solid black',
  padding: '5px'
}
const StyleEdit = ({ data }) => {
  const changeStyle = () => {
    console.log('styyle')
    const item = data.itemSelected;
    item.style = { 'justify-content': 'flex-end' }    
  }

  return (
    <button className="StyleEdit" style={ style } disabled={ data.disabled } onClick={changeStyle}>
      Alinhar a direita
    </button>
  );
};
export default StyleEdit;
