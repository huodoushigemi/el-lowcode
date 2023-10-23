import{getCurrentScope as de,onScopeDispose as ve,unref as pe,getCurrentInstance as B,onMounted as U,nextTick as q,ref as m,readonly as H,toRef as Se,customRef as Pe,watch as S,isRef as Ee,shallowRef as J,watchEffect as K,computed as C,markRaw as Ae}from"https://play.vuejs.org/vue.runtime.esm-browser.js";function k(e){return de()?(ve(e),!0):!1}function M(e){return typeof e=="function"?e():pe(e)}const me=typeof window<"u"&&typeof document<"u",Ce=Object.prototype.toString,Te=e=>Ce.call(e)==="[object Object]",De=()=>+Date.now(),W=()=>{};function he(e,t){function n(...r){return new Promise((o,u)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(u)})}return n}const G=e=>e();function Ie(e,t={}){let n,r,o=W;const u=s=>{clearTimeout(s),o(),o=W};return s=>{const i=M(e),l=M(t.maxWait);return n&&u(n),i<=0||l!==void 0&&l<=0?(r&&(u(r),r=null),Promise.resolve(s())):new Promise((c,d)=>{o=t.rejectOnCancel?d:c,l&&!r&&(r=setTimeout(()=>{n&&u(n),r=null,c(s())},l)),n=setTimeout(()=>{r&&u(r),r=null,c(s())},i)})}}function ye(e=G){const t=m(!0);function n(){t.value=!1}function r(){t.value=!0}const o=(...u)=>{t.value&&e(...u)};return{isActive:H(t),pause:n,resume:r,eventFilter:o}}function St(e,t,n=!1){return t.reduce((r,o)=>(o in e&&(!n||e[o]!==void 0)&&(r[o]=e[o]),r),{})}function Fe(...e){if(e.length!==1)return Se(...e);const t=e[0];return typeof t=="function"?H(Pe(()=>({get:t,set:W}))):m(t)}function $e(e,t,n={}){const{eventFilter:r=G,...o}=n;return S(e,he(r,t),o)}function Ne(e,t,n={}){const{eventFilter:r,...o}=n,{eventFilter:u,pause:a,resume:s,isActive:i}=ye(r);return{stop:$e(e,t,{...o,eventFilter:u}),pause:a,resume:s,isActive:i}}function ge(e,t=!0){B()?U(e):t?e():q(e)}function Re(e,t,n={}){const{eventFilter:r=G,...o}=n,u=he(r,t);let a,s,i;if(o.flush==="sync"){const l=m(!1);s=()=>{},a=c=>{l.value=!0,c(),l.value=!1},i=S(e,(...c)=>{l.value||u(...c)},o)}else{const l=[],c=m(0),d=m(0);s=()=>{c.value=d.value},l.push(S(e,()=>{d.value++},{...o,flush:"sync"})),a=f=>{const v=d.value;f(),c.value+=d.value-v},l.push(S(e,(...f)=>{const v=c.value>0&&c.value===d.value;c.value=0,d.value=0,!v&&u(...f)},o)),i=()=>{l.forEach(f=>f())}}return{stop:i,ignoreUpdates:a,ignorePrevAsyncUpdates:s}}function Pt(e,t,n){let r;Ee(n)?r={evaluating:n}:r=n||{};const{lazy:o=!1,evaluating:u=void 0,shallow:a=!0,onError:s=W}=r,i=m(!o),l=a?J(t):m(t);let c=0;return K(async d=>{if(!i.value)return;c++;const f=c;let v=!1;u&&Promise.resolve().then(()=>{u.value=!0});try{const p=await e(h=>{d(()=>{u&&(u.value=!1),v||h()})});f===c&&(l.value=p)}catch(p){s(p)}finally{u&&f===c&&(u.value=!1),v=!0}}),o?C(()=>(i.value=!0,l.value)):l}function R(e){var t;const n=M(e);return(t=n==null?void 0:n.$el)!=null?t:n}const I=me?window:void 0;function $(...e){let t,n,r,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,o]=e,t=I):[t,n,r,o]=e,!t)return W;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const u=[],a=()=>{u.forEach(c=>c()),u.length=0},s=(c,d,f,v)=>(c.addEventListener(d,f,v),()=>c.removeEventListener(d,f,v)),i=S(()=>[R(t),M(o)],([c,d])=>{if(a(),!c)return;const f=Te(d)?{...d}:d;u.push(...n.flatMap(v=>r.map(p=>s(c,v,p,f))))},{immediate:!0,flush:"post"}),l=()=>{i(),a()};return k(l),l}function je(){const e=m(!1);return B()&&U(()=>{e.value=!0}),e}function Z(e){const t=je();return C(()=>(t.value,!!e()))}function Me(e,t={}){const{window:n=I}=t,r=Z(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let o;const u=m(!1),a=l=>{u.value=l.matches},s=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",a):o.removeListener(a))},i=K(()=>{r.value&&(s(),o=n.matchMedia(M(e)),"addEventListener"in o?o.addEventListener("change",a):o.addListener(a),u.value=o.matches)});return k(()=>{i(),s(),o=void 0}),u}function we(e){return JSON.parse(JSON.stringify(e))}const z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V="__vueuse_ssr_handlers__",Le=xe();function xe(){return V in z||(z[V]=z[V]||{}),z[V]}function be(e,t){return Le[e]||t}function We(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const ze={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},te="vueuse-storage";function Y(e,t,n,r={}){var o;const{flush:u="pre",deep:a=!0,listenToStorageChanges:s=!0,writeDefaults:i=!0,mergeDefaults:l=!1,shallow:c,window:d=I,eventFilter:f,onError:v=g=>{console.error(g)}}=r,p=(c?J:m)(t);if(!n)try{n=be("getDefaultStorage",()=>{var g;return(g=I)==null?void 0:g.localStorage})()}catch(g){v(g)}if(!n)return p;const h=M(t),y=We(h),b=(o=r.serializer)!=null?o:ze[y],{pause:E,resume:w}=Ne(p,()=>O(p.value),{flush:u,deep:a,eventFilter:f});return d&&s&&($(d,"storage",F),$(d,te,j)),F(),p;function O(g){try{if(g==null)n.removeItem(e);else{const _=b.write(g),P=n.getItem(e);P!==_&&(n.setItem(e,_),d&&d.dispatchEvent(new CustomEvent(te,{detail:{key:e,oldValue:P,newValue:_,storageArea:n}})))}}catch(_){v(_)}}function A(g){const _=g?g.newValue:n.getItem(e);if(_==null)return i&&h!==null&&n.setItem(e,b.write(h)),h;if(!g&&l){const P=b.read(_);return typeof l=="function"?l(P,h):y==="object"&&!Array.isArray(P)?{...h,...P}:P}else return typeof _!="string"?_:b.read(_)}function j(g){F(g.detail)}function F(g){if(!(g&&g.storageArea!==n)){if(g&&g.key==null){p.value=h;return}if(!(g&&g.key!==e)){E();try{(g==null?void 0:g.newValue)!==b.write(p.value)&&(p.value=A(g))}catch(_){v(_)}finally{g?q(w):w()}}}}}function Ve(e){return Me("(prefers-color-scheme: dark)",e)}function Be(e={}){const{selector:t="html",attribute:n="class",initialValue:r="auto",window:o=I,storage:u,storageKey:a="vueuse-color-scheme",listenToStorageChanges:s=!0,storageRef:i,emitAuto:l,disableTransition:c=!0}=e,d={auto:"",light:"light",dark:"dark",...e.modes||{}},f=Ve({window:o}),v=C(()=>f.value?"dark":"light"),p=i||(a==null?Fe(r):Y(a,r,u,{window:o,listenToStorageChanges:s})),h=C(()=>p.value==="auto"?v.value:p.value),y=be("updateHTMLAttrs",(O,A,j)=>{const F=typeof O=="string"?o==null?void 0:o.document.querySelector(O):R(O);if(!F)return;let g;if(c){g=o.document.createElement("style");const _="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";g.appendChild(document.createTextNode(_)),o.document.head.appendChild(g)}if(A==="class"){const _=j.split(/\s/g);Object.values(d).flatMap(P=>(P||"").split(/\s/g)).filter(Boolean).forEach(P=>{_.includes(P)?F.classList.add(P):F.classList.remove(P)})}else F.setAttribute(A,j);c&&(o.getComputedStyle(g).opacity,document.head.removeChild(g))});function b(O){var A;y(t,n,(A=d[O])!=null?A:O)}function E(O){e.onChanged?e.onChanged(O,b):b(O)}S(h,E,{flush:"post",immediate:!0}),ge(()=>E(h.value));const w=C({get(){return l?p.value:h.value},set(O){p.value=O}});try{return Object.assign(w,{store:p,system:v,state:h})}catch{return w}}function Et(e,t,n={}){const{window:r=I,...o}=n;let u;const a=Z(()=>r&&"MutationObserver"in r),s=()=>{u&&(u.disconnect(),u=void 0)},i=S(()=>R(e),c=>{s(),a.value&&r&&c&&(u=new MutationObserver(t),u.observe(c,o))},{immediate:!0}),l=()=>{s(),i()};return k(l),{isSupported:a,stop:l}}function At(e={}){const{valueDark:t="dark",valueLight:n=""}=e,r=Be({...e,onChanged:(u,a)=>{var s;e.onChanged?(s=e.onChanged)==null||s.call(e,u==="dark",a,u):a(u)},modes:{dark:t,light:n}});return C({get(){return r.value==="dark"},set(u){const a=u?"dark":"light";r.system.value===a?r.value="auto":r.value=a}})}function Oe(e){return e}function He(e,t){return e.value=t}function Je(e){return e?typeof e=="function"?e:we:Oe}function ke(e){return e?typeof e=="function"?e:we:Oe}function Qe(e,t={}){const{clone:n=!1,dump:r=Je(n),parse:o=ke(n),setSource:u=He}=t;function a(){return Ae({snapshot:r(e.value),timestamp:De()})}const s=m(a()),i=m([]),l=m([]),c=w=>{u(e,o(w.snapshot)),s.value=w},d=()=>{i.value.unshift(s.value),s.value=a(),t.capacity&&i.value.length>t.capacity&&i.value.splice(t.capacity,Number.POSITIVE_INFINITY),l.value.length&&l.value.splice(0,l.value.length)},f=()=>{i.value.splice(0,i.value.length),l.value.splice(0,l.value.length)},v=()=>{const w=i.value.shift();w&&(l.value.unshift(s.value),c(w))},p=()=>{const w=l.value.shift();w&&(i.value.unshift(s.value),c(w))},h=()=>{c(s.value)},y=C(()=>[s.value,...i.value]),b=C(()=>i.value.length>0),E=C(()=>l.value.length>0);return{source:e,undoStack:i,redoStack:l,last:s,history:y,canUndo:b,canRedo:E,clear:f,commit:d,reset:h,undo:v,redo:p}}function Ue(e,t={}){const{deep:n=!1,flush:r="pre",eventFilter:o}=t,{eventFilter:u,pause:a,resume:s,isActive:i}=ye(o),{ignoreUpdates:l,ignorePrevAsyncUpdates:c,stop:d}=Re(e,y,{deep:n,flush:r,eventFilter:u});function f(O,A){c(),l(()=>{O.value=A})}const v=Qe(e,{...t,clone:t.clone||n,setSource:f}),{clear:p,commit:h}=v;function y(){c(),h()}function b(O){s(),O&&y()}function E(O){let A=!1;const j=()=>A=!0;l(()=>{O(j)}),A||y()}function w(){d(),p()}return{...v,isTracking:i,pause:a,resume:b,commit:y,batch:E,dispose:w}}function Ct(e,t={}){const n=t.debounce?Ie(t.debounce):void 0;return{...Ue(e,{...t,eventFilter:n})}}function Tt(e,t={}){const n=m(!1),r=J(null);let o=0;if(me){const u=typeof t=="function"?{onDrop:t}:t,a=s=>{var i,l;const c=Array.from((l=(i=s.dataTransfer)==null?void 0:i.files)!=null?l:[]);return r.value=c.length===0?null:c};$(e,"dragenter",s=>{var i;s.preventDefault(),o+=1,n.value=!0,(i=u.onEnter)==null||i.call(u,a(s),s)}),$(e,"dragover",s=>{var i;s.preventDefault(),(i=u.onOver)==null||i.call(u,a(s),s)}),$(e,"dragleave",s=>{var i;s.preventDefault(),o-=1,o===0&&(n.value=!1),(i=u.onLeave)==null||i.call(u,a(s),s)}),$(e,"drop",s=>{var i;s.preventDefault(),o=0,n.value=!1,(i=u.onDrop)==null||i.call(u,a(s),s)})}return{files:r,isOverDropZone:n}}function qe(e,t,n={}){const{window:r=I,...o}=n;let u;const a=Z(()=>r&&"ResizeObserver"in r),s=()=>{u&&(u.disconnect(),u=void 0)},i=C(()=>Array.isArray(e)?e.map(d=>R(d)):[R(e)]),l=S(i,d=>{if(s(),a.value&&r){u=new ResizeObserver(t);for(const f of d)f&&u.observe(f,o)}},{immediate:!0,flush:"post",deep:!0}),c=()=>{s(),l()};return k(c),{isSupported:a,stop:c}}function Dt(e,t={}){const{reset:n=!0,windowResize:r=!0,windowScroll:o=!0,immediate:u=!0}=t,a=m(0),s=m(0),i=m(0),l=m(0),c=m(0),d=m(0),f=m(0),v=m(0);function p(){const h=R(e);if(!h){n&&(a.value=0,s.value=0,i.value=0,l.value=0,c.value=0,d.value=0,f.value=0,v.value=0);return}const y=h.getBoundingClientRect();a.value=y.height,s.value=y.bottom,i.value=y.left,l.value=y.right,c.value=y.top,d.value=y.width,f.value=y.x,v.value=y.y}return qe(e,p),S(()=>R(e),h=>!h&&p()),o&&$("scroll",p,{capture:!0,passive:!0}),r&&$("resize",p,{passive:!0}),ge(()=>{u&&p()}),{height:a,bottom:s,left:i,right:l,top:c,width:d,x:f,y:v,update:p}}function It(e,t,n={}){const{window:r=I}=n;return Y(e,t,r==null?void 0:r.localStorage,n)}function Ft(e,t,n={}){const{window:r=I}=n;return Y(e,t,r==null?void 0:r.sessionStorage,n)}var Ke=Object.defineProperty,Ge=Object.defineProperties,Ze=Object.getOwnPropertyDescriptors,ne=Object.getOwnPropertySymbols,Ye=Object.prototype.hasOwnProperty,Xe=Object.prototype.propertyIsEnumerable,re=(e,t,n)=>t in e?Ke(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,et=(e,t)=>{for(var n in t||(t={}))Ye.call(t,n)&&re(e,n,t[n]);if(ne)for(var n of ne(t))Xe.call(t,n)&&re(e,n,t[n]);return e},tt=(e,t)=>Ge(e,Ze(t));function $t(e,t){var n;const r=J();return K(()=>{r.value=e()},tt(et({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),H(r)}var oe;const Q=typeof window<"u",nt=e=>typeof e<"u",rt=e=>typeof e=="function",ot=e=>typeof e=="string",L=()=>{},ut=Q&&((oe=window==null?void 0:window.navigator)==null?void 0:oe.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function N(e){return typeof e=="function"?e():pe(e)}function _e(e,t){function n(...r){return new Promise((o,u)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(u)})}return n}function st(e,t={}){let n,r,o=L;const u=s=>{clearTimeout(s),o(),o=L};return s=>{const i=N(e),l=N(t.maxWait);return n&&u(n),i<=0||l!==void 0&&l<=0?(r&&(u(r),r=null),Promise.resolve(s())):new Promise((c,d)=>{o=t.rejectOnCancel?d:c,l&&!r&&(r=setTimeout(()=>{n&&u(n),r=null,c(s())},l)),n=setTimeout(()=>{r&&u(r),r=null,c(s())},i)})}}function it(e,t=!0,n=!0,r=!1){let o=0,u,a=!0,s=L,i;const l=()=>{u&&(clearTimeout(u),u=void 0,s(),s=L)};return d=>{const f=N(e),v=Date.now()-o,p=()=>i=d();return l(),f<=0?(o=Date.now(),p()):(v>f&&(n||!a)?(o=Date.now(),p()):t&&(i=new Promise((h,y)=>{s=r?y:h,u=setTimeout(()=>{o=Date.now(),a=!0,h(p()),l()},Math.max(0,f-v))})),!n&&!u&&(u=setTimeout(()=>a=!0,f)),a=!1,i)}}function at(e){return e}function X(e){return de()?(ve(e),!0):!1}function lt(e,t=200,n={}){return _e(st(t,n),e)}function Nt(e,t=200,n={}){const r=m(e.value),o=lt(()=>{r.value=e.value},t,n);return S(e,()=>o()),r}function Rt(e,t=200,n=!1,r=!0,o=!1){return _e(it(t,n,r,o),e)}function ee(e,t=!0){B()?U(e):t?e():q(e)}function jt(e,t,n={}){const{immediate:r=!0}=n,o=m(!1);let u=null;function a(){u&&(clearTimeout(u),u=null)}function s(){o.value=!1,a()}function i(...l){a(),o.value=!0,u=setTimeout(()=>{o.value=!1,u=null,e(...l)},N(t))}return r&&(o.value=!0,Q&&i()),X(s),{isPending:H(o),start:i,stop:s}}function D(e){var t;const n=N(e);return(t=n==null?void 0:n.$el)!=null?t:n}const x=Q?window:void 0,ct=Q?window.document:void 0;function T(...e){let t,n,r,o;if(ot(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=x):[t,n,r,o]=e,!t)return L;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const u=[],a=()=>{u.forEach(c=>c()),u.length=0},s=(c,d,f,v)=>(c.addEventListener(d,f,v),()=>c.removeEventListener(d,f,v)),i=S(()=>[D(t),N(o)],([c,d])=>{a(),c&&u.push(...n.flatMap(f=>r.map(v=>s(c,f,v,d))))},{immediate:!0,flush:"post"}),l=()=>{i(),a()};return X(l),l}let ue=!1;function Mt(e,t,n={}){const{window:r=x,ignore:o=[],capture:u=!0,detectIframe:a=!1}=n;if(!r)return;ut&&!ue&&(ue=!0,Array.from(r.document.body.children).forEach(f=>f.addEventListener("click",L)));let s=!0;const i=f=>o.some(v=>{if(typeof v=="string")return Array.from(r.document.querySelectorAll(v)).some(p=>p===f.target||f.composedPath().includes(p));{const p=D(v);return p&&(f.target===p||f.composedPath().includes(p))}}),c=[T(r,"click",f=>{const v=D(e);if(!(!v||v===f.target||f.composedPath().includes(v))){if(f.detail===0&&(s=!i(f)),!s){s=!0;return}t(f)}},{passive:!0,capture:u}),T(r,"pointerdown",f=>{const v=D(e);v&&(s=!f.composedPath().includes(v)&&!i(f))},{passive:!0}),a&&T(r,"blur",f=>{var v;const p=D(e);((v=r.document.activeElement)==null?void 0:v.tagName)==="IFRAME"&&!(p!=null&&p.contains(r.document.activeElement))&&t(f)})].filter(Boolean);return()=>c.forEach(f=>f())}function ft(e,t=!1){const n=m(),r=()=>n.value=!!e();return r(),ee(r,t),n}function dt(e){return JSON.parse(JSON.stringify(e))}const se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ie="__vueuse_ssr_handlers__";se[ie]=se[ie]||{};function Lt(e,t,{window:n=x,initialValue:r=""}={}){const o=m(r),u=C(()=>{var a;return D(t)||((a=n==null?void 0:n.document)==null?void 0:a.documentElement)});return S([u,()=>N(e)],([a,s])=>{var i;if(a&&n){const l=(i=n.getComputedStyle(a).getPropertyValue(s))==null?void 0:i.trim();o.value=l||r}},{immediate:!0}),S(o,a=>{var s;(s=u.value)!=null&&s.style&&u.value.style.setProperty(N(e),a)}),o}function xt({document:e=ct}={}){if(!e)return m("visible");const t=m(e.visibilityState);return T(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var ae=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,pt=Object.prototype.propertyIsEnumerable,mt=(e,t)=>{var n={};for(var r in e)vt.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&ae)for(var r of ae(e))t.indexOf(r)<0&&pt.call(e,r)&&(n[r]=e[r]);return n};function ht(e,t,n={}){const r=n,{window:o=x}=r,u=mt(r,["window"]);let a;const s=ft(()=>o&&"ResizeObserver"in o),i=()=>{a&&(a.disconnect(),a=void 0)},l=S(()=>D(e),d=>{i(),s.value&&o&&d&&(a=new ResizeObserver(t),a.observe(d,u))},{immediate:!0,flush:"post"}),c=()=>{i(),l()};return X(c),{isSupported:s,stop:c}}function Wt(e,t={}){const{reset:n=!0,windowResize:r=!0,windowScroll:o=!0,immediate:u=!0}=t,a=m(0),s=m(0),i=m(0),l=m(0),c=m(0),d=m(0),f=m(0),v=m(0);function p(){const h=D(e);if(!h){n&&(a.value=0,s.value=0,i.value=0,l.value=0,c.value=0,d.value=0,f.value=0,v.value=0);return}const y=h.getBoundingClientRect();a.value=y.height,s.value=y.bottom,i.value=y.left,l.value=y.right,c.value=y.top,d.value=y.width,f.value=y.x,v.value=y.y}return ht(e,p),S(()=>D(e),h=>!h&&p()),o&&T("scroll",p,{capture:!0,passive:!0}),r&&T("resize",p,{passive:!0}),ee(()=>{u&&p()}),{height:a,bottom:s,left:i,right:l,top:c,width:d,x:f,y:v,update:p}}var le;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(le||(le={}));var yt=Object.defineProperty,ce=Object.getOwnPropertySymbols,gt=Object.prototype.hasOwnProperty,wt=Object.prototype.propertyIsEnumerable,fe=(e,t,n)=>t in e?yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,bt=(e,t)=>{for(var n in t||(t={}))gt.call(t,n)&&fe(e,n,t[n]);if(ce)for(var n of ce(t))wt.call(t,n)&&fe(e,n,t[n]);return e};const Ot={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};bt({linear:at},Ot);function zt(e,t,n,r={}){var o,u,a;const{clone:s=!1,passive:i=!1,eventName:l,deep:c=!1,defaultValue:d}=r,f=B(),v=n||(f==null?void 0:f.emit)||((o=f==null?void 0:f.$emit)==null?void 0:o.bind(f))||((a=(u=f==null?void 0:f.proxy)==null?void 0:u.$emit)==null?void 0:a.bind(f==null?void 0:f.proxy));let p=l;t||(t="modelValue"),p=l||p||`update:${t.toString()}`;const h=b=>s?rt(s)?s(b):dt(b):b,y=()=>nt(e[t])?h(e[t]):d;if(i){const b=y(),E=m(b);return S(()=>e[t],w=>E.value=h(w)),S(E,w=>{(w!==e[t]||c)&&v(p,w)},{deep:c}),E}else return C({get(){return y()},set(b){v(p,b)}})}function Vt({window:e=x}={}){if(!e)return m(!1);const t=m(e.document.hasFocus());return T(e,"blur",()=>{t.value=!1}),T(e,"focus",()=>{t.value=!0}),t}function Bt(e={}){const{window:t=x,initialWidth:n=1/0,initialHeight:r=1/0,listenOrientation:o=!0,includeScrollbar:u=!0}=e,a=m(n),s=m(r),i=()=>{t&&(u?(a.value=t.innerWidth,s.value=t.innerHeight):(a.value=t.document.documentElement.clientWidth,s.value=t.document.documentElement.clientHeight))};return i(),ee(i),T("resize",i,{passive:!0}),o&&T("orientationchange",i,{passive:!0}),{width:a,height:s}}export{$ as A,Tt as B,T as a,Bt as b,Wt as c,ht as d,Rt as e,Lt as f,jt as g,ut as h,Q as i,xt as j,Vt as k,$t as l,zt as m,St as n,Mt as o,Ft as p,At as q,Nt as r,je as s,X as t,D as u,Dt as v,Et as w,It as x,Ct as y,Pt as z};