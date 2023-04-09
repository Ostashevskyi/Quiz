(()=>{"use strict";var e={91:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},447:(e,t,n)=>{e.exports=n.p+"assets/5730ae540814e60ebe3a.js"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href;var r={};(()=>{n.d(r,{n:()=>v});var e=n(91),t=n.n(e),o=new URL(n(447),n.b);t()(o);const c={currentQuestion:0,questionsData:[],questions:[]},s={questionAmount:0,category:"",difficult:"",type:""},i={great:["Well Done","Amazing"],good:["Good","Not Bad"],bad:["U can Better","Try again"]},a=50,u=0;async function d(){if(c.currentQuestion=0,s.questionAmount<=a&&s.questionAmount>u)try{const e=await fetch(`https://opentdb.com/api.php?amount=${s.questionAmount}&category=${s.category}&difficulty=${s.difficult}&type=${s.type}`),t=await e.json();c.questions={...t.results},h()}catch(e){y(e)}else y("Incorrect value")}const l=document.querySelector("main");function p(e){l.replaceChildren(),l.classList.remove("result"),l.classList.add(e)}function h(){p("question");const e=function(e){const t=m("title-div"),n=document.createElement("h2");return n.classList.add("title"),n.innerHTML="Quiz Game",t.appendChild(n),t}();l.appendChild(e);const t=function(e){const t=Object.keys(c.questions).length,n=m("count-div"),r=document.createElement("p");return r.innerHTML=`${e+1} / ${t}`,n.appendChild(r),n}(c.currentQuestion);l.appendChild(t);const n=function(e){const t=m("question-div"),n=c.questions[e],r=document.createElement("h2");r.innerHTML=n.question,t.appendChild(r);const o=document.createElement("p");return o.innerHTML=n.category,t.appendChild(o),t}(c.currentQuestion);l.appendChild(n);const r=function(e){const t=m("notification"),n=document.createElement("p");return n.innerHTML=`Difficult: ${c.questions[e].difficulty}`,t.appendChild(n),t}(c.currentQuestion);l.appendChild(r);const o=function(e){const t=m("answers-div"),n=c.questions[e],r=n.incorrect_answers,o=n.correct_answer;return function(e){let t,n=e.length;for(;0!=n;)t=Math.floor(Math.random()*n),n--,[e[n],e[t]]=[e[t],e[n]];return e}(r.concat(o)).forEach((e=>{const n=document.createElement("button");n.innerHTML=e,t.appendChild(n)})),t}(c.currentQuestion);l.appendChild(o);const s=document.createElement("button");s.classList.add("check-btn","btn"),s.innerHTML="Check Answer",s.addEventListener("click",(()=>{document.querySelector(".selected")?(function(){const e=document.querySelector(".selected"),{questions:t}=c,n=t[c.currentQuestion];c.questionsData[c.currentQuestion]={correctAnswer:n.correct_answer,userAnswer:e.innerHTML,result:n.correct_answer===e.innerHTML}}(c.currentQuestion),function(){const e=Object.keys(c.questions).length;c.currentQuestion+1<e?(c.currentQuestion+=1,h()):function(){p("result"),l.appendChild(function(){const e=Math.ceil(function(){const e=g();return 100*e.trueElems/e.results.length}()),t=m("res-div"),n=document.createElement("p");(function(e,t){const n=Object.keys(i).length;t.innerHTML=e<40?i.bad[L(n-1)]:e>80?i.great[L(n-1)]:i.good[L(n-1)]})(e,n),t.appendChild(n);const r=document.createElement("p");r.innerHTML=function(){const e=Object.keys(c.questions).length;return`You answered ${g().trueElems} / ${e} correctly`}(),t.appendChild(r);const o=document.createElement("p");return o.innerHTML=`It's a ${e}% correct answers`,t.appendChild(o),t}()),l.appendChild(function(){const e=m("accordion-div"),t=document.createElement("button");t.classList.add("accordion-btn"),t.innerHTML="See more",e.appendChild(t);const n=m("panel");return function(e){const t=c.questionsData;for(let n=0;n<t.length;n++){const r=document.createElement("p");r.innerHTML=`Question №${n+1}\n            Your answer: "${t[n].userAnswer}", \n            Correct answer: "${t[n].correctAnswer}"`,r.classList.add(`${t[n].result}`),e.appendChild(r)}}(n),t.addEventListener("click",(()=>{t.classList.toggle("active"),function(e){e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight="200px"}(n)})),e.appendChild(n),e}());const e=m("btns-div");e.appendChild(f("btn-again","Try again")).addEventListener("click",(()=>v(d))),e.appendChild(f("btn-change","To main menu")).addEventListener("click",(()=>location.reload())),l.appendChild(e)}()}()):y("Please choose an option")})),l.appendChild(s),function(){const e=document.querySelector(".answers-div");e.querySelectorAll("button").forEach((t=>{t.addEventListener("click",(n=>{e.querySelector(".selected")&&e.querySelector(".selected").classList.remove("selected"),t.classList.add("selected")}))}))}()}function m(e){const t=document.createElement("div");return t.classList.add(e),t}function f(e,t){const n=document.createElement("button");return n.classList.add(e,"btn"),n.innerHTML=t,n}function y(e){document.body.querySelector(".popup-div")&&document.body.removeChild(document.querySelector(".popup-div"));const t=m("popup-div");t.classList.add("show");const n=document.createElement("span");n.innerHTML=e,t.appendChild(n);const r=document.createElement("span");r.innerHTML="×",r.addEventListener("click",(()=>{t.classList.toggle("show")})),t.appendChild(r),document.body.appendChild(t)}function g(){{const{questionsData:e}=c,t=e.map((e=>e.result)),n=t.filter((e=>!0===e)).length;return{results:t,trueElems:n}}}function L(e){return Math.floor(Math.random()*e)}async function v(e){await e()}document.querySelector("#submit").addEventListener("click",(()=>v(d))),document.querySelectorAll(".select").forEach((e=>{e.addEventListener("change",(e=>{const t=e.target.id;s[t]=e.target.value}))}))})()})();