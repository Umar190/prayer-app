import { LocalNotifications } from '@capacitor/local-notifications';

export type NativePrayer = {
  id: number;
  prayerName: string;
  at: Date;
  body: string;
  sound?: string;
};

export async function requestNativePrayerNotificationPermission(){
  const current=await LocalNotifications.checkPermissions();
  if(current.display!=='granted') return (await LocalNotifications.requestPermissions()).display==='granted';
  return true;
}

export async function scheduleNativePrayer(prayer:NativePrayer){
  return LocalNotifications.schedule({notifications:[{
    id:prayer.id,
    title:`${prayer.prayerName} prayer`,
    body:prayer.body,
    schedule:{at:prayer.at,allowWhileIdle:true},
    sound:prayer.sound,
    extra:{prayer:prayer.prayerName}
  }]});
}

export async function scheduleNativePrayerWeek(prayers:NativePrayer[]){
  return LocalNotifications.schedule({notifications:prayers.map(prayer=>({
    id:prayer.id,
    title:`${prayer.prayerName} prayer`,
    body:prayer.body,
    schedule:{at:prayer.at,allowWhileIdle:true},
    sound:prayer.sound,
    extra:{prayer:prayer.prayerName}
  }))});
}

export async function cancelNativePrayerNotifications(ids?:number[]){
  if(ids?.length) return LocalNotifications.cancel({notifications:ids.map(id=>({id}))});
  const pending=await LocalNotifications.getPending();
  return LocalNotifications.cancel({notifications:(pending.notifications||[]).map(n=>({id:n.id}))});
}
