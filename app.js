(function(){
'use strict';
var state = null;

/* ---------- icons & colors ---------- */
var I = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
  scale:'<path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0z"/><path d="M19 7l-3 7a3.5 3.5 0 0 0 6 0z"/><path d="M8 21h8"/>',
  book:'<path d="M2 5h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  flag:'<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  medal:'<circle cx="12" cy="15" r="5"/><path d="M8.5 11 6 3h4l2 5 2-5h4l-2.5 8"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  tablet:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M10 18.5h4"/>',
  star:'<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z"/>',
  pen:'<path d="M4 4h12l4 4v12H4z"/><path d="M8 10h8M8 14h8M8 18h5"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>',
  music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.9 0-.6-.3-1-.6-1.4-.3-.4-.6-.8-.6-1.4 0-1 .9-1.8 2-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  calc:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8v3H8z"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  megaphone:'<path d="M3 10v4h4l9 5V5L7 10z"/><path d="M19 9a4 4 0 0 1 0 6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6 6 0 0 1 3.5 6"/>',
  cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  lock:'<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  pencil:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  file:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  up:'<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  down:'<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>',
  undo:'<path d="M4 9h11a5 5 0 0 1 0 10H9"/><path d="M8 5 4 9l4 4"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  download:'<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
  external:'<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin:'<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z"/>',
  arrow:'<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-9 8"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'
};
var ICON_CHOICES=['scale','book','flag','medal','heart','tablet','star','pen','globe','music','palette','calc','camera','megaphone','users','cap','sun','image'];
var PALETTE=['lav','mint','peach','pink','sky','butter'];
var COLOR_NAMES={lav:'Лавандовий',mint:'М’ятний',peach:'Персиковий',pink:'Рожевий',sky:'Блакитний',butter:'Жовтий'};
function ic(n,s){ s=s||20; return '<svg class="ic" viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(I[n]||I.book)+'</svg>'; }
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function paras(t){ return String(t||'').split(/\n\s*\n/).filter(function(p){return p.trim();}).map(function(p){ return '<p>'+esc(p.trim()).replace(/\n/g,'<br>')+'</p>'; }).join(''); }
function uid(){ return Math.random().toString(36).slice(2,9); }
function fmtDate(d,opt){ if(!d) return ''; try{ var x=new Date(d+'T12:00:00'); if(isNaN(x)) return ''; return x.toLocaleDateString('uk-UA',opt||{day:'numeric',month:'short',year:'numeric'}); }catch(e){ return d; } }
function plural(n,a,b,c){ var m10=n%10,m100=n%100; if(m10===1&&m100!==11) return a; if(m10>=2&&m10<=4&&(m100<10||m100>=20)) return b; return c; }
function fsize(b){ if(!b) return ''; if(b<1024*1024) return Math.max(1,Math.round(b/1024))+' КБ'; if(b>=1024*1024*1024) return (b/1024/1024/1024).toFixed(1).replace('.',',')+' ГБ'; return (b/1024/1024).toFixed(1).replace('.',',')+' МБ'; }
function fileUrl(f){ return f && f.path ? assetUrl(f.path) : ''; }
var MIME={pdf:'application/pdf',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',ppt:'application/vnd.ms-powerpoint',pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',pps:'application/vnd.ms-powerpoint',ppsx:'application/vnd.openxmlformats-officedocument.presentationml.slideshow',xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',odt:'application/vnd.oasis.opendocument.text',odp:'application/vnd.oasis.opendocument.presentation',rtf:'application/rtf',txt:'text/plain',mp3:'audio/mpeg',mp4:'video/mp4',zip:'application/zip',rar:'application/vnd.rar','7z':'application/x-7z-compressed',djvu:'image/vnd.djvu',epub:'application/epub+zip'};
function extOf(n){ var m=/\.([a-z0-9]{1,6})$/i.exec(String(n||'').trim()); return m?m[1].toLowerCase():''; }
function fileKind(f){ if(!f) return ''; var t=f.type||'', e=extOf(f.name);
  if(t.indexOf('pdf')>=0||e==='pdf') return 'PDF'; if(t.indexOf('image/')===0&&t!=='image/vnd.djvu') return 'Зображення';
  if(/^(doc|docx|odt|rtf)$/.test(e)) return 'Word'; if(/^(ppt|pptx|pps|ppsx|odp)$/.test(e)) return 'PowerPoint'; if(/^(xls|xlsx|ods)$/.test(e)) return 'Excel';
  if(t.indexOf('video/')===0) return 'Відео'; if(t.indexOf('audio/')===0) return 'Аудіо'; if(/^(zip|rar|7z)$/.test(e)) return 'Архів';
  return e?e.toUpperCase():'Файл'; }
function safeUrl(u){ u=String(u||'').trim(); return /^https?:\/\//i.test(u) ? u : ''; }
function clone(o){ return JSON.parse(JSON.stringify(o)); }

/* ---------- data migration: everything lives in state ---------- */
var DEFAULT_TABS=[
  {key:'normy', label:'Нормативна база', short:'Закони, стандарти та накази МОН для початкової школи', color:'lav', icon:'scale', tagLabel:'Тип документа'},
  {key:'uroky', label:'Матеріали до уроків', short:'Презентації, картки, робочі аркуші та ігри', color:'mint', icon:'book', tagLabel:'Предмет'},
  {key:'konkursy', label:'Конкурси та проєкти', short:'Участь учнів у конкурсах, олімпіадах і проєктах', color:'peach', icon:'flag', tagLabel:'Рівень'},
  {key:'dosyagnennya', label:'Мої досягнення', short:'Сертифікати, курси, подяки й нагороди', color:'butter', icon:'medal', tagLabel:'Категорія'},
  {key:'batkam', label:'Батьківський куточок', short:'Поради, пам’ятки та оголошення для батьків', color:'pink', icon:'heart', tagLabel:'Тема'},
  {key:'pidruchnyky', label:'Електронні підручники', short:'Підручники НУШ онлайн для кожного класу', color:'sky', icon:'tablet', tagLabel:'Клас'}
];
var DEFAULT_SITE={ brand:'Особистий блог', brandSub:'вчителя початкових класів', homeLabel:'Головна', aboutTitle:'Про мене', tilesTitle:'Розділи сайту', postsTitle:'Записи блогу',
  annTitle:'Оголошення', recentTitle:'Нещодавно додано', contactsTitle:'Контакти', cta1Label:'Матеріали до уроків', cta1Go:'uroky', cta2Label:'Батьківський куточок', cta2Go:'batkam', footerNote:'', rail:{profile:true,ann:true,recent:true,contacts:true} };
function migrate(s){
  s.sections=s.sections||{};
  if(!Array.isArray(s.tabs)) s.tabs=DEFAULT_TABS.filter(function(t){ return s.sections[t.key]; }).map(function(t){ return clone(t); });
  s.tabs.forEach(function(t){ if(!s.sections[t.key]) s.sections[t.key]={intro:'',items:[]}; if(!s.sections[t.key].items) s.sections[t.key].items=[]; });
  var site=s.site||{}; Object.keys(DEFAULT_SITE).forEach(function(k){ if(site[k]===undefined) site[k]=clone(DEFAULT_SITE[k]); }); s.site=site;
  ['profile','ann','recent','contacts'].forEach(function(k){ if(site.rail[k]===undefined) site.rail[k]=true; });
  var p=s.profile=s.profile||{};
  if(!Array.isArray(p.facts)) p.facts=[['Освіта',p.education],['Категорія',p.category],['Стаж',p.experience],['Школа',p.school]].filter(function(f){return f[1];}).map(function(f){ return {label:f[0],value:f[1]}; });
  if(p.stickerLabel===undefined){ p.stickerLabel=p.experience?'Педагогічний стаж':''; p.stickerValue=p.experience||''; }
  s.posts=s.posts||[]; s.announcements=s.announcements||[]; s.contacts=s.contacts||{};
  return s;
}
function tabs(){ return state.tabs; }
function T(key){ for(var i=0;i<state.tabs.length;i++) if(state.tabs[i].key===key) return state.tabs[i]; return null; }
function validTab(k){ return k==='home' || !!T(k); }

/* ---------- UI state ---------- */
var canEdit=false, editMode=false, tab='home', filters={};
var UI_KEY='pp-ui';
function uiLoad(){ try{ return JSON.parse(sessionStorage.getItem(UI_KEY)||'null'); }catch(e){ return null; } }
function uiSave(){ try{ sessionStorage.setItem(UI_KEY, JSON.stringify({tab:tab, edit:editMode, y:window.scrollY})); }catch(e){} }
var saved = uiLoad();
var hash = (location.hash||'').replace('#','');

var wantEdit = !!(saved && saved.edit);

/* ---------- helpers ---------- */
function tagsOf(key){ var seen=[]; (state.sections[key].items||[]).forEach(function(it){ var t=it.tag||'Інше'; if(seen.indexOf(t)<0) seen.push(t); }); return seen; }
function tagColor(key,tag){ var i=tagsOf(key).indexOf(tag); var off=state.tabs.findIndex(function(t){return t.key===key;}); return PALETTE[((i<0?0:i)+Math.max(0,off))%PALETTE.length]; }
function allItems(){ var out=[]; state.tabs.forEach(function(t){ (state.sections[t.key].items||[]).forEach(function(it){ out.push({sec:t.key,item:it}); }); }); return out; }
function photoHtml(){ var p=state.profile; return p.photo ? '<img src="'+esc(assetUrl(p.photo))+'" alt="'+esc(p.name)+'">' : '<div class="blank">'+ic('user',40)+'</div>'; }
function eb(action,attrs,label,cls){ return editMode ? '<button class="pill sm'+(cls?' '+cls:'')+'" data-action="'+action+'" '+(attrs||'')+'>'+ic(action.indexOf('add')===0||action==='new-tab'?'plus':(action.indexOf('del')===0?'trash':'pencil'),15)+esc(label||'Редагувати')+'</button>' : ''; }
function eIcon(action,attrs,label){ return editMode ? '<button class="icon-btn" data-action="'+action+'" '+(attrs||'')+' aria-label="'+esc(label)+'" title="'+esc(label)+'">'+ic('pencil',15)+'</button>' : ''; }
var LOGO='<svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true"><path d="M24 5v7" stroke="#FFF7EC" stroke-width="1.8" stroke-linecap="round"/><path d="M24.6 5.2l6.6 2-6.6 2.2z" fill="#7FD3A9"/><path d="M5 23 24 11.5 43 23z" fill="#F2877A"/><rect x="9" y="23" width="30" height="16" fill="#FFF7EC"/><circle cx="24" cy="18.5" r="3.2" fill="#FFF7EC"/><path d="M24 16.8v1.9l1.3.9" stroke="#24212B" stroke-width="1.1" fill="none" stroke-linecap="round"/><rect x="12.5" y="26.5" width="5.5" height="5" rx="1.2" fill="#8CC6EE"/><rect x="30" y="26.5" width="5.5" height="5" rx="1.2" fill="#8CC6EE"/><path d="M20.8 39v-6.2a3.2 3.2 0 0 1 6.4 0V39z" fill="#A99CF2"/><rect x="6" y="38.5" width="36" height="2.6" rx="1.3" fill="#7FD3A9"/></svg>';

/* ---------- rendering ---------- */
function render(){
  if(!validTab(tab)) tab='home';
  var site=state.site, p=state.profile;
  var navItems=[{key:'home',label:site.homeLabel||'Головна',icon:'home'}].concat(state.tabs);
  var nav = navItems.map(function(n){ return '<button data-go="'+esc(n.key)+'"'+(tab===n.key?' aria-current="page"':'')+'><span class="dot">'+ic(n.icon,18)+'</span>'+esc(n.label)+'</button>'; }).join('');
  var foot='';
  if(!canEdit) foot='<button class="ghost-btn" data-action="login">'+ic('lock',16)+'Вхід для вчителя</button>';
  if(canEdit && !editMode) foot='<button class="ghost-btn solid" data-action="enter-edit">'+ic('pencil',16)+'Редагувати сайт</button><button class="ghost-btn" data-action="logout">'+ic('x',16)+'Вийти</button>';
  if(canEdit && editMode) foot='<button class="ghost-btn solid" data-action="site-settings">'+ic('gear',16)+'Налаштування сайту</button><button class="ghost-btn solid" data-action="tabs-manager">'+ic('list',16)+'Вкладки</button><button class="ghost-btn" data-action="exit-edit">'+ic('x',16)+'Вийти з редагування</button>';
  var rail=railHtml();
  var html = '<div class="frame"><div class="shell'+(rail?'':' norail')+'">'+
    '<aside class="side"><button class="brand'+(site.logo?' has-logo':'')+'" data-go="home" aria-label="'+esc(site.brand)+', на головну">'+(site.logo?'<span class="mark custom"><img src="'+esc(assetUrl(site.logo))+'" alt=""></span>':'<span class="mark">'+LOGO+'</span>')+'<span><span class="brand-name">'+esc(site.brand)+'</span>'+(site.brandSub?'<span class="brand-sub" style="display:block">'+esc(site.brandSub)+'</span>':'')+'</span></button>'+
    '<nav class="nav" aria-label="Розділи">'+nav+(editMode?'<button data-action="new-tab" class="nav-add"><span class="dot">'+ic('plus',18)+'</span>Нова вкладка</button>':'')+'</nav><div class="side-foot">'+foot+'</div></aside>'+
    '<main class="main" id="main">'+(editMode?'<div class="editbar"><span>Режим редагування. Усе, що має олівець, можна змінити або видалити. Збережені зміни з’являються для відвідувачів приблизно за 1–2 хвилини.</span><button data-action="exit-edit">Готово</button></div>':'')+
    (tab==='home'?homeHtml():sectionHtml(tab))+'</main>'+
    (rail?'<aside class="rail" aria-label="Додатково">'+rail+'</aside>':'')+
    '</div><footer class="foot"><span>© '+new Date().getFullYear()+' '+esc(site.brand)+(p.name?' · '+esc(p.name):'')+(site.footerNote?' · '+esc(site.footerNote):'')+'</span><span>'+esc([p.school,p.city].filter(Boolean).join(', '))+'</span></footer></div>';
  document.getElementById('app').innerHTML = html;
}

function homeHtml(){
  var p=state.profile, site=state.site;
  var anyTC = state.tabs.some(function(t){ return !!t.cover; });
  var tiles = state.tabs.map(function(s){ var n=(state.sections[s.key].items||[]).length;
    return '<button class="tile c-'+esc(s.color)+(s.cover?' has-cover':'')+'" data-go="'+esc(s.key)+'">'+(s.cover?'<span class="tcover"><img src="'+esc(coverUrl(s.cover))+'" alt="" loading="lazy"></span>':(anyTC?'<span class="tcover ph">'+ic(s.icon,48)+'</span>':''))+'<div class="row"><span class="circle">'+ic(s.icon,19)+'</span><span class="badge">'+n+' '+plural(n,'матеріал','матеріали','матеріалів')+'</span></div><h3>'+esc(s.label)+'</h3>'+(s.short?'<p>'+esc(s.short)+'</p>':'')+'</button>'; }).join('');
  var posts = (state.posts||[]).slice().sort(function(a,b){ return (b.date||'').localeCompare(a.date||''); });
  var postsHtml = posts.length ? '<div class="posts">'+posts.map(function(po){
    return '<article class="post" data-action="open-post" data-id="'+esc(po.id)+'"><div class="day">'+esc(fmtDate(po.date,{day:'numeric'}))+'<small>'+esc(fmtDate(po.date,{month:'short',year:'numeric'}))+'</small></div><div style="min-width:0"><h3>'+esc(po.title)+'</h3><p>'+esc((po.text||'').replace(/\s+/g,' '))+'</p></div>'+
      (editMode?'<div class="tools"><button class="icon-btn" data-action="edit-post" data-id="'+esc(po.id)+'" aria-label="Редагувати запис">'+ic('pencil',15)+'</button><button class="icon-btn danger" data-action="del-post" data-id="'+esc(po.id)+'" aria-label="Видалити запис">'+ic('trash',15)+'</button></div>':'<span></span>')+'</article>'; }).join('')+'</div>'
    : '<div class="empty">Записів поки немає.<button class="pill dark" data-action="add-post">'+ic('plus',16)+'Написати перший запис</button></div>';
  var ctas=[[site.cta1Label,site.cta1Go,'pill dark'],[site.cta2Label,site.cta2Go,'pill']].filter(function(c){ return c[0] && validTab(c[1]); });
  var facts=(p.facts||[]).filter(function(f){ return f.label||f.value; });
  var hasAbout = p.bio || facts.length || p.motto;
  var out = '<section class="hero">'+
      '<div class="hero-text">'+(p.greeting?'<span class="hand">'+esc(p.greeting)+'</span>':'')+(p.headline?'<h1>'+esc(p.headline)+'</h1>':'')+(p.lead?'<p class="lead">'+esc(p.lead)+'</p>':'')+
      ((p.name||p.role||p.city)?'<div class="who">'+(p.name?'<strong>'+esc(p.name)+'</strong>':'')+'<span>'+esc([p.role,p.city].filter(Boolean).join(' · '))+'</span></div>':'')+
      (ctas.length?'<div class="hero-cta">'+ctas.map(function(c){ return '<button class="'+c[2]+'" data-go="'+esc(c[1])+'">'+esc(c[0])+(c[2]==='pill dark'?' '+ic('arrow',16):'')+'</button>'; }).join('')+'</div>':'')+'</div>'+
      ((p.photo||editMode)?'<figure class="portrait"><div class="ph">'+photoHtml()+'</div>'+(p.stickerValue?'<span class="sticker s1">'+esc(p.stickerLabel)+'<b>'+esc(p.stickerValue)+'</b></span>':'')+(p.classNote?'<span class="sticker s2">'+esc(p.classNote)+'</span>':'')+'</figure>':'')+
      (editMode?'<div class="corner">'+eb('edit-profile','','Змінити')+'</div>':'')+
    '</section>';
  if(hasAbout||editMode) out+='<section class="about"><div class="sec-head"><h2>'+esc(site.aboutTitle)+'</h2>'+eb('edit-profile','','Редагувати')+'</div>'+
      '<div class="about-grid"><div class="bio">'+(p.bio?paras(p.bio):'<p style="color:var(--ink-2)">Біографію ще не додано.</p>')+'</div>'+
      (facts.length?'<dl class="facts">'+facts.map(function(f){ return '<div>'+(f.label?'<dt>'+esc(f.label)+'</dt>':'')+'<dd>'+esc(f.value)+'</dd></div>'; }).join('')+'</dl>':'<span></span>')+
      '</div>'+(p.motto?'<blockquote class="motto">«'+esc(p.motto.replace(/^[«"“]|[»"”]$/g,''))+'»</blockquote>':'')+'</section>';
  out+='<section><div class="sec-head"><h2>'+esc(site.tilesTitle)+'</h2>'+(editMode?'<div class="tools">'+eb('tabs-manager','','Керувати вкладками')+eb('new-tab','','Нова вкладка')+'</div>':'')+'</div>'+(tiles?'<div class="tiles">'+tiles+'</div>':'<div class="empty">Вкладок поки немає.</div>')+'</section>';
  if(posts.length||editMode) out+='<section><div class="sec-head"><h2>'+esc(site.postsTitle)+'</h2>'+(editMode&&posts.length?'<button class="pill sm dark" data-action="add-post">'+ic('plus',15)+'Новий запис</button>':'')+'</div>'+(posts.length||editMode?postsHtml:'')+'</section>';
  return out;
}

function cardHtml(key,it,anyCover){
  var color = tagColor(key,it.tag||'Інше'), s=T(key);
  var meta = it.file ? ic(it.file.type&&it.file.type.indexOf('image')===0?'image':'file',15)+'<span>'+fileKind(it.file)+(it.file.size?' · '+fsize(it.file.size):'')+'</span>'
           : (safeUrl(it.link) ? ic('link',15)+'<span>Посилання</span>' : '<span style="color:var(--ink-2)">Файл буде додано</span>');
  var openBtn='<button class="pill sm open-btn" data-action="open-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">Відкрити</button>';
  var tools = '<div class="tools">'+(editMode?'<button class="icon-btn" data-action="edit-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'" aria-label="Редагувати">'+ic('pencil',15)+'</button><button class="icon-btn danger" data-action="del-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'" aria-label="Видалити">'+ic('trash',15)+'</button>':'')+openBtn+'</div>';
  return '<article class="card c-'+color+(it.cover?' has-cover':'')+'">'+(it.cover?'<div class="cover"><img src="'+esc(coverUrl(it.cover))+'" alt="" loading="lazy"></div>':(anyCover?'<div class="cover ph">'+ic(s.icon,44)+'</div>':''))+
    '<div class="top"><span class="tag"><span class="circle">'+ic(s.icon,16)+'</span><span>'+esc(it.tag||'Інше')+'</span></span>'+(it.date?'<span class="badge">'+esc(fmtDate(it.date))+'</span>':'')+'</div>'+
    '<h3>'+esc(it.title)+'</h3>'+(it.desc?'<p class="desc">'+esc(it.desc.replace(/\s+/g,' '))+'</p>':'')+
    '<div class="bottom"><span class="meta">'+meta+'</span>'+tools+'</div></article>';
}

function sectionHtml(key){
  var s=T(key), sec=state.sections[key];
  var items=(sec.items||[]).slice().sort(function(a,b){ return (b.date||'').localeCompare(a.date||''); });
  var custom=filtersOf(key), tags=custom||tagsOf(key); var f=filters[key]||'all';
  if(f!=='all' && tags.indexOf(f)<0) f='all';
  var shown = f==='all'?items:items.filter(function(it){ return (it.tag||'Інше')===f; });
  var anyCov = shown.some(function(it){ return !!it.cover; });
  var chips = (custom||tags.length>1) ? '<div class="chips" role="group" aria-label="Фільтр"><button class="chip" data-action="filter" data-sec="'+esc(key)+'" data-tag="all" aria-pressed="'+(f==='all')+'">Усі <span class="n">'+items.length+'</span></button>'+
    tags.map(function(t){ var n=items.filter(function(it){return (it.tag||'Інше')===t;}).length; return '<button class="chip" data-action="filter" data-sec="'+esc(key)+'" data-tag="'+esc(t)+'" aria-pressed="'+(f===t)+'">'+esc(t)+' <span class="n">'+n+'</span></button>'; }).join('')+'</div>' : '';
  var body = shown.length ? '<div class="cards">'+shown.map(function(it){ return cardHtml(key,it,anyCov); }).join('')+'</div>'
    : '<div class="empty">'+ic(s.icon,28)+'<span>Тут поки порожньо. Матеріали з’являться найближчим часом.</span>'+(editMode?'<button class="pill dark" data-action="add-item" data-sec="'+esc(key)+'">'+ic('plus',16)+'Додати перший матеріал</button>':'')+'</div>';
  return '<section class="page-head">'+(s.cover?'<div class="ph-cover"><img src="'+esc(coverUrl(s.cover))+'" alt=""></div>':'')+'<span class="eyebrow">Розділ</span><h1>'+esc(s.label)+'</h1>'+(sec.intro?'<p class="intro">'+esc(sec.intro)+'</p>':'')+
    (editMode?'<div class="actions"><button class="pill dark" data-action="add-item" data-sec="'+esc(key)+'">'+ic('plus',16)+'Додати матеріал</button>'+(items.some(canAutoCover)?'<button class="pill" data-action="auto-covers" data-sec="'+esc(key)+'">'+ic('image',15)+'Обкладинки з PDF</button>':'')+'<button class="pill" data-action="edit-filters" data-sec="'+esc(key)+'">'+ic('list',15)+'Фільтри</button>'+eb('edit-tab','data-sec="'+esc(key)+'"','Редагувати вкладку')+eb('del-tab','data-sec="'+esc(key)+'"','Видалити вкладку','danger')+'</div>':'')+
    '</section><section>'+chips+body+'</section>';
}

function railHtml(){
  var p=state.profile, c=state.contacts||{}, site=state.site;
  var out='';
  var on=site.rail||{};
  function hideBtn(k){ return editMode?'<span class="rtools">'+(k==='ann'?eIcon('edit-ann','','Редагувати оголошення'):'')+(k==='contacts'?eIcon('edit-contacts','','Редагувати контакти'):'')+'<button class="icon-btn danger" data-action="hide-rail" data-id="'+k+'" aria-label="Прибрати блок" title="Прибрати блок">'+ic('trash',15)+'</button></span>':''; }
  if(on.profile && tab!=='home' && (p.name||p.photo)) out+=(editMode?'<div class="rail-card mini-wrap"><h4>Картка з фото'+hideBtn('profile')+'</h4>':'')+'<div class="rail-card mini">'+(p.photo?'<div class="avatar">'+photoHtml()+'</div>':'')+'<strong>'+esc(p.name)+'</strong>'+(p.role?'<span>'+esc(p.role)+'</span>':'')+(p.city?'<span>'+esc(p.city)+'</span>':'')+'</div>'+(editMode?'</div>':'');
  var ann=state.announcements||[];
  if(on.ann && (ann.length||editMode)) out+='<div class="rail-card"><h4>'+esc(site.annTitle)+hideBtn('ann')+'</h4>'+
    (ann.length?'<ul class="notes">'+ann.map(function(a){ return '<li>'+esc(a)+'</li>'; }).join('')+'</ul>':'<p style="color:var(--ink-2);font-size:13.5px">Нових оголошень немає. Порожній блок відвідувачі не бачать.</p>')+'</div>';
  var rec=allItems().sort(function(a,b){ return (b.item.date||'').localeCompare(a.item.date||''); }).slice(0,5);
  if(on.recent && rec.length) out+='<div class="rail-card"><h4>'+esc(site.recentTitle||'Нещодавно додано')+hideBtn('recent')+'</h4><div class="recent">'+rec.map(function(r){ var s=T(r.sec);
    return '<button data-action="open-item" data-sec="'+esc(r.sec)+'" data-id="'+esc(r.item.id)+'"><span class="sq c-'+esc(s.color)+'">'+ic(s.icon,16)+'</span><span style="min-width:0"><span class="t">'+esc(r.item.title)+'</span><span class="s">'+esc(s.label)+'</span></span></button>'; }).join('')+'</div></div>';
  var rows='';
  if(c.address) rows+='<div class="r">'+ic('pin',16)+'<span>'+(p.school?esc(p.school)+'<br>':'')+esc(c.address)+'</span></div>';
  if(c.hours) rows+='<div class="r">'+ic('clock',16)+'<span>'+esc(c.hours)+'</span></div>';
  if(c.email) rows+='<div class="r">'+ic('mail',16)+'<span class="sel">'+esc(c.email)+'</span><button class="copy" data-action="copy" data-val="'+esc(c.email)+'" aria-label="Скопіювати e-mail">'+ic('copy',15)+'</button></div>';
  if(c.phone) rows+='<div class="r">'+ic('phone',16)+'<span class="sel">'+esc(c.phone)+'</span><button class="copy" data-action="copy" data-val="'+esc(c.phone)+'" aria-label="Скопіювати телефон">'+ic('copy',15)+'</button></div>';
  if(on.contacts && (rows||editMode)) out+='<div class="rail-card"><h4>'+esc(site.contactsTitle)+hideBtn('contacts')+'</h4><div class="contacts">'+(rows||'<span style="color:var(--ink-2)">Контакти ще не вказано. Порожній блок відвідувачі не бачать.</span>')+'</div></div>';
  return out;
}

/* ---------- overlays ---------- */
function closeModal(){ if(viewerCleanup){ try{ viewerCleanup(); }catch(e){} viewerCleanup=null; } var m=document.getElementById('modal'); if(m) m.remove(); document.removeEventListener('keydown',escClose); }
function escClose(e){ if(e.key==='Escape') closeModal(); }
function openModal(title,body,foot,wide){
  closeModal();
  var o=document.createElement('div'); o.className='overlay'; o.id='modal';
  o.innerHTML='<div class="dialog'+(wide?' wide':'')+'" role="dialog" aria-modal="true" aria-labelledby="dlg-t"><div class="dlg-head"><h2 id="dlg-t">'+title+'</h2><button class="icon-btn" data-action="close" aria-label="Закрити">'+ic('x',16)+'</button></div><div class="dlg-body">'+body+'</div>'+(foot?'<div class="dlg-foot">'+foot+'</div>':'')+'</div>';
  o.addEventListener('click',function(e){ if(e.target===o) closeModal(); });
  document.body.appendChild(o);
  document.addEventListener('keydown',escClose);
  var first=o.querySelector('input[type=text],textarea'); if(first) first.focus(); else { var b=o.querySelector('.dlg-foot button, .dlg-foot a'); if(b) b.focus(); }
  return o;
}
var toastT;
function toast(msg){ var t=document.getElementById('toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.className='toast'; t.setAttribute('role','status'); document.body.appendChild(t); } t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(function(){ t.hidden=true; },3500); }
function setBusy(msg){ var b=document.getElementById('busy'); if(!msg){ if(b) b.remove(); return; } if(!b){ b=document.createElement('div'); b.id='busy'; b.className='busy'; document.body.appendChild(b); } b.innerHTML='<div><span class="spin"></span><span></span></div>'; b.querySelector('span:last-child').textContent=msg; }
function field(id,label,value,opts){ opts=opts||{};
  var input = opts.area ? '<textarea id="'+id+'" name="'+id+'" rows="'+(opts.rows||5)+'">'+esc(value)+'</textarea>'
    : '<input type="'+(opts.type||'text')+'" id="'+id+'" name="'+id+'" value="'+esc(value)+'"'+(opts.list?' list="'+opts.list+'"':'')+(opts.required?' required':'')+(opts.ph?' placeholder="'+esc(opts.ph)+'"':'')+'>';
  return '<div class="field"><label for="'+id+'">'+label+'</label>'+input+(opts.hint?'<span class="hint">'+opts.hint+'</span>':'')+'</div>'; }
function selectField(id,label,value,options,hint){
  return '<div class="field"><label for="'+id+'">'+label+'</label><select id="'+id+'">'+options.map(function(o){ return '<option value="'+esc(o[0])+'"'+(o[0]===value?' selected':'')+'>'+esc(o[1])+'</option>'; }).join('')+'</select>'+(hint?'<span class="hint">'+hint+'</span>':'')+'</div>'; }
function val(f,id){ var el=f.querySelector('#'+id); return el?el.value.trim():''; }
function footBtns(formId){ return '<button class="pill" data-action="close">Скасувати</button><button class="pill dark" type="submit" form="'+formId+'">Зберегти</button>'; }
var EMPTY_HINT='Залиште порожнім, щоб прибрати з сайту.';

/* ---------- GitHub storage: data/site.json + files/ covers/ img/ in the repo ---------- */
var CFG = window.SITE_CONFIG || {};
function ghCfg(){
  var o=CFG.owner, r=CFG.repo;
  if((!o||!r) && /\.github\.io$/i.test(location.hostname)){
    o=location.hostname.split('.')[0]; var seg=location.pathname.split('/').filter(Boolean)[0];
    r=(seg && seg.indexOf('.')<0)?seg:location.hostname;
  }
  return {owner:o||'', repo:r||'', branch:CFG.branch||'main'};
}
var TOKEN_KEY='pp-gh-token';
function getToken(){ try{ return localStorage.getItem(TOKEN_KEY)||''; }catch(e){ return ''; } }
function setToken(t){ try{ if(t) localStorage.setItem(TOKEN_KEY,t); else localStorage.removeItem(TOKEN_KEY); }catch(e){} }
function encodePath(p){ return String(p||'').split('/').map(encodeURIComponent).join('/'); }
function api(path,opts){
  opts=opts||{}; var c=ghCfg();
  var url='https://api.github.com'+path.replace('{repo}','/repos/'+encodeURIComponent(c.owner)+'/'+encodeURIComponent(c.repo));
  var h={'Accept':opts.accept||'application/vnd.github+json','Authorization':'Bearer '+getToken()};
  if(opts.body) h['Content-Type']='application/json';
  return fetch(url,{method:opts.method||'GET',headers:h,body:opts.body?JSON.stringify(opts.body):undefined,cache:'no-store'}).then(function(r){
    if(!r.ok) return r.text().then(function(t){ var e=new Error('GitHub '+r.status+': '+String(t).slice(0,160)); e.status=r.status; throw e; });
    if(opts.raw) return r.blob();
    return r.status===204?null:r.json();
  },function(){ var e=new Error('network'); e.status=0; throw e; });
}
function checkToken(){
  if(!getToken()) return Promise.resolve(false);
  return api('{repo}').then(function(j){ return !!(j && j.permissions && j.permissions.push); });
}
var pending={}, previews={};
function queueBlob(path,blob){ pending[path]={blob:blob}; try{ previews[path]=URL.createObjectURL(blob); }catch(e){} }
function queueData(path,dataUrl){ pending[path]={dataUrl:dataUrl}; previews[path]=dataUrl; }
function queueDelete(path){ if(path && /^(files|covers|img)\//.test(path)){ pending[path]={del:true}; } }
function assetUrl(p){
  if(!p) return '';
  if(/^(data:|blob:|https?:)/.test(p)) return p;
  if(previews[p]) return previews[p];
  if(canEdit){ var c=ghCfg(); return 'https://raw.githubusercontent.com/'+encodeURIComponent(c.owner)+'/'+encodeURIComponent(c.repo)+'/'+encodeURIComponent(c.branch)+'/'+encodePath(p); }
  return encodePath(p);
}
function readB64(blob){ return new Promise(function(res,rej){ var r=new FileReader(); r.onload=function(){ var x=String(r.result); res(x.slice(x.indexOf(',')+1)); }; r.onerror=function(){ rej({code:'read_error'}); }; r.readAsDataURL(blob); }); }
function commitAll(siteJson,message){
  var c=ghCfg(), entries=Object.keys(pending).map(function(k){ return [k,pending[k]]; });
  pending={};
  var uploads=entries.filter(function(e){ return !e[1].del; }), n=uploads.length, done=0, tree=[];
  function nextBlob(i){
    if(i>=entries.length) return Promise.resolve();
    var path=entries[i][0], p=entries[i][1];
    if(p.del){ tree.push({path:path,mode:'100644',type:'blob',sha:null}); return nextBlob(i+1); }
    done++; if(n) setBusy(n>1?'Завантажую файли: '+done+' з '+n+'…':'Завантажую файл…');
    var b=p.dataUrl?Promise.resolve(String(p.dataUrl).split(',')[1]):readB64(p.blob);
    return b.then(function(b64){ return api('{repo}/git/blobs',{method:'POST',body:{content:b64,encoding:'base64'}}); })
      .then(function(j){ tree.push({path:path,mode:'100644',type:'blob',sha:j.sha}); return nextBlob(i+1); });
  }
  function attempt(withDeletes,tries){
    var head;
    var t=withDeletes?tree:tree.filter(function(x){ return x.sha!==null; });
    setBusy('Зберігаю зміни…');
    return api('{repo}/git/ref/heads/'+encodeURIComponent(c.branch)).then(function(ref){ head=ref.object.sha; return api('{repo}/git/commits/'+head); })
      .then(function(cm){ return api('{repo}/git/trees',{method:'POST',body:{base_tree:cm.tree.sha,tree:t}}); })
      .then(function(nt){ return api('{repo}/git/commits',{method:'POST',body:{message:message||'Оновлення сайту',tree:nt.sha,parents:[head]}}); })
      .then(function(nc){ return api('{repo}/git/refs/heads/'+encodeURIComponent(c.branch),{method:'PATCH',body:{sha:nc.sha}}); })
      .catch(function(e){
        if(e && e.status===422 && withDeletes && t.some(function(x){ return x.sha===null; })) return attempt(false,tries);
        if(e && e.status===422 && tries<2) return attempt(withDeletes,tries+1);
        throw e;
      });
  }
  return nextBlob(0).then(function(){
    return api('{repo}/git/blobs',{method:'POST',body:{content:siteJson,encoding:'utf-8'}});
  }).then(function(j){ tree.push({path:'data/site.json',mode:'100644',type:'blob',sha:j.sha}); return attempt(true,0); });
}
function ghErr(e){
  var s=e&&e.status;
  if(s===0) return 'Немає зв’язку з GitHub. Перевірте інтернет і спробуйте ще раз.';
  if(s===401) return 'Ключ доступу недійсний або вже закінчився. Увійдіть заново з новим ключем.';
  if(s===403||s===404) return 'Ключ не має дозволу змінювати сайт. Створіть ключ із дозволом «Contents: Read and write» для цього сховища.';
  if(s===413||s===422) return 'GitHub не прийняв зміни. Можливо, файл завеликий: стисніть його або додайте посиланням.';
  return 'Не вдалося зберегти: '+(e&&e.message?e.message:'невідома помилка');
}
var TR={'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia','ы':'y','э':'e','ё':'e'};
function slugName(name){ var base=String(name||'').replace(/\.[^.]*$/,'').toLowerCase(), s=''; for(var i=0;i<base.length;i++){ var ch=base[i]; s+=(TR[ch]!==undefined?TR[ch]:ch); } s=s.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,50); return s||'file'; }


function save(mutate,msg){
  if(!canEdit){ toast('Спершу увійдіть як вчитель'); return Promise.resolve(false); }
  var next=clone(state); mutate(next); migrate(next);
  setBusy('Зберігаю зміни…'); uiSave();
  return commitAll(JSON.stringify(next,null,1),msg||'Оновлення сайту').then(function(){
    state=next; closeModal(); setBusy(null); render(); toast('Збережено. Відвідувачі побачать зміни за 1–2 хвилини.'); return true;
  },function(e){ setBusy(null); if(e&&e.status===401){ setToken(''); canEdit=false; editMode=false; closeModal(); render(); } toast(ghErr(e)); return false; });
}
function formMsg(form,msg){ var m=form.querySelector('.form-msg'); if(m) m.textContent=msg||''; }
var MAX_UPLOAD=70*1024*1024;
function typeFor(file){ var e=extOf(file.name); var t=String(file.type||'').split(';')[0].trim().toLowerCase(); if(t==='image/jpg'||t==='image/pjpeg') t='image/jpeg'; if(e&&MIME[e]&&(!t||t==='application/octet-stream'||e==='pdf')) t=MIME[e]; return t||'application/octet-stream'; }
function nameFor(file,type){ var n=String(file.name||'').trim()||'файл'; if(!extOf(n)){ for(var k in MIME){ if(MIME[k]===type){ n+='.'+k; break; } } } return n; }
function sniff(file){ return file.slice(0,8).arrayBuffer().then(function(ab){ var u=new Uint8Array(ab), h=String.fromCharCode.apply(null,u);
  if(h.indexOf('%PDF')===0) return 'application/pdf'; if(u[0]===0x89&&h.substr(1,3)==='PNG') return 'image/png'; if(u[0]===0xFF&&u[1]===0xD8) return 'image/jpeg'; if(h.indexOf('GIF8')===0) return 'image/gif'; return ''; },function(){ return ''; }); }
function uploadFile(file){
  if(!file.size) return Promise.reject({code:'empty'});
  if(file.size>MAX_UPLOAD) return Promise.reject({code:'too_large'});
  return sniff(file).then(function(real){
    var type=real||typeFor(file), name=nameFor(file,type), ext=extOf(name)||'bin';
    var path='files/'+uid()+'-'+slugName(name)+'.'+ext;
    queueBlob(path,file);
    return {path:path,name:name,size:file.size,type:type};
  });
}
function fileBlob(f){
  var p=f&&f.path; if(!p) return Promise.reject(new Error('nofile'));
  function get(u){ return fetch(u,{cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.blob(); }); }
  var a=assetUrl(p), b=encodePath(p);
  return get(a).catch(function(){ return a!==b?get(b):Promise.reject(new Error('nf')); }).then(function(bl){ return bl.type?bl:new Blob([bl],{type:f.type||''}); });
}
function uploadErr(e){ var c=e&&e.code;
  if(c==='too_large') return 'Файл більший за 70 МБ. Стисніть його або додайте посиланням на Google Диск.';
  if(c==='empty') return 'Файл порожній. Оберіть інший.';
  return 'Не вдалося підготувати файл. Спробуйте ще раз.'; }
function dropAsset(f){ if(f&&f.path) queueDelete(f.path); }
function compressImage(file,mx){ return new Promise(function(res,rej){
  var url=URL.createObjectURL(file); var img=new Image();
  img.onload=function(){ var max=mx||900, w=img.naturalWidth, h=img.naturalHeight, k=Math.min(1,max/Math.max(w,h)); var c=document.createElement('canvas'); c.width=Math.round(w*k); c.height=Math.round(h*k); var cx=c.getContext('2d'); cx.fillStyle='#fff'; cx.fillRect(0,0,c.width,c.height); cx.drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg',0.84)); };
  img.onerror=function(){ URL.revokeObjectURL(url); rej(new Error('img')); }; img.src=url; }); }

function logoData(file){ return new Promise(function(res,rej){ var url=URL.createObjectURL(file), img=new Image();
  img.onload=function(){ var w=img.naturalWidth,h=img.naturalHeight,c=document.createElement('canvas'),k=Math.min(1,360/Math.max(w,h)); c.width=Math.round(w*k); c.height=Math.round(h*k); c.getContext('2d').drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url);
    var d=c.toDataURL('image/webp',0.9); if(d.indexOf('data:image/webp')!==0) d=c.toDataURL('image/png'); res(d); };
  img.onerror=function(){ URL.revokeObjectURL(url); rej(new Error('img')); }; img.src=url; }); }

/* ---------- covers ---------- */
function coverUrl(c){ if(!c) return ''; if(c.path) return assetUrl(c.path); return c.data||''; }
function storeCover(dataUrl){ if(!dataUrl) return Promise.resolve(null); var p='covers/'+uid()+'.jpg'; queueData(p,dataUrl); return Promise.resolve({path:p}); }
function dropCover(c){ if(c&&c.path) queueDelete(c.path); }
function pdfCoverFromBlob(blob){
  return Promise.all([blob.arrayBuffer(),loadPdfjs()]).then(function(r){ return r[1].getDocument({data:new Uint8Array(r[0]),isEvalSupported:false,useSystemFonts:true}).promise; }).then(function(doc){
    return doc.getPage(1).then(function(pg){ var b=pg.getViewport({scale:1}), vp=pg.getViewport({scale:800/b.width}); var c=document.createElement('canvas'); c.width=Math.floor(vp.width); c.height=Math.floor(vp.height);
      var ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height);
      return pg.render({canvasContext:ctx,viewport:vp}).promise.then(function(){ var d=c.toDataURL('image/jpeg',0.82); try{ doc.destroy(); }catch(e){} return d; }); }); });
}
function canAutoCover(it){ return !it.cover && it.file && (fileKind(it.file)==='PDF'||fileKind(it.file)==='Зображення'); }
function autoCovers(key){
  var items=(state.sections[key].items||[]).filter(canAutoCover);
  if(!items.length){ toast('Усі матеріали з PDF уже мають обкладинки'); return; }
  var res={}, i=0;
  function next(){ if(i>=items.length) return Promise.resolve(); var it=items[i++]; setBusy('Створюю обкладинки: '+i+' з '+items.length+'…');
    return fileBlob(it.file).then(function(b){ return fileKind(it.file)==='PDF'?pdfCoverFromBlob(b):compressImage(b,800); }).then(storeCover).then(function(c){ if(c) res[it.id]=c; },function(){}).then(next); }
  next().then(function(){ setBusy(null); var n=Object.keys(res).length; if(!n){ toast('Не вдалося створити обкладинки. Додайте фото вручну через олівець.'); return; }
    save(function(st){ (st.sections[key].items||[]).forEach(function(x){ if(res[x.id]) x.cover=res[x.id]; }); }); });
}
function coverField(id,cur,hint){
  return '<div class="field"><label for="'+id+'">Фото-обкладинка</label>'+(cur?'<div class="cur-file"><img src="'+esc(coverUrl(cur))+'" alt="" style="width:72px;height:48px;object-fit:cover;border-radius:8px;flex:none"><span style="flex:1">Поточне фото</span><label style="display:flex;gap:6px;align-items:center;font-size:13px"><input type="checkbox" id="'+id+'-rm"> видалити</label></div>':'')+
    '<input type="file" id="'+id+'" accept="image/*"><span class="hint">'+hint+'</span></div>';
}

/* ---------- forms: profile ---------- */
function profileForm(){
  var p=state.profile;
  var factsText=(p.facts||[]).map(function(f){ return (f.label?f.label+': ':'')+f.value; }).join('\n');
  var body='<form id="f-profile" class="dlg-body">'+
    '<div class="field"><label for="pf-photo">Фото</label><div class="cur-file"><span class="avatar" style="width:48px;height:48px;padding:2px;margin:0">'+photoHtml()+'</span><input type="file" id="pf-photo" accept="image/*">'+(p.photo?'<label style="display:flex;gap:6px;align-items:center;font-size:13px;margin-left:auto"><input type="checkbox" id="pf-rmphoto"> видалити фото</label>':'')+'</div><span class="hint">Фото стиснеться автоматично.</span></div>'+
    '<p class="hint" style="font-size:12.5px;color:var(--ink-2)">Будь-яке поле можна очистити: тоді воно зникне з сайту.</p>'+
    '<div class="grid2">'+field('pf-name','Ім’я та прізвище',p.name)+field('pf-role','Посада',p.role)+'</div>'+
    '<div class="grid2">'+field('pf-school','Школа',p.school)+field('pf-city','Місто',p.city)+'</div>'+
    field('pf-greeting','Привітання (рукописним шрифтом)',p.greeting)+
    field('pf-headline','Головний заголовок',p.headline)+
    field('pf-lead','Короткий вступ',p.lead,{area:true,rows:3})+
    '<div class="grid2">'+field('pf-stickerLabel','Наліпка на фото: підпис',p.stickerLabel)+field('pf-stickerValue','Наліпка на фото: значення',p.stickerValue,{hint:'Наприклад: 18 років'})+'</div>'+
    field('pf-classNote','Жовта наліпка на фото',p.classNote,{hint:'Наприклад: Класна керівниця 3-Б'})+
    field('pf-bio','Біографія',p.bio,{area:true,rows:8,hint:'Порожній рядок між абзацами розділяє їх.'})+
    field('pf-facts','Факти про мене (праворуч від біографії)',factsText,{area:true,rows:5,hint:'Кожен факт з нового рядка у форматі «Назва: значення». Видаліть рядок, щоб прибрати факт.'})+
    field('pf-motto','Педагогічне кредо',p.motto)+
    '<p class="form-msg" role="alert"></p></form>';
  var o=openModal('Головний блок і біографія',body,footBtns('f-profile'),true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target;
    var vals={}; ['name','role','school','city','greeting','headline','lead','stickerLabel','stickerValue','classNote','bio','motto'].forEach(function(k){ vals[k]=val(f,'pf-'+k); });
    vals.facts=f.querySelector('#pf-facts').value.split('\n').map(function(l){ l=l.trim(); if(!l) return null; var i=l.indexOf(':'); return i>0?{label:l.slice(0,i).trim(),value:l.slice(i+1).trim()}:{label:'',value:l}; }).filter(Boolean);
    var rm=f.querySelector('#pf-rmphoto'); var pic=f.querySelector('#pf-photo').files[0];
    var oldPh=state.profile.photo||'';
    var go=function(photo){ var np=null; if(photo){ np='img/photo-'+uid()+'.jpg'; queueData(np,photo); queueDelete(oldPh); } else if(rm&&rm.checked){ queueDelete(oldPh); } save(function(n){ Object.assign(n.profile,vals); if(np) n.profile.photo=np; else if(rm&&rm.checked) n.profile.photo=''; }); };
    if(pic){ formMsg(f,''); compressImage(pic).then(go,function(){ formMsg(f,'Не вдалося прочитати фото. Спробуйте JPG або PNG.'); }); } else go(null);
  });
}

/* ---------- forms: site settings ---------- */
function siteForm(){
  var s=state.site;
  var targets=[['','— без кнопки —']].concat(state.tabs.map(function(t){ return [t.key,t.label]; }));
  var body='<form id="f-site" class="dlg-body">'+
    '<div class="grid2">'+field('st-brand','Назва сайту',s.brand,{required:true})+field('st-brandSub','Підпис під назвою',s.brandSub)+'</div>'+
    field('st-homeLabel','Назва вкладки «Головна»',s.homeLabel,{required:true})+
    '<div class="grid2">'+field('st-aboutTitle','Заголовок блоку біографії',s.aboutTitle)+field('st-tilesTitle','Заголовок блоку з розділами',s.tilesTitle)+'</div>'+
    '<div class="grid2">'+field('st-postsTitle','Заголовок записів блогу',s.postsTitle)+field('st-annTitle','Заголовок оголошень',s.annTitle)+'</div>'+
    '<div class="grid2">'+field('st-recentTitle','Заголовок «Нещодавно додано»',s.recentTitle,{hint:EMPTY_HINT})+field('st-contactsTitle','Заголовок контактів',s.contactsTitle)+'</div>'+
    '<div class="grid2">'+field('st-cta1Label','Перша кнопка на головній',s.cta1Label,{hint:EMPTY_HINT})+selectField('st-cta1Go','Куди веде перша кнопка',s.cta1Go,targets)+'</div>'+
    '<div class="grid2">'+field('st-cta2Label','Друга кнопка на головній',s.cta2Label,{hint:EMPTY_HINT})+selectField('st-cta2Go','Куди веде друга кнопка',s.cta2Go,targets)+'</div>'+
    '<div class="field"><label for="st-logo">Логотип</label><div class="cur-file"><span style="width:56px;height:56px;display:grid;place-items:center;flex:none">'+(s.logo?'<img src="'+esc(assetUrl(s.logo))+'" alt="" style="max-width:56px;max-height:56px">':'<span class="mark" style="width:48px;height:48px;border-radius:14px">'+LOGO+'</span>')+'</span><input type="file" id="st-logo" accept="image/*">'+(s.logo?'<label style="display:flex;gap:6px;align-items:center;font-size:13px;margin-left:auto"><input type="checkbox" id="st-logo-rm"> стандартний логотип</label>':'')+'</div><span class="hint">Найкраще PNG з прозорим фоном.</span></div>'+
    field('st-footerNote','Додатковий текст унизу сторінки',s.footerNote)+
    '<div class="field"><span class="lbl">Бокова панель праворуч</span><div class="checks">'+[['profile','Картка з фото (на сторінках вкладок)'],['ann','Оголошення'],['recent','Нещодавно додано'],['contacts','Контакти']].map(function(r){ return '<label><input type="checkbox" id="st-rail-'+r[0]+'"'+(s.rail&&s.rail[r[0]]?' checked':'')+'> '+r[1]+'</label>'; }).join('')+'</div><span class="hint">Зніміть усі галочки, щоб панелі праворуч не було зовсім.</span></div>'+
    '<p class="form-msg" role="alert"></p></form>';
  var o=openModal('Налаштування сайту',body,footBtns('f-site'),true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target; var v={};
    ['brand','brandSub','homeLabel','aboutTitle','tilesTitle','postsTitle','annTitle','recentTitle','contactsTitle','cta1Label','cta1Go','cta2Label','cta2Go','footerNote'].forEach(function(k){ v[k]=val(f,'st-'+k); });
    v.rail={}; ['profile','ann','recent','contacts'].forEach(function(k){ v.rail[k]=!!f.querySelector('#st-rail-'+k).checked; });
    if(!v.brand){ formMsg(f,'Вкажіть назву сайту.'); return; }
    if(!v.homeLabel){ formMsg(f,'Вкажіть назву головної вкладки.'); return; }
    var lf=f.querySelector('#st-logo').files[0], lrm=f.querySelector('#st-logo-rm');
    var oldLg=state.site.logo||'';
    (lf?logoData(lf):Promise.resolve(null)).then(function(d){ if(d){ var lp='img/logo-'+uid()+'.'+(d.indexOf('image/webp')>0?'webp':'png'); queueData(lp,d); queueDelete(oldLg); v.logo=lp; } else if(lrm&&lrm.checked){ queueDelete(oldLg); v.logo=''; } else v.logo=oldLg; save(function(n){ Object.assign(n.site,v); }); },function(){ formMsg(f,'Не вдалося прочитати логотип. Спробуйте PNG або JPG.'); });
  });
}

/* ---------- filters (categories) per tab ---------- */
function filtersOf(key){ var t=T(key); return t && Array.isArray(t.filters) ? t.filters : null; }
function filtersForm(key){
  var t=T(key); if(!t) return;
  var cur=filtersOf(key)||tagsOf(key);
  var unused=tagsOf(key).filter(function(x){ return cur.indexOf(x)<0; });
  var body='<form id="f-flt" class="dlg-body"><p style="color:var(--ink-2);font-size:13.5px">Ці кнопки показуються над матеріалами у вкладці «'+esc(t.label)+'». Кнопка <b>«Усі»</b> є завжди. Щоб залишити тільки її, очистіть поле.</p>'+
    field('fl-list','Фільтри (кожен з нового рядка)',cur.join('\n'),{area:true,rows:7,hint:'Додайте рядок, щоб з’явився новий фільтр. Видаліть рядок, щоб прибрати фільтр. Порядок рядків стане порядком кнопок.'})+
    (unused.length?'<p class="hint" style="font-size:12.5px;color:var(--ink-2)">Категорії, які вже є в матеріалах цієї вкладки, але не показані як фільтри: '+unused.map(esc).join(', ')+'.</p>':'')+
    '<p class="hint" style="font-size:12.5px;color:var(--ink-2)">Щоб матеріал потрапив у фільтр, відкрийте його олівцем і в полі «'+esc(t.tagLabel||'Категорія')+'» напишіть точно таку саму назву.</p>'+
    '<p class="form-msg" role="alert"></p></form>';
  var o=openModal('Фільтри вкладки',body,footBtns('f-flt'),true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault();
    var seen={}, list=e.target.querySelector('#fl-list').value.split('\n').map(function(x){ return x.trim(); }).filter(function(x){ if(!x||seen[x.toLowerCase()]||x.toLowerCase()==='усі') return false; seen[x.toLowerCase()]=1; return true; });
    save(function(n){ var tt=n.tabs.find(function(x){ return x.key===key; }); if(tt) tt.filters=list; },'Фільтри вкладки «'+t.label+'»').then(function(ok){ if(ok){ filters[key]='all'; render(); } });
  });
}

/* ---------- forms: tabs ---------- */
function tabForm(key){
  var t=key?T(key):null; var isNew=!t;
  t=t||{key:'',label:'',short:'',color:PALETTE[state.tabs.length%PALETTE.length],icon:'star',tagLabel:'Категорія'};
  var intro=key?state.sections[key].intro:'';
  var body='<form id="f-tab" class="dlg-body">'+field('tb-label','Назва вкладки',t.label,{required:true})+
    field('tb-short','Короткий опис (на плитці на головній)',t.short,{hint:EMPTY_HINT})+
    field('tb-intro','Вступний текст на сторінці вкладки',intro,{area:true,rows:4,hint:EMPTY_HINT})+
    field('tb-tagLabel','Як називати категорії матеріалів',t.tagLabel,{hint:'Наприклад: Предмет, Клас, Тема'})+
    coverField('tb-cover',t.cover,'Показується на плитці вкладки на головній і вгорі сторінки вкладки.')+
    '<div class="field"><span class="lbl">Колір</span><div class="swatches">'+PALETTE.map(function(c){ return '<label class="c-'+c+'" title="'+COLOR_NAMES[c]+'"><input type="radio" name="tb-color" value="'+c+'"'+(c===t.color?' checked':'')+' aria-label="'+COLOR_NAMES[c]+'"></label>'; }).join('')+'</div></div>'+
    '<div class="field"><span class="lbl">Іконка</span><div class="icons-pick">'+ICON_CHOICES.map(function(n){ return '<label><input type="radio" name="tb-icon" value="'+n+'"'+(n===t.icon?' checked':'')+' aria-label="'+n+'">'+ic(n,20)+'</label>'; }).join('')+'</div></div>'+
    '<p class="form-msg" role="alert"></p></form>';
  var foot=(isNew?'':'<button class="pill danger" data-action="del-tab" data-sec="'+esc(key)+'" style="margin-right:auto">'+ic('trash',15)+'Видалити вкладку</button>')+footBtns('f-tab');
  var o=openModal(isNew?'Нова вкладка':'Редагувати вкладку',body,foot,true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target;
    var v={label:val(f,'tb-label'),short:val(f,'tb-short'),tagLabel:val(f,'tb-tagLabel')||'Категорія'};
    var c=f.querySelector('input[name=tb-color]:checked'); v.color=c?c.value:t.color;
    var ii=f.querySelector('input[name=tb-icon]:checked'); v.icon=ii?ii.value:t.icon;
    var introV=f.querySelector('#tb-intro').value.trim();
    if(!v.label){ formMsg(f,'Вкажіть назву вкладки.'); return; }
    var newKey = isNew ? 't'+uid() : key;
    var tcp=f.querySelector('#tb-cover').files[0], trm=f.querySelector('#tb-cover-rm'), oldTC=t.cover||null;
    if(tcp) setBusy('Готую фото…');
    (tcp?compressImage(tcp,1400).then(storeCover):Promise.resolve(trm&&trm.checked?null:oldTC)).then(function(cv){ setBusy(null); v.cover=cv||null; if(oldTC&&cv!==oldTC) dropCover(oldTC);
    save(function(n){
      if(isNew){ v.key=newKey; n.tabs.push(v); n.sections[newKey]={intro:introV,items:[]}; }
      else { var i=n.tabs.findIndex(function(x){return x.key===key;}); n.tabs[i]=Object.assign(n.tabs[i],v); n.sections[key].intro=introV; }
    }).then(function(ok){ if(ok && isNew){ tab=newKey; render(); uiSave(); } });
    if(isNew){ tab=newKey; uiSave(); }
    },function(){ setBusy(null); formMsg(f,'Не вдалося прочитати фото. Спробуйте JPG або PNG.'); });
  });
}
function delTab(key){
  var t=T(key); if(!t) return; var items=state.sections[key].items||[]; var n=items.length;
  var o=openModal('Видалити вкладку?','<p>Вкладку «'+esc(t.label)+'»'+(n?' і '+n+' '+plural(n,'матеріал','матеріали','матеріалів')+' в ній':'')+' буде видалено з сайту. Цю дію не можна скасувати.</p>','<button class="pill" data-action="close">Скасувати</button><button class="pill dark" id="yes-del">'+ic('trash',15)+'Видалити вкладку</button>');
  o.querySelector('#yes-del').addEventListener('click',function(){
    items.forEach(function(it){ dropAsset(it.file); dropCover(it.cover); });
    if(tab===key) tab='home';
    save(function(s){ s.tabs=s.tabs.filter(function(x){return x.key!==key;}); delete s.sections[key]; if(s.site.cta1Go===key) s.site.cta1Go=''; if(s.site.cta2Go===key) s.site.cta2Go=''; });
  });
}
function tabsManager(){
  var draft=state.tabs.map(function(t){ return {key:t.key,label:t.label,color:t.color,icon:t.icon,del:false}; });
  function rows(){ return draft.map(function(t,i){ var n=(state.sections[t.key].items||[]).length;
    return '<div class="tabrow'+(t.del?' del':'')+'"><span class="sq c-'+esc(t.color)+'" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center;flex:none">'+ic(t.icon,16)+'</span><span class="nm">'+esc(t.label)+'<small>'+n+' '+plural(n,'матеріал','матеріали','матеріалів')+'</small></span>'+
      '<button type="button" class="icon-btn" data-m="up" data-i="'+i+'" aria-label="Вище"'+(i===0?' disabled':'')+'>'+ic('up',15)+'</button>'+
      '<button type="button" class="icon-btn" data-m="down" data-i="'+i+'" aria-label="Нижче"'+(i===draft.length-1?' disabled':'')+'>'+ic('down',15)+'</button>'+
      (t.del?'<button type="button" class="icon-btn" data-m="undo" data-i="'+i+'" aria-label="Повернути">'+ic('undo',15)+'</button>':'<button type="button" class="icon-btn" data-m="edit" data-i="'+i+'" aria-label="Редагувати">'+ic('pencil',15)+'</button><button type="button" class="icon-btn danger" data-m="del" data-i="'+i+'" aria-label="Видалити">'+ic('trash',15)+'</button>')+'</div>'; }).join('') || '<p style="color:var(--ink-2)">Вкладок немає.</p>'; }
  var body='<p class="hint" style="color:var(--ink-2);font-size:13.5px">Стрілками змініть порядок у меню, кошиком позначте вкладки для видалення. Зміни застосуються після «Зберегти».</p><div class="tabrows" id="tabrows">'+rows()+'</div><button type="button" class="pill" data-action="new-tab" style="align-self:flex-start">'+ic('plus',15)+'Нова вкладка</button>';
  var o=openModal('Вкладки сайту',body,'<button class="pill" data-action="close">Скасувати</button><button class="pill dark" id="save-tabs">Зберегти</button>',true);
  var box=o.querySelector('#tabrows');
  box.addEventListener('click',function(e){ var b=e.target.closest('[data-m]'); if(!b||b.disabled) return; var i=+b.getAttribute('data-i'), m=b.getAttribute('data-m');
    if(m==='up'&&i>0){ var x=draft[i]; draft[i]=draft[i-1]; draft[i-1]=x; }
    else if(m==='down'&&i<draft.length-1){ var y=draft[i]; draft[i]=draft[i+1]; draft[i+1]=y; }
    else if(m==='del') draft[i].del=true;
    else if(m==='undo') draft[i].del=false;
    else if(m==='edit'){ tabForm(draft[i].key); return; }
    box.innerHTML=rows(); });
  o.querySelector('#save-tabs').addEventListener('click',function(){
    var removed=draft.filter(function(t){return t.del;}).map(function(t){return t.key;});
    var order=draft.filter(function(t){return !t.del;}).map(function(t){return t.key;});
    removed.forEach(function(k){ (state.sections[k].items||[]).forEach(function(it){ dropAsset(it.file); dropCover(it.cover); }); });
    if(removed.indexOf(tab)>=0) tab='home';
    save(function(s){ s.tabs=order.map(function(k){ return s.tabs.find(function(t){return t.key===k;}); }).filter(Boolean); removed.forEach(function(k){ delete s.sections[k]; if(s.site.cta1Go===k) s.site.cta1Go=''; if(s.site.cta2Go===k) s.site.cta2Go=''; }); });
  });
}

/* ---------- forms: items, posts, announcements, contacts ---------- */
function itemForm(key,id){
  var s=T(key); var it=id?(state.sections[key].items||[]).find(function(x){return x.id===id;}):null;
  it=it||{id:'',title:'',desc:'',tag:'',date:new Date().toISOString().slice(0,10),link:'',file:null};
  var tags=filtersOf(key)||tagsOf(key);
  var cur = it.file ? '<div class="cur-file">'+ic('file',16)+'<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(it.file.name)+' · '+fsize(it.file.size)+'</span><label style="display:flex;gap:6px;align-items:center;font-size:13px"><input type="checkbox" id="it-rm"> видалити файл</label></div>' : '';
  var tabOpts=state.tabs.map(function(t){ return [t.key,t.label]; });
  var body='<form id="f-item" class="dlg-body">'+field('it-title','Назва',it.title,{required:true})+
    '<div class="grid2">'+field('it-tag',esc(s.tagLabel||'Категорія'),it.tag,{list:'tags-dl'})+field('it-date','Дата',it.date,{type:'date',hint:EMPTY_HINT})+'</div><datalist id="tags-dl">'+tags.map(function(t){return '<option value="'+esc(t)+'">';}).join('')+'</datalist>'+
    field('it-desc','Опис',it.desc,{area:true,rows:4})+
    coverField('it-cover',it.cover,'Необов’язково. Якщо не додати, для PDF і фото обкладинкою автоматично стане перша сторінка.')+
    '<div class="field"><label for="it-file">Файл (PDF, Word, PowerPoint, зображення тощо, до 70 МБ)</label>'+cur+'<input type="file" id="it-file">'+(it.file?'<span class="hint">Оберіть новий файл, щоб замінити поточний.</span>':'')+'</div>'+
    field('it-link','Або посилання',it.link,{type:'url',ph:'https://…',hint:'Наприклад, на Google Диск, YouTube або сайт МОН.'})+
    (id&&tabOpts.length>1?selectField('it-move','Вкладка',key,tabOpts,'Можна перенести матеріал в іншу вкладку.'):'')+
    '<p class="form-msg" role="alert"></p></form>';
  var foot=(id?'<button class="pill danger" data-action="del-item" data-sec="'+esc(key)+'" data-id="'+esc(id)+'" style="margin-right:auto">'+ic('trash',15)+'Видалити</button>':'')+footBtns('f-item');
  var o=openModal(id?'Редагувати матеріал':'Новий матеріал · '+esc(s.label),body,foot,true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target;
    var v={ title:val(f,'it-title'), tag:val(f,'it-tag')||'Інше', date:f.querySelector('#it-date').value, desc:val(f,'it-desc'), link:val(f,'it-link') };
    var dest=val(f,'it-move')||key;
    if(!v.title){ formMsg(f,'Вкажіть назву.'); return; }
    if(v.link && !safeUrl(v.link)){ formMsg(f,'Посилання має починатися з https://'); return; }
    var rm=f.querySelector('#it-rm'); var pick=f.querySelector('#it-file').files[0];
    var oldFile=it.file;
    var cpick=f.querySelector('#it-cover').files[0], rmc=f.querySelector('#it-cover-rm'), oldCover=it.cover||null;
    function makeCover(file){
      if(cpick) return compressImage(cpick,800).then(storeCover).catch(function(){ return oldCover; });
      if(rmc&&rmc.checked) return Promise.resolve(null);
      if(oldCover) return Promise.resolve(oldCover);
      if(pick && file){ var k=fileKind(file);
        if(k==='PDF') return pdfCoverFromBlob(pick).then(storeCover).catch(function(){ return null; });
        if(k==='Зображення') return compressImage(pick,800).then(storeCover).catch(function(){ return null; }); }
      return Promise.resolve(null);
    }
    var finish=function(file){
      if(oldFile && (!file || file.path!==oldFile.path)) dropAsset(oldFile);
      if(cpick || (pick && !oldCover)) setBusy('Готую обкладинку…');
      makeCover(file).then(function(cover){ setBusy(null); if(oldCover && cover!==oldCover) dropCover(oldCover);
      save(function(n){ var rec=Object.assign({},v,{file:file||null,cover:cover||null});
        if(id){ rec.id=id; n.sections[key].items=n.sections[key].items.filter(function(x){return x.id!==id;}); }
        else rec.id=uid();
        n.sections[dest].items.push(rec); }); });
    };
    if(pick){ formMsg(f,''); uploadFile(pick).then(function(file){ finish(file); },function(err){ formMsg(f,uploadErr(err)); }); }
    else finish(rm&&rm.checked?null:oldFile);
  });
}
function postForm(id){
  var po=id?(state.posts||[]).find(function(x){return x.id===id;}):null; po=po||{title:'',date:new Date().toISOString().slice(0,10),text:''};
  var body='<form id="f-post" class="dlg-body">'+field('po-title','Заголовок',po.title,{required:true})+field('po-date','Дата',po.date,{type:'date'})+field('po-text','Текст запису',po.text,{area:true,rows:10,hint:'Порожній рядок між абзацами розділяє їх.'})+'<p class="form-msg" role="alert"></p></form>';
  var foot=(id?'<button class="pill danger" data-action="del-post" data-id="'+esc(id)+'" style="margin-right:auto">'+ic('trash',15)+'Видалити</button>':'')+footBtns('f-post');
  var o=openModal(id?'Редагувати запис':'Новий запис блогу',body,foot,true);
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target;
    var v={title:val(f,'po-title'),date:f.querySelector('#po-date').value,text:f.querySelector('#po-text').value.trim()};
    if(!v.title){ formMsg(f,'Вкажіть заголовок.'); return; }
    save(function(n){ if(id){ var i=n.posts.findIndex(function(x){return x.id===id;}); v.id=id; if(i>=0) n.posts[i]=v; } else { v.id=uid(); n.posts.push(v); } });
  });
}
function annForm(){
  var body='<form id="f-ann" class="dlg-body">'+field('an-title','Заголовок блоку',state.site.annTitle)+field('an-text','Оголошення',(state.announcements||[]).join('\n'),{area:true,rows:7,hint:'Кожне оголошення з нового рядка. Видаліть рядок, щоб прибрати оголошення. Порожнє поле сховає блок.'})+'</form>';
  var o=openModal('Оголошення',body,footBtns('f-ann'));
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target; var v=f.querySelector('#an-text').value.split('\n').map(function(x){return x.trim();}).filter(Boolean); var t=val(f,'an-title')||'Оголошення'; save(function(n){ n.announcements=v; n.site.annTitle=t; }); });
}
function contactsForm(){
  var c=state.contacts||{};
  var body='<form id="f-con" class="dlg-body">'+field('co-title','Заголовок блоку',state.site.contactsTitle)+field('co-address','Адреса',c.address)+field('co-hours','Години консультацій',c.hours)+'<div class="grid2">'+field('co-email','E-mail',c.email,{type:'email'})+field('co-phone','Телефон',c.phone,{type:'tel'})+'</div><span class="hint" style="font-size:13px;color:var(--ink-2)">Порожні поля не показуються на сайті.</span></form>';
  var o=openModal('Контакти',body,footBtns('f-con'));
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target; var v={}; ['address','hours','email','phone'].forEach(function(k){ v[k]=val(f,'co-'+k); }); var t=val(f,'co-title')||'Контакти'; save(function(n){ n.contacts=v; n.site.contactsTitle=t; }); });
}
function confirmDel(title,onYes){
  var o=openModal('Видалити?','<p>«'+esc(title)+'» буде видалено з сайту. Цю дію не можна скасувати.</p>','<button class="pill" data-action="close">Скасувати</button><button class="pill dark" id="yes-del">'+ic('trash',15)+'Видалити</button>');
  o.querySelector('#yes-del').addEventListener('click',onYes);
}
function openItem(key,id){
  var it=(state.sections[key].items||[]).find(function(x){return x.id===id;}); if(!it) return;
  var s=T(key); var url=fileUrl(it.file); var link=safeUrl(it.link);
  var body='<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge c-'+tagColor(key,it.tag||'Інше')+'">'+esc(it.tag||'Інше')+'</span>'+(it.date?'<span class="badge" style="background:var(--panel)">'+esc(fmtDate(it.date,{day:'numeric',month:'long',year:'numeric'}))+'</span>':'')+'<span class="badge" style="background:var(--panel)">'+esc(s.label)+'</span></div>'+
    (it.desc?'<div class="text">'+paras(it.desc)+'</div>':'')+
    (it.file?'<div class="cur-file">'+ic('file',16)+'<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(it.file.name)+'</span><span style="color:var(--ink-2)">'+fsize(it.file.size)+'</span></div>':'')+
    (!it.file&&!link?'<p style="color:var(--ink-2);font-size:13.5px">Файл до цього матеріалу буде додано згодом.</p>':'');
  var foot='';
  if(editMode) foot+='<button class="pill danger" data-action="del-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'" style="margin-right:auto">'+ic('trash',15)+'Видалити</button><button class="pill" data-action="edit-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">'+ic('pencil',15)+'Редагувати</button>';
  var kind=fileKind(it.file), viewable=!!viewKind(it.file);
  if(it.file) foot+='<button class="pill'+(viewable?'':' dark')+'" data-action="dl" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">'+ic('download',15)+'Зберегти '+(kind==='Зображення'?'зображення':(kind==='Файл'?'файл':kind))+' на пристрій</button>';
  if(url && viewable) foot+='<a class="pill" href="'+esc(url)+'" target="_blank" rel="noopener">'+ic('external',15)+'Відкрити в новій вкладці</a>';
  if(link) foot+='<a class="pill'+(it.file?'':' dark')+'" href="'+esc(link)+'" target="_blank" rel="noopener">'+ic('link',15)+'Перейти за посиланням</a>';
  if(it.file && viewable) foot+='<button class="pill dark" data-action="view" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">'+ic('file',15)+(kind==='PDF'?'Переглянути PDF':'Переглянути')+'</button>';
  openModal(esc(it.title),body,foot,true);
}
function openPost(id){ var po=(state.posts||[]).find(function(x){return x.id===id;}); if(!po) return;
  openModal(esc(po.title),'<span class="eyebrow">'+esc(fmtDate(po.date,{day:'numeric',month:'long',year:'numeric'}))+'</span><div class="text">'+paras(po.text)+'</div>',editMode?'<button class="pill danger" data-action="del-post" data-id="'+esc(po.id)+'" style="margin-right:auto">'+ic('trash',15)+'Видалити</button><button class="pill" data-action="edit-post" data-id="'+esc(po.id)+'">'+ic('pencil',15)+'Редагувати</button>':'',true); }
function download(key,id){
  var it=(state.sections[key].items||[]).find(function(x){return x.id===id;}); if(!it||!it.file) return;
  toast('Готую файл…');
  fileBlob(it.file).then(function(b){ var u=URL.createObjectURL(b), a=document.createElement('a'); a.href=u; a.download=it.file.name||'material'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){ URL.revokeObjectURL(u); },30000); toast('Файл збережено'); },
    function(){ toast('Не вдалося завантажити файл. Перевірте інтернет і спробуйте ще раз.'); });
}
/* ---------- built-in PDF viewer ---------- */
var PDFJS_BASE='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
var pdfjsReady=null, viewerCleanup=null;
function loadScript(src){ return new Promise(function(res,rej){ var sc=document.createElement('script'); sc.src=src; sc.onload=res; sc.onerror=function(){ rej(new Error('script')); }; document.head.appendChild(sc); }); }
function loadPdfjs(){
  if(window.pdfjsLib && window.pdfjsWorker) return Promise.resolve(window.pdfjsLib);
  if(!pdfjsReady) pdfjsReady=loadScript(PDFJS_BASE+'pdf.min.js').then(function(){ return loadScript(PDFJS_BASE+'pdf.worker.min.js'); }).then(function(){ if(!window.pdfjsLib) throw new Error('pdfjs'); return window.pdfjsLib; });
  pdfjsReady.catch(function(){ pdfjsReady=null; });
  return pdfjsReady;
}
var MAMMOTH_URL='https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js', mammothReady=null;
function loadMammoth(){ if(window.mammoth) return Promise.resolve(window.mammoth); if(!mammothReady){ mammothReady=loadScript(MAMMOTH_URL).then(function(){ if(!window.mammoth) throw new Error('mammoth'); return window.mammoth; }); mammothReady.catch(function(){ mammothReady=null; }); } return mammothReady; }
function viewKind(f){ if(!f) return ''; var k=fileKind(f), e=extOf(f.name); if(k==='PDF') return 'pdf'; if(k==='Зображення') return 'img'; if(e==='docx') return 'docx'; if(e==='txt'||f.type==='text/plain') return 'txt'; return ''; }
function cleanHtml(html){ var d=document.createElement('div'); d.innerHTML=html; d.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach(function(x){ x.remove(); });
  d.querySelectorAll('*').forEach(function(el){ [].slice.call(el.attributes).forEach(function(a){ var n=a.name.toLowerCase(); if(n.indexOf('on')===0) el.removeAttribute(a.name); if((n==='href'||n==='src') && !/^(https?:|data:image\/|#)/i.test(a.value)) el.removeAttribute(a.name); }); if(el.tagName==='A'){ el.setAttribute('target','_blank'); el.setAttribute('rel','noopener'); } });
  return d.innerHTML; }
function viewFile(key,id){
  var it=(state.sections[key].items||[]).find(function(x){return x.id===id;}); if(!it||!it.file) return;
  closeModal();
  var f=it.file, kind=viewKind(f), zoom=1, pdf=null, objUrl=null, obs=null, alive=true, link=safeUrl(it.link), tg=T(key);
  var o=document.createElement('div'); o.className='overlay viewer-ov'; o.id='modal';
  var details=(it.desc||it.date||it.tag);
  o.innerHTML='<div class="viewer" role="dialog" aria-modal="true" aria-label="'+esc(it.title)+'"><div class="vbar"><strong>'+esc(it.title)+'</strong><span class="vinfo" id="v-info"></span>'+
    (kind==='pdf'?'<button class="icon-btn" id="v-out" aria-label="Зменшити" title="Зменшити">−</button><button class="icon-btn" id="v-in" aria-label="Збільшити" title="Збільшити">+</button>':'')+
    (document.fullscreenEnabled?'<button class="icon-btn" id="v-fs" aria-label="На весь екран" title="На весь екран">'+ic('external',15)+'</button>':'')+
    (details?'<button class="pill sm" id="v-det">Опис</button>':'')+
    (link?'<a class="pill sm" href="'+esc(link)+'" target="_blank" rel="noopener">'+ic('link',15)+'Посилання</a>':'')+
    '<button class="pill sm" data-action="dl" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">'+ic('download',15)+'Зберегти</button>'+
    (editMode?'<button class="icon-btn" data-action="edit-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'" aria-label="Редагувати" title="Редагувати">'+ic('pencil',15)+'</button><button class="icon-btn danger" data-action="del-item" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'" aria-label="Видалити" title="Видалити">'+ic('trash',15)+'</button>':'')+
    '<button class="icon-btn" data-action="close" aria-label="Закрити" title="Закрити">'+ic('x',16)+'</button></div>'+
    (details?'<div class="vdet" id="v-detbox" hidden><div class="pills" style="display:flex;gap:8px;flex-wrap:wrap">'+(it.tag?'<span class="badge c-'+tagColor(key,it.tag)+'">'+esc(it.tag)+'</span>':'')+(it.date?'<span class="badge" style="background:var(--panel)">'+esc(fmtDate(it.date,{day:'numeric',month:'long',year:'numeric'}))+'</span>':'')+(tg?'<span class="badge" style="background:var(--panel)">'+esc(tg.label)+'</span>':'')+'</div>'+(it.desc?'<div class="text">'+paras(it.desc)+'</div>':'')+'</div>':'')+
    '<div class="vbody" id="vbody"><div class="vload"><span class="spin"></span><span id="v-status">Завантажую файл…</span></div></div></div>';
  document.body.appendChild(o); document.addEventListener('keydown',escClose);
  var body=o.querySelector('#vbody'), info=o.querySelector('#v-info'), st=o.querySelector('#v-status');
  var det=o.querySelector('#v-det'); if(det) det.addEventListener('click',function(){ var bx=o.querySelector('#v-detbox'); bx.hidden=!bx.hidden; det.textContent=bx.hidden?'Опис':'Сховати опис'; });
  var fs=o.querySelector('#v-fs'); if(fs) fs.addEventListener('click',function(){ try{ if(document.fullscreenElement) document.exitFullscreen(); else { var p=o.requestFullscreen&&o.requestFullscreen(); if(p&&p.catch) p.catch(function(){}); } }catch(e){} });
  viewerCleanup=function(){ alive=false; if(obs) obs.disconnect(); if(objUrl) URL.revokeObjectURL(objUrl); if(pdf){ try{ pdf.destroy(); }catch(e){} } try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){} };
  function fail(msg){ if(!alive) return; var u=(!f.chunks&&fileUrl(f));
    body.innerHTML='<div class="empty" style="margin:auto;max-width:460px;background:var(--paper)">'+ic('file',28)+'<span>'+esc(msg)+'</span>'+'<button class="pill dark" data-action="dl" data-sec="'+esc(key)+'" data-id="'+esc(it.id)+'">'+ic('download',15)+'Зберегти файл на пристрій</button>'+(u?'<a class="pill" href="'+esc(u)+'" target="_blank" rel="noopener">'+ic('external',15)+'Відкрити в новій вкладці</a>':'')+'</div>'; }
  function pageInfo(){ if(!pdf) return; var pages=body.querySelectorAll('.vpage'), br=body.getBoundingClientRect(), line=br.top+body.clientHeight/3, cur=1;
    for(var i=0;i<pages.length;i++){ if(pages[i].getBoundingClientRect().top<=line) cur=i+1; else break; }
    if(body.scrollTop+body.clientHeight>=body.scrollHeight-4) cur=pages.length;
    info.textContent='Сторінка '+cur+' з '+pdf.numPages+(zoom!==1?' · '+Math.round(zoom*100)+'%':''); }
  function renderPages(){
    if(!alive||!pdf) return; if(obs) obs.disconnect();
    var keepRatio=body.scrollHeight?body.scrollTop/body.scrollHeight:0;
    body.innerHTML=''; var avail=Math.max(200,Math.min(body.clientWidth-32,1100)), dpr=Math.min(2,window.devicePixelRatio||1);
    obs=new IntersectionObserver(function(es){ es.forEach(function(en){ if(!en.isIntersecting) return; var el=en.target; obs.unobserve(el); drawPage(el); }); },{root:body,rootMargin:'1500px 0px'});
    for(var n=1;n<=pdf.numPages;n++){ var d=document.createElement('div'); d.className='vpage'; d.setAttribute('data-n',n); d.style.width=Math.round(avail*zoom)+'px'; d.style.height=Math.round(avail*zoom*1.414)+'px'; d.textContent='Сторінка '+n+'…'; body.appendChild(d); obs.observe(d); }
    body.scrollTop=keepRatio*body.scrollHeight;
    function drawPage(el){ var n=+el.getAttribute('data-n');
      pdf.getPage(n).then(function(page){ if(!alive) return; var base=page.getViewport({scale:1}); var scale=avail*zoom/base.width; var vp=page.getViewport({scale:scale*dpr});
        var c=document.createElement('canvas'); c.width=Math.floor(vp.width); c.height=Math.floor(vp.height); c.style.width=Math.round(vp.width/dpr)+'px'; c.style.height=Math.round(vp.height/dpr)+'px';
        el.style.height=c.style.height; el.style.width=c.style.width; el.textContent=''; el.appendChild(c);
        return page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise; }).catch(function(){ el.textContent='Сторінку '+n+' не вдалося показати'; });
    }
    pageInfo();
  }
  body.addEventListener('scroll',function(){ if(pdf) pageInfo(); },{passive:true});
  if(kind==='pdf'){
    o.querySelector('#v-in').addEventListener('click',function(){ zoom=Math.min(3,zoom*1.25); renderPages(); });
    o.querySelector('#v-out').addEventListener('click',function(){ zoom=Math.max(0.5,zoom/1.25); renderPages(); });
    var rt; window.addEventListener('resize',function onR(){ if(!alive){ window.removeEventListener('resize',onR); return; } clearTimeout(rt); rt=setTimeout(renderPages,250); });
  }
  if(!kind){ fail('Файли «'+fileKind(f)+'» не можна переглянути на сайті. Збережіть файл на пристрій і відкрийте у відповідній програмі. Порада: збережіть документ як PDF, тоді його можна буде гортати прямо тут.'); return; }
  fileBlob(f).then(function(blob){
    if(!alive) return;
    if(kind==='img'){ objUrl=URL.createObjectURL(blob); body.innerHTML='<img src="'+objUrl+'" alt="'+esc(it.title)+'">'; return; }
    if(kind==='txt'){ return blob.text().then(function(t){ body.innerHTML='<div class="vdoc"><pre style="white-space:pre-wrap;font:inherit;margin:0"></pre></div>'; body.querySelector('pre').textContent=t; }); }
    if(kind==='docx'){ st.textContent='Відкриваю документ…'; return Promise.all([blob.arrayBuffer(),loadMammoth()]).then(function(r){ return r[1].convertToHtml({arrayBuffer:r[0]}); }).then(function(res){ if(!alive) return; body.innerHTML='<div class="vdoc">'+cleanHtml(res.value||'<p>Документ порожній.</p>')+'</div>'; info.textContent='Word'; },function(){ fail('Не вдалося показати документ на сторінці. Збережіть його на пристрій, щоб відкрити у Word.'); }); }
    st.textContent='Відкриваю PDF…';
    return Promise.all([blob.arrayBuffer(),loadPdfjs()]).then(function(r){
      return r[1].getDocument({data:new Uint8Array(r[0]),isEvalSupported:false,useSystemFonts:true}).promise; }).then(function(doc){ pdf=doc; renderPages(); },function(){ fail('Не вдалося показати PDF на сторінці. Збережіть файл на пристрій, щоб відкрити його в програмі для PDF.'); });
  }).catch(function(){ fail('Не вдалося завантажити файл. Перевірте інтернет і спробуйте ще раз.'); });
}

/* ---------- events ---------- */
function go(key){ if(!validTab(key)) key='home'; tab=key; closeModal(); render(); uiSave(); try{ history.replaceState(null,'','#'+key); }catch(e){} window.scrollTo(0,0); }
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-go]'); if(g){ go(g.getAttribute('data-go')); return; }
  if(e.target.closest('a')) return;
  var b=e.target.closest('[data-action]'); if(!b) return;
  var a=b.getAttribute('data-action'), sec=b.getAttribute('data-sec'), id=b.getAttribute('data-id');
  if(a==='close') closeModal();
  else if(a==='login') loginForm();
  else if(a==='logout'){ setToken(''); canEdit=false; editMode=false; render(); uiSave(); toast('Ви вийшли. На цьому пристрої редагування вимкнено.'); }
  else if(a==='enter-edit'){ if(!canEdit){ loginForm(); return; } editMode=true; render(); uiSave(); toast('Режим редагування увімкнено'); }
  else if(a==='exit-edit'){ editMode=false; render(); uiSave(); }
  else if(a==='filter'){ filters[sec]=b.getAttribute('data-tag'); render(); }
  else if(a==='open-item'){ var oi=(state.sections[sec].items||[]).find(function(x){return x.id===id;}); if(oi&&oi.file&&viewKind(oi.file)) viewFile(sec,id); else openItem(sec,id); }
  else if(a==='open-post') openPost(id);
  else if(a==='dl') download(sec,id);
  else if(a==='view') viewFile(sec,id);
  else if(a==='copy'){ var v=b.getAttribute('data-val'); try{ navigator.clipboard.writeText(v).then(function(){ toast('Скопійовано'); },function(){ toast(v); }); }catch(err){ toast(v); } }
  else if(!editMode) return;
  else if(a==='edit-profile') profileForm();
  else if(a==='site-settings') siteForm();
  else if(a==='tabs-manager') tabsManager();
  else if(a==='new-tab') tabForm(null);
  else if(a==='edit-tab') tabForm(sec);
  else if(a==='edit-filters') filtersForm(sec);
  else if(a==='auto-covers') autoCovers(sec);
  else if(a==='del-tab') delTab(sec);
  else if(a==='add-item') itemForm(sec,null);
  else if(a==='edit-item') itemForm(sec,id);
  else if(a==='del-item'){ var it=(state.sections[sec].items||[]).find(function(x){return x.id===id;}); if(!it) return;
    confirmDel(it.title,function(){ dropAsset(it.file); dropCover(it.cover); save(function(n){ n.sections[sec].items=n.sections[sec].items.filter(function(x){return x.id!==id;}); }); }); }
  else if(a==='add-post') postForm(null);
  else if(a==='edit-post') postForm(id);
  else if(a==='del-post'){ var po=(state.posts||[]).find(function(x){return x.id===id;}); if(!po) return; confirmDel(po.title,function(){ save(function(n){ n.posts=n.posts.filter(function(x){return x.id!==id;}); }); }); }
  else if(a==='hide-rail'){ var names={profile:'Картка з фото',ann:state.site.annTitle,recent:state.site.recentTitle||'Нещодавно додано',contacts:state.site.contactsTitle};
    var o=openModal('Прибрати блок?','<p>Блок «'+esc(names[id])+'» зникне з бокової панелі. Його вміст збережеться, і блок можна повернути в «Налаштуваннях сайту».</p>','<button class="pill" data-action="close">Скасувати</button><button class="pill dark" id="yes-hide">'+ic('trash',15)+'Прибрати</button>');
    o.querySelector('#yes-hide').addEventListener('click',function(){ save(function(n){ n.site.rail[id]=false; }); }); }
  else if(a==='edit-ann') annForm();
  else if(a==='edit-contacts') contactsForm();
});
document.addEventListener('keydown',function(e){ if((e.key==='Enter'||e.key===' ') && e.target.classList && e.target.classList.contains('card')){ e.preventDefault(); e.target.click(); } });

/* ---------- login & boot ---------- */
function loginForm(){
  var body='<form id="f-login" class="dlg-body"><p>Щоб редагувати сайт, вставте свій <b>ключ доступу GitHub</b>. Він зберігається лише на цьому пристрої, тож вводити його треба один раз на кожному телефоні чи комп’ютері.</p>'+
    field('lg-token','Ключ доступу','',{type:'password',ph:'github_pat_…'})+
    '<details><summary style="cursor:pointer;font-weight:500">Де взяти ключ?</summary><ol style="margin:8px 0 0;padding-left:20px;display:grid;gap:4px;font-size:13.5px;color:var(--ink-2)">'+
    '<li>Увійдіть на github.com у свій акаунт.</li><li>Відкрийте Settings → Developer settings → Personal access tokens → <b>Fine-grained tokens</b> → Generate new token.</li>'+
    '<li>Repository access: <b>Only select repositories</b> → оберіть сховище сайту.</li><li>Permissions → Repository permissions → <b>Contents: Read and write</b>.</li><li>Натисніть Generate token і скопіюйте ключ сюди.</li></ol></details>'+
    '<p class="form-msg" role="alert"></p></form>';
  var o=openModal('Вхід для вчителя',body,'<button class="pill" data-action="close">Скасувати</button><button class="pill dark" type="submit" form="f-login">Увійти</button>');
  o.querySelector('form').addEventListener('submit',function(e){ e.preventDefault(); var f=e.target; var t=f.querySelector('#lg-token').value.trim();
    if(!t){ formMsg(f,'Вставте ключ доступу.'); return; }
    setToken(t); setBusy('Перевіряю ключ…');
    checkToken().then(function(ok){ setBusy(null);
      if(!ok){ setToken(''); formMsg(f,'Цей ключ не дає права змінювати сайт. Перевірте, що обрано потрібне сховище і дозвіл «Contents: Read and write».'); return; }
      canEdit=true; editMode=true; closeModal();
      return loadData().then(function(d){ state=migrate(d); render(); uiSave(); toast('Вхід виконано. Режим редагування увімкнено.'); });
    },function(err){ setBusy(null); setToken(''); formMsg(f,err&&err.status===401?'Ключ недійсний. Скопіюйте його ще раз повністю.':ghErr(err)); });
  });
}
function pagesData(){ return fetch('data/site.json?v='+Date.now(),{cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error('http'); return r.json(); }); }
function loadData(){
  if(!canEdit) return pagesData();
  var c=ghCfg();
  return api('{repo}/contents/data/site.json?ref='+encodeURIComponent(c.branch),{accept:'application/vnd.github.raw',raw:true})
    .then(function(b){ return b.text(); }).then(JSON.parse).catch(function(){ return pagesData(); });
}
function setTitle(){ if(!state) return; var t=state.site.brand||'Перша парта'; if(state.profile&&state.profile.name) t+=' — '+state.profile.name; document.title=t; }
var _render=render; render=function(){ _render(); setTitle(); };
function boot(){
  var c0=getToken()?checkToken().catch(function(){ return false; }):Promise.resolve(false);
  c0.then(function(ok){ canEdit=!!ok; if(!ok && getToken()) setToken(''); if(canEdit && wantEdit) editMode=true; return loadData(); })
    .then(function(d){ state=migrate(d); if(hash && validTab(hash)) tab=hash; else if(saved && saved.tab && validTab(saved.tab)) tab=saved.tab; render(); if(saved && typeof saved.y==='number' && saved.y>0){ setTimeout(function(){ window.scrollTo(0,saved.y); },60); } })
    .catch(function(){ document.getElementById('app').innerHTML='<div class="frame"><div class="empty" style="margin:40px auto;max-width:480px;background:var(--paper)">Не вдалося завантажити сайт. Оновіть сторінку.</div></div>'; });
}
boot();
})();