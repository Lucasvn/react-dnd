import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: 'text-component',
    key: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "text",
      content: "Some text",
    },
  },
  {
    id: 'result-component',
    key: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "result",
      content: "Some result",
    },
  },
  {
    id: 'divider-component',
    key: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "divider",
      content: "Some divider",
    },
  },
  {
    id: 'panel-component',
    key: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "panel",
      content: "Some panel",
    },
  },
  {
    id: 'link-component',
    key: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "link",
      content: "Some link",
    },
  },
];
