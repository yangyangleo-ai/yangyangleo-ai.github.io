'use strict';
const films={
  brand:{title:'C3plus / C³ HUB+ 企业宣传片',category:'BRAND FILM / 03:41',file:'brand',portrait:false,description:'企业品牌宣传作品。结合 AI 画面、品牌信息、字幕与后期包装组织内容；视频保留原片品牌与字幕。'},
  cyber:{title:'赛博都市的唯一出口',category:'AI NARRATIVE / 00:29',file:'cyber',portrait:true,description:'C3plus AI 创意短片。以角色、赛博环境和镜头衔接组织叙事，通过分镜、参考素材与后期完成视觉呈现。'},
  darknet:{title:'连接至暗网深处',category:'AI NARRATIVE / 00:35',file:'darknet',portrait:true,description:'C3plus AI 创意短片。围绕人物对话、角色与环境一致性展开，通过复杂动作拆镜、声音和品牌落版调整成片。'},
  moon:{title:'C3plus 中秋祝福',category:'EMOTIONAL BRAND SHORT / 00:34',file:'moon',portrait:true,description:'节日品牌内容，以生活场景、人物情绪和月夜氛围组织画面，让 AI 视觉服务于情绪表达与品牌信息。'},
  tutorial:{title:'C3plus AI 品牌创建教程',category:'PRODUCT EXPLAINER / 01:19',file:'tutorial',portrait:true,description:'既有 AI 品牌创建教程，结合讲解、界面演示、字幕与后期包装说明操作流程。画面中的产品功能与文字保留原片内容。'},
  leo:{title:'@羊羊Leo · 立体文字动态背景',category:'PERSONAL IP / 工程化动态视觉 / 00:12',file:'leo',portrait:false,description:'个人 IP 的立体文字背景样例，展示逐行反向滚动与柔焦处理。结合 OpenFilm 与 FFmpeg 沉淀可复用模板。'},
  jarvis:{title:'Jarvis · 品牌宣传片',category:'INTERNATIONAL PROJECT / 06:36',file:'jarvis',portrait:false,description:'境外品牌合作项目。品牌方提出制作需求，由杨宗霖负责创意构思及整片制作落地。围绕品牌信息与应用场景展开，结合动态视觉、图形动画和剪辑包装完成整片交付。'},
  nebura:{title:'Nebura · 品牌宣传片',category:'INTERNATIONAL PROJECT / 02:58',file:'nebura',portrait:false,description:'境外品牌合作项目。品牌方提出制作需求，由杨宗霖负责创意构思及整片制作落地。将品牌理念与技术概念转为影像叙事，串联场景、图形与声音。'},
  'one-cubic':{title:'One Cubic · 品牌影像',category:'INTERNATIONAL PROJECT / 00:55',file:'one-cubic',portrait:false,description:'境外品牌合作项目。品牌方提出制作需求，由杨宗霖负责创意构思及整片制作落地。以品牌标识、三维视觉与节奏化剪辑建立科技感。'}
};
const dialog=document.querySelector('#film-dialog');
const player=document.querySelector('#film-player');
const ambient=document.querySelector('#hero-video');
const ambientToggle=document.querySelector('#ambient-toggle');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let returnFocus=null,ambientWanted=!reduceMotion.matches,ambientVisible=true;

function syncAmbientLabel(){
  const playing=!ambient.paused;
  ambientToggle.setAttribute('aria-pressed',String(playing));
  ambientToggle.innerHTML=playing?'暂停动态预览 <span aria-hidden="true">Ⅱ</span>':'播放动态预览 <span aria-hidden="true">▷</span>';
}
async function syncAmbient(){
  if(ambientWanted&&ambientVisible&&!document.hidden&&!dialog.open){
    try{await ambient.play()}catch{}
  }else{ambient.pause()}
  syncAmbientLabel();
}
ambient.addEventListener('play',syncAmbientLabel);
ambient.addEventListener('pause',syncAmbientLabel);
ambientToggle.addEventListener('click',()=>{ambientWanted=ambient.paused;syncAmbient()});
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{ambientVisible=entries[0].isIntersecting;syncAmbient()},{threshold:.12}).observe(ambient)}
document.addEventListener('visibilitychange',syncAmbient);
reduceMotion.addEventListener('change',()=>{ambientWanted=!reduceMotion.matches;syncAmbient()});

function openFilm(key,trigger){
  const film=films[key];if(!film)return;
  returnFocus=trigger;
  document.querySelector('#film-title').textContent=film.title;
  document.querySelector('#film-category').textContent=film.category;
  document.querySelector('#film-description').textContent=film.description;
  document.querySelector('#film-error').hidden=true;
  document.querySelector('#film-download').href=`assets/video/${film.file}.mp4`;
  player.className=film.portrait?'portrait-film':'landscape-film';
  player.poster=`assets/images/${film.file}.jpg`;
  player.src=`assets/video/${film.file}.mp4`;
  dialog.showModal();document.body.classList.add('modal-open');ambient.pause();
  player.play().catch(()=>{});
}
document.querySelectorAll('[data-film]').forEach(button=>button.addEventListener('click',()=>openFilm(button.dataset.film,button)));
document.querySelector('#close-film').addEventListener('click',()=>dialog.close());
dialog.addEventListener('cancel',()=>player.pause());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.classList.remove('modal-open');if(returnFocus)returnFocus.focus({preventScroll:true});syncAmbient()});
player.addEventListener('error',()=>{if(dialog.open)document.querySelector('#film-error').hidden=false});

const approaches={
  brand:{image:'brand',alt:'品牌影像中的未来城市画面',label:'BRAND / CLARITY FIRST',kicker:'把信息组织清楚，也把画面做好。',heading:['先建立表达结构，','再选择生成路径。'],description:'先梳理品牌信息、产品功能和使用场景，再把 AI 画面与讲解、界面演示结合。根据预算和周期测试关键镜头，让视觉效果与信息传达相互配合。',route:['目标与脚本','关键镜头测试','生成与后期整合']},
  story:{image:'cyber-screens',alt:'AI 叙事短片中的赛博屏幕与控制台',label:'STORY / SHOT BY SHOT',kicker:'让角色、场景与情绪连得起来。',heading:['先拆清镜头，','再解决生成难点。'],description:'从角色、动作、场景、运镜与衔接拆解目标画面，判断参考驱动、分段生成或后期合成的组合方式。先验证难镜头，再统一声音、光影与叙事节奏。',route:['角色与分镜','参考与分段生成','剪辑与声音']},
  ip:{image:'leo-brand',alt:'羊羊Leo个人内容IP的图解、本人出镜和动态背景',label:'PIPELINES / REPEATABLE SYSTEMS',kicker:'把一次性的好作品，沉淀为可复用的工程管线。',heading:['一边实战交付，','一边沉淀模板与工作流。'],description:'结合 OpenFilm、Three.js 3D 运镜、FFmpeg 与跨 AI 记忆规范，把重复性剪辑、双语字幕、分轨混音与日更切片做成标准化工作流，持续放大产能。',route:['模板化架构','多 AI 协同产线','质检与复用沉淀']}
};
const tabs=Array.from(document.querySelectorAll('[data-approach]'));
function setApproach(key,focus=false){
  const info=approaches[key];
  tabs.forEach(tab=>{const selected=tab.dataset.approach===key;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected&&focus)tab.focus()});
  document.querySelector('#approach-panel').setAttribute('aria-labelledby',`tab-${key}`);
  const picture=document.querySelector('#approach-picture');picture.src=`assets/images/${info.image}.jpg`;picture.alt=info.alt;
  document.querySelector('#approach-image-label').textContent=info.label;
  document.querySelector('#approach-kicker').textContent=info.kicker;
  const title=document.querySelector('#approach-subtitle');title.replaceChildren(document.createTextNode(info.heading[0]),document.createElement('br'),document.createTextNode(info.heading[1]));
  document.querySelector('#approach-description').textContent=info.description;
  const route=document.querySelector('#approach-route');route.replaceChildren();info.route.forEach((label,index)=>{if(index){const arrow=document.createElement('i');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');route.append(arrow)}const span=document.createElement('span');span.textContent=label;route.append(span)});
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>setApproach(tab.dataset.approach));
  tab.addEventListener('keydown',event=>{let next=null;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==null){event.preventDefault();setApproach(tabs[next].dataset.approach,true)}});
});
document.querySelector('#copy-email').addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  const email='solissky0@gmail.com';
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(email)}else{const input=document.createElement('textarea');input.value=email;input.style.position='fixed';input.style.top='-1000px';document.body.append(input);input.select();document.execCommand('copy');input.remove()}status.textContent='邮箱已复制：'+email}catch{status.textContent='请复制邮箱：'+email}
});
syncAmbient();

const galleryCases={"ecommerce":{"title":"帕拉梅拉 · 产品电商详情页","category":"ECOMMERCE / PRODUCT DETAIL","description":"围绕产品信息与视觉层级组织的电商详情页设计。以下展示原有页面分屏，保留原设计文案。","images":Array.from({length:11},(_,i)=>`assets/images/portfolio/ecommerce-${String(i+1).padStart(2,'0')}.jpg`)},"beauty":{"title":"妍丽 · 美妆品牌户外广告合作","category":"BEAUTY / BRAND CAMPAIGN","description":"美妆品牌户外广告合作作品，以人物、妆容与红色视觉为核心。","images":Array.from({length:6},(_,i)=>`assets/images/portfolio/beauty-${String(i+1).padStart(2,'0')}.jpg`)},"tea":{"title":"眉角尖 · 茶饮品牌海报","category":"TEA BRAND / CAMPAIGN VISUAL","description":"茶饮品牌海报视觉作品，结合人物、饮品与色彩组织品牌画面。","images":Array.from({length:5},(_,i)=>`assets/images/portfolio/tea-${String(i+1).padStart(2,'0')}.jpg`)},"events":{"title":"VPHOTO · 活动摄影","category":"PHOTOGRAPHY / LIVE EVENTS","description":"品牌发布会与企业活动摄影作品，涵盖现场、人物互动和关键仪式。","images":Array.from({length:5},(_,i)=>`assets/images/portfolio/events-${String(i+1).padStart(2,'0')}.jpg`)},"drama":{"title":"西游宇宙 · 破妄","category":"AI SHORT DRAMA / IN DEVELOPMENT","description":"AI 短剧项目正在筹备中。此处展示项目概念海报与视觉探索，不代表已有完成的剧集。","images":["assets/images/portfolio/drama-01.jpg"]}};
const photoDialog=document.querySelector('#gallery-dialog'),photoStage=document.querySelector('#gallery-stage'),photoImage=document.querySelector('#gallery-image');let currentGallery=null,photoIndex=0,photoFocus=null;
function showPhoto(index){const info=galleryCases[currentGallery];photoIndex=(index+info.images.length)%info.images.length;photoImage.src=info.images[photoIndex];photoImage.alt=info.title+'，第 '+(photoIndex+1)+' 张';document.querySelector('#gallery-count').textContent=(photoIndex+1)+' / '+info.images.length;photoStage.scrollTop=0;}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{currentGallery=button.dataset.gallery;photoFocus=button;const info=galleryCases[currentGallery];document.querySelector('#gallery-title').textContent=info.title;document.querySelector('#gallery-category').textContent=info.category;document.querySelector('#gallery-description').textContent=info.description;photoStage.classList.remove('zoomed');document.querySelector('#gallery-zoom').setAttribute('aria-pressed','false');document.querySelector('#gallery-zoom').textContent='放大查看';showPhoto(0);photoDialog.showModal();document.body.classList.add('modal-open');ambient.pause();}));
document.querySelector('#close-gallery').addEventListener('click',()=>photoDialog.close());photoDialog.addEventListener('close',()=>{photoImage.removeAttribute('src');document.body.classList.remove('modal-open');if(photoFocus)photoFocus.focus({preventScroll:true});syncAmbient()});
document.querySelector('#gallery-prev').addEventListener('click',()=>showPhoto(photoIndex-1));document.querySelector('#gallery-next').addEventListener('click',()=>showPhoto(photoIndex+1));
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(photoIndex-1)}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(photoIndex+1)}});
document.querySelector('#gallery-zoom').addEventListener('click',event=>{const active=photoStage.classList.toggle('zoomed');event.currentTarget.setAttribute('aria-pressed',String(active));event.currentTarget.textContent=active?'适应屏幕':'放大查看'});
