import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: {
    header: [
      {
        type: ROW,
        isHeader: true,
        id: "row0",
        children: [
          {
            type: COLUMN,
            isHeader: true,
            id: "column0",
            children: [
              {
                type: COMPONENT,
                isHeader: true,
                id: "component0",
              },
            ],
          },
        ],
      },
      {
        type: ROW,
        isHeader: true,
        id: "row1",
        children: [
          {
            type: COLUMN,
            isHeader: true,
            id: "column1",
            children: [
              {
                type: COMPONENT,
                isHeader: true,
                id: "component0",
              },
            ],
          },
        ],
      },
    ],
    body: [
      {
        type: ROW,
        id: "row1",
        children: [
          {
            type: COLUMN,
            id: "column1",
            children: [
              {
                type: COMPONENT,
                id: "component0",
              },
            ],
          },
          {
            type: COLUMN,
            id: "column2",
            children: [
              {
                type: COMPONENT,
                id: "component1",
              },
            ],
          },
        ],
      },
    ],
  },
  components: {
    component0: { id: "component0", type: "text", content: "Some text" },
    component1: { id: "component1", type: "result", content: "Some result" },
    component2: { id: "component2", type: "divider", content: "" },
    component3: { id: "component3", type: "panel", content: "Some panel" },
    component4: { id: "component4", type: "link", content: "Some link" },
  },
};

export default initialData;
