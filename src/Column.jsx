import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {};
const Column = ({ data, components, handleDrop, path, layout }) => {
  const ref = useRef(null);
  console.log('column', data)
  const item = {
    type: COLUMN,
    id: data.id,
    children: data.children,
    path,
  }
  const styles = []

  const [{ isDragging }, drag] = useDrag({
    item,
    canDrag: () => {
      const splitItemPath = path.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const row = layout[itemPathRowIndex]
      const itemRowChildrenLength = row && row.children.length;

      return !(itemRowChildrenLength && itemRowChildrenLength < 2)
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        layout={layout}
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity, ...item.style }}
      className="base draggable column "
    >
      {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id} >
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length,
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length,
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default Column;
