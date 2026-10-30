import { historicalBulletins, assessHistoricalBulletin } from './historical-model.js';

// Reviewed source-navigation answers, not AI or live hazard information.
// Never use visitor text as instructions, markup, or a URL.
export const officialLinks = Object.freeze({
  bulletin: Object.freeze({label:'BAMIS bulletin 114 (April 2026 PDF)',url:'https://www.bamis.gov.bd/res/public/pages/2026/04/28/27953.pdf'}),
  latest: Object.freeze({label:'BAMIS official latest advisories',url:'https://www.bamis.gov.bd/en/page/alert/latest/'}),
  flood: Object.freeze({label:'FFWC / BWDB official flood information',url:'https://ffwc.gov.bd/'}),
  weather: Object.freeze({label:'BMD official weather information',url:'https://bmd.gov.bd/web/'})
});
const words = {
  current:/today|now|current|live|latest|forecast|risk|safe|warning|আজ|এখন|বর্তমান|সর্বশেষ|পূর্বাভাস|ঝুঁকি|নিরাপদ|সতর্কতা|বন্যা হবে|কি করব|কী করব/i,
  date:/date|when|issued|updated|published|কবে|তারিখ|প্রকাশ|হালনাগাদ/i,
  validity:/valid|expire|expiry|মেয়াদ|মেয়াদ|কার্যকারিতা/i,
  source:/source|pdf|document|bulletin|উৎস|নথি|বার্তা|পিডিএফ/i,
  bypass:/ignore (all |previous |your )?instructions|system prompt|developer message|api key|password|otp|override safety|নিয়ম ভাঙ|পাসওয়ার্ড|ওটিপি/i
};
const bn={
  empty:'একটি প্রশ্ন লিখুন বা উদাহরণ বেছে নিন।',
  long:'প্রশ্নটি খুব বড়। ৪০০ অক্ষরের মধ্যে লিখুন।',
  invalid:'এই প্রশ্নের নির্ভরযোগ্য উত্তর এখানে নেই। ব্যক্তিগত তথ্য দেবেন না; সরকারি উৎস দেখুন।',
  current:'এখানে বর্তমান বন্যার অবস্থা বা নিরাপত্তা যাচাই করা যায় না। এপ্রিল ২০২৬-এর উদাহরণ দিয়ে আজকের সিদ্ধান্ত নেবেন না। সরকারি সাইটে প্রকাশ ও মেয়াদ যাচাই করুন।',
  clarify:'কোন জেলার পুরোনো নথি জানতে চান? সুনামগঞ্জ নির্বাচন করে আবার প্রশ্ন করুন। অন্য জেলার জন্য যাচাইকৃত উদাহরণ নেই।',
  other:'এই জেলার জন্য কোনো যাচাইকৃত পুরোনো নথি নেই। এখান থেকে বর্তমান ঝুঁকি নির্ধারণ করা যায় না।',
  unavailable:'পুরোনো নথির উৎস বা তারিখ যাচাইযোগ্য নয়। এই নথির তথ্য ব্যবহার করবেন না।',
  date:'গবেষণা ব্যাংক অনুযায়ী BAMIS বার্তা ১১৪ প্রকাশ ২০২৬-০৪-২৩ এবং হালনাগাদ ২০২৬-০৪-২৮। নির্দিষ্ট সময় স্বাধীনভাবে নিশ্চিত করা হয়নি। এটি বর্তমান বার্তা নয়।',
  validity:'এই পুরোনো বার্তার কার্যকারিতার শেষ সময় মূল নথি থেকে যাচাই করা হয়নি। তাই এটিকে বর্তমান সতর্কতা বা কার্যকর নির্দেশ হিসেবে ব্যবহার করবেন না।',
  source:'সুনামগঞ্জের ঐতিহাসিক উদাহরণটি BAMIS বার্তা ১১৪। মূল PDF খুলে উৎস ও তারিখ নিজে দেখুন। নথির ব্যবহার-অনুমতি ও কার্যকারিতা যাচাই করা হয়নি।',
  unknown:'এই প্রশ্নের জন্য এখানে যাচাইকৃত উত্তর নেই। এটি AI নয়—শুধু পর্যালোচিত উৎস খোঁজার সহায়ক। সরকারি উৎস দেখুন।'
};
const en={
  empty:'Enter a question or choose an example.',
  long:'Please keep your question within 400 characters.',
  invalid:'This guide cannot verify that request. Do not share personal information; consult official sources.',
  current:'This guide cannot verify current flood conditions or safety. Do not use the April 2026 example for decisions today. Check publication dates and validity on official sites.',
  clarify:'Which district do you mean? Select Sunamganj and ask again for the historical example. No verified example exists here for other districts.',
  other:'There is no reviewed historical example for this district. This does not establish current safety or risk.',
  unavailable:'The historical record cannot be validated. Do not rely on it.',
  date:'The research bank records BAMIS bulletin 114 as issued on 2026-04-23 and updated on 2026-04-28. Exact times were not independently confirmed. This is not a current bulletin.',
  validity:'The original bulletin’s validity end time was not verified. Do not treat it as an active warning or instruction.',
  source:'The Sunamganj historical example references BAMIS bulletin 114. Open the original PDF to inspect the source and dates. Reuse permission and operational validity were not verified.',
  unknown:'There is no reviewed answer for that question here. This is not AI; it only navigates reviewed sources. Please check official information.'
};
const keys=['bulletin','latest','flood','weather'];
function response(kind, key, lang, sourceKeys){
  return {kind, text:(lang==='en'?en:bn)[key], links:sourceKeys.map(k=>officialLinks[k])};
}
export function answerGuide(question, {district='unknown',language='bn',now=Date.now()}={}){
  const lang=language==='en'?'en':'bn';
  if(typeof question!=='string'||!question.trim())return response('clarify','empty',lang,[]);
  if(question.length>400)return response('abstain','long',lang,[]);
  if(words.bypass.test(question)||/[<>]/.test(question))return response('abstain','invalid',lang,['latest','flood']);
  if(words.current.test(question))return response('abstain','current',lang,['latest','flood','weather']);
  const intent=words.validity.test(question)?'validity':words.date.test(question)?'date':words.source.test(question)?'source':null;
  if(!intent)return response('abstain','unknown',lang,['latest','flood']);
  if(district==='unknown')return response('clarify','clarify',lang,[]);
  if(district!=='Sunamganj')return response('abstain','other',lang,['latest','flood']);
  const record=historicalBulletins.find(r=>r.district==='Sunamganj');
  if(!record||assessHistoricalBulletin(record,now)==='unavailable')return response('abstain','unavailable',lang,['latest','flood']);
  return response('answer',intent,lang,intent==='source'?['bulletin','latest']:['bulletin','latest']);
}
