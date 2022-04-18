(()=>{"use strict";const e=class{constructor(e){this.calc=e}execute(){return this}},t=class extends e{constructor(e){super(e),this.currentOperand=document.querySelector(".record-data-block"),this.prevOperand=document.querySelector(".prev-data-block")}execute(){this.currentOperand.textContent=this.calc.currentNum,this.prevOperand.textContent=`${this.calc.prevNum} ${this.calc.operation.sign}`}},r=class extends e{execute(){this.calc.currentNum=0,this.calc.prevNum="",this.calc.operation={sign:"",id:""}}},a=class{constructor(e){this.calculator=e}start(){const e=document.querySelector(".record-data-block");Number.isNaN(+e.textContent)||(this.calculator.executeCommand(this.calculator.operation)?new t(this.calculator).execute():(e.textContent="invalid operation",new r(this.calculator).execute()))}},s=class{constructor(e){this.operandsArray=e}execute(){throw new Error("Execute method is not implemented")}undo(){throw new Error("Undo method is not implemented")}};class c extends s{execute(){const[e,t]=this.operandsArray;return+e+ +t}}class n extends s{execute(){const[e,t]=this.operandsArray;return+e-+t}}class u extends s{execute(){const[e,t]=this.operandsArray;return+e*+t}}class o extends s{execute(){const[e,t]=this.operandsArray;return+e/+t}}const i=class extends s{execute(){const[,e]=this.operandsArray;return e*e}},d=class extends s{execute(){const[,e]=this.operandsArray;return e*e*e}},l=class extends s{execute(){const[e,t]=this.operandsArray;return e**t}},m=class extends s{execute(){const[,e]=this.operandsArray;return 1==+e?1:e**.5}},h=class extends s{execute(){const[,e]=this.operandsArray;return 1==+e?1:e**(1/3)}},x=class extends s{execute(){const[e,t]=this.operandsArray;return e**(1/t)}},p=class extends s{count(e){return 1!==e?e*this.count(e-1):e}execute(){const[,e]=this.operandsArray;return+e<0||+e>=9099?"invalid input":this.count(e)}},g=class extends s{execute(){const[,e]=this.operandsArray;return 1/e}},y=class extends s{execute(){const[,e]=this.operandsArray;return 10**e}};class N{constructor(e=""){this.sign=e}static list={add:c,substract:n,mult:u,divide:o,"degree-y":l,"root-y":x,degree2:i,degree3:d,root2:m,root3:h,fact:p,inverse:g,tenDegreeX:y};create(e,t){const r=new(0,N.list[t])(e);return r.sign=this.sign,r}}const b=N,v=class extends e{execute(){this.calc.currentNum=0}},A=class extends e{execute(){this.calc.prevNum=this.calc.currentNum,this.calc.currentNum=""}},w=class extends e{execute(){this.calc.currentNum=0}},C=class extends e{execute(e){const t=document.querySelector(".record-data-block").textContent;if("."!==e||!t.includes(".")){if(""!==this.calc.currentNum&&""!==this.calc.prevNum&&""===this.calc.operation.id)return this.calc.prevNum="",void(this.calc.currentNum=e);this.calc.currentNum+=e,this.calc.currentNum=String(this.calc.currentNum).replace(/^00+/g,"0"),this.calc.currentNum=String(this.calc.currentNum).replace(/^0+[1-9]+/g,/[1-9]+/g.exec(String(this.calc.currentNum))||this.calc.currentNum)}}},L=new class{constructor(){this.currentNum=0,this.prevNum="",this.memory=new class{memNum=0;add(e){return this.memNum+=+e,this.memNum}substr(e){return this.memNum-=+e,this.memNum}recall(){return this.memNum}clear(){this.memNum=0}},this.operation={sign:"",id:""},this.history=[]}executeCommand(e){""===this.currentNum&&(this.currentNum=this.prevNum);const t=e.execute();return t!==1/0&&!Number.isNaN(+t)&&(this.prevNum=parseFloat(t.toFixed(10)),this.currentNum=parseFloat(t.toFixed(10)),this.operation={sign:"",id:""},!0)}},S=document.querySelector(".m-btns"),f=document.querySelector(".btns");document.querySelector(".theme-btn").addEventListener("click",(()=>{const e=document.body,t=document.querySelectorAll(".btn");e.classList.contains("day-theme-gray")?(e.classList.remove("day-theme-gray"),e.classList.add("night-theme-gray"),t.forEach((e=>{e.classList.contains("day-theme-gray")?(e.classList.remove("day-theme-gray"),e.classList.add("night-theme-gray")):(e.classList.remove("day-theme-orange"),e.classList.add("night-theme-blue"))}))):(e.classList.remove("night-theme-gray"),e.classList.add("day-theme-gray"),t.forEach((e=>{e.classList.contains("night-theme-gray")?(e.classList.remove("night-theme-gray"),e.classList.add("day-theme-gray")):(e.classList.remove("night-theme-blue"),e.classList.add("day-theme-orange"))})))})),S.addEventListener("click",(e=>{const t=document.querySelector(".record-data-block"),r=document.querySelector(".mem-data-block");r.textContent="M",e.target.hasAttribute("data-memory-clear")&&(L.memory.clear(),r.textContent=""),e.target.hasAttribute("data-memory-add")&&L.memory.add(t.textContent),e.target.hasAttribute("data-memory-substr")&&L.memory.substr(t.textContent),e.target.hasAttribute("data-memory-recall")&&(t.textContent=L.memory.recall(),new C(L).execute(t.textContent))})),f.addEventListener("click",(e=>{if(e.target.hasAttribute("data-num")&&(new C(L).execute(e.target.textContent),new t(L).execute()),e.target.hasAttribute("data-single-oper")&&(L.operation.id=e.target.id,L.operation.sign=e.target.getAttribute("data-value"),L.operation=(new b).create([L.prevNum,L.currentNum],L.operation.id),new a(L).start()),e.target.hasAttribute("data-pair-oper")){if(Number.isNaN(+document.querySelector(".record-data-block").textContent))return;if(""!==L.operation.id)return L.operation=new b(e.target.getAttribute("data-value")).create([L.prevNum,L.currentNum],L.operation.id),L.executeCommand(L.operation),L.operation.id=e.target.id,L.operation.sign=e.target.getAttribute("data-value"),new w(L).execute(),void new t(L).execute();new A(L).execute(),L.operation.id=e.target.id,L.operation.sign=e.target.getAttribute("data-value"),new w(L).execute(),new t(L).execute()}if(e.target.hasAttribute("data-equal")){if(""===L.operation.id)return;L.operation=new b(e.target.getAttribute("data-value")).create([L.prevNum,L.currentNum],L.operation.id),new a(L).start()}if(e.target.hasAttribute("data-percent")){const e=document.querySelector(".record-data-block");if(Number.isNaN(+e.textContent))return;L.currentNum=L.prevNum*(e.textContent/100),new t(L).execute()}if(e.target.hasAttribute("data-plus-minus")){const e=document.querySelector(".record-data-block");if(Number.isNaN(+e.textContent))return;L.currentNum=-Number(e.textContent),new t(L).execute()}e.target.hasAttribute("data-clear-all")&&(new r(L).execute(),new t(L).execute()),e.target.hasAttribute("data-clear-entry")&&(new v(L).execute(),new t(L).execute())}))})();