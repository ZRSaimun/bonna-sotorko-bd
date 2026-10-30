/** Historical records are educational references, never live warning inputs. */
export const historicalBulletins = Object.freeze([
  Object.freeze({
    id: 'BD-P-0002-BAMIS-114',
    district: 'Sunamganj',
    titleBn: 'হাওর অঞ্চলের কৃষি আবহাওয়া বিষয়ক বিশেষ বার্তা — ১১৪',
    titleEn: 'Haor agricultural weather special bulletin 114',
    authority: 'Bangladesh Agro-Meteorological Information Service (BAMIS)',
    sourceUrl: 'https://www.bamis.gov.bd/res/public/pages/2026/04/28/27953.pdf',
    issuedDate: '2026-04-23',
    updatedDate: '2026-04-28',
    validUntil: null,
    sourceReviewDate: '2026-10-30',
    sourceReviewScope: 'Research-bank reference only; operational validity and live feed not verified',
    noteBn: 'এটি এপ্রিল ২০২৬-এর একটি পুরোনো নথির উল্লেখ। আজকের বন্যা পরিস্থিতি বা করণীয় এখানে যাচাই করা হয়নি।'
  })
]);

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
export function dayMillis(day) {
  if (typeof day !== 'string' || !ISO_DAY.test(day)) return null;
  const parsed = Date.parse(day + 'T00:00:00Z');
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === day ? parsed : null;
}
export function safeOfficialUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && (u.hostname === 'bamis.gov.bd' || u.hostname === 'www.bamis.gov.bd') && !u.username && !u.password;
  } catch { return false; }
}
export function assessHistoricalBulletin(record, now = Date.now()) {
  if (!record || !safeOfficialUrl(record.sourceUrl) || !record.district || !record.authority || !Number.isFinite(now)) return 'unavailable';
  const issued = dayMillis(record.issuedDate);
  const updated = dayMillis(record.updatedDate);
  if (issued === null || updated === null || updated < issued || updated > now) return 'unavailable';
  if (record.validUntil == null) return 'validity-unverified';
  const expiry = dayMillis(record.validUntil);
  if (expiry === null || expiry < updated) return 'unavailable';
  return expiry <= now ? 'expired' : 'not-live-verified';
}
export function bulletinForDistrict(district, records = historicalBulletins) {
  return records.filter(r => r.district === district);
}
