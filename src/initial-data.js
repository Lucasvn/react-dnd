import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: {
    "body": [
      {
        "type": "row",
        "key": "row1",
        "children": [
          {
            "type": "column",
            "key": "column1",
            "children": [
              {
                "type": "component",
                "id": "text-component",
                "key": "k9s0d1k10",
                "styles": ["p4"],
                "content": "test content"
              }
            ]
          },
          {
            "type": "column",
            "key": "column2",
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
        "key": "h3iwa4hW7m",
        "children": [
          {
            "type": "column",
            "key": "0UwNswzXFI",
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
