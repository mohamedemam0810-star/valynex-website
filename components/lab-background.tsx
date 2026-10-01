'use client';
import Image from 'next/image';
import {useState} from 'react';
import {Pause, Play} from 'lucide-react';

export default function LabBackground(){
  const [paused,setPaused]=useState(false);
  return <div className={`lab-background${paused?' is-paused':''}`}>
    <div className="lab-background-scenes" aria-hidden="true">
      {['laboratory-team','laboratory-equipment','laboratory-supplies'].map((scene,index)=><div className={`lab-background-scene scene-${index+1}`} key={scene}><Image src={`/images/${scene}.webp`} alt="" fill sizes="100vw" priority={index===0}/></div>)}
      <div className="lab-background-shade"/>
      <div className="lab-background-glow"/>
    </div>
    <button type="button" className="background-toggle" aria-label={paused?'تشغيل حركة الخلفية':'إيقاف حركة الخلفية'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'تشغيل الحركة':'إيقاف الحركة'}</span></button>
  </div>;
}
