/* ===== Gondavalekar Maharaj Upasana PWA - Main App ===== */

const SCHEDULE = [
  { id: 1, timeKey: 'sch1_time', titleKey: 'sch1_title', descKey: 'sch1_desc', hour: 4, min: 0 },
  { id: 2, timeKey: 'sch2_time', titleKey: 'sch2_title', descKey: 'sch2_desc', hour: 4, min: 45 },
  { id: 3, timeKey: 'sch3_time', titleKey: 'sch3_title', descKey: 'sch3_desc', hour: 5, min: 30 },
  { id: 4, timeKey: 'sch4_time', titleKey: 'sch4_title', descKey: 'sch4_desc', hour: 7, min: 0 },
  { id: 5, timeKey: 'sch5_time', titleKey: 'sch5_title', descKey: 'sch5_desc', hour: 8, min: 0 },
  { id: 6, timeKey: 'sch6_time', titleKey: 'sch6_title', descKey: 'sch6_desc', hour: 10, min: 0 },
  { id: 7, timeKey: 'sch7_time', titleKey: 'sch7_title', descKey: 'sch7_desc', hour: 12, min: 0 },
  { id: 8, timeKey: 'sch8_time', titleKey: 'sch8_title', descKey: 'sch8_desc', hour: 16, min: 30 },
  { id: 9, timeKey: 'sch9_time', titleKey: 'sch9_title', descKey: 'sch9_desc', hour: 19, min: 30 },
  { id: 10, timeKey: 'sch10_time', titleKey: 'sch10_title', descKey: 'sch10_desc', hour: 20, min: 30 },
  { id: 11, timeKey: 'sch11_time', titleKey: 'sch11_title', descKey: 'sch11_desc', hour: 21, min: 30 },
];

const TEACHING_KEYS = ['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12','t13','t14','t15'];

let deferredInstallPrompt = null;

/* ===== Navigation ===== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-link, .bottom-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  closeSideNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openSideNav() {
  document.getElementById('sideNav').classList.add('open');
  document.getElementById('navOverlay').classList.add('show');
}
function closeSideNav() {
  document.getElementById('sideNav').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('show');
}

/* ===== Schedule Rendering ===== */
function renderSchedule() {
  const list = document.getElementById('scheduleList');
  if (!list) return;
  list.innerHTML = SCHEDULE.map(item => `
    <div class="schedule-item">
      <div class="schedule-time">${t(item.timeKey)}</div>
      <div class="schedule-details">
        <h4>${t(item.titleKey)}</h4>
        <p>${t(item.descKey)}</p>
        <div class="schedule-actions">
          <button class="btn-sm wa" onclick="shareItemWhatsApp(${item.id})">WhatsApp</button>
          <button class="btn-sm cal" onclick="addToGoogleCalendar(${item.id})">Calendar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTeachings() {
  const list = document.getElementById('teachingsList');
  if (!list) return;
  list.innerHTML = TEACHING_KEYS.map((key, i) => `
    <div class="teaching-item">
      <div class="teaching-num">${i + 1}</div>
      <p>${t(key)}</p>
    </div>
  `).join('');
}

function renderReminderOptions() {
  const container = document.getElementById('reminderOptions');
  if (!container) return;
  const saved = JSON.parse(localStorage.getItem('reminders') || '[]');
  container.innerHTML = SCHEDULE.filter(s => [2, 7, 9, 11].includes(s.id) || s.id === 1).map(item => {
    const checked = saved.includes(item.id) ? 'checked' : '';
    return `
      <label class="reminder-check">
        <input type="checkbox" value="${item.id}" ${checked} />
        <span>${t(item.timeKey)} — ${t(item.titleKey)}</span>
      </label>
    `;
  }).join('') + `
    <label class="reminder-check">
      <input type="checkbox" value="japa" ${saved.includes('japa') ? 'checked' : ''} />
      <span>${t('practice1').substring(0, 50)}...</span>
    </label>
  `;
}

function renderCalendarButtons() {
  const container = document.getElementById('calendarButtons');
  if (!container) return;
  container.innerHTML = SCHEDULE.filter(s => [2, 7, 9, 11].includes(s.id)).map(item => `
    <button class="btn btn-calendar" style="font-size:0.85rem;padding:10px;" onclick="addToGoogleCalendar(${item.id})">
      📅 ${t(item.titleKey)} (${t(item.timeKey)})
    </button>
  `).join('');
}

/* ===== WhatsApp Share ===== */
function getScheduleText() {
  let text = '🙏 *Shri Gondavalekar Maharaj - Daily Upasana Schedule*\n';
  text += '📍 Samadhi Mandir, Gondavale Budruk\n\n';
  SCHEDULE.forEach(item => {
    text += `*${t(item.timeKey)}* — ${t(item.titleKey)}\n`;
  });
  text += '\n🕉️ श्री राम जय राम जय जय राम\n';
  text += '(Shared via Gondavale Upasana App)';
  return text;
}

function shareItemWhatsApp(id) {
  const item = SCHEDULE.find(s => s.id === id);
  if (!item) return;
  const text = `🙏 *${t(item.titleKey)}*\n⏰ ${t(item.timeKey)}\n${t(item.descKey)}\n\n🕉️ श्री राम जय राम जय जय राम`;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function shareScheduleWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(getScheduleText()), '_blank');
}

function shareMantraWhatsApp() {
  const text = '🕉️ *श्री राम जय राम जय जय राम*\n\nShri Ram Jai Ram Jai Jai Ram\n\n— The Trayodashakshari Mantra of Shri Gondavalekar Maharaj\n\n🙏 Keep chanting with devotion.';
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function shareApp() {
  const url = window.location.href.split('#')[0];
  const text = `🙏 Install the *Gondavalekar Maharaj Upasana* App\n\nDaily schedule, teachings, naam japa reminders & more.\n\n🕉️ श्री राम जय राम जय जय राम\n\n${url}`;
  if (navigator.share) {
    navigator.share({ title: 'Gondavale Upasana', text, url }).catch(() => {
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    });
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  }
}

/* ===== Google Calendar ===== */
function addToGoogleCalendar(id) {
  const item = SCHEDULE.find(s => s.id === id);
  if (!item) return;

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), item.hour, item.min, 0);
  // If time already passed today, schedule for tomorrow
  if (start < now) start.setDate(start.getDate() + 1);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min duration

  const format = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const title = encodeURIComponent(t(item.titleKey) + ' - Gondavalekar Maharaj');
  const details = encodeURIComponent(t(item.descKey) + '\n\n🕉️ श्री राम जय राम जय जय राम');
  const location = encodeURIComponent('Samadhi Mandir, Gondavale Budruk, Satara, Maharashtra');

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${format(start)}/${format(end)}&details=${details}&location=${location}&recur=RRULE:FREQ=DAILY`;
  window.open(url, '_blank');
}

function addAllToCalendar() {
  // Open the first few important ones; full ICS would need download
  SCHEDULE.filter(s => [2, 7, 9, 11].includes(s.id)).forEach((item, i) => {
    setTimeout(() => addToGoogleCalendar(item.id), i * 600);
  });
}

/* ===== Notifications ===== */
async function enableNotifications() {
  const statusEl = document.getElementById('notifStatus');
  if (!('Notification' in window)) {
    statusEl.textContent = 'Notifications not supported in this browser.';
    statusEl.className = 'status-text error';
    return;
  }
  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      statusEl.textContent = '✅ Notifications enabled! Save your preferred reminders below.';
      statusEl.className = 'status-text success';
      localStorage.setItem('notifEnabled', '1');
      // Test notification
      new Notification('Gondavale Upasana', {
        body: '🕉️ Notifications enabled. श्री राम जय राम जय जय राम',
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png'
      });
    } else {
      statusEl.textContent = 'Permission denied. You can enable it later from browser settings.';
      statusEl.className = 'status-text error';
    }
  } catch (e) {
    statusEl.textContent = 'Error: ' + e.message;
    statusEl.className = 'status-text error';
  }
}

function saveReminders() {
  const checks = document.querySelectorAll('#reminderOptions input[type=checkbox]');
  const selected = [];
  checks.forEach(c => { if (c.checked) selected.push(isNaN(c.value) ? c.value : Number(c.value)); });
  localStorage.setItem('reminders', JSON.stringify(selected));
  localStorage.setItem('remindersSavedAt', Date.now());

  const statusEl = document.getElementById('notifStatus');
  statusEl.textContent = '✅ Reminders saved! You will receive alerts when the app is open or installed.';
  statusEl.className = 'status-text success';

  // Schedule simple in-page checks (PWA service worker can enhance later)
  scheduleLocalChecks();
}

function scheduleLocalChecks() {
  // Clear previous
  if (window._reminderInterval) clearInterval(window._reminderInterval);

  const saved = JSON.parse(localStorage.getItem('reminders') || '[]');
  if (!saved.length || localStorage.getItem('notifEnabled') !== '1') return;

  window._reminderInterval = setInterval(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    saved.forEach(id => {
      if (id === 'japa') return; // daily japa handled differently
      const item = SCHEDULE.find(s => s.id === id);
      if (item && item.hour === h && item.min === m) {
        const key = `notified_${item.id}_${now.toDateString()}`;
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, '1');
          if (Notification.permission === 'granted') {
            new Notification(t(item.titleKey), {
              body: t(item.descKey).substring(0, 100),
              icon: 'icons/icon-192.png',
              tag: 'upasana-' + item.id
            });
          }
        }
      }
    });
  }, 30000); // check every 30s
}

/* ===== PWA Install ===== */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'inline-flex';
});

async function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById('installBtn').style.display = 'none';
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Splash
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
  }, 1800);

  // Language
  const savedLang = localStorage.getItem('lang') || 'en';
  document.getElementById('langSelect').value = savedLang;
  applyTranslations();

  document.getElementById('langSelect').addEventListener('change', (e) => {
    localStorage.setItem('lang', e.target.value);
    applyTranslations();
  });

  // Nav
  document.getElementById('menuBtn').addEventListener('click', openSideNav);
  document.getElementById('closeNav').addEventListener('click', closeSideNav);
  document.getElementById('navOverlay').addEventListener('click', closeSideNav);

  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.dataset.page;
      if (page) {
        showPage(page);
        history.replaceState(null, '', '#' + page);
      }
    });
  });

  // Hash routing
  const hash = location.hash.replace('#', '') || 'home';
  showPage(hash);

  // Buttons
  document.getElementById('shareScheduleWhatsApp')?.addEventListener('click', shareScheduleWhatsApp);
  document.getElementById('shareFullWhatsApp')?.addEventListener('click', shareScheduleWhatsApp);
  document.getElementById('shareMantraWhatsApp')?.addEventListener('click', shareMantraWhatsApp);
  document.getElementById('shareAppBtn')?.addEventListener('click', shareApp);
  document.getElementById('addAllToCalendar')?.addEventListener('click', addAllToCalendar);
  document.getElementById('enableNotifications')?.addEventListener('click', enableNotifications);
  document.getElementById('saveReminders')?.addEventListener('click', saveReminders);
  document.getElementById('installBtn')?.addEventListener('click', installApp);

  // Render dynamic content
  renderSchedule();
  renderTeachings();
  renderReminderOptions();
  renderCalendarButtons();

  // Resume reminders if previously enabled
  if (localStorage.getItem('notifEnabled') === '1' && Notification.permission === 'granted') {
    scheduleLocalChecks();
    const statusEl = document.getElementById('notifStatus');
    if (statusEl) {
      statusEl.textContent = '✅ Notifications active.';
      statusEl.className = 'status-text success';
    }
  }

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW reg failed', err));
  }
});

// Expose for inline onclick
window.shareItemWhatsApp = shareItemWhatsApp;
window.addToGoogleCalendar = addToGoogleCalendar;
window.renderSchedule = renderSchedule;
window.renderTeachings = renderTeachings;
window.renderReminderOptions = renderReminderOptions;
window.renderCalendarButtons = renderCalendarButtons;
