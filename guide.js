import {answerGuide} from './guide-model.js';
const form=document.querySelector('#ask-form');
const input=document.querySelector('#question');
const list=document.querySelector('#conversation');
const language=document.querySelector('#language');
const district=document.querySelector('#district');
const announcement=document.querySelector('#announcement');
const clear=document.querySelector('#clear');
const make=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
function appendMessage(role,text,links=[]){
 const li=make('li');li.className=role;
 li.append(make('strong',role==='visitor'?'Question / প্রশ্ন':'Reviewed FAQ · Not AI / AI নয়'),make('p',text));
 if(links.length){const ul=make('ul');for(const link of links){const item=make('li');const a=make('a',link.label);a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';item.append(a);ul.append(item);}li.append(ul);}
 list.append(li);
}
function submit(question){
 const value=question.trim();if(!value)return;
 appendMessage('visitor',value);
 const r=answerGuide(value,{district:district.value,language:language.value});
 appendMessage('answer',r.text,r.links);
 announcement.textContent=(language.value==='en'?'Answer added. ':'উত্তর যোগ হয়েছে। ')+r.text;
 input.value='';
 input.focus();
}
form.addEventListener('submit',event=>{event.preventDefault();submit(input.value);});
document.querySelectorAll('[data-question-bn]').forEach(button=>button.addEventListener('click',()=>{
 submit(language.value==='en'?button.dataset.questionEn:button.dataset.questionBn);
}));
clear.addEventListener('click',()=>{list.replaceChildren();announcement.textContent=language.value==='en'?'Conversation cleared':'আলাপ মুছে দেওয়া হয়েছে';input.focus();});
