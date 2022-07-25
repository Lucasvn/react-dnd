import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: {
    "header": [
      {
        "type": "row",
        "isHeader": true,
        "id": "row0",
        "children": [
          {
            "type": "column",
            "isHeader": true,
            "id": "column0",
            "children": [
              {
                "type": "component",
                "isHeader": true,
                "id": "text-component",
                "key": "jk190d2jk"
              }
            ]
          }
        ]
      },
      {
        "type": "row",
        "isHeader": true,
        "id": "row1",
        "children": [
          {
            "type": "column",
            "isHeader": true,
            "id": "column1",
            "children": [
              {
                "type": "component",
                "isHeader": true,
                "id": "text-component",
                "key": "ki190sjk10"
              }
            ]
          }
        ]
      }
    ],
    "body": [
      {
        "type": "row",
        "id": "row1",
        "children": [
          {
            "type": "column",
            "id": "column1",
            "children": [
              {
                "type": "component",
                "id": "text-component",
                "key": "k9s0d1k10",
                "styles": ["p4"]
              }
            ]
          },
          {
            "type": "column",
            "id": "column2",
            "children": [
              {
                "type": "component",
                "id": "result-component",
                "key": "kls190a12q"
              }
            ]
          }
        ]
      },
      {
        "type": "row",
        "id": "h3iwa4hW7m",
        "children": [
          {
            "type": "column",
            "id": "0UwNswzXFI",
            "children": [
              {
                "id": "panel-component",
                "key": "uG8kkiFQ2",
                "type": "component"
              }
            ]
          }
        ]
      }
    ]
  },
  components: {
    "text-component": { id: "text-component", type: "text", content: "Some text" },
    "result-component": { id: "result-component", type: "result", content: "Some result" },
    "divider-component": { id: "divider-component", type: "divider", content: "" },
    "panel-component": { id: "panel-component", type: "panel", content: "Some panel" },
    "link-component": { id: "link-component", type: "link", content: "Some link" },
  },
};

export default initialData;
