import {historicalBulletins, assessHistoricalBulletin, bulletinForDistrict} from './historical-model.js';

const district = document.querySelector('#district');
const result = document.querySelector('#result');
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function fact(label, value) {
  const item = element('div', null, 'fact');
  item.append(element('dt', label), element('dd', value));
  return item;
}
function render() {
  const records = bulletinForDistrict(district.value, historicalBulletins);
  result.replaceChildren();
  if (!records.length) {
    result.append(element('h2', 'এই জেলার কোনো পুরোনো উদাহরণ নেই'), element('p', 'এখানে বর্তমান সতর্কতা, নিরাপত্তা বা তথ্যের অভাব সম্পর্কে কোনো সিদ্ধান্ত দেওয়া হচ্ছে না। সরকারি উৎসের লিংক দেখুন।'));
    return;
  }
  const record = records[0];
  const state = assessHistoricalBulletin(record);
  if (state === 'unavailable') {
    result.append(element('h2', 'নথির তথ্য যাচাই করা যাচ্ছে না'), element('p', 'তারিখ বা উৎসে সমস্যা আছে। এই তথ্য ব্যবহার করবেন না; সরকারি উৎসে দেখুন।'));
    return;
  }
  result.append(element('p', 'ঐতিহাসিক উদাহরণ · NOT CURRENT', 'pill'), element('h2', record.titleBn));
  const details = element('dl', null, 'facts');
  details.append(
    fact('এলাকা', 'সুনামগঞ্জ, হাওর অঞ্চল'),
    fact('প্রকাশকারী', record.authority),
    fact('প্রকাশ', record.issuedDate + ' (তারিখ, সময় নিশ্চিত নয়)'),
    fact('হালনাগাদ', record.updatedDate + ' (তারিখ, সময় নিশ্চিত নয়)'),
    fact('কার্যকারিতার শেষ সময়', state === 'expired' ? record.validUntil + ' — অতীত' : 'মূল নথি থেকে যাচাই করা হয়নি'),
    fact('গবেষণা ব্যাংকের পর্যালোচনা তারিখ', record.sourceReviewDate)
  );
  result.append(details, element('p', record.noteBn, 'explain'));
  const actions = element('div', null, 'actions');
  const source = element('a', 'মূল BAMIS PDF খুলুন ↗', 'primary-link');
  source.href = record.sourceUrl;
  source.target = '_blank'; source.rel = 'noopener noreferrer';
  const print = element('button', 'এই পুরোনো কার্ড প্রিন্ট করুন', 'print');
  print.type = 'button'; print.addEventListener('click', () => window.print());
  actions.append(source, print);
  result.append(actions, element('p', 'উৎস: BAMIS PDF; গবেষণা ব্যাংক v1 (৩০ অক্টোবর ২০২৬)। PDF-এ সময় ও মেয়াদ আলাদাভাবে নিশ্চিত করা হয়নি। এটি লাইভ ফিড নয়।', 'help'));
}
district.addEventListener('change', render);
render();
