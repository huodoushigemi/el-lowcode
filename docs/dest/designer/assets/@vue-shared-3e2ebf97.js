const O=()=>{},j=(t,n)=>{const e=t.indexOf(n);e>-1&&t.splice(e,1)},p=Object.prototype.hasOwnProperty,S=(t,n)=>p.call(t,n),w=Array.isArray,E=t=>s(t)==="[object Date]",r=t=>typeof t=="function",i=t=>typeof t=="string",R=t=>typeof t=="symbol",l=t=>t!==null&&typeof t=="object",A=t=>l(t)&&r(t.then)&&r(t.catch),y=Object.prototype.toString,s=t=>y.call(t),P=t=>s(t).slice(8,-1),z=t=>s(t)==="[object Object]",c=t=>{const n=Object.create(null);return e=>n[e]||(n[e]=t(e))},h=/-(\w)/g,C=c(t=>t.replace(h,(n,e)=>e?e.toUpperCase():"")),f=/\B([A-Z])/g,u=c(t=>t.replace(f,"-$1").toLowerCase()),D=c(t=>t.charAt(0).toUpperCase()+t.slice(1)),b=/;(?![^(]*\))/g,g=/:([^]+)/,m=/\/\*[^]*?\*\//g;function d(t){const n={};return t.replace(m,"").split(b).forEach(e=>{if(e){const o=e.split(g);o.length>1&&(n[o[0].trim()]=o[1].trim())}}),n}function T(t){let n="";if(!t||i(t))return n;for(const e in t){const o=t[e],a=e.startsWith("--")?e:u(e);(i(o)||typeof o=="number")&&(n+=`${a}:${o};`)}return n}export{O as N,r as a,w as b,i as c,l as d,D as e,C as f,E as g,S as h,R as i,A as j,z as k,u as l,d as p,j as r,T as s,P as t};