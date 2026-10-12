import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const projects = [
  ['KOHO', 'https://www.koho.ca/', 'Staff Software Engineer, working out how everyday banking could feel simpler.'],
  ['alugaTI', 'https://alugati.com', 'Rethinking how companies get their tech: rent it, keep it current, and get support built in.'],
  ['Front In Vale', 'https://frontinvale.com.br', "A front-end conference in Brazil's Vale do Paraíba, sharing how the web works and how to build it better."]
];
const socials = [['Email', 'mailto:hi@silviorodrigues.dev'], ['LinkedIn', 'https://www.linkedin.com/in/silviorrr/'], ['GitHub', 'https://github.com/silviorodrigues']];
async function visit(page) { await page.goto('/'); await page.evaluate(() => document.fonts.ready); }
async function capture(page, name, info) {
  if (info.project.name !== 'chromium') return;
  await mkdir('test-results/field-notes', { recursive: true });
  await page.screenshot({ path: `test-results/field-notes/${name}.png`, fullPage: true });
}
async function geometry(page) { return page.evaluate(() => ({ height: document.documentElement.scrollHeight, boxes: [...document.querySelectorAll('.work-list li')].map(e => { const r=e.getBoundingClientRect(); return [r.x,r.y,r.width,r.height]; }), descriptions: [...document.querySelectorAll('.work-description')].map(e=>[e.offsetWidth,e.offsetHeight]) })); }
test.beforeEach(async ({ context }) => { await context.route(/^https:\/\//, route => route.fulfill({ contentType: 'text/html', body: '<title>Outbound destination</title>' })); });
test('foundation serves a semantic local document', async ({ page }) => { await visit(page); await expect(page).toHaveTitle('Silvio Rodrigues — Field Notes'); await expect(page.getByRole('main')).toBeVisible(); });
test('US1 desktop content and native destinations', async ({ page }, info) => {
  await visit(page);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Silvio Rodrigues');
  await expect(page.locator('.biography')).toHaveText('Curious about how things work, and how they could work better.');
  await expect(page.getByRole('list', { name: 'Selected work' }).getByRole('listitem')).toHaveCount(3);
  await expect(page.locator('.work-title')).toHaveText(projects.map(p => p[0]));
  for (const [name, url, description] of projects) {
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', url); await expect(link).toHaveAccessibleDescription(description);
    await expect(link).toHaveAttribute('target', '_blank'); await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    const popup = page.waitForEvent('popup'); await link.click(); const tab = await popup;
    await tab.waitForLoadState(); expect(tab.url().replace(/\/$/, '')).toBe(url.replace(/\/$/, '')); await tab.close();
  }
  await expect(page.locator('.impact-badge')).toHaveText('3k+ people impacted');
  for (const [name, url] of socials) await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute('href', url);
  const response = await page.request.get('/'); const html = await response.text();
  for (const [,url] of [...projects,...socials]) expect(html).toContain(`href="${url}"`);
  await page.mouse.move(0, 0); const before = await geometry(page);
  await page.getByRole('link', { name: 'KOHO', exact: true }).hover();
  await expect(page.locator('#koho .work-title')).toHaveCSS('color', 'rgb(156, 74, 42)');
  expect(await geometry(page)).toEqual(before);
  await page.mouse.move(0,0); await page.keyboard.press('Tab'); await page.locator('#koho .work-card').focus();
  await expect(page.locator('#koho .work-card')).toHaveCSS('outline-style', 'solid');
  await page.locator('#koho .work-card').blur(); await capture(page, 'us1-day', info);
});
async function readableLayout(page) {
  const result = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const elements = [...document.querySelectorAll('h1, .biography, .work-card, .work-title, .work-description, .impact-badge, .social-links a')];
    return { overflow: document.documentElement.scrollWidth - width, clipped: elements.filter(e => e.scrollWidth > e.clientWidth + 1).map(e=>e.className), outside: elements.filter(e => { const r=e.getBoundingClientRect(); return r.left < -1 || r.right > width+1; }).map(e=>e.className) };
  });
  expect(result).toEqual({ overflow: 0, clipped: [], outside: [] });
  const cards=await page.locator('.work-card').all();
  for (let i=1;i<cards.length;i++) { const a=await cards[i-1].boundingBox(), b=await cards[i].boundingBox(); expect(b.y).toBeGreaterThan(a.y+a.height); }
  await page.getByRole('link',{name:'GitHub',exact:true}).scrollIntoViewIfNeeded();
  await expect(page.getByRole('link',{name:'GitHub',exact:true})).toBeInViewport();
}
test('US2 wrapping at five widths, doubled text, and expanded copy', async ({ page }, info) => {
  await visit(page);
  for (const width of [320,390,768,1280,1440]) {
    await page.setViewportSize({width,height:800});
    for (const size of ['16px','32px']) { await page.evaluate(size => document.documentElement.style.fontSize=size,size); await readableLayout(page); }
    await page.evaluate(()=>document.documentElement.style.fontSize='16px');
  }
  await page.setViewportSize({width:390,height:800}); await page.evaluate(()=>scrollTo(0,0)); await capture(page,'us2-mobile-day',info);
  await page.evaluate(()=> { document.querySelector('.work-title').textContent='A much longer future project title with UnbrokenFutureProjectName'; document.querySelector('.work-description').textContent+=' More details about future work. '.repeat(8); document.querySelector('h1 em').textContent='RodriguesWithAnExtendedFamilyName'; });
  await page.evaluate(()=>document.documentElement.style.fontSize='32px'); await readableLayout(page);
});
test('US2 keyboard links and profile actions', async ({ page, browserName }) => {
  await visit(page); const enhanced=await page.locator('.theme-control').isVisible();
  const tabKey=browserName==='webkit'?'Alt+Tab':'Tab';
  if(enhanced) await page.keyboard.press(tabKey);
  for(const [name] of [...projects,...socials]) {
    await page.keyboard.press(tabKey); const link=page.getByRole('link',{name,exact:true}); await expect(link).toBeFocused(); await expect(link).toHaveCSS('outline-style','solid');
    if(name!=='Email') { const popup=page.waitForEvent('popup'); await page.keyboard.press('Enter'); const tab=await popup; await tab.waitForLoadState(); await tab.close(); }
  }
});
test('US2 first touch follows each project', async ({ browser }, info) => {
  const context=await browser.newContext({hasTouch:true,viewport:{width:390,height:800},reducedMotion:'reduce'});
  await context.route(/^https:\/\//,route=>route.fulfill({body:'Destination'})); const page=await context.newPage(); await page.goto('http://127.0.0.1:4173/');
  for(const [name,url] of projects) { const popup=page.waitForEvent('popup'); await page.getByRole('link',{name,exact:true}).tap(); const tab=await popup; await tab.waitForLoadState(); expect(tab.url().replace(/\/$/,'')).toBe(url.replace(/\/$/,'')); await tab.close(); }
  await context.close();
});
test('US2 broken social icons retain visible text and targets', async ({ page }) => {
  await page.route('**/assets/**/email.svg',route=>route.abort()); await page.route('**/assets/**/linkedin.svg',route=>route.abort()); await page.route('**/assets/**/github.svg',route=>route.abort()); await visit(page);
  for(const [name] of socials) {const link=page.getByRole('link',{name,exact:true}); await expect(link.locator('.icon-fallback')).toBeVisible(); const r=await link.boundingBox(); expect(r.width).toBeGreaterThanOrEqual(44); expect(r.height).toBeGreaterThanOrEqual(44); }
});
test('US2 no JavaScript retains all content and navigation', async ({ browser })=> {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:800}});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Silvio Rodrigues'); await expect(page.getByRole('link')).toHaveCount(6);await expect(page.locator('.theme-control')).toBeHidden();for(const [name] of socials) await expect(page.getByRole('link',{name,exact:true}).locator('.icon-fallback')).toBeVisible();await context.close();
});
test('US2 failed font, portrait, logo and decoration preserve layout and actions', async ({ page })=> {
  for(const resource of ['**/*.woff2','**/portrait.jpeg','**/koho.png','**/alugati.svg','**/front-in-vale.svg','**/ochre.svg','**/squiggle.svg','**/divider.svg','**/arrow.svg']) {
    await page.route(resource,route=>route.abort());await visit(page);await page.setViewportSize({width:390,height:800});await readableLayout(page);
    for(const [name,url] of [...projects,...socials]) await expect(page.getByRole('link',{name,exact:true})).toHaveAttribute('href',url);
    const slot=await page.locator('.portrait-area').boundingBox();expect([slot.width,slot.height]).toEqual([112,112]);await page.unroute(resource);
  }
});
test('US3 initialization precedence never saves inferred choices', async ({ browser })=> {
  for(const [saved,device,wanted] of [[null,'light','day'],[null,'dark','evening'],['day','dark','day'],['evening','light','evening'],['invalid','dark','evening']]) {
    const context=await browser.newContext({colorScheme:device});
    if(saved) await context.addInitScript(value=>localStorage.setItem('field-notes-theme',value),saved);
    const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');await expect(page.locator('html')).toHaveAttribute('data-theme',wanted);
    expect(await page.evaluate(()=>localStorage.getItem('field-notes-theme'))).toBe(saved);await context.close();
  }
});
for(const failure of ['property','read','write','device-throw','device-missing']) {
  test(`US3 isolated ${failure} failure`,async({page})=>{
    await page.emulateMedia({colorScheme:'dark'});
    await page.addInitScript(failure=>{
      if(failure==='property') Object.defineProperty(window,'localStorage',{get(){throw new Error('denied');}});
      if(failure==='read') Storage.prototype.getItem=()=>{throw new Error('denied');};
      if(failure==='write') Storage.prototype.setItem=()=>{throw new Error('denied');};
      if(failure==='device-throw') window.matchMedia=()=>{throw new Error('unavailable');};
      if(failure==='device-missing') window.matchMedia=undefined;
    },failure);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));await visit(page);const initial=failure.startsWith('device')?'day':'evening';await expect(page.locator('html')).toHaveAttribute('data-theme',initial);
    await page.getByRole('button').click();await expect(page.locator('html')).toHaveAttribute('data-theme',initial==='day'?'evening':'day');expect(errors).toEqual([]);
  });
}
test('US3 target names, keyboard, persistence and stable synchronous switching',async({page,browserName},info)=>{
  await visit(page);const button=page.getByRole('button',{name:'Switch to Evening'});await expect(button).toBeVisible();const r=await button.boundingBox();expect([r.width,r.height]).toEqual([44,44]);
  await page.keyboard.press(browserName==='webkit'?'Alt+Tab':'Tab');await expect(button).toBeFocused();await expect(button).toHaveCSS('outline-style','solid');
  await page.evaluate(()=>scrollTo(0,200));const before=await geometry(page);const scroll=await page.evaluate(()=>scrollY);
  const start=Date.now();await page.keyboard.press('Space');await expect(page.getByRole('button',{name:'Switch to Day'})).toBeFocused();expect(Date.now()-start).toBeLessThan(500);
  expect(await geometry(page)).toEqual(before);expect(await page.evaluate(()=>scrollY)).toBe(scroll);await expect(page.locator('body')).toHaveCSS('background-color','rgb(23, 20, 15)');
  expect(await page.evaluate(()=>localStorage.getItem('field-notes-theme'))).toBe('evening');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','evening');
  await page.goto('/?revisit');await expect(page.locator('html')).toHaveAttribute('data-theme','evening');
  await page.evaluate(()=>scrollTo(0,0));await capture(page,'us3-evening',info);
  await page.getByRole('button').focus();await page.keyboard.press('Enter');await expect(page.locator('html')).toHaveAttribute('data-theme','day');
  await page.keyboard.press('Space');await expect(page.locator('html')).toHaveAttribute('data-theme','evening');
  await page.setViewportSize({width:390,height:800});await capture(page,'us3-mobile-evening',info);
});
test('US3 both palettes retain layout at all widths and doubled text',async({page})=>{
  await visit(page);
  for(const theme of ['day','evening']) {
    if(await page.locator('html').getAttribute('data-theme')!==theme) await page.getByRole('button').click();
    for(const width of [320,390,768,1280,1440]) {await page.setViewportSize({width,height:800});for(const size of ['16px','32px']) {await page.evaluate(size=>document.documentElement.style.fontSize=size,size);await readableLayout(page);}await page.evaluate(()=>document.documentElement.style.fontSize='16px');}
  }
});
test('US4 normal motion, bounded orbit and live reduced motion',async({page},info)=>{
  test.setTimeout(40000);await page.emulateMedia({reducedMotion:'no-preference'});await visit(page);
  for(const [selector,duration,easing] of [['.portrait-morph','10s','ease-in-out'],['.ochre-orbit','22s','linear'],['.ochre-morph','7s','ease-in-out']]) {
    await expect(page.locator(selector)).toHaveCSS('animation-duration',duration);await expect(page.locator(selector)).toHaveCSS('animation-timing-function',easing);
  }
  const flow=await geometry(page);const states=new Set();
  for(let i=0;i<23;i++) {
    const sample=await page.evaluate(()=>{const p=document.querySelector('.portrait-area').getBoundingClientRect(),o=document.querySelector('.ochre-orbit').getBoundingClientRect(),n=document.querySelector('h1').getBoundingClientRect();return {transform:getComputedStyle(document.querySelector('.ochre-orbit')).transform, bounded:o.left>=p.left-27&&o.right<=p.right+27&&o.top>=p.top-27&&o.bottom<=p.bottom+27,clearName:o.bottom<n.top};});
    expect(sample.bounded).toBe(true);expect(sample.clearName).toBe(true);states.add(sample.transform);await page.waitForTimeout(1000);
  }
  expect(states.size).toBeGreaterThan(10);expect(await geometry(page)).toEqual(flow);
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const selector of ['.portrait-morph','.ochre-orbit','.ochre-morph']) await expect(page.locator(selector)).toHaveCSS('animation-name','none');
  await page.getByRole('link',{name:'KOHO',exact:true}).hover();await expect(page.locator('#koho .work-card')).toHaveCSS('transform','none');
});
test('US4 texture and pointer lift preserve neighbors and copy',async({page},info)=>{
  await page.emulateMedia({reducedMotion:'no-preference'});await visit(page);
  const overlay=await page.evaluate(()=>{const s=getComputedStyle(document.body,'::after');return [s.position,s.opacity,s.pointerEvents,s.mixBlendMode];});expect(overlay).toEqual(['fixed','0.22','none','multiply']);
  const before=await geometry(page);const link=page.getByRole('link',{name:'KOHO',exact:true});await link.hover();await page.waitForTimeout(400);
  await expect(link).toHaveCSS('transition-duration','0.35s');await expect(link).toHaveCSS('transition-timing-function','ease');
  const transform=await link.evaluate(e=> {const m=new DOMMatrix(getComputedStyle(e).transform);return {y:m.m42,degrees:Math.atan2(m.m12,m.m11)*180/Math.PI};});expect(transform.y).toBeCloseTo(-4,1);expect(transform.degrees).toBeCloseTo(-.3,1);expect(await geometry(page)).toEqual(before);
  await capture(page,'us4-hover',info);await page.mouse.move(0,0);await page.keyboard.press('Tab');await link.focus();await page.waitForTimeout(400);await expect(link).toHaveCSS('transform','none');
  await page.getByRole('button').click();expect(await page.evaluate(()=>getComputedStyle(document.body,'::after').mixBlendMode)).toBe('soft-light');
});
const resourceFiles = [
 'fonts/fraunces-normal.woff2','fonts/fraunces-italic.woff2','fonts/instrument-sans-normal.woff2','fonts/ibm-plex-mono-normal.woff2',
 'portrait.jpeg','day/koho.png','day/alugati.svg','evening/alugati.svg','day/front-in-vale.svg','evening/front-in-vale.svg',
 'day/theme.svg','evening/theme.svg','day/email.svg','evening/email.svg','day/linkedin.svg','evening/linkedin.svg','day/github.svg','evening/github.svg',
 'day/ochre.svg','day/squiggle.svg','day/divider.svg','evening/divider.svg','mobile-day/divider.svg','card/arrow.svg','paper-grain.svg'
];
for (const theme of ['day','evening']) {
 test(`regression ${theme}: each local resource fails independently`, async ({ page })=>{
  test.setTimeout(60000);await page.addInitScript(theme=>localStorage.setItem('field-notes-theme',theme),theme);
  for(const resource of resourceFiles) {
   const pattern=`**/assets/${resource}`;await page.route(pattern,route=>route.abort());await visit(page);
   await expect(page.locator('html')).toHaveAttribute('data-theme',theme);await page.setViewportSize({width:resource.includes('mobile')?390:1280,height:800});await readableLayout(page);
   for(const [name,url] of [...projects,...socials]) await expect(page.getByRole('link',{name,exact:true})).toHaveAttribute('href',url);
   const activePrefix=`${theme}/`;
   if(resource.startsWith(activePrefix)&&/\/(theme|email|linkedin|github)\.svg$/.test(resource)) {
     const label=resource.endsWith('theme.svg')?(theme==='day'?'Switch to Evening':'Switch to Day'):resource.endsWith('email.svg')?'Email':resource.endsWith('linkedin.svg')?'LinkedIn':'GitHub';
     const control=page.getByRole(resource.endsWith('theme.svg')?'button':'link',{name:label,exact:true});await expect(control.locator('.icon-fallback')).toBeVisible();
   }
   const slot=await page.locator('.portrait-area').boundingBox();expect([slot.width,slot.height]).toEqual([112,112]);await page.unroute(pattern);
  }
 });
 test(`regression ${theme}: combined failures, enlarged copy, and reduced motion`,async({page})=>{
   await page.addInitScript(theme=>{
     const getItem=Storage.prototype.getItem;Storage.prototype.getItem=function(key){return key==='field-notes-theme'?theme:getItem.call(this,key);};
     Storage.prototype.setItem=()=>{throw new Error('denied');};
   },theme);
   await page.route('**/assets/**',route=>route.abort());await page.setViewportSize({width:320,height:800});await visit(page);
   await page.evaluate(()=>{document.documentElement.style.fontSize='32px';document.querySelector('.work-description').textContent+=' Longer future copy. '.repeat(10);});await readableLayout(page);
   for(const control of await page.locator('.theme-control, .social-links a').all()) { const fits=await control.evaluate(e=> {const a=e.getBoundingClientRect(),b=e.querySelector('.icon-fallback').getBoundingClientRect();return b.top>=a.top&&b.bottom<=a.bottom;});expect(fits).toBe(true); }
   for(const [name] of socials) await expect(page.getByRole('link',{name,exact:true}).locator('.icon-fallback')).toBeVisible();
   const before=await geometry(page);await page.getByRole('button').evaluate(e=>e.click());await expect(page.locator('html')).toHaveAttribute('data-theme',theme==='day'?'evening':'day');expect(await geometry(page)).toEqual(before);
   for(const selector of ['.portrait-morph','.ochre-orbit','.ochre-morph']) await expect(page.locator(selector)).toHaveCSS('animation-name','none');
 });
}
test('regression runtime resources are all local and both palettes/artwork switch',async({page})=>{
 const requests=[];page.on('request',r=>requests.push(r.url()));await visit(page);
 for(const theme of ['day','evening']) {
  if(await page.locator('html').getAttribute('data-theme')!==theme) await page.getByRole('button').click();
  const tokens=await page.evaluate(()=>{const s=getComputedStyle(document.documentElement);return ['paper','ink','muted','card','line','accent'].map(k=>s.getPropertyValue(`--${k}`).trim());});
  expect(tokens).toEqual(theme==='day'?['#f2ede3','#231f1c','#5a534c','#f8f4ec','#ddd3c4','#9c4a2a']:['#17140f','#efe8dc','#b7aea2','#1f1b16','#352e26','#e0987a']);
  await expect(page.locator(`#alugati .${theme}-art`)).toBeVisible();
  const inactive=theme==='day'?'evening':'day'; for(const element of await page.locator(`.${inactive}-art`).all()) await expect(element).toBeHidden();await expect(page.locator('.theme-control').locator(`.${theme}-icon`)).toBeVisible();
 }
 expect(requests.every(url=>url.startsWith('http://127.0.0.1:4173/'))).toBe(true);
});
