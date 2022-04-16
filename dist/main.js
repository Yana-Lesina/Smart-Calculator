(()=>{"use strict";const e=class{constructor(e){this.calc=e}execute(){return this}},t=class extends e{constructor(e){super(e),this.currentOperand=document.querySelector(".record-data-block"),this.prevOperand=document.querySelector(".prev-data-block")}execute(){this.currentOperand.textContent=this.calc.currentNum,this.prevOperand.textContent=`${this.calc.prevNum} ${this.calc.operation.sign}`}},r=class extends e{execute(){this.calc.currentNum=0,this.calc.prevNum="",this.calc.operation={sign:"",id:""}}},c=class{constructor(e){this.calculator=e}start(){const e=document.querySelector(".record-data-block");Number.isNaN(+e.textContent)||(this.calculator.executeCommand(this.calculator.operation)?new t(this.calculator).execute():(e.textContent="invalid operation",new r(this.calculator).execute()))}},n=class{constructor(e){this.operandsArray=e}execute(){throw new Error("Execute method is not implemented")}undo(){throw new Error("Undo method is not implemented")}};class a extends n{execute(){const[e,t]=this.operandsArray;return+e+ +t}}class s extends n{execute(){const[e,t]=this.operandsArray;return+e-+t}}class u extends n{execute(){const[e,t]=this.operandsArray;return+e*+t}}class o extends n{execute(){const[e,t]=this.operandsArray;return+e/+t}}const i=class extends n{execute(){const[,e]=this.operandsArray;return e*e}},d=class extends n{execute(){const[,e]=this.operandsArray;return e*e*e}},l=class extends n{execute(){const[e,t]=this.operandsArray;return e**t}},m=class extends n{execute(){const[,e]=this.operandsArray;return 1==+e?1:e**.5}},h=class extends n{execute(){const[,e]=this.operandsArray;return 1==+e?1:e**(1/3)}},x=class extends n{execute(){const[e,t]=this.operandsArray;return e**(1/t)}},p=class extends n{count(e){return 1!==e?e*this.count(e-1):e}execute(){const[,e]=this.operandsArray;return+e<0||+e>=9099?"invalid input":this.count(e)}},N=class extends n{execute(){const[,e]=this.operandsArray;return 1/e}},g=class extends n{execute(){const[,e]=this.operandsArray;return 10**e}};class b{constructor(e=""){this.sign=e}static list={add:a,substract:s,mult:u,divide:o,"degree-y":l,"root-y":x,degree2:i,degree3:d,root2:m,root3:h,fact:p,inverse:N,tenDegreeX:g};create(e,t){const r=new(0,b.list[t])(e);return r.sign=this.sign,r}}const y=b,A=class extends e{execute(){this.calc.currentNum=0}},v=class extends e{execute(){this.calc.prevNum=this.calc.currentNum,this.calc.currentNum=""}},w=class extends e{execute(){this.calc.currentNum=0}},C=class extends e{execute(e){const t=document.querySelector(".record-data-block").textContent;if("."!==e||!t.includes(".")){if(""!==this.calc.currentNum&&""!==this.calc.prevNum&&""===this.calc.operation.id)return this.calc.prevNum="",void(this.calc.currentNum=e);this.calc.currentNum+=e,this.calc.currentNum=String(this.calc.currentNum).replace(/^00+/g,"0"),this.calc.currentNum=String(this.calc.currentNum).replace(/^0+[1-9]+/g,/[1-9]+/g.exec(String(this.calc.currentNum))||this.calc.currentNum)}}},S=new class{constructor(){this.currentNum=0,this.prevNum="",this.memory=new class{memNum=0;add(e){return this.memNum+=+e,this.memNum}substr(e){return this.memNum-=+e,this.memNum}recall(){return this.memNum}clear(){this.memNum=0}},this.operation={sign:"",id:""},this.history=[]}executeCommand(e){return""===this.currentNum&&(this.currentNum=this.prevNum),e.execute()!==1/0&&!Number.isNaN(+e.execute())&&(this.prevNum=parseFloat(e.execute().toFixed(10)),this.currentNum=parseFloat(e.execute().toFixed(10)),this.operation={sign:"",id:""},!0)}},f=document.querySelector(".m-btns"),q=document.querySelector(".btns");f.addEventListener("click",(e=>{const t=document.querySelector(".record-data-block"),r=document.querySelector(".mem-data-block");r.textContent="M",e.target.hasAttribute("data-memory-clear")&&(S.memory.clear(),r.textContent=""),e.target.hasAttribute("data-memory-add")&&S.memory.add(t.textContent),e.target.hasAttribute("data-memory-substr")&&S.memory.substr(t.textContent),e.target.hasAttribute("data-memory-recall")&&(t.textContent=S.memory.recall(),new C(S).execute(t.textContent))})),q.addEventListener("click",(e=>{if(e.target.hasAttribute("data-num")&&(new C(S).execute(e.target.textContent),new t(S).execute()),e.target.hasAttribute("data-single-oper")&&(S.operation.id=e.target.id,S.operation.sign=e.target.getAttribute("data-value"),S.operation=(new y).create([S.prevNum,S.currentNum],S.operation.id),new c(S).start()),e.target.hasAttribute("data-pair-oper")){if(Number.isNaN(+document.querySelector(".record-data-block").textContent))return;if(""!==S.operation.id)return S.operation=new y(e.target.getAttribute("data-value")).create([S.prevNum,S.currentNum],S.operation.id),S.executeCommand(S.operation),S.operation.id=e.target.id,S.operation.sign=e.target.getAttribute("data-value"),new w(S).execute(),void new t(S).execute();new v(S).execute(),S.operation.id=e.target.id,S.operation.sign=e.target.getAttribute("data-value"),new w(S).execute(),new t(S).execute()}if(e.target.hasAttribute("data-equal")){if(""===S.operation.id)return;S.operation=new y(e.target.getAttribute("data-value")).create([S.prevNum,S.currentNum],S.operation.id),new c(S).start()}if(e.target.hasAttribute("data-percent")){const e=document.querySelector(".record-data-block");if(Number.isNaN(+e.textContent))return;S.currentNum=S.prevNum*(e.textContent/100),new t(S).execute()}if(e.target.hasAttribute("data-plus-minus")){const e=document.querySelector(".record-data-block");if(Number.isNaN(+e.textContent))return;S.currentNum=-Number(e.textContent),new t(S).execute()}e.target.hasAttribute("data-clear-all")&&(new r(S).execute(),new t(S).execute()),e.target.hasAttribute("data-clear-entry")&&(new A(S).execute(),new t(S).execute())}))})();