import {buildShareNote} from './share-note-model.js';
const language=document.querySelector('#language');
const output=document.querySelector('#note');
const status=document.querySelector('#status');
const shareButton=document.querySelector('#share');
const copyButton=document.querySelector('#copy');
const manualButton=document.querySelector('#manual');
const manual=document.querySelector('#manual-text');
let note;
function render(){
 note=buildShareNote(undefined,language.value);
 const ready=note.kind==='ready';
 output.textContent=ready?note.text:(language.value==='en'?'Source metadata unavailable. Open the official sources below.':'উৎসের তথ্য যাচাই করা যাচ্ছে না। নিচের সরকারি লিংক দেখুন।');
 for(const b of [shareButton,copyButton,manualButton])b.disabled=!ready;
 manual.hidden=true;manual.value='';status.textContent='';
}
function showManual(){
 if(note.kind!=='ready')return;
 manual.hidden=false;manual.value=note.text;manual.focus();manual.select();
 status.textContent=language.value==='en'?'Select and copy the dated text manually.':'তারিখসহ লেখাটি নিজে কপি করুন।';
}
shareButton.addEventListener('click',async()=>{
 if(note.kind!=='ready')return;
 if(typeof navigator.share!=='function'){showManual();return;}
 try{
   // Must run directly from the click; do not include user questions or location.
   await navigator.share({title:note.title,text:note.text});
   status.textContent=language.value==='en'?'Share dialog completed; delivery is not verified.':'শেয়ার ডায়ালগ শেষ হয়েছে; পাঠানো নিশ্চিত করা যায়নি।';
 }catch(error){
   if(error?.name==='AbortError'){
     status.textContent=language.value==='en'?'Sharing cancelled. Nothing was copied.':'শেয়ার বাতিল হয়েছে। কিছু কপি করা হয়নি।';
   }else showManual();
 }
});
copyButton.addEventListener('click',async()=>{
 if(note.kind!=='ready')return;
 if(!navigator.clipboard?.writeText){showManual();return;}
 try{
   await navigator.clipboard.writeText(note.text);
   status.textContent=language.value==='en'?'Dated note copied. Check the warning before sharing.':'তারিখসহ নোট কপি হয়েছে। শেয়ার করার আগে সতর্কতা দেখুন।';
 }catch{showManual();}
});
manualButton.addEventListener('click',showManual);
language.addEventListener('change',render);
render();
