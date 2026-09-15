(() => {
 'use strict';
 const $=s=>document.querySelector(s),ur=document.documentElement.lang==='ur',live=document.body.dataset.live==='true';
 const tr=(en,u)=>ur?u:en;
 // Keep the original ?lang=ur links working, without overriding explicit language URLs.
 const requested=new URLSearchParams(location.search).get('lang');
 if(requested && ['en','ur'].includes(requested) && requested!==document.documentElement.lang){location.replace((requested==='ur'?'ur.html':'index.html')+location.hash);return;}
 document.querySelectorAll('.lang a,.language-switch').forEach(a=>a.addEventListener('click',()=>{a.href=a.getAttribute('href').split('#')[0]+location.hash;}));
 const menu=$('.menu'),nav=$('#navigation');
 const closeMenu=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',tr('Open menu','مینو کھولیں'));};
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?tr('Close menu','مینو بند کریں'):tr('Open menu','مینو کھولیں'));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
 let size=16;try{size=Math.max(16,Math.min(20,Number(localStorage.getItem('clinicTextSize'))||16));}catch{}
 const applySize=()=>{document.documentElement.style.fontSize=size+'px';$('#text-down').disabled=size<=16;$('#text-up').disabled=size>=20;$('#size-status').textContent=Math.round(size/16*100)+'%';try{localStorage.setItem('clinicTextSize',String(size));}catch{}};
 $('#text-up').addEventListener('click',()=>{size=Math.min(20,size+1);applySize();});$('#text-down').addEventListener('click',()=>{size=Math.max(16,size-1);applySize();});applySize();
 function clearRequest(){ $('#request-preview').hidden=true;$('#send-whatsapp').hidden=true;$('#form-status').textContent=''; }
 document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{$('#service').value=a.dataset.service;$('#extra-details').open=true;clearRequest();}));
 document.querySelectorAll('[data-doctor]').forEach(a=>a.addEventListener('click',()=>{$('#doctor').value=a.dataset.doctor;$('#extra-details').open=true;clearRequest();}));
 const date=$('#date'),slot=$('#slot'),form=$('#appointment-form'),status=$('#form-status');
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{$('.mobile-book').hidden=entries[0].isIntersecting;}).observe(form);}
 const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 date.min=today();
 const slotLabels={morning:tr('Morning · 9am–12pm','صبح 9 سے دوپہر 12'),afternoon:tr('Afternoon · 12pm–2pm','دوپہر 12 سے 2'),evening:tr('Evening · 5pm–9pm','شام 5 سے رات 9')};
 function updateSlots(){
   const prior=slot.value;slot.replaceChildren(new Option(tr('Clinic can suggest a time','کلینک مناسب وقت بتا دے'),''));date.setCustomValidity('');
   if(!date.value)return;
   const day=new Date(date.value+'T12:00:00').getDay();
   if(day===0){date.setCustomValidity(tr('The clinic has no routine OPD on Sunday. Please choose another day.','اتوار کو معمول کی او پی ڈی نہیں ہے۔ دوسرا دن منتخب کریں۔'));return;}
   let keys=['morning'];if(day!==5)keys.push('afternoon');if([1,3,6].includes(day))keys.push('evening');
   keys.forEach(k=>slot.add(new Option(slotLabels[k],k)));if(keys.includes(prior))slot.value=prior;
 }
 const fieldError=(id,message)=>{const input=$('#'+id),error=$('#'+id+'-error');input.setAttribute('aria-invalid',String(Boolean(message)));if(error){error.textContent=message;error.hidden=!message;}};
 date.addEventListener('change',()=>{updateSlots();fieldError('date',date.validationMessage);});
 const normalizedPhone=value=>value.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[\s()-]/g,'');
 form.addEventListener('input',()=>{$('#request-preview').hidden=true;$('#send-whatsapp').hidden=true;status.textContent='';});
 form.addEventListener('submit',e=>{
   e.preventDefault();date.min=today();updateSlots();
   const patient=$('#patient');patient.setCustomValidity(patient.value.trim()? '':tr('Please enter a name.','براہ کرم نام لکھیں۔'));
   const phone=$('#phone');phone.value=normalizedPhone(phone.value);
   const errors={patient:patient.value.trim()?'':tr('Please enter the patient’s name.','براہ کرم مریض کا نام لکھیں۔'),phone:/^(?:0|\+?92)3[0-9]{9}$/.test(phone.value)?'':tr('Enter a valid mobile number, for example 0300 1234567.','درست موبائل نمبر لکھیں، مثلاً 0300 1234567۔'),date:date.validity.valid?'':tr('Choose a future clinic day. Routine appointments are not available on Sunday.','آنے والا دن منتخب کریں۔ اتوار کو معمول کا معائنہ نہیں ہوتا۔')};
   Object.entries(errors).forEach(([id,error])=>fieldError(id,error));
   const first=Object.keys(errors).find(id=>errors[id]);
   $('#form-error').hidden=!first;$('#form-error').textContent=first?tr('Please check the highlighted details.','براہ کرم نشان زدہ معلومات درست کریں۔'):'';
   if(first){$('#'+first).focus();return;}
   if(!$('#age').validity.valid){$('#extra-details').open=true;$('#age').reportValidity();return;}
   const d=new FormData(form),selected=id=>{const el=$(id);return el.options[el.selectedIndex]?.text||'';};
   const message=[tr('Appointment request — Ismail Eye & General Clinic','اپائنٹمنٹ کی درخواست — اسماعیل آئی اینڈ جنرل کلینک'),`${tr('Name','نام')}: ${d.get('patient').trim()}`,`${tr('Phone','فون')}: ${d.get('phone')}`,`${tr('Doctor','ڈاکٹر')}: ${selected('#doctor')}`,`${tr('Service','خدمت')}: ${selected('#service')}`,`${tr('Date','تاریخ')}: ${d.get('date')||tr('Please suggest a day','براہ کرم مناسب دن بتائیں')}`,`${tr('Time','وقت')}: ${selected('#slot')}`,...(d.get('age')?[`${tr('Age','عمر')}: ${d.get('age')}`]:[]),...(d.get('city')?[`${tr('City','شہر')}: ${d.get('city')}`]:[]),...(d.get('problem')?[`${tr('Concern','مسئلہ')}: ${d.get('problem')}`]:[])].join('\n');
   $('#request-preview').textContent=message;$('#request-preview').hidden=false;
   status.textContent=live?tr('Your message is ready. Choose “Send on WhatsApp”, then send it in WhatsApp. Nothing has been sent yet.','پیغام تیار ہے۔ واٹس ایپ پر بھیجیں منتخب کریں، پھر واٹس ایپ میں پیغام ارسال کریں۔ ابھی کچھ نہیں بھیجا گیا۔'):tr('Demo request prepared. No information has been sent or saved, and no appointment has been booked.','ڈیمو درخواست تیار ہے۔ معلومات کہیں نہیں بھیجی یا محفوظ کی گئیں اور کوئی اپائنٹمنٹ بک نہیں ہوئی۔');
   if(live){const a=$('#send-whatsapp');a.href='https://wa.me/'+document.body.dataset.wa+'?text='+encodeURIComponent(message);a.hidden=false;window.location.assign(a.href);}
 });
 $('#patient').addEventListener('input',()=>{$('#patient').setCustomValidity('');fieldError('patient','');});
 $('#phone').addEventListener('input',()=>fieldError('phone',''));
})();
