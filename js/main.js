/* =====================================================================
   TM Construction — main script
   Uses the translations (js/i18n.js) and project data
   (js/projects.js).
   ===================================================================== */

/* ---------- extra words used by this design ---------- */
Object.assign(I18N.en, {
  "v2.quote": "I take up the work myself and do it myself — so the quality is my own responsibility.",
  "v2.callBig": "Call us directly",
  "v2.hq": "Dhola (Base)", "v2.bhav": "Bhavnagar", "v2.amr": "Amreli",
  "v2.overview": "Project <span>Overview</span>",
  "v2.scope": "Scope of <span>Work</span>",
  "v2.photos": "Project <span>Photos</span>",
  "v2.timeline": "Timeline",
  "v2.photoCount": "photos"
});
Object.assign(I18N.gu, {
  "v2.quote": "કામ હું જાતે રાખું છું અને જાતે કરું છું — એટલે ગુણવત્તાની જવાબદારી મારી પોતાની.",
  "v2.callBig": "સીધો ફોન કરો",
  "v2.hq": "ધોળા (મુખ્ય)", "v2.bhav": "ભાવનગર", "v2.amr": "અમરેલી",
  "v2.overview": "પ્રોજેક્ટ <span>વિશે</span>",
  "v2.scope": "કામની <span>વિગત</span>",
  "v2.photos": "પ્રોજેક્ટના <span>ફોટા</span>",
  "v2.timeline": "સમયરેખા",
  "v2.photoCount": "ફોટા"
});

const WA = "918460502992";
const LIST = typeof PROJECTS !== "undefined" ? PROJECTS : [];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
let lang = "gu";
const hooks = [];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const t = k => I18N[lang][k] ?? I18N.en[k] ?? "";
const L = o => (o && (o[lang] || o.en)) || "";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* */ } } };
/* link to a project details page */
const projUrl = p => `project.html?id=${encodeURIComponent(p.id)}`;

function fmtDate(iso, long) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  try { return d.toLocaleDateString(lang === "gu" ? "gu-IN" : "en-IN", long ? { day: "numeric", month: "short", year: "numeric" } : { month: "short", year: "numeric" }); }
  catch (e) { return iso; }
}
const months = (a, b) => Math.max(1, Math.round(((b ? new Date(b) : new Date()) - new Date(a)) / 2629800000));

function setLang(l) {
  lang = I18N[l] ? l : "gu";
  $$("[data-i18n]").forEach(el => { const v = I18N[lang][el.dataset.i18n]; if (typeof v === "string") el.innerHTML = v; });
  document.documentElement.lang = lang;
  document.body.classList.toggle("lang-gu", lang === "gu");
  document.title = t("_title");
  $$(".lg__opt").forEach(o => o.classList.toggle("is-active", o.dataset.lang === lang));
  store.set("tm-lang", lang);
  hooks.forEach(f => f());
}

/* ---------- reveal ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12, rootMargin: "0px 0px -40px 0px" }) : null;
function reveal(root = document) {
  $$(".rv:not(.in)", root).forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * .07 + "s";
    io ? io.observe(el) : el.classList.add("in");
  });
}

/* ---------- loader ---------- */
(function loader() {
  const el = $("#loader");
  if (!el) return;
  const fill = $(".ld__fill", el), pct = $("#ldPct"), bar = $(".ld__bar", el);
  /* time-based: fills in ~1.7s (waits for fonts, never for every photo); hard stop at 3.5s */
  const t0 = performance.now(), MIN = 1700, MAX = 3500;
  let ready = false, done = false;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { ready = true; });
  setTimeout(() => { ready = true; }, 1200);
  function paint(p) {
    pct.textContent = Math.round(p) + "%";
    fill.style.setProperty("--fill", (100 - p) + "%");
    bar.style.setProperty("--p", p + "%");
  }
  function frame(now) {
    const k = Math.min(1, (now - t0) / MIN);
    const p = (1 - Math.pow(1 - k, 2)) * 100;
    paint(p);
    if (k >= 1 && ready) return finish();
    requestAnimationFrame(frame);
  }
  setTimeout(() => { paint(100); finish(); }, MAX);
  function finish() {
    if (done) return; done = true;
    setTimeout(() => {
      el.classList.add("out");
      document.documentElement.classList.remove("is-loading");
      try { sessionStorage.setItem("tm2-loaded", "1"); } catch (e) { /* */ }
      setTimeout(() => el.remove(), 950);
    }, 250);
  }
  requestAnimationFrame(frame);
})();

/* ---------- lightbox ---------- */
const LB = (() => {
  let el, img, cap, cnt, list = [], i = 0, cb = null;
  function build() {
    el = document.createElement("div");
    el.className = "lb"; el.hidden = true;
    el.innerHTML = `<span class="lb__count"></span>
      <button class="lb__x" aria-label="Close"><svg><use href="#i-close"/></svg></button>
      <button class="lb__nav lb__nav--p" aria-label="Previous"><svg><use href="#i-left"/></svg></button>
      <figure><img alt="" /><figcaption></figcaption></figure>
      <button class="lb__nav lb__nav--n" aria-label="Next"><svg><use href="#i-right"/></svg></button>`;
    document.body.appendChild(el);
    img = $("img", el); cap = $("figcaption", el); cnt = $(".lb__count", el);
    $(".lb__x", el).onclick = close;
    $(".lb__nav--p", el).onclick = () => go(i - 1);
    $(".lb__nav--n", el).onclick = () => go(i + 1);
    el.addEventListener("click", e => { if (e.target === el || e.target.tagName === "FIGURE") close(); });
    let sx = 0;
    el.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)); });
    document.addEventListener("keydown", e => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === "ArrowRight") go(i + 1);
    });
  }
  function draw() {
    const it = list[i];
    img.src = it.src; img.alt = it.title || "";
    cap.innerHTML = `<strong>${esc(it.title || "")}</strong>${it.loc ? `<span><svg><use href="#i-pin"/></svg>${esc(it.loc)}</span>` : ""}${it.href ? `<a href="${it.href}">${t("gal.open")}<svg><use href="#i-arrow"/></svg></a>` : ""}`;
    cnt.textContent = `${String(i + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    $$(".lb__nav", el).forEach(b => { b.hidden = list.length < 2; });
  }
  function go(n) { i = (n + list.length) % list.length; draw(); if (cb) cb(i); }
  function open(items, start = 0, onChange = null) { if (!el) build(); list = items; i = start; cb = onChange; el.hidden = false; document.body.classList.add("no-scroll"); draw(); }
  function close() { el.hidden = true; document.body.classList.remove("no-scroll"); }
  return { open, isOpen: () => !!el && !el.hidden };
})();

/* ---------- header, menu, dropdown, language ---------- */
const hd = $("#header"), nav = $("#nav"), burger = $("#burger");
const onScroll = () => hd.classList.toggle("is-scrolled", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
burger.addEventListener("click", () => { const o = nav.classList.toggle("is-open"); burger.classList.toggle("is-open", o); });
$$("a", nav).forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); burger.classList.remove("is-open"); }));
$("#langToggle").addEventListener("click", () => setLang(lang === "gu" ? "en" : "gu"));

const dd = $("#navDrop");
if (dd) {
  const b = $(".dd__btn", dd);
  b.addEventListener("click", e => { e.stopPropagation(); b.setAttribute("aria-expanded", dd.classList.toggle("is-open")); });
  document.addEventListener("click", e => { if (!dd.contains(e.target)) { dd.classList.remove("is-open"); b.setAttribute("aria-expanded", "false"); } });
  document.addEventListener("keydown", e => { if (e.key === "Escape") dd.classList.remove("is-open"); });
}

/* active link while scrolling (home) */
const secIds = ["home", "about", "services", "projects", "gallery-section", "contact"].map(id => document.getElementById(id)).filter(Boolean);
if (secIds.length && io) {
  const links = $$(".hd__nav > a");
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("is-cur", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  secIds.forEach(s => so.observe(s));
}

/* ---------- back to top ---------- */
const toTopBtn = $("#toTop");
if (toTopBtn) {
  const c = $(".fb__ring circle", toTopBtn), LEN = 2 * Math.PI * 26;
  c.style.strokeDasharray = LEN;
  const up = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    c.style.strokeDashoffset = LEN * (1 - (max > 0 ? scrollY / max : 0));
    toTopBtn.classList.toggle("is-shown", scrollY > 600);
  };
  addEventListener("scroll", up, { passive: true }); up();
  toTopBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- hero slider (8 seconds) ---------- */
const heroText = $("#heroText");
if (heroText) {
  const texts = $$(".ht", heroText), imgs = $$(".hi"), bars = $$("#bars i"), no = $("#slideNo");
  const DUR = 8000;
  let i = 0, timer;
  $("#bars").style.setProperty("--dur", DUR + "ms");
  function go(n) {
    texts[i].classList.remove("is-active"); imgs[i].classList.remove("is-active");
    i = (n + texts.length) % texts.length;
    texts[i].classList.add("is-active"); imgs[i].classList.add("is-active");
    no.textContent = String(i + 1).padStart(2, "0");
    bars.forEach((b, k) => {
      b.classList.remove("run", "done");
      void b.offsetWidth;
      if (k < i) b.classList.add("done");
      if (k === i) b.classList.add("run");
    });
    clearTimeout(timer);
    timer = setTimeout(() => go(i + 1), DUR);
  }
  $("#nextSlide").onclick = () => go(i + 1);
  $("#prevSlide").onclick = () => go(i - 1);
  let sx = 0;
  const hero = $(".hero");
  hero.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 60) go(i + (d < 0 ? 1 : -1)); });
  go(0);
}

/* ---------- marquee: duplicate once for a seamless loop ---------- */
const mq = $("#mq");
if (mq) mq.innerHTML += mq.innerHTML;

/* ---------- counters ---------- */
const nums = $$("[data-count]");
if (nums.length) {
  const run = el => {
    const end = +el.dataset.count, t0 = performance.now(), D = 1800;
    const step = now => { const k = Math.min(1, (now - t0) / D); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (io && !REDUCED) {
    const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }), { threshold: .3 });
    nums.forEach(n => co.observe(n));
  } else nums.forEach(n => { n.textContent = n.dataset.count; });
}

/* ---------- project cards ---------- */
function card(p) {
  const done = p.status === "done";
  const range = `${fmtDate(p.start)} – ${done ? fmtDate(p.end) : t("pd.inprogress")}`;
  return `<a class="pc" href="${projUrl(p)}" data-cat="${p.cat}" draggable="false">
    <div class="pc__img"><img src="${p.images[0].card}" alt="${esc(L(p.title))}" loading="lazy" draggable="false" />
      <div class="pc__tags"><span class="pt ${p.cat === "gov" ? "pt--gov" : ""}">${t(p.cat === "pvt" ? "prj.pvt" : "prj.gov")}</span>${done ? "" : `<span class="pt pt--on">${t("pd.ongoing")}</span>`}</div>
    </div>
    <div class="pc__body">
      <div><h3>${esc(L(p.title))}</h3>
        <div class="pc__meta"><span><svg><use href="#i-pin"/></svg>${esc(L(p.location))}</span><span><svg><use href="#i-cal"/></svg>${range}</span></div>
      </div>
      <span class="pc__go"><svg><use href="#i-arrow"/></svg></span>
    </div>
  </a>`;
}

const rail = $("#rail");
if (rail) {
  let filter = "all";
  const apply = () => { $$(".pc", rail).forEach(c => c.classList.toggle("is-hidden", filter !== "all" && c.dataset.cat !== filter)); rail.scrollLeft = 0; prog(); };
  hooks.push(() => { rail.innerHTML = LIST.map(card).join(""); apply(); });
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#filters button").forEach(x => x.classList.toggle("is-active", x === b));
    filter = b.dataset.filter; apply();
  });
  const step = () => { const c = $(".pc:not(.is-hidden)", rail); return c ? c.offsetWidth + 22 : 400; };
  $("#prjNext").onclick = () => rail.scrollBy({ left: step(), behavior: "smooth" });
  $("#prjPrev").onclick = () => rail.scrollBy({ left: -step(), behavior: "smooth" });
  const bar = $("#railBar");
  function prog() {
    const max = rail.scrollWidth - rail.clientWidth;
    const vis = rail.clientWidth / rail.scrollWidth;
    bar.style.width = Math.max(12, vis * 100) + "%";
    bar.style.marginLeft = (max > 0 ? (rail.scrollLeft / max) * (100 - Math.max(12, vis * 100)) : 0) + "%";
    $("#prjPrev").disabled = rail.scrollLeft < 5;
    $("#prjNext").disabled = rail.scrollLeft > max - 5;
  }
  rail.addEventListener("scroll", prog, { passive: true });
  addEventListener("resize", prog);
  /* drag with mouse */
  let down = false, sx = 0, sl = 0, moved = false;
  rail.addEventListener("mousedown", e => { down = true; moved = false; sx = e.pageX; sl = rail.scrollLeft; });
  addEventListener("mouseup", () => { if (down) { down = false; setTimeout(() => rail.classList.remove("drag"), 0); } });
  rail.addEventListener("mousemove", e => {
    if (!down) return;
    const d = e.pageX - sx;
    if (Math.abs(d) > 6) { moved = true; rail.classList.add("drag"); }
    if (moved) { e.preventDefault(); rail.scrollLeft = sl - d; }
  });
  rail.addEventListener("click", e => { if (moved) { e.preventDefault(); moved = false; } }, true);

  /* autoplay: moves one card every 4 seconds, loops back to the start,
     pauses while the visitor hovers/touches it or it is off screen */
  const AUTO = 4000;
  let auto = null, inView = false, hold = false;
  const tick = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 5) return;
    if (rail.scrollLeft >= max - 5) rail.scrollTo({ left: 0, behavior: "smooth" });
    else rail.scrollBy({ left: step(), behavior: "smooth" });
  };
  const play = () => { clearInterval(auto); if (!REDUCED && inView && !hold) auto = setInterval(tick, AUTO); };
  const pause = () => { clearInterval(auto); auto = null; };
  if (io) new IntersectionObserver(es => { inView = es[0].isIntersecting; inView ? play() : pause(); }, { threshold: .3 }).observe(rail);
  rail.addEventListener("mouseenter", () => { hold = true; pause(); });
  rail.addEventListener("mouseleave", () => { hold = false; play(); });
  rail.addEventListener("touchstart", () => { hold = true; pause(); }, { passive: true });
  rail.addEventListener("touchend", () => { hold = false; setTimeout(play, 3000); });
  rail.addEventListener("focusin", () => { hold = true; pause(); });
  rail.addEventListener("focusout", () => { hold = false; play(); });
  ["#prjNext", "#prjPrev", "#filters"].forEach(s => $(s).addEventListener("click", play));
}

/* ---------- before / after ---------- */
const ba = $("#ba");
if (ba) { const r = $(".ba__range", ba); const s = () => ba.style.setProperty("--pos", r.value + "%"); r.addEventListener("input", s); s(); }

/* ---------- gallery mosaic (home) ---------- */
const PATTERN = ["mo--big", "", "mo--t", "", "mo--w", "", "", "mo--t", "", "mo--w", "", ""];
function mosaicItem(ph, n, extra = "") {
  return `<button type="button" class="mo ${PATTERN[n % PATTERN.length]} ${extra}" data-i="${n}">
    <img src="${ph.im.card}" alt="${esc(L(ph.p.title))}" loading="lazy" />
    <span class="mo__plus"><svg><use href="#i-expand"/></svg></span>
    <span class="mo__cap"><strong>${esc(L(ph.p.title))}</strong><span><svg><use href="#i-pin"/></svg>${esc(L(ph.p.location))}</span></span>
  </button>`;
}
const grid = $("#photoGrid");
if (grid) {
  const SHOW = 9; let open = false;
  const seen = new Set(), photos = [];
  LIST.forEach(p => p.images.forEach(im => { if (!seen.has(im.full)) { seen.add(im.full); photos.push({ p, im }); } }));
  const more = $("#galMore");
  const label = () => { $("span", more).textContent = t(open ? "gal.less" : "gal.more"); $("use", more).setAttribute("href", open ? "#i-up" : "#i-plus"); };
  hooks.push(() => {
    grid.innerHTML = photos.map((ph, n) => mosaicItem(ph, n, n >= SHOW && !open ? "is-hidden" : "")).join("");
    more.parentElement.hidden = photos.length <= SHOW; label();
  });
  grid.addEventListener("click", e => {
    const b = e.target.closest(".mo"); if (!b) return;
    LB.open(photos.map(ph => ({ src: ph.im.full, title: L(ph.p.title), loc: L(ph.p.location), href: projUrl(ph.p) })), +b.dataset.i);
  });
  more.addEventListener("click", () => {
    open = !open;
    $$(".mo", grid).forEach((b, n) => { if (n >= SHOW) b.classList.toggle("is-hidden", !open); });
    label();
    if (!open) $("#gallery-section").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- FAQ: one open at a time ---------- */
$$(".fq").forEach(d => d.addEventListener("toggle", () => { if (d.open) $$(".fq").forEach(o => { if (o !== d) o.open = false; }); }));

/* ---------- enquiry form -> WhatsApp ---------- */
const form = $("#enquiryForm");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const f = form.elements, name = f.name.value.trim(), phone = f.phone.value.replace(/\D/g, ""), err = $("#formError");
  if (!name || phone.length !== 10) { err.hidden = false; return; }
  err.hidden = true;
  const w = t("_wa"), type = t(form.querySelector('input[name="type"]:checked').value).replace(/&amp;/g, "&");
  const lines = [t("f.wa"), `${w.name}: ${name}`, `${w.phone}: ${phone}`, `${w.type}: ${type}`];
  if (f.msg.value.trim()) lines.push(`${w.msg}: ${f.msg.value.trim()}`);
  open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  form.reset();
});

/* ---------- project details page ---------- */
const pd = $("#pd");
if (pd) {
  const p = LIST.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!p) { pd.hidden = true; $("#notFound").hidden = false; }
  else {
    const done = p.status === "done";
    $("#pdHero").style.setProperty("--img", `url('${p.images[0].full}')`);
    const items = () => p.images.map(im => ({ src: im.full, title: L(p.title), loc: L(p.location) }));
    const pg = $("#pGrid");
    pg.addEventListener("click", e => { const b = e.target.closest(".mo"); if (b) LB.open(items(), +b.dataset.i); });
    const others = LIST.filter(x => x.id !== p.id).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 3);

    hooks.push(() => {
      const title = L(p.title);
      document.title = `${title} | ${t("brand.name")}`;
      $("#crumbTitle").textContent = title;
      $("#pdTitle").textContent = title;
      $("#pdLoc").textContent = L(p.location);
      $("#pdTags").innerHTML = `<span class="pt ${p.cat === "gov" ? "pt--gov" : ""}">${t(p.cat === "pvt" ? "prj.pvt" : "prj.gov")}</span>`;
      $("#fStart").textContent = fmtDate(p.start, true);
      $("#fEnd").textContent = done ? fmtDate(p.end, true) : t("pd.inprogress");
      const m = months(p.start, done ? p.end : "");
      $("#fDur").textContent = `${m} ${t(m === 1 ? "pd.month" : "pd.months")}${done ? "" : "+"}`;
      const st = $("#fStatus"); st.textContent = t(done ? "pd.done" : "pd.ongoing"); st.className = "st " + (done ? "st--done" : "st--on");
      $("#pdDesc").textContent = L(p.desc);
      $("#pdScope").innerHTML = (p.scope || []).map((s, k) => `<li><b>${String(k + 1).padStart(2, "0")}</b>${esc(L(s))}</li>`).join("");
      $("#tlStart").textContent = fmtDate(p.start, true);
      $("#tlEnd").textContent = done ? fmtDate(p.end, true) : t("pd.inprogress");
      $("#tlEndLbl").textContent = t(done ? "pd.completed" : "pd.today");
      requestAnimationFrame(() => { $("#tlFill").style.width = done ? "100%" : "65%"; });
      $("#kCat").textContent = t(p.cat === "pvt" ? "prj.pvt" : "prj.gov");
      $("#kClient").textContent = L(p.client);
      $("#kLoc").textContent = L(p.location);
      $("#pdWa").href = `https://wa.me/${WA}?text=${encodeURIComponent(t("pd.wa").replace("{p}", title))}`;
      $("#pCount").textContent = `${p.images.length} ${t("v2.photoCount")}`;
      pg.innerHTML = p.images.map((im, n) => `<button type="button" class="mo" data-i="${n}"><img src="${im.card}" alt="${esc(title)}" loading="lazy" /><span class="mo__plus"><svg><use href="#i-expand"/></svg></span></button>`).join("");
      $("#relGrid").innerHTML = others.map(card).join("");
    });
  }
}

/* ---------- start ---------- */
setLang(store.get("tm-lang") === "en" ? "en" : "gu");
reveal();
