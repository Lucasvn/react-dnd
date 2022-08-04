import React, { useState, useCallback } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout
} from "./helpers";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";

const Container = () => {
  const initialBody = initialData.layout.body;
  const initialComponents = initialData.components;
  const [body, setBody] = useState(initialBody);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setBody(handleRemoveItemFromLayout(body, splitItemPath));
    },
    [body]
  );

  const handleContentChange = (itemPath, newContent) => {
    const splitItemPath = itemPath.split("-");
    const pathRowIndex = splitItemPath[0];
    const pathColumnIndex = splitItemPath[1]
    const pathComponentIndex = splitItemPath[2]
    const newBody = body
    newBody[pathRowIndex]
      .children[pathColumnIndex]
      .children[pathComponentIndex].content = newContent
    setBody(newBody)
  }

  const handleDrop = useCallback(
    (dropZone, item) => {
      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, children: item.children };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          key: shortid.generate(),
          id: item.id,
          ...item.component
        };

        const newItem = {
          id: newComponent.id,
          key: newComponent.key,
          type: COMPONENT
        };

        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });

        setBody(
          handleMoveSidebarComponentIntoParent(
            body,
            splitDropZonePath,
            newItem
          ));
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setBody(
            handleMoveWithinParent(body, splitDropZonePath, splitItemPath)
          );
          return;
        }
      }

      // 3. Move + Create
      setBody(
        handleMoveToDifferentParent(
          body,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [body, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        layout={body}
        key={row.key}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
        handleContentChange={handleContentChange}
      />
    );
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page header">
          <div className="exam-title">
            <h3>Nome do exame</h3>
            <p>Intervalo de referência</p>
          </div>
          <div className="result">Resultado</div>
        </div>
        <div className="page">
          {body.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.key}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: body.length
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${body.length}`,
              childrenCount: body.length
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        <TrashDropZone
          data={{
            body
          }}
          onDrop={handleDropToTrashBin}
        />
        <div className="printTemplate">
          <h3>JSON Resultante:</h3>
          <pre>{JSON.stringify({body}, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
export default Container;
