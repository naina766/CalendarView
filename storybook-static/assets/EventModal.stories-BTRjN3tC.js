import{E as a}from"./EventModal-B70NeFF9.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-DECG5Ksn.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Calendar/EventModal",component:a},e=new Date,l={id:"evt-1",title:"Team Standup",description:"Daily sync meeting",startDate:new Date(e.getFullYear(),e.getMonth(),e.getDate(),9,0),endDate:new Date(e.getFullYear(),e.getMonth(),e.getDate(),9,30),color:"#3b82f6",category:"Meeting"},t={args:{open:!0,initialDate:e,onSave:o=>console.log("Saved event:",o),onClose:()=>console.log("Modal closed")}},n={args:{open:!0,event:l,onSave:o=>console.log("Saved event:",o),onDelete:o=>console.log("Deleted event ID:",o),onClose:()=>console.log("Modal closed")}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    initialDate: now,
    onSave: data => console.log("Saved event:", data),
    onClose: () => console.log("Modal closed")
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    event: sampleEvent,
    onSave: data => console.log("Saved event:", data),
    onDelete: id => console.log("Deleted event ID:", id),
    onClose: () => console.log("Modal closed")
  }
}`,...n.parameters?.docs?.source}}};const g=["CreateMode","EditMode"];export{t as CreateMode,n as EditMode,g as __namedExportsOrder,i as default};
