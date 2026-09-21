const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const KAABA = { lat: 21.422487, lon: 39.826206 };
const METHODS = [
  [3,'Muslim World League'], [2,'ISNA'], [5,'Egyptian General Authority of Survey'],
  [4,'Umm Al-Qura, Makkah'], [1,'University of Islamic Sciences, Karachi'], [7,'University of Tehran'],
  [0,'Shia Ithna-Ashari, Qum'], [8,'Gulf Region'], [9,'Kuwait'], [10,'Qatar'], [11,'Singapore'],
  [12,'France'], [13,'Diyanet (Turkey)'], [14,'Russia'], [15,'Moonsighting Committee'], [16,'Dubai'],
  [17,'JAKIM'], [18,'Tunisia'], [19,'Algeria'], [20,'Kemenag Indonesia'], [21,'Morocco'], [22,'Portugal'], [23,'Jordan']
];
const MAIN_PRAYERS = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const DISPLAY_PRAYERS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha','Midnight'];
const ARABIC = { Fajr:'فجر', Dhuhr:'ظهر', Asr:'عصر', Maghrib:'مغرب', Isha:'عشاء' };

const DUAS = [
  {title:'On waking', arabic:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', english:'All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.'},
  {title:'Before sleeping', arabic:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', english:'In Your name, O Allah, I die and I live.'},
  {title:'Before eating', arabic:'بِسْمِ اللَّهِ', english:'In the name of Allah.'},
  {title:'After eating', arabic:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ', english:'Praise is due to Allah who fed me this and provided it for me without any might or power from me.'},
  {title:'Leaving home', arabic:'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', english:'In the name of Allah, I place my trust in Allah. There is no power or strength except with Allah.'},
  {title:'Entering the home', arabic:'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا', english:'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.'},
  {title:'Rabbana atina', arabic:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', english:'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.'},
  {title:'Protection', arabic:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', english:'I seek refuge in the perfect words of Allah from the evil of what He has created.'},
  {title:'Morning / evening', arabic:'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', english:'O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.'},
  {title:'Forgiveness', arabic:'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ', english:'My Lord, forgive me and accept my repentance; surely You are the One who accepts repentance, the Merciful.'}
];

const DAILY_AYAHS = [
  ['ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ','All praise is due to Allah, Lord of the worlds.','Al-Fatihah 1:2',1],
  ['فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا','Indeed, with hardship comes ease.','Ash-Sharh 94:5',94],
  ['وَقُل رَّبِّ زِدْنِى عِلْمًا','And say: My Lord, increase me in knowledge.','Ta-Ha 20:114',20],
  ['إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ','Indeed, Allah is with the patient.','Al-Baqarah 2:153',2],
  ['وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ','And remember your Lord when you forget.','Al-Kahf 18:24',18],
  ['وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ','Whoever relies upon Allah — He is sufficient for them.','At-Talaq 65:3',65],
  ['إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا','Indeed, with hardship comes ease.','Ash-Sharh 94:6',94]
];

const state = {
  view:'home', lat:null, lon:null, location:null, timezone:null,
  prayer:null, hijri:null, calendar:[], method:3, school:1, highLat:'NightMiddle',
  adjustment:0, use12h:false, notifications:false, reminderOffset:0, nextPrayer:null,
  quranChapters:[], openedSurah:null, quranEdition:'en.sahih', bookmarks:[], lastRead:null,
  tasbih:0, qiblaBearing:null, qiblaDistance:null, deviceHeading:0,
  tracker:{}, notified:{}, deferredInstall:null, audio:null
};

function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2800); }
function pad(n){ return String(n).padStart(2,'0'); }
function clamp(n,min,max){ return Math.min(max,Math.max(min,n)); }
function escapeHtml(v=''){ return String(v).replace(/[&<>'"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c])); }
function localParts(timeZone=state.timezone){
  const d=new Date();
  if(!timeZone) return {year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate(),hour:d.getHours(),minute:d.getMinutes(),second:d.getSeconds()};
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(d);
  const out={}; for(const p of parts) if(p.type!=='literal') out[p.type]=Number(p.value); return out;
}
function isoLocalDate(){const p=localParts();return `${p.year}-${pad(p.month)}-${pad(p.day)}`;}
function displayDate(date=new Date()){ return new Intl.DateTimeFormat(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:state.timezone||undefined}).format(date); }
function timeText(hm){ if(!hm)return '--:--'; const [h,m]=String(hm).split(':').map(Number); if(!state.use12h)return `${pad(h)}:${pad(m)}`; const ap=h>=12?'PM':'AM'; return `${pad((h%12)||12)}:${pad(m)} ${ap}`; }
function hijriText(h){ return h?.day ? `${h.day} ${h.month?.en||''} ${h.year} AH` : ''; }
function dateKey(year,month,day){return `${year}-${pad(month)}-${pad(day)}`;}
function minutesFromTime(hm){ if(!hm)return null; const m=String(hm).match(/(\d{1,2}):(\d{2})/); return m ? Number(m[1])*60+Number(m[2]) : null; }

function persist(){
  localStorage.setItem('noor-settings',JSON.stringify({method:state.method,school:state.school,highLat:state.highLat,adjustment:state.adjustment,use12h:state.use12h,notifications:state.notifications,reminderOffset:state.reminderOffset,tasbih:state.tasbih,quranEdition:state.quranEdition,bookmarks:state.bookmarks,lastRead:state.lastRead,tracker:state.tracker,fasting:state.fasting,lastLocation:state.location && {latitude:state.lat,longitude:state.lon,city:state.location.city,locality:state.location.locality,region:state.location.region,country:state.location.country,postcode:state.location.postcode,accuracy:state.location.accuracy,timeZone:state.timezone}}));
}
function restore(){
  try{
    const s=JSON.parse(localStorage.getItem('noor-settings')||'{}'); Object.assign(state,s);
    if(s.fasting) state.fasting=s.fasting;
    if(s.lastLocation?.latitude!=null){ state.lat=s.lastLocation.latitude; state.lon=s.lastLocation.longitude; state.location={...s.lastLocation}; state.timezone=s.lastLocation.timeZone||null; }
  }catch{}
}

function showView(view){
  state.view=view;
  $$('.view').forEach(v=>v.classList.toggle('active-view',v.id===`view-${view}`));
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const titles={home:'Assalamu alaikum',prayer:'Prayer Times',quran:'Quran',qibla:'Qibla',tools:'Islamic Tools'};
  $('#pageTitle').textContent=titles[view]||'Noor';
  $('#todayLabel').textContent=displayDate();
  if(view==='quran') initQuran();
  if(view==='qibla') updateQiblaUI();
  if(view==='home') refreshTodayUI();
}

async function getPreciseLocation(){
  if(!navigator.geolocation){toast('This browser does not support geolocation.');return;}
  toast('Requesting precise location…');
  navigator.geolocation.getCurrentPosition(async pos=>{
    state.lat=Number(pos.coords.latitude.toFixed(7)); state.lon=Number(pos.coords.longitude.toFixed(7)); state.timezone=null;
    state.location={latitude:state.lat,longitude:state.lon,accuracy:pos.coords.accuracy};
    await reverseGeocode();
    await loadPrayerTimes();
    await loadWeekCalendar();
    calculateQibla();
    persist(); toast('Precise location updated.');
  },()=>toast('Location permission was not granted. Noor can still open saved Quran/tools, but exact location timing needs GPS.'),{enableHighAccuracy:true,timeout:20000,maximumAge:0});
}

async function reverseGeocode(){
  if(state.lat==null)return;
  try{
    const u=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${state.lat}&longitude=${state.lon}&localityLanguage=en`;
    const r=await fetch(u); if(!r.ok)throw new Error('reverse geocode'); const d=await r.json();
    state.location={...state.location,city:d.city||d.locality||'Unknown town',locality:d.locality||d.city||'',region:d.principalSubdivision||'',country:d.countryName||'',postcode:d.postcode||''};
    const label=[state.location.locality && state.location.locality!==state.location.city ? state.location.locality:null,state.location.city,state.location.country].filter(Boolean).join(', ');
    $('#locationName').textContent=label||'Precise location'; $('#sideLocation').textContent=label||'Precise coordinates';
  }catch{
    $('#locationName').textContent=`${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}`; $('#sideLocation').textContent='Precise coordinates';
  }
}

function tuneParam(){
  const a=Number(state.adjustment||0); return `0,${a},${a},${a},${a},${a},${a},${a},0`;
}
function prayerUrl(base){
  const params=new URLSearchParams({latitude:state.lat,longitude:state.lon,method:state.method,school:state.school,latitudeAdjustmentMethod:state.highLat,midnightMode:'Standard',tune:tuneParam()});
  return `${base}?${params}`;
}

async function loadPrayerTimes(){
  if(state.lat==null){renderUnavailable();return;}
  const date=isoLocalDate();
  const [y,m,d]=date.split('-');
  const url=prayerUrl(`https://api.aladhan.com/v1/timings/${d}-${m}-${y}`);
  try{
    const r=await fetch(url); if(!r.ok)throw new Error(`HTTP ${r.status}`); const data=await r.json();
    state.prayer=data.data?.timings||null; state.hijri=data.data?.date?.hijri||null; state.timezone=data.data?.meta?.timezone||state.timezone;
    $('#locationDetail').textContent=`${state.location?.locality&&state.location.locality!==state.location.city?state.location.locality+', ':''}${state.location?.city||'Your coordinates'}${state.location?.region?', '+state.location.region:''}${state.location?.country?', '+state.location.country:''} • GPS ±${Math.round(state.location?.accuracy||0)}m • ${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}${state.timezone?' • '+state.timezone:''}`;
    $('#heroDate').textContent=`${displayDate()}${hijriText(state.hijri)?' • '+hijriText(state.hijri):''}`;
    $('#todayLabel').textContent=displayDate();
    await updateDailyAyah();
    refreshTodayUI();
    scheduleReminderLoop();
  }catch(e){
    toast('Prayer timing service is unavailable. Your last saved data remains available on this device.');
    renderUnavailable();
  }
}

async function loadWeekCalendar(){
  if(state.lat==null)return;
  const p=localParts();
  const months=[[p.year,p.month]]; if(p.month===12)months.push([p.year+1,1]); else months.push([p.year,p.month+1]);
  try{
    const results=await Promise.all(months.map(([y,m])=>fetch(prayerUrl(`https://api.aladhan.com/v1/calendar/${y}/${m}`)).then(r=>r.ok?r.json():Promise.reject(r.status))));
    state.calendar=results.flatMap(x=>x.data||[]).filter(x=>x?.date?.gregorian?.date);
    renderWeekSchedule();
  }catch{ renderWeekSchedule(); }
}

function getTodayCalendar(){
  const key=isoLocalDate(); return state.calendar.find(x=>x.date?.gregorian?.date===key || x.date?.gregorian?.date===`${pad(localParts().day)}-${pad(localParts().month)}-${localParts().year}`) || null;
}
function normaliseTiming(v){ return typeof v==='string'?v.replace(/ \(.+\)$/,'').trim():v; }

function renderUnavailable(){
  $('#prayerCards').innerHTML=MAIN_PRAYERS.map(p=>`<div class="prayer-card"><div class="label">${p}</div><div class="arab">${ARABIC[p]}</div><div class="time">--:--</div><div class="status">Use precise location</div></div>`).join('');
  $('#fullPrayerList').innerHTML='<div class="full-row"><div><div class="pname">Precise location required</div><div class="psub">Use GPS so the calculation is based on your current coordinates.</div></div><div class="ptime">—</div><div></div></div>';
  $('#weekSchedule').innerHTML='<div class="info-card">Enable precise location to calculate the next 7 days.</div>';
  $('#countdown').textContent='--:--:--'; $('#nextPrayerName').textContent='—'; $('#nextPrayerTime').textContent='--:--';
}

function effectiveTimesFrom(timings){
  const out={}; for(const p of DISPLAY_PRAYERS){ const raw=normaliseTiming(timings?.[p]); if(raw)out[p]=raw; } return out;
}
function currentPrayerData(){ return state.prayer ? effectiveTimesFrom(state.prayer) : (getTodayCalendar()?effectiveTimesFrom(getTodayCalendar().timings):null); }

function refreshTodayUI(){
  const timings=currentPrayerData();
  if(!timings){renderUnavailable();return;}
  updateNextPrayer(timings);
  renderPrayerCards(timings); renderFullPrayer(timings); renderTracker(); updateQuickCards();
}
function renderPrayerCards(timings){
  $('#prayerCards').innerHTML=MAIN_PRAYERS.map(p=>{
    const active=state.nextPrayer===p; const mins=minutesFromTime(timings[p]); const now=localParts();
    const nowMin=now.hour*60+now.minute; const status=active?'NEXT PRAYER':(mins!=null&&mins<=nowMin?'Completed':'Upcoming');
    return `<div class="prayer-card ${active?'active':''}"><div class="label">${p}</div><div class="arab">${ARABIC[p]}</div><div class="time">${timeText(timings[p])}</div><div class="status">${status}</div></div>`;
  }).join('');
}
function renderFullPrayer(timings){
  $('#fullPrayerList').innerHTML=DISPLAY_PRAYERS.map(p=>{
    const active=state.nextPrayer===p; return `<div class="full-row ${active?'active':''}"><div><div class="pname">${p}</div><div class="psub">${p==='Sunrise'?'Sunrise':p==='Midnight'?'Night midpoint':'Daily salah'}</div></div><div class="ptime">${timeText(timings[p])}</div><div></div>${active?'<span class="next-pill">NEXT</span>':''}</div>`;
  }).join('');
  const loc=state.location; const label=[loc?.locality&&loc.locality!==loc?.city?loc.locality:null,loc?.city,loc?.country].filter(Boolean).join(', ');
  $('#prayerIntro').textContent=label?`Calculated from ${label} at ${state.lat?.toFixed(5)}, ${state.lon?.toFixed(5)} using ${METHODS.find(m=>m[0]===Number(state.method))?.[1]||'selected method'}.`:'Times are calculated from precise coordinates and selected settings.';
}
function updateNextPrayer(timings){
  const now=localParts(); const nowMin=now.hour*60+now.minute+now.second/60; const candidates=MAIN_PRAYERS.map(p=>({name:p,minutes:minutesFromTime(timings[p])})).filter(x=>x.minutes!=null);
  let best=candidates.find(x=>x.minutes>nowMin);
  let diffMinutes;
  if(!best){ best=candidates[0]; diffMinutes=(24*60-nowMin)+best.minutes; } else diffMinutes=best.minutes-nowMin;
  state.nextPrayer=best?.name||null;
  $('#nextPrayerName').textContent=best?.name||'—'; $('#nextPrayerTime').textContent=best?timeText(timings[best.name]):'--:--';
  const sec=Math.max(0,Math.floor(diffMinutes*60)); $('#countdown').textContent=`${pad(Math.floor(sec/3600))}:${pad(Math.floor((sec%3600)/60))}:${pad(sec%60)}`;
  $('#todayLabel').textContent=displayDate();
}
function startCountdown(){
  clearInterval(startCountdown.t);
  startCountdown.lastDate=isoLocalDate();
  startCountdown.t=setInterval(()=>{
    const today=isoLocalDate();
    if(today!==startCountdown.lastDate && state.lat!=null){ startCountdown.lastDate=today; loadPrayerTimes().then(loadWeekCalendar); return; }
    const t=currentPrayerData(); if(t){updateNextPrayer(t);renderPrayerCards(t);renderTracker();}
  },1000);
}

function renderWeekSchedule(){
  const todayKey=isoLocalDate(); const items=state.calendar.filter(x=>x?.date?.gregorian?.date).map(x=>({g:x.date.gregorian,h:x.date.hijri,t:x.timings,meta:x})).filter(x=>{const k=String(x.g.date).split('-');return k.length===3;});
  const byKey=new Map(items.map(x=>[x.g.date,x]));
  const p=localParts();
  const rows=[]; for(let i=0;i<7;i++){
    const dt=new Date(Date.UTC(p.year,p.month-1,p.day+i,12)); const key=`${pad(dt.getUTCDate())}-${pad(dt.getUTCMonth()+1)}-${dt.getUTCFullYear()}`; const x=byKey.get(key);
    rows.push(x||null);
  }
  if(!rows.some(Boolean)){ $('#weekSchedule').innerHTML='<div class="info-card">Week schedule unavailable until timing data loads.</div>'; return; }
  $('#weekSchedule').innerHTML=rows.map((x,i)=>{
    if(!x)return `<div class="week-day"><strong>Day ${i+1}</strong><span>—</span></div>`;
    const label=new Date(Date.UTC(x.g.year,x.g.month,x.g.day,12)).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'});
    return `<button class="week-day ${i===0?'today':''}" data-week-key="${x.g.date}"><div><strong>${i===0?'Today':label}</strong><small>${x.h?.day||''} ${x.h?.month?.en||''}</small></div><span>${timeText(normaliseTiming(x.t.Maghrib))}</span></button>`;
  }).join('');
  $$('.week-day[data-week-key]').forEach(b=>b.addEventListener('click',()=>showDayFromCalendar(b.dataset.weekKey)));
  $('#weekLocation').textContent=state.timezone||'';
}
function showDayFromCalendar(key){
  const x=state.calendar.find(v=>v?.date?.gregorian?.date===key); if(!x)return;
  const timings=effectiveTimesFrom(x.timings);
  $('#fullPrayerList').innerHTML=DISPLAY_PRAYERS.map(p=>`<div class="full-row"><div><div class="pname">${p}</div><div class="psub">${x.date.gregorian.weekday.en||''} · ${x.date.hijri?.day||''} ${x.date.hijri?.month?.en||''}</div></div><div class="ptime">${timeText(timings[p])}</div><div></div></div>`).join('');
  showView('prayer'); toast(`Showing ${x.date.gregorian.weekday.en}, ${key}`);
}

function calculateQibla(){
  if(state.lat==null)return;
  const toRad=x=>x*Math.PI/180, toDeg=x=>x*180/Math.PI; const phi1=toRad(state.lat),phi2=toRad(KAABA.lat),dl=toRad(KAABA.lon-state.lon);
  const y=Math.sin(dl)*Math.cos(phi2); const x=Math.cos(phi1)*Math.sin(phi2)-Math.sin(phi1)*Math.cos(phi2)*Math.cos(dl);
  state.qiblaBearing=(toDeg(Math.atan2(y,x))+360)%360;
  const dphi=toRad(KAABA.lat-state.lat),dl2=toRad(KAABA.lon-state.lon); const a=Math.sin(dphi/2)**2+Math.cos(phi1)*Math.cos(phi2)*Math.sin(dl2/2)**2;
  state.qiblaDistance=6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); updateQiblaUI();
}
function updateQiblaUI(){
  if(state.qiblaBearing==null){$('#qiblaDegree').textContent='—°';$('#qiblaSub').textContent='Enable location to calculate Qibla.';return;}
  $('#qiblaDegree').textContent=`${Math.round(state.qiblaBearing)}°`; $('#qiblaBearingText').textContent=`${state.qiblaBearing.toFixed(1)}° from North`; $('#qiblaDistanceText').textContent=`${state.qiblaDistance.toFixed(0)} km`; $('#qiblaCoords').textContent=`${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}`;
  $('#qiblaSub').textContent=state.location?.city?`From ${state.location.city}, ${state.location.country||''}`:'Calculated from your coordinates'; $('#needle').style.transform=`rotate(${state.qiblaBearing-state.deviceHeading}deg)`; $('#qiblaQuick').textContent=`${Math.round(state.qiblaBearing)}° from North`;
}
async function calibrateCompass(){
  if(!('DeviceOrientationEvent' in window)){toast('This device does not expose a browser compass. The Qibla bearing is still shown.');return;}
  try{
    if(typeof DeviceOrientationEvent.requestPermission==='function'){const p=await DeviceOrientationEvent.requestPermission();if(p!=='granted')throw new Error('denied');}
    window.removeEventListener('deviceorientation',onOrientation,true); window.addEventListener('deviceorientation',onOrientation,true); toast('Phone compass enabled. Keep the phone flat while turning.');
  }catch{toast('Compass permission is not available in this browser.');}
}
function onOrientation(e){const heading=e.webkitCompassHeading ?? (typeof e.alpha==='number'?360-e.alpha:null);if(typeof heading==='number'){state.deviceHeading=heading;updateQiblaUI();}}

async function initQuran(){
  if(state.quranChapters.length){renderSurahs($('#quranSearch').value||'');return;}
  $('#surahList').innerHTML='<div class="info-card">Loading 114 surahs…</div>';
  try{
    const r=await fetch('https://api.alquran.cloud/v1/surah'); if(!r.ok)throw new Error('quran'); const d=await r.json(); state.quranChapters=d.data||[]; renderSurahs();
  }catch{ $('#surahList').innerHTML='<div class="info-card"><strong>Quran catalogue could not load.</strong><p>Check your connection. Your saved bookmarks and last-reading position remain on this device.</p></div>'; }
}
function renderSurahs(filter=''){
  $('#surahReader').classList.add('hidden'); $('#surahList').classList.remove('hidden');
  const f=filter.trim().toLowerCase(); const items=state.quranChapters.filter(s=>!f||`${s.number} ${s.name} ${s.englishName} ${s.englishNameTranslation}`.toLowerCase().includes(f));
  $('#surahList').innerHTML=items.map(s=>`<button class="surah-card" data-surah="${s.number}"><span class="surah-num">${s.number}</span><span><strong>${escapeHtml(s.englishName)}</strong><small>${escapeHtml(s.englishNameTranslation)} • ${s.numberOfAyahs} Ayahs</small></span><span class="surah-ar" translate="no">${escapeHtml(s.name)}</span></button>`).join('')||'<div class="info-card">No surah matched that search.</div>';
  $$('.surah-card').forEach(b=>b.addEventListener('click',()=>openSurah(Number(b.dataset.surah),1)));
}
async function openSurah(num,scrollAyah=1){
  $('#surahReader').classList.remove('hidden'); $('#surahList').classList.add('hidden'); $('#quranSearchResults').classList.add('hidden'); state.openedSurah=num;
  $('#surahReader').innerHTML='<div class="info-card">Loading Quran text and recitation…</div>';
  const edition=$('#editionSelect').value; state.quranEdition=edition;
  try{
    const r=await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,${edition},ar.alafasy`); if(!r.ok)throw new Error('surah');
    const d=await r.json(); const arabic=d.data?.find(x=>x.edition?.identifier==='quran-uthmani'); const trans=d.data?.find(x=>x.edition?.identifier===edition); const audio=d.data?.find(x=>x.edition?.identifier==='ar.alafasy'); const meta=state.quranChapters.find(x=>x.number===num);
    const firstAudio=audio?.ayahs?.[0]?.audio||'';
    const saved=state.lastRead?.surah===num?state.lastRead.ayah:scrollAyah;
    $('#surahReader').innerHTML=`<div class="reader-head"><div><button class="text-btn" id="backToSurahs">← All surahs</button><h3>${escapeHtml(meta?.englishName||'Surah')} <span class="surah-ar" translate="no">${escapeHtml(meta?.name||'')}</span></h3><div class="reader-meta">${escapeHtml(meta?.englishNameTranslation||'')} • ${meta?.revelationType||''} • ${meta?.numberOfAyahs||''} verses</div></div><div class="reader-actions"><button class="secondary-btn" id="playSurah" ${firstAudio?'':'disabled'}>▶ Play</button></div></div><div class="reader-tools"><button class="text-btn" id="markLastRead">Mark last read</button><span class="muted-small">Ayah ${saved||1}</span></div><div class="reader-list">${(arabic?.ayahs||[]).map((a,i)=>{const n=a.numberInSurah||i+1;const key=`${num}:${n}`;const bm=state.bookmarks.includes(key);const au=audio?.ayahs?.[i]?.audio||'';return `<article class="ayah" id="ayah-${n}" data-ayah="${n}"><div class="ayah-top"><span class="ayah-num">${n}</span><div><button class="mini-action bookmark ${bm?'saved':''}" data-bookmark="${key}">${bm?'★':'☆'}</button><button class="mini-action" data-last="${n}">↗</button></div></div><div class="ayah-arabic" translate="no">${a.text}</div><div class="ayah-trans">${escapeHtml(trans?.ayahs?.[i]?.text||'')}</div>${au?`<button class="audio-btn" data-audio="${au}">🔊 Listen</button>`:''}</article>`;}).join('')}</div>`;
    $('#backToSurahs').addEventListener('click',()=>renderSurahs($('#quranSearch').value||''));
    $('#editionSelect').value=edition;
    $('#playSurah').addEventListener('click',()=>playSurahAudio(audio?.ayahs||[]));
    $('#markLastRead').addEventListener('click',()=>{state.lastRead={surah:num,ayah:state.lastRead?.surah===num?state.lastRead.ayah:saved||1};persist();updateQuickCards();toast(`Saved Surah ${num}, ayah ${state.lastRead.ayah}.`);});
    $$('.bookmark').forEach(b=>b.addEventListener('click',()=>toggleBookmark(b.dataset.bookmark,b)));
    $$('[data-last]').forEach(b=>b.addEventListener('click',()=>{state.lastRead={surah:num,ayah:Number(b.dataset.last)};persist();updateQuickCards();toast(`Last read saved at ayah ${b.dataset.last}.`);}));
    $$('[data-audio]').forEach(b=>b.addEventListener('click',()=>{stopAudio();state.audio=new Audio(b.dataset.audio);state.audio.play().catch(()=>toast('Audio playback was blocked by the browser.'));}));
    requestAnimationFrame(()=>{const el=$(`#ayah-${clamp(Number(saved||1),1,arabic?.ayahs?.length||1)}`);el?.scrollIntoView({block:'center'});});
  }catch{ $('#surahReader').innerHTML='<div class="info-card"><strong>Could not load this surah.</strong><p>Check your connection or API availability.</p></div>'; }
}
function stopAudio(){try{state.audio?.pause();}catch{}state.audio=null;}
function playSurahAudio(ayahs){stopAudio(); let i=0; const playNext=()=>{if(i>=ayahs.length)return; const url=ayahs[i]?.audio;if(!url){i++;playNext();return;} state.audio=new Audio(url); state.audio.onended=()=>{i++;playNext();};state.audio.play().catch(()=>toast('Audio playback was blocked by the browser.'));}; playNext();}
function toggleBookmark(key,btn){
  const i=state.bookmarks.indexOf(key); if(i>=0){state.bookmarks.splice(i,1);btn.textContent='☆';btn.classList.remove('saved');}else{state.bookmarks.push(key);btn.textContent='★';btn.classList.add('saved');}
  persist();
}
async function searchQuran(){
  const q=$('#quranSearch').value.trim(); if(q.length<2){toast('Enter at least two characters.');return;}
  $('#quranSearchResults').classList.remove('hidden'); $('#quranSearchResults').innerHTML='<div class="info-card">Searching Quran…</div>';
  try{
    const edition=$('#editionSelect').value; const r=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/${edition}`); if(!r.ok)throw new Error('search'); const d=await r.json(); const matches=d.data?.matches||[];
    $('#quranSearchResults').innerHTML=matches.slice(0,30).map(m=>`<button class="search-result" data-search-surah="${m.surah?.number||0}" data-search-ayah="${m.numberInSurah||1}"><strong>${escapeHtml(m.surah?.englishName||'Quran')} ${m.numberInSurah||''}</strong><span>${escapeHtml(m.text||'')}</span></button>`).join('')||'<div class="info-card">No matching ayahs found.</div>';
    $$('.search-result').forEach(b=>b.addEventListener('click',()=>openSurah(Number(b.dataset.searchSurah),Number(b.dataset.searchAyah))));
  }catch{ $('#quranSearchResults').innerHTML='<div class="info-card">Verse search is temporarily unavailable. You can still search the 114 surahs by name.</div>'; }
}
function showBookmarks(){
  showView('quran'); $('#surahList').classList.remove('hidden'); $('#surahReader').classList.add('hidden'); $('#quranSearchResults').classList.remove('hidden');
  if(!state.bookmarks.length){$('#quranSearchResults').innerHTML='<div class="info-card">No bookmarked ayahs yet. Tap ☆ beside an ayah while reading.</div>';return;}
  $('#quranSearchResults').innerHTML=state.bookmarks.map(key=>{const [s,a]=key.split(':').map(Number);const meta=state.quranChapters.find(x=>x.number===s);return `<button class="search-result" data-search-surah="${s}" data-search-ayah="${a}"><strong>${escapeHtml(meta?.englishName||`Surah ${s}`)} • Ayah ${a}</strong><span>Open bookmarked ayah</span></button>`;}).join('');
  $$('.search-result').forEach(b=>b.addEventListener('click',()=>openSurah(Number(b.dataset.searchSurah),Number(b.dataset.searchAyah))));
}
function continueQuran(){
  showView('quran'); if(state.lastRead?.surah){openSurah(state.lastRead.surah,state.lastRead.ayah);}else{toast('No saved reading position yet. Open a surah to begin.');}}

async function updateDailyAyah(){
  try{
    const idx=(Math.floor(Date.now()/86400000))%DAILY_AYAHS.length; const [fallbackA,fallbackT,fallbackR]=DAILY_AYAHS[idx];
    $('#dailyAyahArabic').textContent=fallbackA; $('#dailyAyahTranslation').textContent=`“${fallbackT}”`; $('#dailyAyahRef').textContent=fallbackR;
    const ref=DAILY_AYAHS[idx]; const r=await fetch(`https://api.alquran.cloud/v1/ayah/${ref[3]}:${Number(ref[2].split(':')[1])}/editions/quran-uthmani,${state.quranEdition}`); if(r.ok){const d=await r.json();const a=d.data?.find(x=>x.edition.identifier==='quran-uthmani');const t=d.data?.find(x=>x.edition.identifier===state.quranEdition);if(a?.text)$('#dailyAyahArabic').textContent=a.text;if(t?.text)$('#dailyAyahTranslation').textContent=`“${t.text}”`;}
  }catch{}
}

function renderTracker(){
  const key=isoLocalDate(); const tracked=state.tracker?.[key]||{};
  $('#trackerDate').textContent=state.hijri?`${hijriText(state.hijri)} • ${displayDate()}`:displayDate();
  $('#prayerTracker').innerHTML=MAIN_PRAYERS.map(p=>{const done=tracked[p];return `<button class="track-item ${done?'done':''}" data-track="${p}"><span>${done?'✓':'○'}</span><strong>${p}</strong></button>`;}).join('');
  $$('[data-track]').forEach(b=>b.addEventListener('click',()=>{state.tracker[key]=state.tracker[key]||{};state.tracker[key][b.dataset.track]=!state.tracker[key][b.dataset.track];persist();renderTracker();}));
}
function updateQuickCards(){
  $('#tasbihQuick').textContent=`${state.tasbih} counted`; $('#quranProgressText').textContent=state.lastRead?`Surah ${state.lastRead.surah}, ayah ${state.lastRead.ayah}`:'Start a reading plan';
}

async function openTool(tool){
  showView('tools'); const panel=$('#toolPanel'); panel.classList.remove('hidden');
  if(tool==='tasbih') panel.innerHTML=`<div class="tasbih"><div class="eyebrow">DHIKR</div><h3>Tasbih Counter</h3><div class="counter" id="counter">${state.tasbih}</div><div class="tasbih-presets"><button class="secondary-btn tasbih-preset" data-n="33">33</button><button class="secondary-btn tasbih-preset" data-n="99">99</button><button class="secondary-btn tasbih-preset" data-n="100">100</button></div><button class="round-btn" id="countBtn">Tap to count</button><div class="row-actions"><button class="secondary-btn" id="resetCount">Reset</button><button class="secondary-btn" id="saveCount">Save</button></div></div>`;
  if(tool==='duas') panel.innerHTML=`<div><div class="eyebrow">DUA</div><h3>Daily Duas</h3><div class="duas-list">${DUAS.map((d,i)=>`<article class="dua"><div class="dua-head"><strong>${i+1}. ${escapeHtml(d.title)}</strong><button class="mini-action" data-copy-dua="${i}">Copy</button></div><p class="dua-arabic" dir="rtl" translate="no">${d.arabic}</p><p>${escapeHtml(d.english)}</p></article>`).join('')}</div><p class="source-note">Religious content in this module should still be checked against the sources and scholarly practice your community follows before a commercial launch.</p></div>`;
  if(tool==='names') panel.innerHTML='<div><div class="eyebrow">ASMA UL HUSNA</div><h3>99 Names of Allah</h3><div id="namesList" class="names-grid"><div class="info-card">Loading names…</div></div></div>';
  if(tool==='hijri') panel.innerHTML=`<div><div class="eyebrow">CALENDAR</div><h3>Hijri Calendar</h3><div id="hijriPanel"><div class="info-card">Loading calendar…</div></div></div>`;
  if(tool==='zakat') panel.innerHTML=`<div><div class="eyebrow">ZAKAT</div><h3>Zakat estimator</h3><p class="tool-copy">Enter your net zakatable assets and the nisab threshold you follow. This is an estimator, not a fiqh ruling.</p><div class="calc-grid"><label>Cash / savings (£)<input id="zCash" type="number" min="0" step="0.01" value="0"></label><label>Gold value (£)<input id="zGold" type="number" min="0" step="0.01" value="0"></label><label>Silver value (£)<input id="zSilver" type="number" min="0" step="0.01" value="0"></label><label>Other zakatable assets (£)<input id="zOther" type="number" min="0" step="0.01" value="0"></label><label>Short-term eligible liabilities (£)<input id="zLiab" type="number" min="0" step="0.01" value="0"></label><label>Nisab threshold (£)<input id="zNisab" type="number" min="0" step="0.01" value="0"></label></div><button class="primary-btn" id="calcZakat">Calculate</button><div id="zakatResult" class="calc-result"></div><p class="source-note">Zakat rules differ by asset type, nisab basis and scholarly methodology. Confirm your calculation with a qualified scholar or trusted calculator for your circumstances.</p></div>`;
  if(tool==='mosques') panel.innerHTML=`<div><div class="eyebrow">LOCAL</div><h3>Mosques near me</h3><p class="tool-copy">Use your precise coordinates to open a nearby-mosque search in the map service you prefer.</p><div class="map-actions"><button class="primary-btn" id="mapsGoogle">Google Maps</button><button class="secondary-btn" id="mapsOsm">OpenStreetMap</button></div><div id="mosqueLocationNote" class="setting-note"></div></div>`;
  if(tool==='ramadan') panel.innerHTML=`<div><div class="eyebrow">RAMADAN</div><h3>Ramadan planner</h3><div id="ramadanPanel"><div class="info-card">Loading Ramadan calendar…</div></div></div>`;
  if(tool==='settings'){openSettings();return;}

  $('#countBtn')?.addEventListener('click',()=>{state.tasbih++;$('#counter').textContent=state.tasbih;persist();updateQuickCards();});
  $('#resetCount')?.addEventListener('click',()=>{state.tasbih=0;$('#counter').textContent=0;persist();updateQuickCards();});
  $('#saveCount')?.addEventListener('click',()=>{persist();toast('Tasbih count saved.');});
  $$('.tasbih-preset').forEach(b=>b.addEventListener('click',()=>{state.tasbih=Number(b.dataset.n);$('#counter').textContent=state.tasbih;persist();updateQuickCards();}));
  $$('[data-copy-dua]').forEach(b=>b.addEventListener('click',async()=>{const d=DUAS[Number(b.dataset.copyDua)];try{await navigator.clipboard.writeText(`${d.title}\n${d.arabic}\n${d.english}`);toast('Dua copied.');}catch{toast('Copy is not available in this browser.');}}));
  $('#calcZakat')?.addEventListener('click',()=>{const assets=['zCash','zGold','zSilver','zOther'].reduce((s,id)=>s+Number($('#'+id).value||0),0);const liab=Number($('#zLiab').value||0);const nisab=Number($('#zNisab').value||0);const net=Math.max(0,assets-liab);const due=nisab>0&&net>=nisab?net*0.025:0;$('#zakatResult').textContent=nisab>0?(due?`Estimated zakat: £${due.toFixed(2)} on £${net.toFixed(2)} of net assets.`:`No zakat estimate due because net assets are below the entered nisab.`):`Net zakatable assets: £${net.toFixed(2)}. Enter the nisab threshold you follow to complete the estimate.`;});
  $('#mapsGoogle')?.addEventListener('click',()=>{if(state.lat==null){toast('Enable precise location first.');return;}window.open(`https://www.google.com/maps/search/mosque/@${state.lat},${state.lon},14z`,'_blank','noopener,noreferrer');});
  $('#mapsOsm')?.addEventListener('click',()=>{if(state.lat==null){toast('Enable precise location first.');return;}window.open(`https://www.openstreetmap.org/?mlat=${state.lat}&mlon=${state.lon}#map=14/${state.lat}/${state.lon}`,'_blank','noopener,noreferrer');});
  if(tool==='names') loadNames(); if(tool==='hijri') loadHijriPanel(); if(tool==='ramadan') loadRamadanPanel();
}

async function loadNames(){
  try{
    const r=await fetch('https://api.aladhan.com/v1/asmaAlHusna'); if(!r.ok)throw new Error(); const d=await r.json();
    $('#namesList').innerHTML=(d.data||[]).map(n=>`<article class="name-item"><div class="name-number">${n.number}</div><div><div class="name-ar" dir="rtl">${escapeHtml(n.name)}</div><strong>${escapeHtml(n.transliteration)}</strong><p>${escapeHtml(n.en?.meaning||'')}</p></div></article>`).join('');
  }catch{ $('#namesList').innerHTML='<div class="info-card">The names service could not load. Try again when online.</div>'; }
}
async function loadHijriPanel(){
  const p=localParts();
  try{
    const r=await fetch(prayerUrl(`https://api.aladhan.com/v1/calendar/${p.year}/${p.month}`)); if(!r.ok)throw new Error(); const d=await r.json(); const rows=d.data||[];
    const x=rows.map(v=>({g:v.date.gregorian,h:v.date.hijri}));
    $('#hijriPanel').innerHTML=`<div class="calendar-grid">${x.map(v=>`<div class="calendar-cell ${v.g.date===`${pad(p.day)}-${pad(p.month)}-${p.year}`?'today':''}"><strong>${v.g.day}</strong><span>${v.h.day}</span><small>${escapeHtml(v.h.month.en)}</small></div>`).join('')}</div><p class="source-note">The Hijri calendar is computed according to the selected calendar convention. Crescent-sighting practices can differ from calculated dates.</p>`;
  }catch{ $('#hijriPanel').innerHTML='<div class="info-card">Hijri calendar data could not load.</div>'; }
}
async function loadRamadanPanel(){
  if(state.lat==null){$('#ramadanPanel').innerHTML='<div class="info-card">Enable precise location first so Noor can calculate Suhoor/Fajr and Iftar/Maghrib for your coordinates.</div>';return;}
  const months=[]; const start=new Date(); for(let i=0;i<13;i++){const d=new Date(start.getFullYear(),start.getMonth()+i,1);months.push([d.getFullYear(),d.getMonth()+1]);}
  try{
    const results=await Promise.all(months.map(([y,m])=>fetch(prayerUrl(`https://api.aladhan.com/v1/calendar/${y}/${m}`)).then(r=>r.ok?r.json():Promise.reject(r.status))));
    const days=results.flatMap(x=>x.data||[]).filter(x=>Number(x?.date?.hijri?.month?.number)===9);
    if(!days.length){$('#ramadanPanel').innerHTML='<div class="info-card">Ramadan dates were not found in the next 13 Gregorian months. Refresh closer to the start of the lunar month.</div>';return;}
    const todayKey=isoLocalDate(); const fastedCount=days.filter(x=>{const k=`${x.date.gregorian.year}-${pad(x.date.gregorian.month)}-${pad(x.date.gregorian.day)}`; return !!state.fasting[k];}).length;
    $('#ramadanPanel').innerHTML=`<div class="ramadan-hero"><div><span>RAMADAN ${days[0].date.hijri.year} AH</span><strong>${days[0].date.gregorian.date} → ${days[days.length-1].date.gregorian.date}</strong></div><div class="ramadan-count">${fastedCount}/${days.length}</div></div><div class="ramadan-table">${days.map((x,i)=>{const g=`${x.date.gregorian.year}-${pad(x.date.gregorian.month)}-${pad(x.date.gregorian.day)}`; const fast=!!state.fasting[g]; return `<div class="ramadan-row"><strong>Day ${x.date.hijri.day}</strong><span>${x.date.gregorian.weekday.en}, ${x.date.gregorian.date}</span><span>Suhoor ${timeText(normaliseTiming(x.timings.Fajr))}</span><span>Iftar ${timeText(normaliseTiming(x.timings.Maghrib))}</span><button class="mini-action ${fast?'saved':''}" data-fast-date="${g}">${fast?'✓ Fasted':'Mark fasted'}</button></div>`;}).join('')}</div><p class="source-note">Suhoor is represented here by Fajr timing, and Iftar by Maghrib timing. Local community timetables may apply additional precautionary minutes.</p>`;
    $$('[data-fast-date]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.fastDate;state.fasting[k]=!state.fasting[k];persist();loadRamadanPanel();}));
  }catch{ $('#ramadanPanel').innerHTML='<div class="info-card">Ramadan data could not load.</div>'; }
}

function openSettings(){
  $('#settingsModal').classList.remove('hidden'); $('#notificationsToggle').checked=!!state.notifications; $('#clockToggle').checked=!!state.use12h; $('#adjustmentInput').value=state.adjustment||0; $('#reminderOffsetInput').value=state.reminderOffset||0;
}
function closeSettings(){ $('#settingsModal').classList.add('hidden'); }
async function saveSettings(){
  state.notifications=$('#notificationsToggle').checked; state.use12h=$('#clockToggle').checked; state.adjustment=clamp(Number($('#adjustmentInput').value||0),-30,30); state.reminderOffset=clamp(Number($('#reminderOffsetInput').value||0),0,60); persist(); closeSettings();
  if(state.notifications && 'Notification' in window){try{const p=await Notification.requestPermission(); if(p!=='granted') toast('Browser notifications were not granted.');}catch{}}
  if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();}else refreshTodayUI(); toast('Settings saved.');
}
function scheduleReminderLoop(){clearInterval(scheduleReminderLoop.t); scheduleReminderLoop.t=setInterval(checkPrayerReminder,20000);checkPrayerReminder();}
function checkPrayerReminder(){
  if(!state.notifications||!state.prayer||!('Notification' in window)||Notification.permission!=='granted')return;
  const now=localParts(); const timings=currentPrayerData(); if(!timings)return; const keyDate=isoLocalDate(); const nowMin=now.hour*60+now.minute+now.second/60;
  for(const p of MAIN_PRAYERS){const mins=minutesFromTime(timings[p]);if(mins==null)continue;const target=mins-Number(state.reminderOffset||0);if(Math.abs(nowMin-target)<0.35){const k=`${keyDate}:${p}:${state.reminderOffset}`;if(!state.notified[k]){state.notified[k]=true;try{new Notification(`${p} prayer`,{body:`${p} is ${state.reminderOffset?`in ${state.reminderOffset} minutes`:'now'} • ${timeText(timings[p])}`,tag:`noor-${p}`});}catch{}}}}
}

function bind(){
  restore();
  METHODS.forEach(([id,name])=>{const o=document.createElement('option');o.value=id;o.textContent=name;$('#methodSelect').appendChild(o);});
  $('#methodSelect').value=String(state.method); $('#schoolSelect').value=String(state.school); $('#highLatSelect').value=state.highLat;
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
  $$('[data-view-jump]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.viewJump)));
  $$('[data-tool]').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.tool)));
  $('#heroLocationBtn').addEventListener('click',getPreciseLocation); $('#useLocationSide').addEventListener('click',getPreciseLocation); $('#locatePrayerBtn').addEventListener('click',getPreciseLocation); $('#qiblaLocateBtn').addEventListener('click',getPreciseLocation); $('#settingsLocateBtn').addEventListener('click',getPreciseLocation);
  $('#refreshBtn').addEventListener('click',async()=>{if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();calculateQibla();toast('Noor refreshed.');}else getPreciseLocation();});
  $('#settingsBtn').addEventListener('click',openSettings); $('#closeSettings').addEventListener('click',closeSettings); $('#saveSettings').addEventListener('click',saveSettings); $('#openSettingsFromPrayer').addEventListener('click',openSettings);
  $('#applyPrayerSettings').addEventListener('click',async()=>{state.method=Number($('#methodSelect').value);state.school=Number($('#schoolSelect').value);state.highLat=$('#highLatSelect').value;persist();if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();}toast('Prayer calculation settings applied.');});
  $('#quranSearch').addEventListener('input',e=>renderSurahs(e.target.value)); $('#quranSearch').addEventListener('keydown',e=>{if(e.key==='Enter')searchQuran();}); $('#editionSelect').addEventListener('change',async()=>{state.quranEdition=$('#editionSelect').value;persist();if(state.openedSurah)await openSurah(state.openedSurah,state.lastRead?.ayah||1);});
  $('#continueQuranBtn').addEventListener('click',continueQuran); $('#bookmarksBtn').addEventListener('click',showBookmarks); $('#quranSearchWebBtn').addEventListener('click',searchQuran); $('#quranSettingsBtn').addEventListener('click',openSettings);
  $('#calibrateBtn').addEventListener('click',calibrateCompass);
  $('#todayLabel').textContent=displayDate(); updateQuickCards(); renderUnavailable(); startCountdown();
  if(state.lat!=null){reverseGeocode().then(()=>loadPrayerTimes()).then(()=>loadWeekCalendar()).then(()=>calculateQibla());}
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
}

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.deferredInstall=e;$('#installBtn').classList.remove('hidden');});
$('#installBtn')?.addEventListener('click',async()=>{if(!state.deferredInstall)return;state.deferredInstall.prompt();await state.deferredInstall.userChoice;state.deferredInstall=null;$('#installBtn').classList.add('hidden');});
window.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){const t=currentPrayerData();if(t){updateNextPrayer(t);checkPrayerReminder();}}});
window.addEventListener('beforeunload',stopAudio);
bind();
