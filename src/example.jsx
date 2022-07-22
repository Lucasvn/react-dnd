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
import StyleEdit from "./StyleEdit";

const Container = () => {
  const initialBody = initialData.layout.body;
  const initialHeader = initialData.layout.header;
  const initialComponents = initialData.components;
  const [body, setBody] = useState(initialBody);
  const [header, setHeader] = useState(initialHeader);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      console.log('item', item)
      !!item.isHeader ?
        setHeader(handleRemoveItemFromLayout(header, splitItemPath))
        : setBody(handleRemoveItemFromLayout(body, splitItemPath));
    },
    [body, header]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('dropZone', dropZone)
      console.log('item', item)

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, isHeader: dropZone.isHeader, children: item.children };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
          isHeader: dropZone.isHeader
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });

        !!dropZone.isHeader 
          ? setHeader(
              handleMoveSidebarComponentIntoParent(
                header,
                splitDropZonePath,
                newItem
              )) 
          : setBody(
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
          !!dropZone.isHeader ?
            setHeader(
              handleMoveWithinParent(header, splitDropZonePath, splitItemPath)
            )
            : setBody(
              handleMoveWithinParent(body, splitDropZonePath, splitItemPath)
            );
          return;
        }
      }

      if (item.isHeader !== dropZone.isHeader) {
        if (!!item.isHeader) {
          setBody(
            handleMoveToDifferentParent(
              body,
              splitDropZonePath,
              splitItemPath,
              newItem
            )
          )
        } else {
          setHeader(
            handleMoveToDifferentParent(
              header,
              splitDropZonePath,
              splitItemPath,
              newItem
            )
          )
        }
        handleDropToTrashBin(dropZone, item)
        return
      }

      // 3. Move + Create
      !!dropZone.isHeader ?
        setHeader(
          handleMoveToDifferentParent(
            header,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        )
        : setBody(
          handleMoveToDifferentParent(
            body,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
    },
    [body, header, components]
  );

  const [disableStyle, setDisableStyle] = useState(true)


  const renderRow = (row, currentPath, isHeader = false) => {
    return (
      <Row
        isHeader={isHeader}
        layout={isHeader ? header : body}
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
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
        <div className="page">
          {header.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                {renderRow(row, currentPath, true)}
              </React.Fragment>
            );
          })}
        </div>
        <div className="page">
          {body.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
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
            body,
            header
          }}
          onDrop={handleDropToTrashBin}
        />
        <div className="printTemplate">
          <h3>JSON Resultante:</h3>
          <pre>{JSON.stringify({header, body}, undefined, 2)}</pre>
        </div>
      </div>
      
      <div className="sideBar">
        <StyleEdit data={{ disabled: disableStyle }} />
      </div>
    </div>
  );
};
export default Container;
