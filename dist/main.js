(()=>{class e{constructor(){this.currentOperand=document.querySelector(".record-data-block"),this.prevOperand=document.querySelector(".prev-data-block")}execute(e){this.currentOperand.textContent=e.currentNum,this.prevOperand.textContent=`${e.prevNum} ${e.operation.sign}`}}class t{execute(e,t){const n=document.querySelector(".record-data-block").textContent;"."===e&&n.includes(".")||(t.currentNum+=e)}}class n{execute(e){e.prevNum=e.currentNum}}class r{execute(e){e.currentNum=""}}class u{constructor(e){this.num=e}execute(e){return+this.num+ +e}undo(e){return+this.num-+e}}class c{constructor(e){this.num=e}execute(e){return+this.num-+e}undo(e){return+this.num+ +e}}class s{constructor(e){this.num=e}execute(e){return+this.num*+e}undo(e){return+this.num/+e}}class o{constructor(e){this.num=e}execute(e){return+this.num/+e}undo(e){return+this.num*+e}}class i{constructor(e){this.sign=e}static list={add:u,substract:c,mult:s,divide:o};create(e,t){const n=new(0,i.list[t])(e);return n.sign=this.sign,n}}const a=document.querySelectorAll("[data-num]"),m=document.querySelectorAll("[data-operation]"),d=document.querySelector("[data-operation-equal]"),h=new class{constructor(){this.currentNum="",this.prevNum="",this.memoryNum="",this.operation={sign:""},this.history=[]}executeCommand(e){return this.history.push(e),this.prevNum=e.execute(this.currentNum),this.currentNum=e.execute(this.currentNum),this.operation={sign:""},this}undoCommand(){const t=this.history.pop();this.currentNum=t.execute(this.currentNum),(new e).execute(this)}};a.forEach((n=>{n.addEventListener("click",(()=>{(new t).execute(n.textContent,h),(new e).execute(h)}))})),m.forEach((t=>{t.addEventListener("click",(()=>{if(void 0!==h.operation.execute)return h.executeCommand(h.operation),h.operation=new i(t.textContent).create(h.prevNum,t.id),(new e).execute(h),void(new r).execute(h);(new n).execute(h),h.operation=new i(t.textContent).create(h.currentNum,t.id),(new e).execute(h),(new r).execute(h)}))})),d.addEventListener("click",(()=>{h.executeCommand(h.operation),(new e).execute(h)}))})();