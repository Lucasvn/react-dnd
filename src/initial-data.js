import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: {
    body: [
      {
        type: "row",
        key: "row1",
        children: [
          {
            type: "column",
            key: "column1",
            children: [
              {
                type: "component",
                id: "text-component",
                key: "k9s0d1k10",
                styles: ["p4"],
                content: "test content",
              },
            ],
          },
          {
            type: "column",
            key: "column2",
            children: [
              {
                type: "component",
                id: "result-component",
                key: "kls190a12q",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        key: "h3iwa4hW7m",
        children: [
          {
            type: "column",
            key: "0UwNswzXFI",
            children: [
              {
                id: "panel-component",
                key: "uG8kkiFQ2",
                type: "component",
              },
            ],
          },
        ],
      },
      {
        type: "row",
        id: "URvb12Pc2R",
        children: [
          {
            type: "column",
            id: "ohczYViZB5",
            children: [
              {
                id: "table-component",
                key: "FtMn7_DaL",
                type: "table",
                content: {
                  columns: [
                    {
                      field: "firstHeader",
                      headerName: "t1",
                      editable: true,
                    },
                    {
                      field: "secondHeader",
                      headerName: "t2",
                      editable: true,
                    },
                  ],
                  rows: [
                    {
                      firstHeader: "teste 1",
                      secondHeader: "teste 2",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  components: {
    "text-component": {
      id: "text-component",
      type: "text",
      content: "Some text",
    },
    "result-component": {
      id: "result-component",
      type: "result",
      content: "Some result",
    },
    "divider-component": {
      id: "divider-component",
      type: "divider",
      content: "",
    },
    "panel-component": {
      id: "panel-component",
      type: "panel",
      content: "Some panel",
    },
    "link-component": {
      id: "link-component",
      type: "link",
      content: "Some link",
    },
    "table-component": {
      id: "table-component",
      type: "table",
      content: {
        columns: [
          { field: "firstHeader", headerName: "First Header", editable: true },
          {
            field: "secondHeader",
            headerName: "Second Header",
            editable: true,
          },
        ],
        rows: [
          {
            firstHeader: "First row",
            secondHeader: "Second row",
          },
        ],
      },
    },
  },
};

export default initialData;
