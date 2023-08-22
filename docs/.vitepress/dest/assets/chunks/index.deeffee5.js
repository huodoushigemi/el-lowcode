import{u as p,P as r,_ as h,v as a,c as l,F as t,z as c,D as g,d as v,t as _,b as m}from"./framework.934d5ff8.js";const w=p({props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,required:!0}},setup(e){const o=r(),d=r(0),s=r(!1);return{codeEl:o,height:d,copied:s,toggleCode:()=>{const n=o.value?o.value.offsetHeight:0;d.value=d.value===0?n:0},copyCode:()=>{if(!s.value){try{navigator.clipboard.writeText(e.code)}catch(n){console.log(n)}s.value=!0,setTimeout(()=>{s.value=!1},1e3)}}}}}),C={class:"mdp-demo__preview"},f={class:"mdp-demo__toolbar"},k={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},y=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"},null,-1),M=[y],b={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},P=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"},null,-1),S=[P],$=t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ionicon",viewBox:"0 0 512 512"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"46",d:"M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"})],-1),q=[$],H={ref:"codeEl"};function j(e,o,d,s,i,u){return a(),l("div",{class:v(["mdp-demo",e.height.value>0&&"is-expanded"])},[t("div",C,[c(e.$slots,"default")]),t("div",f,[t("div",{class:"mdp-demo__btn mdp-demo__btn-copy",onClick:o[0]||(o[0]=(...n)=>e.copyCode&&e.copyCode(...n))},[e.copied?(a(),l("svg",k,M)):(a(),l("svg",b,S))]),t("div",{class:"mdp-demo__btn mdp-demo__btn-code",onClick:o[1]||(o[1]=(...n)=>e.toggleCode&&e.toggleCode(...n))},q)]),t("div",{class:"mdp-demo__code",style:g({height:e.height+"px",visibility:e.height>0?"visible":"hidden"})},[t("div",H,[c(e.$slots,"code")],512)],4)],2)}const B=h(w,[["render",j]]),z=p({name:"MarkdownPreview",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,default:""},component:{type:String,default:"CodePreview"}},setup(e,o){const s=m().appContext.app.component(e.component),i=s||B;return()=>_(i,{code:decodeURIComponent(e.code),lang:decodeURIComponent(e.lang),meta:decodeURIComponent(e.meta)},{default:o.slots.default,code:o.slots.code})}});export{z as M};