import {historicalBulletins, assessHistoricalBulletin, safeOfficialUrl} from './historical-model.js';

// This text is deliberately fixed to editorial metadata, never user chat or live hazard data.
const currentInformationUrl = 'https://ffwc.gov.bd/';
const translations = Object.freeze({
  bn: {
    title: 'পুরোনো হাওর বার্তার উৎস-নোট',
    label: 'পুরোনো নথি — বর্তমান সতর্কতা নয়',
    issued: 'গবেষণা ব্যাংকে নথিভুক্ত প্রকাশের তারিখ',
    updated: 'গবেষণা ব্যাংকে নথিভুক্ত হালনাগাদ',
    expiry: 'কার্যকারিতার শেষ সময় যাচাই করা হয়নি',
    reviewed: 'গবেষণা তথ্য পর্যালোচনা',
    warning: 'এই নথি দিয়ে আজকের বন্যা, নিরাপত্তা, রাস্তা বা ফসলের সিদ্ধান্ত নেবেন না।',
    source: 'মূল BAMIS নথি',
    current: 'বর্তমান তথ্য যাচাইয়ের সরকারি পথ'
  },
  en: {
    title: 'Historical haor bulletin source note',
    label: 'HISTORICAL DOCUMENT — NOT A CURRENT WARNING',
    issued: 'Issue date recorded by the research bank',
    updated: 'Update date recorded by the research bank',
    expiry: 'Operational validity end time was not verified',
    reviewed: 'Research reference reviewed',
    warning: 'Do not use this document for today’s flood, safety, road or harvest decisions.',
    source: 'Original BAMIS document',
    current: 'Official route to check current information'
  }
});
export function buildShareNote(record = historicalBulletins[0], language = 'bn', now = Date.now()) {
  const t = translations[language === 'en' ? 'en' : 'bn'];
  if (!record || record.district !== 'Sunamganj' || !safeOfficialUrl(record.sourceUrl) ||
      assessHistoricalBulletin(record, now) === 'unavailable' ||
      !record.sourceReviewDate || !/^\\d{4}-\\d{2}-\\d{2}$/.test(record.sourceReviewDate) ||
      Date.parse(record.sourceReviewDate + 'T00:00:00Z') > now) {
    return {kind:'unavailable', title:t.title, text:''};
  }
  const lines = [
    t.label, record.titleBn, t.issued + ': ' + record.issuedDate,
    t.updated + ': ' + record.updatedDate, t.expiry,
    t.reviewed + ': ' + record.sourceReviewDate, t.warning,
    t.source + ': ' + record.sourceUrl,
    t.current + ': ' + currentInformationUrl
  ];
  return {kind:'ready', title:t.title, text:lines.join('\\n'), sourceUrl:record.sourceUrl, currentInformationUrl};
}
