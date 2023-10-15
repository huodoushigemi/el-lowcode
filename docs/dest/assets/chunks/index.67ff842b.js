import{u as p,P as d,H as u,t as m,v as a,c,F as i,z as l,D as g,d as h,ac as v,a6 as f}from"./framework.395f5f56.js";const w=p({name:"CodePreview",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,required:!0}},setup(e){const t=d(),o=d(0),n=d(!1);return{codeEl:t,height:o,copied:n,toggleCode:()=>{const s=t.value?t.value.offsetHeight:0;o.value=o.value===0?s:0},copyCode:()=>{if(!n.value){try{navigator.clipboard.writeText(e.code)}catch(s){console.log(s)}n.value=!0,setTimeout(()=>{n.value=!1},1e3)}}}}}),y=(e,t)=>{const o=e.__vccOpts||e;for(const[n,s]of t)o[n]=s;return o},k={class:"mdp-demo__preview"},C={class:"mdp-demo__toolbar"},_={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},x=i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"},null,-1),M=[x],S={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},q=i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"},null,-1),E=[q],H=i("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ionicon",viewBox:"0 0 512 512"},[i("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"46",d:"M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"})],-1),P=[H],B={ref:"codeEl"};function O(e,t,o,n,s,z){return a(),c("div",{class:h(["mdp-demo",e.height>0&&"is-expanded"])},[i("div",k,[l(e.$slots,"default")]),i("div",C,[i("div",{class:"mdp-demo__btn mdp-demo__btn-copy",onClick:t[0]||(t[0]=(...r)=>e.copyCode&&e.copyCode(...r))},[e.copied?(a(),c("svg",_,M)):(a(),c("svg",S,E))]),i("div",{class:"mdp-demo__btn mdp-demo__btn-code",onClick:t[1]||(t[1]=(...r)=>e.toggleCode&&e.toggleCode(...r))},P)]),i("div",{class:"mdp-demo__code",style:g({height:e.height+"px",visibility:e.height>0?"visible":"hidden"})},[i("div",B,[l(e.$slots,"code")],512)],4)],2)}const A=y(w,[["render",O]]),R=p({name:"CodePreviewWrapper",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,default:""},component:{type:String,default:"CodePreview"}},setup(e,t){const o=u().appContext.app.component(e.component),n=o||A;return()=>m(n,{code:decodeURIComponent(e.code),lang:decodeURIComponent(e.lang),meta:decodeURIComponent(e.meta)},{default:t.slots.default,code:t.slots.code})}});function T(e,t){return e.install=o=>{o.component(e.name,e),t==null||t.forEach(n=>o.component(n.name,n))},e}const U=e=>Object.keys(e),$=e=>Array.isArray(e)?e:e==null?[]:[e],b=(e,...t)=>typeof e=="function"?e(...t):e;function I(e,t){if(typeof t=="function")return t(e);for(const o of t.split("."))if(!(e=e[o]))break;return e}function D(e,t,o){const n=t.split(".");return n.slice(0,-1).forEach(s=>e=e[s]??(e[s]={})),e[n.at(-1)]=o}function V(e,t=o=>o){const o=f(e)?[]:{};for(const n in e)o[n]=v(e[n])?V(e[n],t):t(e[n]);return o}const L=(e,t)=>e.reduce((o,n)=>(o[I(n,t)]=n,o),{}),W=(e,t)=>Object.fromEntries(Object.entries(e).map(([o,n])=>[o,t(n)]));export{A as H,R as V,U as a,V as d,I as g,L as k,W as m,D as s,$ as t,b as u,T as w};
