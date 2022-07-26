import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";

const style = {
  border: "1px dashed black",
  backgroundColor: "white",
  cursor: "move",
  display: 'flex'
};

const TextComponent = ({ data, component }) => {
  const [isSelected, setIsSelected] = useState(false)
  const handleClick = () => {
    setIsSelected(!isSelected)
  }

  const [classes, setClasses] = useState(data.styles || []);

  return (
    <div className="TextComponent"  onFocus={handleClick}>
      { isSelected && (<span className="tooltip">
        <span onClick={() => setClasses(['p1'])}>p1</span>
        <span onClick={() => setClasses(['p2'])}>p2</span>
        <span onClick={() => setClasses(['p3'])}>p3</span>
        <span onClick={() => setClasses(['p4'])}>p4</span>
        <span onClick={() => setClasses(['p5'])}>p5</span>
      </span>)}
      <div contentEditable={true} className={"text "+classes.join(' ')}>{component.content}</div>
    </div>
  )
}

const Component = ({ data, components, path, layout }) => {
  const ref = useRef(null);
  console.log('path', path)

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    canDrag: () => {
      const splitItemPath = path.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const itemPathColumnIndex = splitItemPath[1]
      const column = layout[itemPathRowIndex].children[itemPathColumnIndex]
      const itemColumnChildrenLength = column && column.children.length;

      return !(itemColumnChildrenLength && itemColumnChildrenLength < 2)
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  console.log('data',data)
  const component = components[data.id];
  console.log('component',component)
  console.log('components',components)

  const renderComponentType = () => {
    switch (component.type) {
      case 'image':
          return (<div className="image">{component.content}</div>)
      case 'table':
          return (<div className="table">{component.content}</div>)
      case 'result':
          return (<div className="result" contentEditable={true}>{component.content}</div>)
      case 'divider':
          return (<hr className="divider" />)
      case 'panel':
          return (<div className="panel" contentEditable={true}>{component.content}</div>)
      case 'link':
          return (<a href="link" className="link" contentEditable={true}>{component.content}</a>)
      default: 
        return <TextComponent data={data} component={component} />
    }
  }

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      {renderComponentType()}
    </div>
  );
};
export default Component;
