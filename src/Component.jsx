import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";

const STYLES = 'styles'
const CONTENT = 'content'

const style = {
  border: "1px dashed black",
  backgroundColor: "white",
  cursor: "move",
  display: 'flex'
};

const TableComponent = ({ data, component}) => {
  const content = data.content ?? component.content
  return (
    <table>
      <tbody>
        <tr key='table-header'>
          { content.columns.map((header) => {
            return <th key={header.field}>{header.headerName}</th>
          }) }
        </tr>

        { content.rows.map((row) => {
          return <tr>
            {Object.keys(row).map((rowKey) => {
            return <td key={rowKey}>{row[rowKey]}</td> 
            })}
          </tr>
        }) }
      </tbody>
    </table>
  )
}

const TextComponent = ({ data, component, path, handleComponentChange }) => {
  const [isSelected, setIsSelected] = useState(false)
  const handleClick = () => {
    setIsSelected(!isSelected)
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleComponentChange(path, CONTENT, event.currentTarget.textContent)
      event.currentTarget.blur()
    }
  }

  const handleStyleChange = async (newClass) => {
    data.styles = [newClass]
    handleComponentChange(path, STYLES, data.styles)
  }

  return (
    <div className="TextComponent"  onFocus={handleClick}>
      { isSelected && (<span className="tooltip">
        <span onClick={() => handleStyleChange('p1')}>p1</span>
        <span onClick={() => handleStyleChange('p2')}>p2</span>
        <span onClick={() => handleStyleChange('p3')}>p3</span>
        <span onClick={() => handleStyleChange('p4')}>p4</span>
        <span onClick={() => handleStyleChange('p5')}>p5</span>
      </span>)}
      <div 
        contentEditable={true} 
        className={"text "+(data.styles || []).join(' ')} 
        onBlur={(e) => handleComponentChange(path, CONTENT, e.currentTarget.textContent)}
        onKeyDown={(e) => handleEnterPress(e)}
        >
          {data.content ?? component.content}
      </div>
    </div>
  )
}

const Component = ({ data, components, path, layout, handleComponentChange }) => {
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
        return (<div className="image">{data.content ?? component.content}</div>)
      case 'result':
        return (<div className="result" contentEditable={true}>{data.content ?? component.content}</div>)
      case 'divider':
        return (<hr className="divider" />)
      case 'panel':
        return (<div className="panel" contentEditable={true}>{data.content ?? component.content}</div>)
      case 'link':
        return (<a href="link" className="link" contentEditable={true}>{data.content ?? component.content}</a>)
      case 'table':
        return <TableComponent data={data} component={component} />
      default: 
        return <TextComponent data={data} path={path} component={component} handleComponentChange={handleComponentChange} />
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
