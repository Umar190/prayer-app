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
const DEFAULT_ADHAN_URL = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Adhan.ogg';
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
  ['1:2','Al-Fatihah 1:2'],
  ['94:5','Ash-Sharh 94:5'],
  ['20:114','Ta-Ha 20:114'],
  ['2:153','Al-Baqarah 2:153'],
  ['18:24','Al-Kahf 18:24'],
  ['65:3','At-Talaq 65:3'],
  ['94:6','Ash-Sharh 94:6']
];


const PROPHET_STORIES = [
  {name:'Adam عليه السلام', title:'The beginning of humanity', summary:'The Quran describes Adam as the first human, taught by Allah and honoured among His creation. After the test in the garden, Adam and his wife turned back to Allah in repentance, showing that sincere return to Allah is always meaningful.', refs:'Al-Baqarah 2:30–39 • Al-A‘raf 7:11–27 • Ta-Ha 20:115–123', lesson:'Repentance, humility and obedience.'},
  {name:'Nuh عليه السلام', title:'Patience through a long mission', summary:'Nuh called his people to worship Allah alone for a long period and continued despite rejection. The Quran recounts the flood, the believers being saved, and Nuh remaining steadfast in his trust in Allah.', refs:'Hud 11:25–49 • Nuh 71:1–28', lesson:'Keep doing what is right even when results are slow.'},
  {name:'Hud عليه السلام', title:'Calling the people of ‘Aad', summary:'Hud warned his people against arrogance and reminded them that strength and prosperity are gifts from Allah. When they rejected his warning, the Quran describes the consequence and the rescue of Hud and the believers.', refs:'Hud 11:50–60 • Al-Ahqaf 46:21–26', lesson:'Strength should produce gratitude, not pride.'},
  {name:'Salih عليه السلام', title:'The test of the she-camel', summary:'Salih called Thamud to worship Allah and was given a clear sign in the she-camel. The people were warned not to harm it, but some rejected the command and the community faced the consequence of persistent wrongdoing.', refs:'Hud 11:61–68 • Ash-Shams 91:11–15', lesson:'Do not treat clear guidance with arrogance.'},
  {name:'Ibrahim عليه السلام', title:'A life built on tawhid', summary:'Ibrahim challenged idolatry, called his people to Allah, and remained firm through severe tests. The Quran highlights his trust, his migration, the building of the Kaaba with Ismail, and his willingness to obey Allah.', refs:'Al-Baqarah 2:124–132 • Al-Anbiya 21:51–70 • As-Saffat 37:83–113', lesson:'Tawhid, courage and complete trust in Allah.'},
  {name:'Lut عليه السلام', title:'Standing for righteousness', summary:'Lut warned his people against grave wrongdoing and called them back to obedience. The Quran records the angels’ arrival, the rescue of Lut and his believing household, and the destruction of the wrongdoing community.', refs:'Hud 11:69–83 • Al-Ankabut 29:28–35', lesson:'Hold to righteousness even when society normalises wrongdoing.'},
  {name:'Ismail عليه السلام', title:'Obedience and trust', summary:'Ismail is remembered in the Quran as truthful, patient and devoted to prayer. The account of Ibrahim’s great test and the command to build the Sacred House with Ismail shows their shared submission to Allah.', refs:'Maryam 19:54–55 • As-Saffat 37:100–111 • Al-Baqarah 2:125–129', lesson:'Sincere obedience can require sacrifice and patience.'},
  {name:'Yaqub عليه السلام', title:'Beautiful patience', summary:'Yaqub endured deep grief over Yusuf and later the separation from his other son. The Quran presents his patience, trust in Allah and hope in Allah’s mercy even through years of uncertainty.', refs:'Yusuf 12:6–18 • Yusuf 12:83–101', lesson:'Patience can coexist with deep sadness and strong hope.'},
  {name:'Yusuf عليه السلام', title:'From hardship to forgiveness', summary:'Yusuf faced jealousy, separation, slavery and imprisonment before Allah raised him to a position of authority. He chose forgiveness when reunited with his brothers and connected his success to Allah’s plan.', refs:'Surah Yusuf 12:4–101', lesson:'Protect your character through hardship and forgive when you have power.'},
  {name:'Shuayb عليه السلام', title:'Honesty in trade', summary:'Shuayb called his people to worship Allah and to deal fairly in weights and measures. The Quran connects faith with honest business and warns against corruption and taking advantage of others.', refs:'Hud 11:84–95 • Al-A‘raf 7:85–93', lesson:'Faith includes honesty, fairness and integrity.'},
  {name:'Ayyub عليه السلام', title:'Patience in severe hardship', summary:'Ayyub’s story is presented as an example of steadfastness. After intense hardship, he called upon Allah with humility, and Allah restored his wellbeing and mercy.', refs:'Al-Anbiya 21:83–84 • Sad 38:41–44', lesson:'Turn to Allah in hardship without losing hope.'},
  {name:'Yunus عليه السلام', title:'Calling upon Allah in darkness', summary:'After leaving his people, Yunus was swallowed by the great fish. In the darkness he called upon Allah, recognised his mistake, and Allah answered him and returned him to his mission.', refs:'Al-Anbiya 21:87–88 • As-Saffat 37:139–148', lesson:'Repentance and remembrance can open a path out of despair.'},
  {name:'Dawud عليه السلام', title:'Justice, worship and gratitude', summary:'Dawud is described as receiving wisdom and kingship. The Quran highlights his judgement, worship and gratitude, while reminding him to judge with truth and not follow desire.', refs:'Al-Baqarah 2:251 • Sad 38:17–26', lesson:'Leadership requires justice, worship and self-restraint.'},
  {name:'Sulayman عليه السلام', title:'Power with gratitude', summary:'Sulayman was given a remarkable kingdom and abilities by Allah. Despite immense power, the Quran shows him repeatedly recognising that every blessing was from Allah and asking to remain grateful.', refs:'An-Naml 27:15–44 • Sad 38:30–40', lesson:'Use blessings as a reason for gratitude, not self-glorification.'},
  {name:'Zakariyya and Yahya عليهما السلام', title:'A prayer answered', summary:'Zakariyya quietly called upon Allah for righteous offspring despite old age. Allah answered by granting Yahya, described as noble, pure and devoted to Allah from a young age.', refs:'Aal Imran 3:37–41 • Maryam 19:2–15', lesson:'Never assume a sincere dua is too late for Allah.'},
  {name:'Isa عليه السلام', title:'A sign and messenger', summary:'The Quran describes Isa as a messenger born miraculously to Maryam and supported with clear signs by Allah’s permission. His message called people to worship Allah and follow revelation.', refs:'Aal Imran 3:45–51 • Maryam 19:16–36 • Al-Ma’idah 5:110–120', lesson:'Miracles point to Allah’s power, while worship belongs to Allah alone.'},
  {name:'Muhammad ﷺ', title:'Mercy, character and the final message', summary:'The Quran presents Muhammad ﷺ as a model of excellent character and a mercy to the worlds. His mission was to convey revelation, call people to Allah and teach by example.', refs:'Al-Anbiya 21:107 • Al-Ahzab 33:21 • Al-Qalam 68:4', lesson:'Follow revelation with mercy, integrity and excellent character.'}
];

const ISLAMIC_EVENTS = [
  {month:1,day:1,name:'1 Muharram',type:'Islamic New Year',note:'Beginning of the Hijri year. The exact civil date can vary with moon-sighting practice.'},
  {month:1,day:10,name:'Ashura',type:'Recommended fast',note:'10 Muharram. Many Muslims observe a voluntary fast; practices and calendars can differ.'},
  {month:7,day:27,name:'Isra and Mi‘raj',type:'Commemorative date',note:'Often associated with 27 Rajab; observance and exact date are not universal.'},
  {month:8,day:15,name:'Mid-Sha‘ban',type:'Commemorative date',note:'Often associated with 15 Sha‘ban; observance varies between communities.'},
  {month:9,day:1,name:'Start of Ramadan',type:'Fasting month',note:'The first day of Ramadan begins the obligatory fast; local moon sighting can shift the date.'},
  {month:9,day:27,name:'Laylat al-Qadr period',type:'Night of worship',note:'27 Ramadan is commonly highlighted, while the exact Night of Decree is sought among the last ten nights.'},
  {month:10,day:1,name:'Eid al-Fitr',type:'Festival',note:'1 Shawwal. Eid date follows the completion of Ramadan and can vary with moon sighting.'},
  {month:12,day:8,name:'Start of Hajj days',type:'Hajj',note:'The days of Hajj intensify through 8–13 Dhul-Hijjah.'},
  {month:12,day:9,name:'Day of Arafah',type:'Recommended fast',note:'9 Dhul-Hijjah. For those not performing Hajj, fasting this day is widely practiced.'},
  {month:12,day:10,name:'Eid al-Adha',type:'Festival',note:'10 Dhul-Hijjah. Begins during the Hajj season and follows the lunar calendar.'},
  {month:3,day:12,name:'Mawlid (commonly observed)',type:'Community-dependent',note:'Often observed on 12 Rabi‘ al-Awwal by some communities; this observance is not universal.'}
];

const MOON_COUNTRY_GUIDE = [
  {country:'United Kingdom', mode:'Local sighting / community announcements', note:'Multiple UK committees and mosque networks use local or regional sighting approaches. Check your local masjid or recognised UK moon-sighting body.', slug:'local'},
  {country:'Pakistan', mode:'Local sighting', note:'Moon sighting is locally observed and official announcements are used.', slug:'local'},
  {country:'India', mode:'Local sighting / local committees', note:'Community practice can differ by region and committee.', slug:'local'},
  {country:'Bangladesh', mode:'Local or announced sighting', note:'Announcements can be based on national or regional sighting decisions.', slug:'local'},
  {country:'Morocco', mode:'Official local sighting', note:'The official national announcement is used for major lunar-month starts.', slug:'local'},
  {country:'Oman', mode:'Local / official sighting', note:'Moon-sighting announcements are used for key lunar months.', slug:'local'},
  {country:'Saudi Arabia', mode:'National/official announcement', note:'Saudi announcements are followed by many communities worldwide, but other communities use different methods.', slug:'saudi'},
  {country:'United Arab Emirates', mode:'National/official announcement', note:'Often follows the regional Saudi/Gulf announcement pattern.', slug:'saudi'},
  {country:'Australia', mode:'Community-dependent', note:'Different communities may follow local sighting, Saudi-based, Turkish or other calendars.', slug:'mixed'},
  {country:'New Zealand', mode:'Community-dependent', note:'Local sighting and Australia-linked practice can both be found.', slug:'mixed'},
  {country:'South Africa', mode:'Local sighting', note:'Local observation and community announcements are widely used.', slug:'local'},
  {country:'Indonesia', mode:'Official national criteria/announcement', note:'National authorities use their own established criteria and announcement process.', slug:'own'},
  {country:'Malaysia', mode:'Official national announcement', note:'Official national announcements are used.', slug:'own'},
  {country:'Turkey', mode:'Calculation-based national/European criteria', note:'Turkey follows a calculated criterion rather than a purely local visual-sighting system.', slug:'turkey'},
  {country:'United States', mode:'Multiple community systems', note:'FCNA/ISNA, local committees, and other community methods coexist.', slug:'mixed'},
  {country:'Canada', mode:'Multiple community systems', note:'Different Canadian committees and organisations can use different criteria.', slug:'mixed'},
  {country:'France', mode:'Community-dependent', note:'Different national/community bodies have used different approaches.', slug:'mixed'},
  {country:'Germany', mode:'Community-dependent / calculation', note:'Different communities and organisations may use different calculations or announcements.', slug:'mixed'},
  {country:'Egypt', mode:'Calculated/official criterion', note:'Official practice uses a stated astronomical criterion for the new month.', slug:'own'},
  {country:'Nigeria', mode:'Official/community announcement', note:'Community and official announcement practices can differ.', slug:'own'},
];

const POINT_VALUES = {prayer:10,quranGoal:20,story:5,storyReflect:2,fast:10,tasbih33:5,tasbih99:10,event:3};
const PREMIUM_PLANS = {
  monthly: {name:'Noor Plus Monthly', price:'£2.99 / month', trial:'7-day free trial', url:()=>window.NOOR_CONFIG?.stripe?.monthlyUrl||''},
  yearly: {name:'Noor Plus Yearly', price:'£24.99 / year', trial:'7-day free trial', url:()=>window.NOOR_CONFIG?.stripe?.yearlyUrl||''}
};
const PREMIUM_FEATURES = [
  {title:'Quran Study Suite',desc:'Expanded authenticated tafsir/translation study tools, word-by-word learning and richer study collections as those source-backed modules are added.'},
  {title:'Offline Quran audio',desc:'Download supported recitations for listening without a connection in the native app.'},
  {title:'Reciter library',desc:'Choose from a broader collection of licensed recitations and save favourites.'},
  {title:'Advanced Noor Analytics',desc:'Longer-range prayer and Quran consistency insights, trends and personalised progress reports.'},
  {title:'Moon Watch alerts',desc:'Premium reminders for your selected country/community approach and local crescent-watch dates.'},
  {title:'Mosque timetable sync',desc:'Save trusted local mosque timetables and compare them with calculated times.'},
  {title:'Guided Noor Paths',desc:'Structured 7-, 30- and 90-day Quran, prayer and dhikr plans with adaptive goals.'},
  {title:'Family mode',desc:'Optional family profiles and shared reminders in the native app.'},
  {title:'Premium Adhan & themes',desc:'Additional licensed Adhan recordings, audio controls and visual themes.'}
];
const COMMUNITY_TOPICS = [
  ['General','Introduce yourself, share encouragement and everyday reflections.'],
  ['Quran','Reading goals, recitation, study habits and source-based questions.'],
  ['Prayer','Salah consistency, mosque routines and practical reminders.'],
  ['Ramadan & Events','Fasting, Eid preparation and community events.'],
  ['Local & Mosques','Useful local community information and mosque discussions.'],
  ['Learning','Books, classes, study techniques and beneficial resources.']
];
const COMMUNITY_SAMPLE_POSTS = [
  {id:'sample-1',author:'Noor Team',topic:'General',title:'Welcome to the Noor community',body:'A small place to encourage one another, ask thoughtful questions and share useful resources. Please keep religious claims tied to trustworthy sources.',created_at:'2026-01-01T00:00:00Z',sample:true},
  {id:'sample-2',author:'Noor Team',topic:'Quran',title:'Share your reading goal',body:'What is a realistic Quran reading goal you are working towards this week?',created_at:'2026-01-02T00:00:00Z',sample:true}
];


const state = {
  view:'home', lat:null, lon:null, location:null, timezone:null,
  prayer:null, hijri:null, calendar:[], method:3, school:1, highLat:'NightMiddle',
  adjustment:0, use12h:false, notifications:false, reminderOffset:0, notificationPrayers:{Fajr:true,Dhuhr:true,Asr:true,Maghrib:true,Isha:true}, adhanEnabled:true, adhanAudioUrl:DEFAULT_ADHAN_URL, nextPrayer:null,
  quranChapters:[], openedSurah:null, quranEdition:'en.sahih', bookmarks:[], lastRead:null,
  tasbih:0, qiblaBearing:null, qiblaDistance:null, deviceHeading:0, manualHeading:0, compassMode:'fixed', compassActive:false, lastHeadingAt:0,
  tracker:{}, notified:{}, deferredInstall:null, audio:null, locationUpdatedAt:null, locationSampleAt:null, locationStatus:'unknown', autoLocation:true, lastLocationRefresh:0,
  points:0, pointLog:{}, engagementDays:{}, storyProgress:{}, eventReminders:{}, quranGoal:10, quranDaily:{}, quranBooksRead:{},
  subscription:{status:'free',plan:null}, communityName:'', communityPosts:[], communityPostTimes:[]
};

function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2800); }
function todayKey(){ return isoLocalDate(); }
function awardPoints(amount,key,label){
  if(!amount||state.pointLog[key]) return false;
  state.points=Number(state.points||0)+amount; state.pointLog[key]={amount,label,at:Date.now()}; state.engagementDays[todayKey()]=true; persist(); updateJourneyQuick(); return true;
}
function markEngagement(){ state.engagementDays[todayKey()]=true; persist(); updateJourneyQuick(); }
function engagementStreak(){
  let n=0; const d=new Date();
  for(let i=0;i<366;i++){ const k=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; if(!state.engagementDays[k]) break; n++; d.setDate(d.getDate()-1); }
  return n;
}
function journeyStats(){
  const days=Object.keys(state.engagementDays||{}).length;
  const prayers=Object.values(state.tracker||{}).reduce((n,x)=>n+MAIN_PRAYERS.filter(p=>x?.[p]).length,0);
  const stories=Object.values(state.storyProgress||{}).filter(Boolean).length;
  const fasts=Object.values(state.fasting||{}).filter(Boolean).length;
  const qGoals=Object.values(state.quranDaily||{}).filter(x=>x?.completed).length;
  return {days,prayers,stories,fasts,qGoals,streak:engagementStreak(),points:Number(state.points||0)};
}
function updateJourneyQuick(){
  const s=journeyStats();
  if($('#journeyQuick')) $('#journeyQuick').textContent=`${s.points} points • ${s.streak} day streak`;
}
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

function cacheKey(prefix){
  const loc=state.lat!=null?`${Number(state.lat).toFixed(3)}:${Number(state.lon).toFixed(3)}`:'none';
  return `noor-${prefix}-${loc}-${state.method}-${state.school}-${state.highLat}-${state.adjustment}`;
}
function cacheRead(key,maxAgeMs){
  try{ const raw=localStorage.getItem(key); if(!raw)return null; const x=JSON.parse(raw); if(Date.now()-x.savedAt>maxAgeMs)return null; return x.data; }catch{return null;}
}
function cacheWrite(key,data){ try{ localStorage.setItem(key,JSON.stringify({savedAt:Date.now(),data})); }catch{} }
function appIsInstalled(){ return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone===true; }

function persist(){
  const payload={
    method:state.method,school:state.school,highLat:state.highLat,adjustment:state.adjustment,use12h:state.use12h,
    notifications:state.notifications,reminderOffset:state.reminderOffset,notificationPrayers:state.notificationPrayers,
    adhanEnabled:state.adhanEnabled,adhanAudioUrl:state.adhanAudioUrl,autoLocation:state.autoLocation,
    tasbih:state.tasbih,quranEdition:state.quranEdition,bookmarks:state.bookmarks,lastRead:state.lastRead,
    tracker:state.tracker,fasting:state.fasting,points:state.points,pointLog:state.pointLog,engagementDays:state.engagementDays,storyProgress:state.storyProgress,eventReminders:state.eventReminders,quranGoal:state.quranGoal,quranDaily:state.quranDaily,quranBooksRead:state.quranBooksRead,subscription:state.subscription,communityName:state.communityName,communityPosts:state.communityPosts,communityPostTimes:state.communityPostTimes,locationUpdatedAt:state.locationUpdatedAt,locationSampleAt:state.locationSampleAt,
    lastLocation:state.location && {latitude:state.lat,longitude:state.lon,city:state.location.city,locality:state.location.locality,region:state.location.region,country:state.location.country,postcode:state.location.postcode,accuracy:state.location.accuracy,timeZone:state.timezone}
  };
  try{ localStorage.setItem('noor-settings',JSON.stringify(payload)); }
  catch{ try{ sessionStorage.setItem('noor-settings-session',JSON.stringify(payload)); }catch{} }
}
function restore(){
  try{
    const raw=localStorage.getItem('noor-settings')||sessionStorage.getItem('noor-settings-session')||'{}';
    const s=JSON.parse(raw); Object.assign(state,s);
    state.notificationPrayers={Fajr:true,Dhuhr:true,Asr:true,Maghrib:true,Isha:true,...(s.notificationPrayers||{})};
    state.autoLocation=s.autoLocation!==false; state.adhanEnabled=s.adhanEnabled!==false; state.adhanAudioUrl=s.adhanAudioUrl || DEFAULT_ADHAN_URL;
    state.fasting=s.fasting||{}; state.points=Number(s.points||0); state.pointLog=s.pointLog||{}; state.engagementDays=s.engagementDays||{}; state.storyProgress=s.storyProgress||{}; state.eventReminders=s.eventReminders||{}; state.quranGoal=Number(s.quranGoal||10); state.quranDaily=s.quranDaily||{}; state.quranBooksRead=s.quranBooksRead||{}; state.subscription=s.subscription||{status:'free',plan:null}; state.communityName=s.communityName||''; state.communityPosts=Array.isArray(s.communityPosts)?s.communityPosts:[]; state.communityPostTimes=Array.isArray(s.communityPostTimes)?s.communityPostTimes:[];
    if(s.lastLocation?.latitude!=null && s.lastLocation?.longitude!=null){
      state.lat=Number(s.lastLocation.latitude); state.lon=Number(s.lastLocation.longitude);
      state.location={...s.lastLocation}; state.timezone=s.lastLocation.timeZone||null;
      state.locationUpdatedAt=s.locationUpdatedAt||null; state.locationSampleAt=s.locationSampleAt||s.locationUpdatedAt||null; state.locationStatus='saved';
    }
  }catch{}
}
function locationLabel(){
  const loc=state.location;
  return [loc?.locality&&loc.locality!==loc?.city?loc.locality:null,loc?.city,loc?.country].filter(Boolean).join(', ');
}
function renderLocationState(extra=''){
  const label=locationLabel()||((state.lat!=null&&state.lon!=null)?`${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}`:'Location needed');
  if($('#locationName')) $('#locationName').textContent=label;
  if($('#sideLocation')) $('#sideLocation').textContent=label;
  if($('#locationDetail') && state.lat!=null){
    const age=state.locationUpdatedAt?` • Updated ${new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'short'}).format(new Date(state.locationUpdatedAt))}`:'';
    $('#locationDetail').textContent=`${label}${state.location?.region?', '+state.location.region:''} • GPS ±${Math.round(state.location?.accuracy||0)}m • ${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}${state.timezone?' • '+state.timezone:''}${age}${extra?' • '+extra:''}`;
  }
}
async function getGeolocationPermission(){
  try{
    if(navigator.permissions?.query){
      const p=await navigator.permissions.query({name:'geolocation'});
      state.locationStatus=p.state;
      return p.state;
    }
  }catch{}
  return 'unknown';
}
function showView(view){
  state.view=view;
  $$('.view').forEach(v=>v.classList.toggle('active-view',v.id===`view-${view}`));
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const titles={home:'Assalamu alaikum',prayer:'Prayer Times',quran:'Quran',qibla:'Qibla',tools:'Islamic Tools',community:'Community'};
  $('#pageTitle').textContent=titles[view]||'Noor';
  $('#todayLabel').textContent=displayDate();
  if(view==='quran') initQuran();
  if(view==='qibla'){ updateQiblaUI(); updateCompassStatus(); }
  if(view==='home') refreshTodayUI();
}

async function getPreciseLocation(options={}){
  if(!navigator.geolocation){toast('This browser does not support geolocation.');return false;}
  const silent=!!options.silent; const force=!!options.force;
  if(!force && state.lastLocationRefresh && Date.now()-state.lastLocationRefresh<15*60*1000){ renderLocationState('using saved location'); return true; }
  if(!silent) toast('Finding your precise location…');
  state.lastLocationRefresh=Date.now();
  return await new Promise(resolve=>{
    navigator.geolocation.getCurrentPosition(async pos=>{
      const nextLat=Number(pos.coords.latitude.toFixed(7)); const nextLon=Number(pos.coords.longitude.toFixed(7));
      const moved=state.lat==null || Math.hypot((nextLat-state.lat)*111000, (nextLon-state.lon)*111000*Math.cos(nextLat*Math.PI/180))>120;
      state.lat=nextLat; state.lon=nextLon; state.locationStatus='granted';
      state.location={...(state.location||{}),latitude:state.lat,longitude:state.lon,accuracy:Number(pos.coords.accuracy)||0};
      state.locationUpdatedAt=new Date().toISOString(); state.locationSampleAt=new Date().toISOString();
      renderLocationState(moved?'location updated':'location confirmed');
      try{
        if(moved || !state.location?.city) await reverseGeocode();
        await loadPrayerTimes(); await loadWeekCalendar(); calculateQibla(); persist(); updateLocationButtons();
        if(!silent) toast('Location saved. Noor will update it automatically when needed.'); resolve(true);
      }catch{ persist(); resolve(false); }
    },err=>{
      state.locationStatus=err?.code===1?'denied':state.locationStatus;
      if(state.lat!=null){ renderLocationState('using saved location'); if(!silent) toast(err?.code===1?'Location permission is blocked. Using your saved location.':'Could not refresh GPS. Using your saved location.'); }
      else if(!silent) toast('Location permission was not granted.');
      resolve(false);
    },{enableHighAccuracy:true,timeout:12000,maximumAge:15*60*1000});
  });
}
async function autoDetectLocation(){
  if(!navigator.geolocation || state.autoLocation===false) return;
  const permission=await getGeolocationPermission();
  if(permission==='granted'){
    const stale=!state.locationSampleAt || Date.now()-new Date(state.locationSampleAt).getTime()>30*60*1000;
    if(stale) await getPreciseLocation({silent:true}); else if(state.lat!=null) renderLocationState('automatic location on');
    return;
  }
  if(state.lat==null && permission!=='denied') await getPreciseLocation({silent:false});
  else if(state.lat!=null) renderLocationState(permission==='denied'?'saved location • permission blocked':'saved on this device');
}
function updateLocationButtons(){
  const label=state.lat!=null?'Refresh my location':'Use precise location';
  ['heroLocationBtn','useLocationSide','locatePrayerBtn','qiblaLocateBtn','settingsLocateBtn'].forEach(id=>{const el=$(`#${id}`);if(el)el.textContent=label;});
  const status=$('#locationStatusText'); if(status) status.textContent=state.lat!=null?(state.locationStatus==='denied'?'Using saved location':'Automatic location is enabled'):'Location not set';
  const auto=$('#autoLocationToggle'); if(auto) auto.checked=state.autoLocation!==false;
}
async function reverseGeocode(){
  if(state.lat==null)return;
  try{
    const u=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${state.lat}&longitude=${state.lon}&localityLanguage=en`;
    const r=await fetch(u); if(!r.ok)throw new Error('reverse geocode'); const d=await r.json();
    state.location={...state.location,city:d.city||d.locality||'Unknown town',locality:d.locality||d.city||'',region:d.principalSubdivision||'',country:d.countryName||'',postcode:d.postcode||''};
    renderLocationState();
  }catch{
    renderLocationState('GPS coordinates');
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
  const date=isoLocalDate(); const [y,m,d]=date.split('-'); const key=cacheKey(`day-${date}`); const cached=cacheRead(key,12*60*60*1000);
  if(cached){state.prayer=cached.timings;state.hijri=cached.hijri;state.timezone=cached.timezone||state.timezone;$('#heroDate').textContent=`${displayDate()}${hijriText(state.hijri)?' • '+hijriText(state.hijri):''}`;refreshTodayUI();}
  const url=prayerUrl(`https://api.aladhan.com/v1/timings/${d}-${m}-${y}`);
  try{
    const r=await fetch(url,{cache:'no-store'}); if(!r.ok)throw new Error(`HTTP ${r.status}`); const data=await r.json();
    state.prayer=data.data?.timings||null;state.hijri=data.data?.date?.hijri||null;state.timezone=data.data?.meta?.timezone||state.timezone;
    cacheWrite(key,{timings:state.prayer,hijri:state.hijri,timezone:state.timezone}); renderLocationState(); $('#heroDate').textContent=`${displayDate()}${hijriText(state.hijri)?' • '+hijriText(state.hijri):''}`; $('#todayLabel').textContent=displayDate();
    await updateDailyAyah();refreshTodayUI();scheduleReminderLoop();
  }catch{ if(!cached)toast('Prayer timing service is unavailable. Cached data will be used when available.');refreshTodayUI(); }
}

async function loadWeekCalendar(){
  if(state.lat==null)return;
  const p=localParts(); const key=cacheKey(`calendar-${p.year}-${p.month}`); const cached=cacheRead(key,6*60*60*1000); if(cached){state.calendar=cached;renderWeekSchedule();}
  const months=[[p.year,p.month]]; if(p.month===12)months.push([p.year+1,1]); else months.push([p.year,p.month+1]);
  try{const results=await Promise.all(months.map(([y,m])=>fetch(prayerUrl(`https://api.aladhan.com/v1/calendar/${y}/${m}`),{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(r.status))));state.calendar=results.flatMap(x=>x.data||[]).filter(x=>x?.date?.gregorian?.date);cacheWrite(key,state.calendar);renderWeekSchedule();}catch{renderWeekSchedule();}
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
function activeHeading(){
  if(state.compassMode==='live' && state.compassActive) return Number(state.deviceHeading||0);
  return Number(state.manualHeading||0);
}
function updateCompassStatus(){
  const pill=$('#compassModePill'), status=$('#compassStatus'), help=$('#compassHelp');
  if(pill) pill.textContent = state.compassActive ? 'LIVE PHONE COMPASS' : (state.view==='qibla' ? 'INTERACTIVE DIAL' : 'FIXED BEARING');
  const cal=$('#calibrateBtn'); if(cal){ cal.textContent = state.compassActive ? 'Live compass active' : 'Enable live phone compass'; cal.disabled = !!state.compassActive; }
  if(status){
    if(state.compassActive && state.lastHeadingAt) status.textContent=`Live • ${Math.round(state.deviceHeading||0)}° heading`;
    else if(state.lat!=null) status.textContent=`Ready • ${Math.round(state.manualHeading||0)}° preview heading`;
    else status.textContent='Waiting for location';
  }
  if(help){
    help.textContent = state.compassActive ? 'Live compass is active. Hold the phone flat and turn slowly until the Qibla marker aligns with your direction.' : 'Desktop/tablet preview: drag around the dial to simulate turning. On a supported phone, enable the live compass for real heading movement.';
  }
}
function updateQiblaUI(){
  if(state.qiblaBearing==null){
    $('#qiblaDegree').textContent='—°';
    $('#qiblaSub').textContent='Enable location to calculate Qibla.';
    $('#qiblaBearingText').textContent='—';
    $('#qiblaDistanceText').textContent='—';
    $('#qiblaCoords').textContent='—';
    updateCompassStatus();
    return;
  }
  $('#qiblaDegree').textContent=`${Math.round(state.qiblaBearing)}°`;
  $('#qiblaBearingText').textContent=`${state.qiblaBearing.toFixed(1)}° from North`;
  $('#qiblaDistanceText').textContent=`${state.qiblaDistance.toFixed(0)} km`;
  $('#qiblaCoords').textContent=`${state.lat.toFixed(5)}, ${state.lon.toFixed(5)}`;
  const place=state.location?.city || state.location?.locality || 'your location';
  $('#qiblaSub').textContent=`Qibla is ${Math.round(state.qiblaBearing)}° clockwise from North • ${place}`;
  const relative=((state.qiblaBearing-activeHeading())+360)%360;
  $('#needle').style.transform=`rotate(${relative}deg)`;
  $('#qiblaQuick').textContent=`${Math.round(state.qiblaBearing)}° from North`;
  $('#compass').setAttribute('aria-label',`Qibla direction ${Math.round(state.qiblaBearing)} degrees from north. Current heading ${Math.round(activeHeading())} degrees.`);
  updateCompassStatus();
}
async function calibrateCompass(){
  if(!window.isSecureContext){
    toast('Live compass needs a secure connection (HTTPS). Your fixed Qibla bearing still works.');
    return;
  }
  if(!('DeviceOrientationEvent' in window)){
    toast('This device has no browser compass sensor. The Qibla bearing is still correct; use the interactive dial.');
    updateCompassStatus();
    return;
  }
  try{
    if(typeof DeviceOrientationEvent.requestPermission==='function'){
      const p=await DeviceOrientationEvent.requestPermission();
      if(p!=='granted') throw new Error('denied');
    }
    state.compassActive=true; state.compassMode='live'; state.lastHeadingAt=Date.now();
    window.removeEventListener('deviceorientation',onOrientation,true);
    window.removeEventListener('deviceorientationabsolute',onOrientation,true);
    window.addEventListener('deviceorientationabsolute',onOrientation,true);
    window.addEventListener('deviceorientation',onOrientation,true);
    updateCompassStatus();
    toast('Live compass enabled. Hold the phone flat and rotate slowly.');
    setTimeout(()=>{ if(Date.now()-state.lastHeadingAt>2500){ state.compassActive=false; state.compassMode='fixed'; updateCompassStatus(); toast('No compass readings arrived. Your device/browser may not expose a live heading; the fixed Qibla bearing remains correct.'); }},2800);
  }catch{
    state.compassActive=false; state.compassMode='fixed';
    updateCompassStatus();
    toast('Compass permission was not granted. On iPhone/iPad, allow Motion & Orientation access in the browser/site settings.');
  }
}
function normaliseHeading(h){ return ((Number(h)||0)+360)%360; }
function onOrientation(e){
  let heading=null;
  if(typeof e.webkitCompassHeading==='number' && Number.isFinite(e.webkitCompassHeading)){
    heading=e.webkitCompassHeading;
  }else if(typeof e.alpha==='number' && Number.isFinite(e.alpha)){
    // Absolute deviceorientation provides a North-referenced alpha on supported Android browsers.
    // Screen angle is folded in so landscape rotation behaves naturally.
    const screenAngle=Number(window.screen?.orientation?.angle||window.orientation||0);
    heading=(360-e.alpha+screenAngle)%360;
  }
  if(typeof heading==='number' && Number.isFinite(heading)){
    state.deviceHeading=normaliseHeading(heading);
    state.compassActive=true; state.compassMode='live'; state.lastHeadingAt=Date.now();
    updateQiblaUI();
  }
}
function setManualCompassFromPoint(clientX,clientY){
  const c=$('#compass'); if(!c||state.compassActive)return;
  const r=c.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
  const angle=(Math.atan2(clientX-cx, cy-clientY)*180/Math.PI+360)%360;
  state.manualHeading=angle; state.compassMode='manual'; updateQiblaUI();
}
function bindCompassDrag(){
  const c=$('#compass'); if(!c)return;
  let dragging=false;
  c.addEventListener('pointerdown',e=>{if(state.compassActive)return;dragging=true;c.setPointerCapture?.(e.pointerId);setManualCompassFromPoint(e.clientX,e.clientY);});
  c.addEventListener('pointermove',e=>{if(!dragging||state.compassActive)return;setManualCompassFromPoint(e.clientX,e.clientY);});
  c.addEventListener('pointerup',()=>dragging=false);
  c.addEventListener('pointercancel',()=>dragging=false);
  $('#resetCompassBtn')?.addEventListener('click',()=>{state.compassActive=false;state.compassMode='fixed';state.manualHeading=0;state.deviceHeading=0;updateQiblaUI();toast('Direction reset to North.');});
}

async function initQuran(){
  renderQuranGoal();
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
function renderQuranGoal(){
  const el=$('#quranGoalCard'); if(!el)return; const k=todayKey(); const day=state.quranDaily[k]||{count:0,completed:false}; const goal=Number(state.quranGoal||10);
  el.innerHTML=`<div><div class="goal-head"><div><span>QURAN TODAY</span><strong>${day.count||0}/${goal} ayahs</strong></div><button class="secondary-btn" id="quranGoalAdjust">Goal ${goal}</button></div><div class="progress-bar"><span style="width:${clamp(((day.count||0)/goal)*100,0,100)}%"></span></div><div class="goal-actions"><button class="mini-action" id="quranMinus">− 1</button><button class="mini-action" id="quranPlus">+ 1 ayah</button><button class="mini-action ${day.completed?'saved':''}" id="quranComplete" ${day.completed||((day.count||0)>=goal)?'':'disabled'}>${day.completed?'✓ Goal complete':((day.count||0)>=goal?'Mark goal complete':'Reach goal to complete')}</button></div><small>Manual tracker — Noor never claims that opening a verse means you read it.</small></div>`;
  $('#quranMinus')?.addEventListener('click',()=>{day.count=Math.max(0,(day.count||0)-1);state.quranDaily[k]=day;persist();renderQuranGoal();});
  $('#quranPlus')?.addEventListener('click',()=>{day.count=Math.min(999,(day.count||0)+1);state.quranDaily[k]=day;markEngagement();persist();renderQuranGoal();});
  $('#quranComplete')?.addEventListener('click',()=>{day.completed=!day.completed;state.quranDaily[k]=day;if(day.completed)awardPoints(POINT_VALUES.quranGoal,`quran-goal:${k}`,'Quran reading goal');markEngagement();persist();renderQuranGoal();});
  $('#quranGoalAdjust')?.addEventListener('click',()=>{const v=prompt('Choose a daily Quran goal in ayahs (5, 10, 20, 40).',String(goal));const n=Number(v);if([5,10,20,40].includes(n)){state.quranGoal=n;persist();renderQuranGoal();}});
}
function continueQuran(){
  showView('quran'); if(state.lastRead?.surah){openSurah(state.lastRead.surah,state.lastRead.ayah);}else{toast('No saved reading position yet. Open a surah to begin.');}}

async function updateDailyAyah(){
  const idx=(Math.floor(Date.now()/86400000))%DAILY_AYAHS.length; const [key,refName]=DAILY_AYAHS[idx];
  const cached=cacheRead(`daily-ayah-${key}-${state.quranEdition}`,7*86400000);
  if(cached){ $('#dailyAyahArabic').textContent=cached.arabic; $('#dailyAyahTranslation').textContent=`“${cached.translation}”`; $('#dailyAyahRef').textContent=cached.ref; return; }
  $('#dailyAyahArabic').textContent='Loading Quran verse…'; $('#dailyAyahTranslation').textContent='Loading the exact source text…'; $('#dailyAyahRef').textContent=refName;
  try{
    const r=await fetch(`https://api.alquran.cloud/v1/ayah/${key}/editions/quran-uthmani,${state.quranEdition}`);
    if(!r.ok)throw new Error('Quran source unavailable');
    const d=await r.json(); const a=d.data?.find(x=>x.edition.identifier==='quran-uthmani'); const t=d.data?.find(x=>x.edition.identifier===state.quranEdition);
    const payload={arabic:a?.text||'',translation:t?.text||'',ref:refName};
    if(!payload.arabic)throw new Error('Arabic verse missing');
    cacheWrite(`daily-ayah-${key}-${state.quranEdition}`,payload);
    $('#dailyAyahArabic').textContent=payload.arabic; $('#dailyAyahTranslation').textContent=`“${payload.translation||'Translation unavailable'}”`; $('#dailyAyahRef').textContent=payload.ref;
  }catch{ $('#dailyAyahArabic').textContent='Quran verse unavailable offline.'; $('#dailyAyahTranslation').textContent='Reconnect to load the exact source text.'; $('#dailyAyahRef').textContent=refName; }
}

function renderTracker(){
  const key=isoLocalDate(); const tracked=state.tracker?.[key]||{};
  $('#trackerDate').textContent=state.hijri?`${hijriText(state.hijri)} • ${displayDate()}`:displayDate();
  $('#prayerTracker').innerHTML=MAIN_PRAYERS.map(p=>{const done=tracked[p];return `<button class="track-item ${done?'done':''}" data-track="${p}"><span>${done?'✓':'○'}</span><strong>${p}</strong></button>`;}).join('');
  $$('[data-track]').forEach(b=>b.addEventListener('click',()=>{const p=b.dataset.track;state.tracker[key]=state.tracker[key]||{};const was=!!state.tracker[key][p];state.tracker[key][p]=!was;if(!was){awardPoints(POINT_VALUES.prayer,`prayer:${key}:${p}`,`${p} prayer tracker`);}markEngagement();persist();renderTracker();}));
}
function updateQuickCards(){
  $('#tasbihQuick').textContent=`${state.tasbih} counted`; $('#quranProgressText').textContent=state.lastRead?`Surah ${state.lastRead.surah}, ayah ${state.lastRead.ayah}`:'Start a reading plan';
}

function subscriptionConfigured(){ return !!(window.NOOR_CONFIG?.stripe?.monthlyUrl || window.NOOR_CONFIG?.stripe?.yearlyUrl); }
function premiumActive(){ return state.subscription?.status==='active' || state.subscription?.status==='trial'; }
function openPremium(){
  $('#premiumModal')?.classList.remove('hidden');
  renderPremium();
}
function closePremium(){ $('#premiumModal')?.classList.add('hidden'); }
function renderPremium(){
  const plans=$('#premiumPlans'); if(!plans)return;
  const configured=subscriptionConfigured();
  const status=state.subscription?.status||'free';
  plans.innerHTML=`<div class="premium-status ${premiumActive()?'active':''}"><strong>${premiumActive()?'Noor Plus is active':'Noor Plus'}</strong><span>${premiumActive()?`Plan: ${escapeHtml(state.subscription.plan||'Plus')} • ${status==='trial'?'trial period':'active'}`:'Core features stay free. No ads.'}</span></div><div class="premium-plan-row">${Object.entries(PREMIUM_PLANS).map(([k,p])=>`<article class="premium-plan"><div><span>${k==='yearly'?'BEST VALUE':'FLEXIBLE'}</span><h4>${escapeHtml(p.name)}</h4><strong>${escapeHtml(p.price)}</strong><small>${escapeHtml(p.trial)}</small></div><button class="primary-btn" data-subscribe-plan="${k}">${configured?'Start free trial':'Set up checkout'}</button></article>`).join('')}</div>`;
  $('#premiumFeatureGrid').innerHTML=PREMIUM_FEATURES.map(f=>`<article class="premium-feature"><span>◆</span><div><strong>${escapeHtml(f.title)}</strong><p>${escapeHtml(f.desc)}</p></div></article>`).join('');
  $$('[data-subscribe-plan]').forEach(b=>b.addEventListener('click',()=>{
    const plan=b.dataset.subscribePlan; const url=PREMIUM_PLANS[plan].url();
    if(url){window.open(url,'_blank','noopener,noreferrer'); toast('Opening Noor Plus checkout…');}
    else {toast('Add your public Stripe checkout link in community-config.js before taking payments.');}
  }));
}
function openCommunityView(){ showView('community'); renderCommunity(); }
function communityBackend(){
  const cfg=window.NOOR_CONFIG?.supabase;
  if(!cfg?.url || !cfg?.anonKey || !window.supabase) return null;
  try{
    if(!window.__NOOR_SUPABASE) window.__NOOR_SUPABASE=window.supabase.createClient(cfg.url,cfg.anonKey);
    return window.__NOOR_SUPABASE;
  }catch{return null;}
}
function communityModeText(){ return communityBackend()?'Online community connected':'Local demo mode — connect Supabase to publish across devices'; }
async function ensureCommunityAuth(){
  const client=communityBackend(); if(!client)return null;
  try{
    const {data}=await client.auth.getSession();
    if(data?.session)return client;
    const r=await client.auth.signInAnonymously();
    if(r.error) throw r.error;
    return client;
  }catch{ return null; }
}
function communityRulesHtml(){
  return `<div class="community-rules"><strong>Community rules</strong><ol><li>Be respectful. No harassment, sectarian abuse or personal attacks.</li><li>Do not present an opinion, AI answer or unverified post as a fatwa.</li><li>Quote or link your source when making a religious claim.</li><li>No doxxing, private contact details, fundraising scams, sales or spam.</li><li>No private DMs are offered by Noor in the first community release.</li><li>Report content that breaks the rules. Moderators may remove posts.</li></ol></div>`;
}
function filteredCommunityPosts(topic='All') {
  const local=[...COMMUNITY_SAMPLE_POSTS,...(state.communityPosts||[])];
  return topic==='All'?local:local.filter(x=>x.topic===topic);
}
function renderCommunity(topic='All'){
  const status=$('#communityStatus'); if(status)status.textContent=communityModeText();
  const topics=$('#communityTopics'); if(topics) topics.innerHTML=[['All','Everything'],...COMMUNITY_TOPICS].map(x=>`<button class="topic-chip ${x[0]===topic?'active':''}" data-community-topic="${escapeHtml(x[0])}">${escapeHtml(x[0])}</button>`).join('');
  const select=$('#communityTopicSelect'); if(select && !select.options.length) select.innerHTML=COMMUNITY_TOPICS.map(x=>`<option value="${escapeHtml(x[0])}">${escapeHtml(x[0])}</option>`).join('');
  if($('#communityName')) $('#communityName').value=state.communityName||'';
  const feed=$('#communityFeed'); if(!feed)return;
  const posts=filteredCommunityPosts(topic).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  feed.innerHTML=posts.map(p=>`<article class="community-post"><div class="community-post-head"><div><strong>${escapeHtml(p.title)}</strong><span>${escapeHtml(p.author||'Anonymous')} • ${escapeHtml(p.topic||'General')}</span></div><button class="mini-action" data-report-community="${escapeHtml(p.id)}">Report</button></div><p>${escapeHtml(p.body)}</p><div class="community-post-foot"><small>${new Intl.DateTimeFormat(undefined,{dateStyle:'medium'}).format(new Date(p.created_at||Date.now()))}</small>${p.sample?'<small>Sample welcome post</small>':''}</div></article>`).join('') || '<div class="info-card">No posts in this topic yet. Start the conversation.</div>';
  $$('[data-community-topic]').forEach(b=>b.addEventListener('click',()=>renderCommunity(b.dataset.communityTopic)));
  $$('[data-report-community]').forEach(b=>b.addEventListener('click',()=>reportCommunityPost(b.dataset.reportCommunity)));
}
async function reportCommunityPost(id){
  const client=communityBackend();
  if(!client){toast('Connect the community backend to submit reports.');return;}
  try{ const auth=await ensureCommunityAuth(); if(!auth)throw new Error(); const {error}=await auth.from('community_reports').insert({post_id:id,reason:'user_report'}); if(error)throw error; toast('Report submitted.'); }catch{toast('Report could not be submitted.');}
}
async function submitCommunityPost(){
  const name=($('#communityName')?.value||'').trim().slice(0,30)||'Anonymous';
  const topic=$('#communityTopicSelect')?.value||'General'; const title=($('#communityTitle')?.value||'').trim().slice(0,90); const body=($('#communityBody')?.value||'').trim().slice(0,1200);
  if(!title||!body){toast('Add a title and a message first.');return;}
  const now=Date.now(); state.communityPostTimes=(state.communityPostTimes||[]).filter(t=>now-t<3600000); const max=Number(window.NOOR_CONFIG?.community?.maxPostsPerHour||10); if(state.communityPostTimes.length>=max){toast('Posting limit reached for this hour.');return;}
  state.communityName=name; state.communityPostTimes.push(now);
  const client=communityBackend();
  if(client){
    const auth=await ensureCommunityAuth();
    if(!auth){toast('Community sign-in could not be started.');return;}
    const {data:sessionData}=await auth.auth.getSession(); const userId=sessionData?.session?.user?.id;
    const {error}=await auth.from('community_posts').insert({author_name:name,topic,title,body,author_user_id:userId});
    if(error){toast('The online community is not fully configured yet.');return;}
    $('#communityTitle').value=''; $('#communityBody').value=''; persist(); await loadCommunityFromBackend(); toast('Posted to the Noor community.');
  } else {
    state.communityPosts.push({id:`local-${Date.now()}`,author:name,topic,title,body,created_at:new Date().toISOString(),sample:false}); persist(); $('#communityTitle').value=''; $('#communityBody').value=''; renderCommunity(topic); toast('Saved on this device. Connect the community backend to share with everyone.');
  }
}
async function loadCommunityFromBackend(){
  const client=communityBackend(); if(!client){renderCommunity();return;}
  try{ const {data,error}=await client.from('community_posts').select('id,author_name,topic,title,body,created_at,hidden').eq('hidden',false).order('created_at',{ascending:false}).limit(60); if(error)throw error; state.communityPosts=(data||[]).map(x=>({id:x.id,author:x.author_name,topic:x.topic,title:x.title,body:x.body,created_at:x.created_at})); persist(); renderCommunity(); }catch{renderCommunity();}
}
function initCommunity(){
  $('#communityRulesBtn')?.addEventListener('click',()=>{const el=$('#communityRulesBtn'); toast('See the rules in the community introduction.'); const feed=$('#communityFeed'); feed?.insertAdjacentHTML('afterbegin',communityRulesHtml());});
  $('#communityPostBtn')?.addEventListener('click',submitCommunityPost);
  loadCommunityFromBackend();
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
  if(tool==='moon') panel.innerHTML=`<div><div class="eyebrow">HILAL WATCH</div><h3>Moon Watch</h3><p class="tool-copy">See a country-by-country overview of commonly documented moon-sighting/calculation approaches, then open the current visibility forecast. Noor does not invent a sighting result.</p><div id="moonPanel"></div></div>`;
  if(tool==='journey') panel.innerHTML=`<div><div class="eyebrow">YOUR PROGRESS</div><h3>Noor Journey</h3><p class="tool-copy">Private app points and streaks reward consistency with the app. They are <strong>not</strong> a measure of worship, piety or religious reward.</p><div id="journeyPanel"></div></div>`;
  if(tool==='community'){ openCommunityView(); return; }
  if(tool==='premium'){ openPremium(); return; }
  if(tool==='events') panel.innerHTML=`<div><div class="eyebrow">HIJRI EVENTS</div><h3>Islamic Events</h3><p class="tool-copy">Upcoming dates based on the calculated Hijri calendar. Moon sighting and community practice can shift some dates.</p><div id="eventsPanel"><div class="info-card">Loading upcoming events…</div></div></div>`;
  if(tool==='prophets') panel.innerHTML=`<div><div class="eyebrow">QURAN STORIES</div><h3>Stories of the Prophets</h3><div class="quran-integrity-card"><strong>Source-locked</strong><span>Each story is a summary tied to the displayed Qur'an references. Qur'an wording is never generated or rewritten by Noor.</span></div><div class="story-toolbar"><input id="prophetSearch" placeholder="Search a prophet or story…" autocomplete="off"/></div><div id="prophetsList" class="prophets-list"></div></div>`;
  if(tool==='settings'){openSettings();return;}

  $('#countBtn')?.addEventListener('click',()=>{state.tasbih++;$('#counter').textContent=state.tasbih;markEngagement();if(state.tasbih%99===0)awardPoints(POINT_VALUES.tasbih99,`tasbih99:${todayKey()}:${state.tasbih}`,'99-count dhikr milestone');else if(state.tasbih%33===0)awardPoints(POINT_VALUES.tasbih33,`tasbih33:${todayKey()}:${state.tasbih}`,'33-count dhikr milestone');persist();updateQuickCards();});
  $('#resetCount')?.addEventListener('click',()=>{state.tasbih=0;$('#counter').textContent=0;persist();updateQuickCards();});
  $('#saveCount')?.addEventListener('click',()=>{persist();toast('Tasbih count saved.');});
  $$('.tasbih-preset').forEach(b=>b.addEventListener('click',()=>{state.tasbih=Number(b.dataset.n);$('#counter').textContent=state.tasbih;persist();updateQuickCards();}));
  $$('[data-copy-dua]').forEach(b=>b.addEventListener('click',async()=>{const d=DUAS[Number(b.dataset.copyDua)];try{await navigator.clipboard.writeText(`${d.title}\n${d.arabic}\n${d.english}`);toast('Dua copied.');}catch{toast('Copy is not available in this browser.');}}));
  $('#calcZakat')?.addEventListener('click',()=>{const assets=['zCash','zGold','zSilver','zOther'].reduce((s,id)=>s+Number($('#'+id).value||0),0);const liab=Number($('#zLiab').value||0);const nisab=Number($('#zNisab').value||0);const net=Math.max(0,assets-liab);const due=nisab>0&&net>=nisab?net*0.025:0;$('#zakatResult').textContent=nisab>0?(due?`Estimated zakat: £${due.toFixed(2)} on £${net.toFixed(2)} of net assets.`:`No zakat estimate due because net assets are below the entered nisab.`):`Net zakatable assets: £${net.toFixed(2)}. Enter the nisab threshold you follow to complete the estimate.`;});
  $('#mapsGoogle')?.addEventListener('click',()=>{if(state.lat==null){toast('Enable precise location first.');return;}window.open(`https://www.google.com/maps/search/mosque/@${state.lat},${state.lon},14z`,'_blank','noopener,noreferrer');});
  $('#mapsOsm')?.addEventListener('click',()=>{if(state.lat==null){toast('Enable precise location first.');return;}window.open(`https://www.openstreetmap.org/?mlat=${state.lat}&mlon=${state.lon}#map=14/${state.lat}/${state.lon}`,'_blank','noopener,noreferrer');});
  if(tool==='names') loadNames(); if(tool==='hijri') loadHijriPanel(); if(tool==='ramadan') loadRamadanPanel(); if(tool==='events') loadEventsPanel(); if(tool==='prophets') loadProphetsPanel(); if(tool==='moon') loadMoonWatchPanel(); if(tool==='journey') loadJourneyPanel();
}

function storyUrl(refs=''){
  const m=refs.match(/(\d+)[:.](\d+)(?:[–-](\d+))?/);
  return m?`https://quran.com/${m[1]}/${m[2]}${m[3]?`-${m[3]}`:''}`:'https://quran.com/';
}
function renderProphetStories(query=''){
  const q=query.trim().toLowerCase();
  const list=PROPHET_STORIES.filter(x=>!q || `${x.name} ${x.title} ${x.summary} ${x.lesson}`.toLowerCase().includes(q));
  const el=$('#prophetsList'); if(!el)return;
  const readCount=Object.values(state.storyProgress||{}).filter(Boolean).length;
  const intro=`<div class="story-integrity"><strong>Source-locked mode</strong><span>Story summaries below are paraphrases of the listed Quran passages. Noor does not add invented dialogue, unnamed characters, dates or details as facts. The exact Quran text is only shown in the Quran reader/source.</span><div class="story-progress">${readCount}/${PROPHET_STORIES.length} stories explored</div></div>`;
  el.innerHTML=intro+list.map((x,i)=>{const idx=PROPHET_STORIES.indexOf(x);const done=!!state.storyProgress[idx];return `<article class="prophet-card interactive-story ${done?'read':''}"><div class="prophet-top"><span class="story-num">${i+1}</span><div><strong>${escapeHtml(x.name)}</strong><span>${escapeHtml(x.title)}</span></div><button class="story-toggle mini-action" data-story-read="${idx}">${done?'✓ Read':'Mark read'}</button></div><p>${escapeHtml(x.summary)}</p><div class="prophet-refs"><span>Quran references</span><b>${escapeHtml(x.refs)}</b></div><div class="story-actions"><a class="secondary-btn" href="${storyUrl(x.refs)}" target="_blank" rel="noopener noreferrer">Read source passage ↗</a><button class="secondary-btn" data-story-reflect="${idx}">Reflect</button></div><div class="story-reflection hidden" id="reflect-${idx}"><span>Reflection</span><p>${escapeHtml(x.lesson)}</p><textarea placeholder="Write one private takeaway…" data-reflect-input="${idx}"></textarea><button class="mini-action" data-save-reflect="${idx}">Save reflection</button></div></article>`;}).join('') || '<div class="info-card">No story found. Try another name.</div>';
  $$('[data-story-read]').forEach(b=>b.addEventListener('click',()=>{const idx=b.dataset.storyRead;state.storyProgress[idx]=true;awardPoints(POINT_VALUES.story,`story:${idx}`,'Prophet story explored');markEngagement();persist();renderProphetStories($('#prophetSearch')?.value||'');}));
  $$('[data-story-reflect]').forEach(b=>b.addEventListener('click',()=>{$(`#reflect-${b.dataset.storyReflect}`)?.classList.toggle('hidden');}));
  $$('[data-save-reflect]').forEach(b=>b.addEventListener('click',()=>{const idx=b.dataset.saveReflect;const v=$(`[data-reflect-input="${idx}"]`)?.value?.trim();if(v){localStorage.setItem(`noor-story-reflection-${idx}`,v);awardPoints(POINT_VALUES.storyReflect,`story-reflect:${idx}`, 'Story reflection');toast('Reflection saved privately on this device.');}}));
}
function loadProphetsPanel(){ renderProphetStories(''); $('#prophetSearch')?.addEventListener('input',e=>renderProphetStories(e.target.value)); }

function loadMoonWatchPanel(){
  const el=$('#moonPanel'); if(!el)return;
  const current=state.hijri||null;
  const defaultCountry=state.location?.country||'United Kingdom';
  el.innerHTML=`<div class="moon-watch"><div class="moon-watch-grid"><label>Country<select id="moonCountry">${MOON_COUNTRY_GUIDE.map(x=>`<option value="${escapeHtml(x.country)}" ${x.country===defaultCountry?'selected':''}>${escapeHtml(x.country)}</option>`).join('')}</select></label><div class="moon-current"><span>Current Hijri month</span><strong>${escapeHtml(current?.month?.en||'—')} ${current?.year||''} AH</strong></div></div><div id="moonCountryDetail"></div><div class="moon-report-card"><strong>Local sighting journal</strong><p>Record what you personally observed. This stays on your device; Noor does not present your report as an official announcement.</p><div class="moon-report-row"><button class="mini-action" id="moonSeen">I saw the crescent</button><button class="mini-action" id="moonNotSeen">I did not see it</button></div><div id="moonJournalResult" class="source-note"></div></div></div>`;
  const render=()=>{const c=MOON_COUNTRY_GUIDE.find(x=>x.country===$('#moonCountry').value)||MOON_COUNTRY_GUIDE[0];const monthNum=current?.month?.number||1;const slug={1:'muh',2:'sfr',3:'rba',4:'rbt',5:'jmo',6:'jmt',7:'rjb',8:'shb',9:'rmd',10:'shw',11:'zqd',12:'zhj'}[monthNum]||'rmd';const year=current?.year||1448;const forecast=`https://www.moonsighting.com/${year}${slug}.html`;$('#moonCountryDetail').innerHTML=`<div class="moon-country-card"><div><span>Commonly documented approach</span><strong>${escapeHtml(c.mode)}</strong><p>${escapeHtml(c.note)}</p></div><div class="moon-actions"><a class="secondary-btn" href="${forecast}" target="_blank" rel="noopener noreferrer">Open current visibility forecast ↗</a><span class="muted-small">Forecast source: Moonsighting Committee Worldwide. A forecast is not itself an official sighting.</span></div></div>`;};
  $('#moonCountry').addEventListener('change',render);
  const journalKey=`${isoLocalDate()}:moon:${$('#moonCountry').value}`; $('#moonSeen').addEventListener('click',()=>{localStorage.setItem('noor-moon-journal',JSON.stringify({at:Date.now(),country:$('#moonCountry').value,result:'seen',location:locationLabel()}));$('#moonJournalResult').textContent='Saved privately: crescent seen.';awardPoints(POINT_VALUES.event,`moon:${journalKey}:seen`,'Moon observation log');});$('#moonNotSeen').addEventListener('click',()=>{localStorage.setItem('noor-moon-journal',JSON.stringify({at:Date.now(),country:$('#moonCountry').value,result:'not-seen',location:locationLabel()}));$('#moonJournalResult').textContent='Saved privately: crescent not seen.';awardPoints(POINT_VALUES.event,`moon:${journalKey}:notseen`,'Moon observation log');});
  render();
}

function loadJourneyPanel(){
  const el=$('#journeyPanel'); if(!el)return; const s=journeyStats();
  const badges=[
    [s.prayers>=1,'First prayer tracked','Track your first prayer'],
    [s.prayers>=25,'Salah rhythm','Track 25 prayers'],
    [s.qGoals>=1,'Quran habit','Complete your first reading goal'],
    [s.stories>=5,'Seeker of stories','Explore five Prophet stories'],
    [s.fasts>=3,'Ramadan rhythm','Track three fasts']
  ];
  el.innerHTML=`<div class="journey-hero"><div><span>NOOR POINTS</span><strong>${s.points}</strong></div><div><span>STREAK</span><strong>${s.streak} days</strong></div></div><div class="journey-grid"><div><span>Prayers tracked</span><strong>${s.prayers}</strong></div><div><span>Quran goals</span><strong>${s.qGoals}</strong></div><div><span>Stories explored</span><strong>${s.stories}</strong></div><div><span>Fasts recorded</span><strong>${s.fasts}</strong></div></div><div class="badge-list">${badges.map(b=>`<div class="badge ${b[0]?'earned':''}"><span>${b[0]?'✓':'○'}</span><div><strong>${escapeHtml(b[1])}</strong><small>${escapeHtml(b[2])}</small></div></div>`).join('')}</div><p class="source-note">Noor Points are private engagement points created by the app. They are not religious reward, status, or a judgement of worship.</p>`;
}

async function loadEventsPanel(){
  const el=$('#eventsPanel'); if(!el)return;
  const months=[]; const startDate=new Date();
  for(let i=0;i<14;i++){const d=new Date(startDate.getFullYear(),startDate.getMonth()+i,1);months.push([d.getFullYear(),d.getMonth()+1]);}
  try{
    const results=await Promise.all(months.map(([y,m])=>fetch(prayerUrl(`https://api.aladhan.com/v1/calendar/${y}/${m}`)).then(r=>r.ok?r.json():Promise.reject(r.status))));
    const days=results.flatMap(x=>x.data||[]); const eventRows=[];
    for(const evt of ISLAMIC_EVENTS){const matches=days.filter(x=>Number(x?.date?.hijri?.month?.number)===evt.month && Number(x?.date?.hijri?.day)===evt.day);if(matches.length){const m=matches[0];eventRows.push({...evt,gdate:m.date.gregorian.date,weekday:m.date.gregorian.weekday.en,hy:m.date.hijri.year});}}
    eventRows.sort((a,b)=>{const [da,ma,ya]=a.gdate.split('-').map(Number),[db,mb,yb]=b.gdate.split('-').map(Number);return new Date(ya,ma-1,da)-new Date(yb,mb-1,db);});
    el.innerHTML=`<div class="event-integrity"><strong>Calendar integrity note</strong><span>Fixed lunar dates are shown from the selected calculated Hijri calendar. Dates tied to actual moon sighting can differ by a day; some commemorative dates are community-dependent.</span></div><div class="event-list">${eventRows.slice(0,14).map((e,i)=>{const key=`${e.hy}-${e.month}-${e.day}`;const saved=!!state.eventReminders[key];return `<article class="event-card interactive-event"><div class="event-date"><strong>${escapeHtml(e.gdate)}</strong><span>${escapeHtml(e.weekday)}</span></div><div><strong>${escapeHtml(e.name)}</strong><span class="event-type">${escapeHtml(e.type)}</span><p>${escapeHtml(e.note)}</p><div class="event-actions"><button class="mini-action ${saved?'saved':''}" data-event-remind="${escapeHtml(key)}">${saved?'✓ Saved':'Save event'}</button></div></div></article>`;}).join('')}</div><p class="source-note">Calculated date source: AlAdhan Hijri calendar. Moon-sighting guidance: Moonsighting Committee Worldwide. Noor shows the difference between a calculated date and an official/community announcement rather than choosing one for the user.</p>`;
    $$('[data-event-remind]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.eventRemind;state.eventReminders[key]=!state.eventReminders[key];if(state.eventReminders[key])awardPoints(POINT_VALUES.event,`event:${key}`,'Islamic event saved');persist();loadEventsPanel();}));
  }catch{ el.innerHTML='<div class="info-card">Could not load event dates. Noor needs an internet connection for the calculated calendar.</div>'; }
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
    $$('[data-fast-date]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.fastDate;const next=!state.fasting[k];state.fasting[k]=next;if(next)awardPoints(POINT_VALUES.fast,`fast:${k}`,'Fast recorded');markEngagement();persist();loadRamadanPanel();}));
  }catch{ $('#ramadanPanel').innerHTML='<div class="info-card">Ramadan data could not load.</div>'; }
}

function notificationSupportText(){
  if(!('Notification' in window)) return 'This browser does not support web notifications.';
  if(Notification.permission==='granted') return 'Notifications are enabled on this device.';
  if(Notification.permission==='denied') return 'Notifications are blocked. Allow them in browser/site settings.';
  return 'Enable notifications to receive prayer alerts.';
}
async function requestNotificationPermission(){
  if(!('Notification' in window)){toast('This browser does not support notifications.');return false;}
  try{const p=Notification.permission==='granted'?'granted':await Notification.requestPermission();if(p==='granted'){state.notifications=true;persist();updateNotificationStatus();scheduleReminderLoop();toast('Prayer notifications enabled.');return true;}toast('Notification permission was not granted.');return false;}catch{toast('Could not request notification permission.');return false;}
}
async function serviceWorkerNotification(title,body,tag='noor-prayer'){
  try{const reg=await navigator.serviceWorker?.ready;if(reg?.showNotification){await reg.showNotification(title,{body,tag,icon:'icon.svg',badge:'icon.svg',renotify:true,data:{url:'./#prayer'}});return true;}}catch{}
  try{if('Notification' in window&&Notification.permission==='granted'){new Notification(title,{body,tag});return true;}}catch{}
  return false;
}
function playNotificationTone(){
  try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const ctx=new C();const o=ctx.createOscillator();const g=ctx.createGain();o.type='sine';o.frequency.value=660;g.gain.setValueAtTime(0.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.08,ctx.currentTime+0.03);g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.45);o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+0.5);}catch{}
}
async function testPrayerNotification(){
  if(Notification.permission!=='granted'){const ok=await requestNotificationPermission();if(!ok)return;}
  const ok=await serviceWorkerNotification('Noor notification test','Notifications are working on this device.','noor-test');
  if(state.adhanAudioUrl){try{const a=new Audio(state.adhanAudioUrl);a.volume=0.9;a.play().catch(()=>{});}catch{}} else playNotificationTone();
  if(ok)toast('Test notification sent.');
}
function updateNotificationStatus(){
  const el=$('#notificationStatusText');if(el)el.textContent=notificationSupportText();
  const toggle=$('#notificationsToggle');if(toggle)toggle.checked=!!state.notifications;
  const mode=$('#notificationModeText');if(mode)mode.textContent=appIsInstalled()?'Installed web app • background push requires a push service':'Browser tab • timing is reliable while Noor is open';
  MAIN_PRAYERS.forEach(p=>{const el=$(`#notify-${p}`);if(el)el.checked=state.notificationPrayers?.[p]!==false;});
  const ad=$('#adhanEnabledToggle');if(ad)ad.checked=state.adhanEnabled!==false;
  const auto=$('#autoLocationToggle');if(auto)auto.checked=state.autoLocation!==false;
  const au=$('#adhanAudioUrl');if(au)au.value=state.adhanAudioUrl||DEFAULT_ADHAN_URL;
  const src=$('#adhanSourceNote'); if(src) src.textContent='Default: CC0 public-domain Adhan recording from Wikimedia Commons. You can replace it with your own/licensed file.';
}
function openSettings(){
  $('#settingsModal').classList.remove('hidden');$('#notificationsToggle').checked=!!state.notifications;$('#clockToggle').checked=!!state.use12h;$('#adjustmentInput').value=state.adjustment||0;$('#reminderOffsetInput').value=state.reminderOffset||0;updateNotificationStatus();updateLocationButtons();
}
function closeSettings(){ $('#settingsModal').classList.add('hidden'); }
async function saveSettings(){
  state.notifications=$('#notificationsToggle').checked;state.use12h=$('#clockToggle').checked;state.adjustment=clamp(Number($('#adjustmentInput').value||0),-30,30);state.reminderOffset=clamp(Number($('#reminderOffsetInput').value||0),0,60);state.adhanEnabled=$('#adhanEnabledToggle')?.checked!==false;state.adhanAudioUrl=$('#adhanAudioUrl')?.value.trim()||DEFAULT_ADHAN_URL;
  MAIN_PRAYERS.forEach(p=>{state.notificationPrayers[p]=$(`#notify-${p}`)?.checked!==false;});persist();if(state.notifications)await requestNotificationPermission();closeSettings();
  if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();}else refreshTodayUI();updateNotificationStatus();toast('Settings saved.');
}
function scheduleReminderLoop(){clearInterval(scheduleReminderLoop.t);scheduleReminderLoop.t=setInterval(checkPrayerReminder,5000);checkPrayerReminder();}
function checkPrayerReminder(){
  if(!state.notifications||!state.prayer||!('Notification' in window)||Notification.permission!=='granted')return;
  const now=localParts();const timings=currentPrayerData();if(!timings)return;const keyDate=isoLocalDate();const nowMin=now.hour*60+now.minute+now.second/60;
  for(const p of MAIN_PRAYERS){if(state.notificationPrayers?.[p]===false)continue;const mins=minutesFromTime(timings[p]);if(mins==null)continue;const target=mins-Number(state.reminderOffset||0);if(Math.abs(nowMin-target)<0.08){const kind=state.reminderOffset?`reminder-${state.reminderOffset}`:'adhan';const k=`${keyDate}:${p}:${kind}`;if(state.notified[k])continue;state.notified[k]=true;const body=state.reminderOffset?`${p} is in ${state.reminderOffset} minutes • ${timeText(timings[p])}`:`${p} time • ${timeText(timings[p])}`;serviceWorkerNotification(`${p} prayer`,body,`noor-${p}-${kind}`);if(state.adhanEnabled&&!state.reminderOffset){if(state.adhanAudioUrl){try{const a=new Audio(state.adhanAudioUrl);a.volume=0.9;a.play().catch(()=>{});}catch{}}else playNotificationTone();}}}
  // clear old same-day ledgers after the next day
  const todayPrefix=`${keyDate}:`;for(const k of Object.keys(state.notified)){if(!k.startsWith(todayPrefix))delete state.notified[k];}
}

function bind(){
  restore();
  METHODS.forEach(([id,name])=>{const o=document.createElement('option');o.value=id;o.textContent=name;$('#methodSelect').appendChild(o);});
  $('#methodSelect').value=String(state.method); $('#schoolSelect').value=String(state.school); $('#highLatSelect').value=state.highLat;
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>b.dataset.view==='community'?openCommunityView():showView(b.dataset.view)));
  $$('[data-view-jump]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.viewJump)));
  $$('[data-tool]').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.tool)));
  $('#heroLocationBtn').addEventListener('click',getPreciseLocation); $('#useLocationSide').addEventListener('click',getPreciseLocation); $('#locatePrayerBtn').addEventListener('click',getPreciseLocation); $('#qiblaLocateBtn').addEventListener('click',getPreciseLocation); $('#settingsLocateBtn').addEventListener('click',getPreciseLocation);
  $('#refreshBtn').addEventListener('click',async()=>{if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();calculateQibla();toast('Noor refreshed.');}else getPreciseLocation();});
  $('#settingsBtn').addEventListener('click',openSettings); $('#closeSettings').addEventListener('click',closeSettings); $('#closePremium')?.addEventListener('click',closePremium); $('#saveSettings').addEventListener('click',saveSettings); $('#openSettingsFromPrayer').addEventListener('click',openSettings);
  $('#requestNotificationsBtn')?.addEventListener('click',requestNotificationPermission); $('#testNotificationBtn')?.addEventListener('click',testPrayerNotification);
  $('#testAdhanBtn')?.addEventListener('click',async()=>{ if(!state.adhanAudioUrl) state.adhanAudioUrl=DEFAULT_ADHAN_URL; try{ const a=new Audio(state.adhanAudioUrl); a.volume=0.92; a.preload='auto'; await a.play(); toast('Adhan playback started.'); }catch{ toast('Adhan playback was blocked; tap the button again or check the audio link.'); }});
  $('#resetSettingsBtn')?.addEventListener('click',()=>{ if(confirm('Reset local Noor settings and saved location on this device?')){ localStorage.removeItem('noor-settings'); sessionStorage.removeItem('noor-settings-session'); location.reload(); }});
  initCommunity();
  $('#communityStatus')?.addEventListener('click',loadCommunityFromBackend);
  $('#autoLocationToggle')?.addEventListener('change',e=>{state.autoLocation=e.target.checked;persist();if(state.autoLocation)autoDetectLocation();updateLocationButtons();});
  $('#notificationsToggle')?.addEventListener('change',e=>{state.notifications=e.target.checked;persist();if(e.target.checked)requestNotificationPermission();updateNotificationStatus();});
  $('#applyPrayerSettings').addEventListener('click',async()=>{state.method=Number($('#methodSelect').value);state.school=Number($('#schoolSelect').value);state.highLat=$('#highLatSelect').value;persist();if(state.lat!=null){await loadPrayerTimes();await loadWeekCalendar();}toast('Prayer calculation settings applied.');});
  $('#quranSearch').addEventListener('input',e=>renderSurahs(e.target.value)); $('#quranSearch').addEventListener('keydown',e=>{if(e.key==='Enter')searchQuran();}); $('#editionSelect').addEventListener('change',async()=>{state.quranEdition=$('#editionSelect').value;persist();if(state.openedSurah)await openSurah(state.openedSurah,state.lastRead?.ayah||1);});
  $('#continueQuranBtn').addEventListener('click',continueQuran); $('#bookmarksBtn').addEventListener('click',showBookmarks); $('#quranSearchWebBtn').addEventListener('click',searchQuran); $('#quranSettingsBtn').addEventListener('click',openSettings); $('#quranGoalBtn')?.addEventListener('click',()=>document.querySelector('#quranGoalCard')?.scrollIntoView({behavior:'smooth',block:'center'}));
  $('#calibrateBtn').addEventListener('click',calibrateCompass); bindCompassDrag();
  $('#todayLabel').textContent=displayDate(); updateQuickCards(); updateJourneyQuick(); renderQuranGoal(); renderUnavailable(); startCountdown(); updateNotificationStatus();
  updateLocationButtons();
  if(state.lat!=null){
    renderLocationState('saved on this device');
    loadPrayerTimes().then(()=>loadWeekCalendar()).then(()=>calculateQibla()).then(()=>autoDetectLocation());
  }else{
    autoDetectLocation();
  }
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').then(r=>r.update().catch(()=>{})).catch(()=>{}); }
}

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.deferredInstall=e;$('#installBtn').classList.remove('hidden');});
$('#installBtn')?.addEventListener('click',async()=>{if(!state.deferredInstall)return;state.deferredInstall.prompt();await state.deferredInstall.userChoice;state.deferredInstall=null;$('#installBtn').classList.add('hidden');});
window.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    const t=currentPrayerData(); if(t){updateNextPrayer(t);checkPrayerReminder();}
    autoDetectLocation();
    scheduleReminderLoop();
  }
});
window.addEventListener('focus',()=>{autoDetectLocation();scheduleReminderLoop();});
window.addEventListener('beforeunload',stopAudio);
bind();
