// IQFit — мини-приложение. Данные прайса и вопросов — здесь, чтобы легко править.

const PRICES = {
  rinat: [
    { name: 'Массаж спины', cost: '1600 ₽', old: '2000 ₽', badge: 'первый раз', sub: 'далее 2000 ₽' },
    { name: 'Массаж всего тела, 60 мин', cost: '2500 ₽', sub: 'спина, ноги, руки' },
    { name: 'Массаж всего тела, 90 мин', cost: '3500 ₽', sub: 'спина, ноги, руки' },
    { name: 'Хиджама', cost: 'от 1800 ₽' },
    { name: 'Массаж + хиджама', cost: '4000 ₽' },
    { name: 'Восстановление после травм и нагрузок', cost: 'от 1500 ₽' },
  ],
  dina: [
    { name: 'Пробная EMS-тренировка', cost: '500 ₽', badge: 'новым', sub: '40 минут с тренером' },
    { name: 'EMS персонально, 8 занятий', cost: '8000 ₽', sub: '1000 ₽ за тренировку' },
    { name: 'EMS персонально, 12 занятий', cost: '10000 ₽', sub: '≈ 830 ₽ за тренировку' },
    { name: 'Аппаратный массаж', cost: 'от 700 ₽', sub: 'от 20 минут' },
    { name: 'Indiba', cost: 'от 800 ₽' },
    { name: 'SMAS-лифтинг', cost: 'от 2500 ₽', sub: 'без уколов' },
    { name: 'Liposonix', cost: 'от 3000 ₽' },
    { name: 'Онлайн-тренировка', cost: '900 ₽' },
    { name: 'План питания и очищения', cost: 'от 1500 ₽', sub: 'индивидуально' },
    { name: 'Марафон', cost: 'от 1600 ₽', sub: 'питание, ежедневный контроль, чат, домашние тренировки, подарки' },
  ],
};

const FAQ = [
  ['Через сколько я похудею?', 'Первый результат заметен через 3–5 занятий: EMS запускает жиросжигание и подтягивает кожу за счёт лимфодренажа. Чтобы результат был максимальным, добавьте питьевой режим и хотя бы минимальный контроль питания. С нашим аппаратным или ручным массажем сантиметры уходят ещё быстрее.'],
  ['Почему тренировка длится всего 40 минут?', 'В обычном зале мышцы работают по очереди: ноги, потом руки, с отдыхом между подходами. В EMS-костюме 90% мышц сокращаются одновременно и без пауз. Такая нагрузка в зале заняла бы 1,5–2,5 часа.'],
  ['Как часто нужно ходить?', '2–3 раза в неделю. Мышцам нужно минимум 48 часов на восстановление — удобно, если нет времени ходить в зал через день.'],
  ['Нужно ли проходить курсом?', 'Для желаемого результата обычно хватает 2–4 месяцев. Дальше достаточно 1–2 тренировок в неделю, чтобы держать форму.'],
  ['Будут ли болеть мышцы?', 'На следующий день вы почувствуете мышцы — даже те, о которых не подозревали. Значит, тренировка сработала. В конце занятия включаем расслабляющий EMS-лимфодренаж, а после тренировки советуем массаж — так тело восстанавливается легче.'],
  ['Когда я увижу первый результат?', 'Лёгкость и энергию — после 1–2 занятий. Подтянутую кожу и меньше отёков — через 4–5 тренировок. Минус размер и крепкий мышечный корсет — за месяц регулярных занятий, 8–10 сеансов.'],
  ['Можно ли массаж после тренировки?', 'Да, и мы это очень советуем. Ручной или аппаратный массаж сразу после EMS расслабляет мышцы, снимает напряжение и помогает избежать сильной боли на следующий день.'],
  ['С какого возраста можно?', 'EMS — с 18 лет и в любом возрасте, если нет противопоказаний: суставы и позвоночник не нагружаются. На массаж к Ринату — с 5 лет.'],
  ['Я никогда не ходил(а) в зал. Мне можно?', 'Да, это идеальный старт. Упражнения простые: приседания, наклоны, планка. Тренер рядом, следит за техникой и подбирает комфортную силу импульса.'],
  ['Поможет ли EMS после родов?', 'Да, это один из лучших способов вернуть форму: подтягивает кожу, укрепляет мышцы живота и тазового дна. Начинать можно примерно через 2–3 месяца после естественных родов, после кесарева — около 6 месяцев. В обоих случаях — после консультации с врачом.'],
  ['Можно прийти с ребёнком?', 'Да! У нас индивидуальный формат, без толпы. Включим ребёнку мультики, дадим раскраски — а у вас будут 40 минут для себя.'],
];

// ── Телеграм: тема и системная кнопка ──────────────────
const tg = window.Telegram?.WebApp;
const inTelegram = Boolean(tg && tg.initData);

if (inTelegram) {
  tg.ready();
  tg.expand();
  document.documentElement.classList.add('in-telegram');
  document.body.classList.add('in-telegram');
  const applyTheme = () => document.documentElement.setAttribute('data-theme', tg.colorScheme === 'dark' ? 'dark' : 'light');
  applyTheme();
  tg.onEvent('themeChanged', applyTheme);
  try { tg.setHeaderColor('#FFFFFF'); } catch {}
  tg.MainButton.setParams({ text: 'Записаться', color: '#F0631F', text_color: '#FFFFFF' });
  tg.MainButton.show();
  tg.MainButton.onClick(() => openBooking('', ''));
}

// ── Прайс ──────────────────────────────────────────────
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function renderPrice(who) {
  document.getElementById(`price-${who}`).innerHTML = PRICES[who]
    .map((p) => `
      <li class="price__row" data-book="${esc(p.name + (p.badge ? ` (${p.badge})` : ''))}" data-who="${who}" tabindex="0" role="button" aria-label="Записаться: ${esc(p.name)}, ${esc(p.cost)}">
        <span class="price__name">${esc(p.name)}${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}</span>
        <span class="price__cost">${p.old ? `<s>${esc(p.old)}</s>` : ''}${esc(p.cost)}</span>
        ${p.sub ? `<span class="price__sub">${esc(p.sub)}</span>` : '<span></span>'}
        <button class="price__book" data-book="${esc(p.name + (p.badge ? ` (${p.badge})` : ''))}" data-who="${who}">Записаться</button>
      </li>`)
    .join('');
}
renderPrice('rinat');
renderPrice('dina');

// Переключатель Ринат / Дина
document.querySelectorAll('.switch button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const who = btn.dataset.who;
    document.querySelectorAll('.switch button').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    document.querySelectorAll('.who').forEach((p) => (p.hidden = p.dataset.panel !== who));
    tg?.HapticFeedback?.selectionChanged();
  });
});

// ── Вопросы ────────────────────────────────────────────
document.getElementById('faq-list').innerHTML = FAQ
  .map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
  .join('');

// ── Запись: WhatsApp или MAX с готовым текстом ─────────
const CONTACT = {
  phone: '+7 903 347-14-49',
  tel: 'tel:+79033471449',
  whatsapp: 'https://wa.me/79033471449',
  max: 'https://max.ru/u/f9LHodD0cOIJLXoY-qWx6doPcJaySaVC5pmfuoykwsz6bCbhaBUN5xqDTvY',
  maxBot: 'https://max.ru/se14546602_bot', // бот студии в MAX — сам принимает запись
};
const WHO_NAME = { rinat: 'к Ринату', dina: 'к Дине' };

const sheet = document.getElementById('chooser');
const toast = document.getElementById('toast');
let draft = '';
let current = { service: '', who: '' };
// Код для бота MAX: первая буква мастера + услуга (base64url), чтобы бот сразу знал, куда записывать
const maxCode = ({ service, who }) => {
  const b64 = btoa(unescape(encodeURIComponent((service || '').slice(0, 40)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return (who ? who[0] : 'x') + b64;
};

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('on');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('on'), 3200);
}
function openExternal(url) {
  if (inTelegram) tg.openLink(url);
  else window.open(url, '_blank', 'noopener');
}

function openBooking(service, who) {
  current = { service: service || '', who: who || '' };
  draft = 'Здравствуйте! Хочу записаться' + (who ? ` ${WHO_NAME[who]}` : '') +
    (service ? `: ${service}.` : '.') + ' Пишу из приложения «Про тело ЕМС».';
  document.getElementById('book-what').textContent = service || 'Выберите удобный мессенджер — ответим быстро';
  document.getElementById('book-draft').textContent = draft;
  document.getElementById('go-wa').href = CONTACT.whatsapp + '?text=' + encodeURIComponent(draft);
  document.getElementById('go-max').href = `${CONTACT.maxBot}?start=${maxCode(current)}`;
  tg?.HapticFeedback?.impactOccurred('light');
  if (typeof sheet.showModal === 'function') sheet.showModal();
  else openExternal(CONTACT.whatsapp + '?text=' + encodeURIComponent(draft));
}

sheet.addEventListener('click', async (e) => {
  const go = e.target.closest('[data-go]');
  if (go) {
    // Внутри Телеграма внешние ссылки открываем его способом, в браузере — обычный переход по ссылке
    if (inTelegram && go.dataset.go !== 'call') { e.preventDefault(); tg.openLink(go.href); }
    setTimeout(() => sheet.close(), 50);
    return;
  }
  if (e.target === sheet || e.target.closest('[data-close]')) sheet.close();
});

const maxHelp = document.getElementById('maxhelp');
maxHelp.addEventListener('click', (e) => {
  if (e.target.closest('[data-maxopen]')) { maxHelp.close(); openExternal(CONTACT.max); }
  else if (e.target === maxHelp || e.target.closest('[data-close]')) { maxHelp.close(); sheet.showModal(); }
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-book]');
  if (el && !el.closest('#chooser')) openBooking(el.dataset.book, el.dataset.who);
});

// Карта — в Телеграме открываем через его браузер
document.querySelectorAll('.map-link').forEach((a) => a.addEventListener('click', (e) => {
  if (!inTelegram) return;
  e.preventDefault();
  tg.openLink(e.currentTarget.href);
}));

// ── Живые плашки ───────────────────────────────────────
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Блик на акциях
document.querySelectorAll('.offer').forEach((o) => o.insertAdjacentHTML('beforeend', '<span class="offer-shine" aria-hidden="true"></span>'));

// Плашки выезжают при прокрутке — по очереди
if (!calm && 'IntersectionObserver' in window) {
  const items = document.querySelectorAll('.price li, .bill, .faq details, .gallery img, .who__photo, .wide, .warn, .kids, .contacts, .maps .btn');
  items.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const siblings = [...en.target.parentElement.children].filter((s) => s.classList.contains('reveal'));
      en.target.style.transitionDelay = Math.min(siblings.indexOf(en.target), 6) * 60 + 'ms';
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px' });
  items.forEach((el) => io.observe(el));
  // Подстраховка: долистали до конца — показываем всё; остановились — показываем всё, что на экране
  const showAll = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'));
  const showVisible = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
  });
  let idle;
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) showAll();
    clearTimeout(idle); idle = setTimeout(showVisible, 600);
  }, { passive: true });
  // Переключение Ринат/Дина — показываем плашки нового мастера сразу
  document.querySelectorAll('.switch button').forEach((b) => b.addEventListener('click', () =>
    document.querySelectorAll('.who:not([hidden]) .reveal').forEach((el) => el.classList.add('is-in'))));
}

// Счётчик «1000 клиентов» набегает при открытии
const counter = document.querySelector('.count');
if (counter && !calm) {
  const to = +counter.dataset.to, t0 = performance.now(), dur = 1400;
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
    counter.textContent = v + (k === 1 ? '+' : '');
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Акции чуть наклоняются вслед за пальцем
if (!calm) document.querySelectorAll('.offer').forEach((o) => {
  o.classList.add('tilt');
  o.addEventListener('pointermove', (e) => {
    const r = o.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    o.style.transform = `perspective(500px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  o.addEventListener('pointerleave', () => (o.style.transform = ''));
});

// ── ВАУ 1: электрические разряды на первом экране ──────
(function sparks() {
  const hero = document.querySelector('.hero');
  const cv = document.querySelector('.sparks');
  if (!hero || !cv || calm) return;
  const ctx = cv.getContext('2d');
  const flash = document.createElement('div');
  flash.className = 'hero__flash';
  hero.prepend(flash);
  const big = document.querySelector('.hero__big');

  let W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
  const resize = () => {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const bolts = [];   // молнии
  const dots = [];    // искры
  const rnd = (a, b) => a + Math.random() * (b - a);

  // Молния: ломаная между двумя точками (метод «середины со смещением»)
  function bolt(x1, y1, x2, y2, power = 1) {
    let pts = [[x1, y1], [x2, y2]];
    let off = Math.hypot(x2 - x1, y2 - y1) * 0.25;
    for (let i = 0; i < 6; i++) {
      const next = [];
      for (let j = 0; j < pts.length - 1; j++) {
        const [ax, ay] = pts[j], [bx, by] = pts[j + 1];
        const mx = (ax + bx) / 2, my = (ay + by) / 2;
        const nx = -(by - ay), ny = bx - ax, len = Math.hypot(nx, ny) || 1;
        const d = rnd(-off, off);
        next.push([ax, ay], [mx + (nx / len) * d, my + (ny / len) * d]);
      }
      next.push(pts[pts.length - 1]);
      pts = next;
      off /= 2;
    }
    bolts.push({ pts, life: 1, power });
    for (let i = 0; i < 10 * power; i++) {
      const p = pts[Math.floor(Math.random() * pts.length)];
      dots.push({ x: p[0], y: p[1], vx: rnd(-1.5, 1.5), vy: rnd(-2, 0.5), life: 1 });
    }
  }

  // Случайный «импульс» по телу — в правой части, где человек на фото
  function autoBolt() {
    const x1 = rnd(W * 0.45, W * 0.95), y1 = rnd(H * 0.05, H * 0.45);
    const ang = rnd(0, Math.PI * 2), len = rnd(60, 160);
    bolt(x1, y1, x1 + Math.cos(ang) * len, y1 + Math.sin(ang) * len, 0.7);
  }

  // Разряд от касания пальцем
  hero.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a')) return;
    const r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    for (let i = 0; i < 3; i++) bolt(x, y, x + rnd(-170, 170), y + rnd(-150, 150), 1.4);
    flash.style.setProperty('--x', x + 'px');
    flash.style.setProperty('--y', y + 'px');
    flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
    big.classList.remove('buzz'); void big.offsetWidth; big.classList.add('buzz');
    tg?.HapticFeedback?.impactOccurred('medium');
  });

  let visible = true, next = 0, last = performance.now();
  new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(hero);

  function frame(t) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const dt = Math.min(50, t - last) / 16.7; last = t;
    if (t > next) { autoBolt(); next = t + rnd(700, 2000); }
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i];
      b.life -= 0.06 * dt;
      if (b.life <= 0) { bolts.splice(i, 1); continue; }
      const flick = b.life * (0.6 + Math.random() * 0.4);
      ctx.beginPath();
      b.pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.shadowColor = 'rgba(245,210,30,.9)'; ctx.shadowBlur = 18;
      ctx.strokeStyle = `rgba(240,99,31,${0.55 * flick})`; ctx.lineWidth = 5 * b.power; ctx.stroke();
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `rgba(255,248,200,${flick})`; ctx.lineWidth = 1.6 * b.power; ctx.stroke();
    }
    ctx.shadowBlur = 0;
    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i];
      d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 0.08 * dt; d.life -= 0.035 * dt;
      if (d.life <= 0) { dots.splice(i, 1); continue; }
      ctx.fillStyle = `rgba(245,210,30,${d.life})`;
      ctx.fillRect(d.x, d.y, 2, 2);
    }
  }
  requestAnimationFrame(frame);
})();

// ── ВАУ 2: шторка «до / после» ─────────────────────────
document.querySelectorAll('.ba').forEach((ba) => {
  const range = ba.querySelector('.ba__range');
  const set = (v) => ba.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => set(range.value));
  range.addEventListener('change', () => tg?.HapticFeedback?.selectionChanged());
  if (calm) return;
  // Подсказка: шторка сама «прогуливается», когда появляется на экране
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    const keys = [50, 22, 78, 50], dur = 2200, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur) * (keys.length - 1), i = Math.min(keys.length - 2, Math.floor(k));
      const e = k - i, s = e * e * (3 - 2 * e), v = keys[i] + (keys[i + 1] - keys[i]) * s;
      set(v); range.value = v;
      if (k < keys.length - 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
  io.observe(ba);
});

// ── ВАУ 3: фото «дышат» глубиной при прокрутке ─────────
if (!calm) {
  const pics = [...document.querySelectorAll('.who__photo img, .wide img, .kids img')];
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    pics.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1…1
      img.style.transform = `scale(1.12) translateY(${(p * -22).toFixed(1)}px)`;
    });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// ── ВАУ 4: заставка «Включаем костюм» (один раз за визит) ──
(function splash() {
  const el = document.getElementById('splash');
  let seen = false;
  try { seen = sessionStorage.getItem('splash') === '1'; sessionStorage.setItem('splash', '1'); } catch {}
  if (!el || calm || seen) return;
  el.classList.add('run');
  const n = document.getElementById('splash-n');
  const t0 = performance.now(), dur = 1100;
  let done = false;
  const finish = () => {
    if (done) return; done = true;
    tg?.HapticFeedback?.impactOccurred('heavy');
    el.classList.add('boom');
    setTimeout(() => el.remove(), 560);
  };
  const tick = (t) => {
    if (done) return;
    const k = Math.min(1, (t - t0) / dur);
    n.textContent = Math.round(100 * k * k);
    if (k < 1) requestAnimationFrame(tick); else setTimeout(finish, 150);
  };
  requestAnimationFrame(tick);
  el.addEventListener('pointerdown', finish);
})();

// ── ВАУ 5: «Включите костюм сами» — видео перематывается ползунком ──
(function suitVideo() {
  const box = document.querySelector('.suit');
  const video = document.getElementById('suit-video');
  if (!box || !video) return;
  // Зона: название, текст, где подсветить на видео (% слева, % сверху; null — зона сзади)
  const ZONES = {
    abs: ['Пресс', 'Работают глубокие мышцы живота, которые сложно «включить» обычными упражнениями.', [50, 40]],
    arms: ['Руки', 'Подтянутые руки без гантелей и штанг: импульс работает за вас.', [27, 33]],
    chest: ['Грудь', 'Тонус грудных мышц и красивая осанка — плечи сами расправляются.', [50, 24]],
    legs: ['Бёдра', 'Упругие бёдра: мышцы работают на каждом приседе в полную силу.', [41, 58]],
    glutes: ['Ягодицы', 'Упругие ягодицы без тяжёлых весов и нагрузки на колени.', null],
    back: ['Спина', 'Крепкий мышечный корсет — спина держит осанку без усилий.', null],
  };
  const title = document.getElementById('zone-title'), text = document.getElementById('zone-text');
  const spot = document.getElementById('suit-spot');
  const select = (z) => {
    const [t, d, pos] = ZONES[z];
    title.textContent = t; text.textContent = d;
    box.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.zone === z)));
    spot.hidden = !pos;
    if (pos) {
      spot.style.left = pos[0] + '%'; spot.style.top = pos[1] + '%';
      spot.classList.remove('ping'); void spot.offsetWidth; spot.classList.add('ping');
    }
  };
  box.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
    select(c.dataset.zone);
    tg?.HapticFeedback?.impactOccurred('light');
  }));
  select('abs');

  // Перемотка видео по мощности
  const power = document.getElementById('power'), out = document.getElementById('power-n'), hint = document.getElementById('power-hint');
  const flash = box.querySelector('.suit__flash');
  let ready = false, want = 0, seeking = false, lastStep = 0, flashed = false;
  const seek = () => {
    if (!ready || seeking) return;
    const t = (want / 100) * (video.duration - 0.05);
    if (Math.abs(video.currentTime - t) < 0.02) return;
    seeking = true;
    video.currentTime = t;
  };
  video.addEventListener('seeked', () => { seeking = false; seek(); });
  if (video.readyState >= 1) ready = true;
  video.addEventListener('loadedmetadata', () => { ready = true; seek(); });
  // iPhone: видео нужно «разбудить» первым касанием, иначе перемотка не работает
  document.addEventListener('pointerdown', () => { video.play().then(() => video.pause()).catch(() => {}); }, { once: true });

  function set(v, fromUser) {
    want = v;
    out.textContent = Math.round(v);
    box.style.setProperty('--power', (v / 100).toFixed(2));
    box.classList.toggle('hot', v >= 75);
    seek();
    if (fromUser) hint.style.opacity = 0;
    const step = Math.floor(v / 10);
    if (fromUser && step !== lastStep) { lastStep = step; tg?.HapticFeedback?.impactOccurred(v >= 75 ? 'heavy' : 'light'); }
    // Разряд в момент превращения
    if (v >= 52 && !flashed) {
      flashed = true;
      flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
      if (fromUser) tg?.HapticFeedback?.notificationOccurred('success');
    }
    if (v < 40) flashed = false;
  }
  power.addEventListener('input', () => set(+power.value, true));

  // Демонстрация: блок появился на экране — ползунок сам пробегает 0 → 100 → 30
  if (!calm) {
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const keys = [0, 100, 30], dur = 3600, t0 = performance.now();
      let touched = false;
      power.addEventListener('pointerdown', () => (touched = true), { once: true });
      const step = (t) => {
        if (touched) return;
        const k = Math.min(1, (t - t0) / dur) * (keys.length - 1), i = Math.min(keys.length - 2, Math.floor(k));
        const e = k - i, s = e * e * (3 - 2 * e), v = keys[i] + (keys[i + 1] - keys[i]) * s;
        power.value = v; set(v, false);
        if (k < keys.length - 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 400);
    }, { threshold: 0.5 });
    io.observe(box);
  }
})();

// ── Процедуры Дины: карточки + окно с «до/после» ───────
// ba — пары фото «до/после» (одна картинка из двух половин). Пусто — «фото скоро».
const PROCEDURES = [
  { id: 'liposonix', name: 'Liposonix', price: 'от 3000 ₽', img: 'img/dina.jpg', ba: ['img/result-2.webp', 'img/result-3.webp'],
    desc: 'Аппаратная коррекция фигуры: работает с локальными жировыми отложениями на животе, боках и бёдрах. Без уколов и разрезов, первый эффект виден сразу после процедуры.' },
  { id: 'apparat', name: 'Аппаратный массаж', price: 'от 700 ₽', img: 'img/dina-vacuum.jpg', ba: [],
    desc: 'Вакуумный и вибромассаж: моделирует силуэт, помогает против целлюлита и уменьшает отёчность. Отлично сочетается с EMS-тренировкой.' },
  { id: 'smas', name: 'SMAS-лифтинг', price: 'от 2500 ₽', img: '', ba: [],
    desc: 'Ультразвуковой лифтинг лица без уколов: подтягивает овал и чёткость контуров.' },
  { id: 'indiba', name: 'Indiba', price: 'от 800 ₽', img: '', ba: [],
    desc: 'Радиочастотная процедура: улучшает тонус и упругость кожи. Хорошо сочетается с массажем и Liposonix.' },
  { id: 'press', name: 'Прессотерапия', price: 'цена — уточняйте', img: '', ba: [],
    desc: 'Аппарат мягко и ритмично сжимает манжеты — как лимфодренажный массаж. Ощущение лёгкости в ногах и меньше отёков.' },
  { id: 'elos', name: 'ЭЛОС-эпиляция', price: 'цена — уточняйте', img: '', ba: [],
    desc: 'Удаление нежелательных волос на разных зонах тела и лица.' },
];

const baHTML = (src) => `
  <figure class="ba" style="--img:url(${src})">
    <div class="ba__layer ba__before" role="img" aria-label="До"></div>
    <div class="ba__layer ba__after" role="img" aria-label="После"></div>
    <span class="ba__label ba__label--l">до</span><span class="ba__label ba__label--r">после</span>
    <span class="ba__handle" aria-hidden="true"></span>
    <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Сравнить до и после">
  </figure>`;
const bindBA = (ba) => {
  const r = ba.querySelector('.ba__range');
  r.addEventListener('input', () => ba.style.setProperty('--pos', r.value + '%'));
};

document.getElementById('procs-list').innerHTML = PROCEDURES.map((p) => `
  <button class="proc-card reveal" data-proc="${p.id}">
    <span class="proc-card__img">${p.img ? `<img src="${p.img}" alt="" loading="lazy">` : `<span>${esc(p.name.slice(0, 1))}</span>`}
      ${p.ba.length ? '<span class="proc-card__ba">до / после</span>' : ''}</span>
    <span class="proc-card__body"><span class="proc-card__name">${esc(p.name)}</span><span class="proc-card__price">${esc(p.price)}</span></span>
  </button>`).join('');
document.querySelectorAll('.proc-card').forEach((c) => c.classList.add('is-in'));

const procDlg = document.getElementById('proc');
document.getElementById('procs-list').addEventListener('click', (e) => {
  const card = e.target.closest('[data-proc]');
  if (!card) return;
  const p = PROCEDURES.find((x) => x.id === card.dataset.proc);
  document.getElementById('proc-body').innerHTML = `
    <p class="proc__title">${esc(p.name)}</p>
    <p class="proc__price">${esc(p.price)}</p>
    <p>${esc(p.desc)}</p>
    ${p.ba.length ? p.ba.map(baHTML).join('') : '<p class="proc__soon">Фото «до/после» скоро появятся здесь.</p>'}
    <button class="btn btn--main" data-book="${esc(p.name)}" data-who="dina">Записаться к Дине</button>`;
  procDlg.querySelectorAll('.ba').forEach(bindBA);
  procDlg.showModal();
  tg?.HapticFeedback?.impactOccurred('light');
});
procDlg.addEventListener('click', (e) => {
  if (e.target === procDlg || e.target.closest('[data-close]')) procDlg.close();
  else if (e.target.closest('[data-book]')) procDlg.close();
});

// Строка прайса с клавиатуры (Enter / пробел)
document.addEventListener('keydown', (e) => {
  const row = e.target.closest?.('.price__row');
  if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openBooking(row.dataset.book, row.dataset.who); }
});

// ── Музыка: своя энергичная мелодия (играет сам телефон, без чужих треков) ──
(function music() {
  const btn = document.getElementById('music');
  if (!btn) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { btn.hidden = true; return; }
  let ctx, master, noise, timer, step = 0, nextT = 0, playing = false;
  const BPM = 122, S16 = 60 / BPM / 4;
  const BASS = [55, 55, 65.41, 49];                 // ля, ля, до, соль
  const ARP = [440, 523.25, 659.25, 523.25, 587.33, 659.25, 783.99, 659.25];

  function setup() {
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    master = ctx.createGain(); master.gain.value = 0.45;
    master.connect(comp).connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const env = (g, t, peak, dec) => { g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(0.001, t + dec); };
  function kick(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    env(g, t, 1, 0.35); o.connect(g).connect(master); o.start(t); o.stop(t + 0.36);
  }
  function hiss(t, type, freq, peak, dec) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise; f.type = type; f.frequency.value = freq;
    env(g, t, peak, dec); s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dec + 0.02);
  }
  function tone(t, freq, type, peak, dec, cutoff) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = cutoff;
    env(g, t, peak, dec); o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dec + 0.02);
  }
  function play(s, t) {
    const i = s % 16, bar = Math.floor(s / 16) % 4;
    if (i % 4 === 0) kick(t);
    if (i % 4 === 2) { hiss(t, 'highpass', 7000, 0.22, 0.05); tone(t, BASS[Math.floor(i / 4)] * (bar === 3 ? 1.122 : 1), 'sawtooth', 0.28, 0.22, 700); }
    if (i === 4 || i === 12) hiss(t, 'bandpass', 1600, 0.35, 0.16);
    if (i % 2 === 1) hiss(t, 'highpass', 9000, 0.06, 0.03);
    if (bar >= 2) tone(t, ARP[s % 8], 'triangle', 0.07, 0.12, 4000);
  }
  function schedule() {
    while (nextT < ctx.currentTime + 0.12) { play(step, nextT); step++; nextT += S16; }
  }
  function start() {
    if (!ctx) setup();
    ctx.resume();
    nextT = ctx.currentTime + 0.05;
    timer = setInterval(schedule, 25);
    playing = true;
  }
  function stop() { clearInterval(timer); ctx?.suspend(); playing = false; }

  btn.addEventListener('click', () => {
    playing ? stop() : start();
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Выключить музыку' : 'Включить музыку');
    tg?.HapticFeedback?.impactOccurred('light');
  });
  // Свернули приложение — музыка на паузу
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) { stop(); btn.setAttribute('aria-pressed', 'false'); } });
})();

// ── Вкладки: подсвечиваем раздел, который сейчас на экране ──
(function scrollspy() {
  const links = [...document.querySelectorAll('.tabs a')];
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const a = map.get(en.target.id);
      if (a) { a.classList.add('is-active'); a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: calm ? 'auto' : 'smooth' }); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();

// На компьютере подсказка «кликните», на телефоне — «коснитесь»
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const hint = document.querySelector('.hero__hint');
  if (hint) hint.textContent = 'кликните по экрану ⚡';
}
