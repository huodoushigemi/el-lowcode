import{u as a,t as d,H as r}from"./framework.142a42ed.js";import{C as c}from"./index.d40701f4.js";const i=a({name:"MarkdownPreview",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,default:""},component:{type:String,default:"CodePreview"}},setup(e,o){const t=r().appContext.app.component(e.component),n=t||c;return()=>d(n,{code:decodeURIComponent(e.code),lang:decodeURIComponent(e.lang),meta:decodeURIComponent(e.meta)},{default:o.slots.default,code:o.slots.code})}});export{i as M};