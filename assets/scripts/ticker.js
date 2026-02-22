(function () {
  const root = document.getElementById("apSiteTicker");
  const track = document.getElementById("apSiteTickerTrack");
  const link = document.getElementById("apSiteTickerLink");
  if (!root || !track || !link) return;

  function parseBool(value) {
    return String(value).toLowerCase() === "true";
  }

  const enabled = parseBool(root.dataset.enabled);
  if (!enabled) return;

  const localFeed = root.dataset.localFeed || "/assets/ticker.json";
  const remoteFeed = (root.dataset.remoteFeed || "").trim();
  const defaultTz = root.dataset.timezone || "UTC";
  const refreshMs = Math.max(30, Number(root.dataset.refreshSeconds) || 300) * 1000;
  const rotationMs = Math.max(4, Number(root.dataset.rotationSeconds) || 10) * 1000;

  let items = [];
  let currentIndex = 0;
  let rotateTimer = null;

  const weekdayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  function partsInTz(date, timeZone) {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const p = fmt.formatToParts(date);
    const out = {};
    p.forEach((part) => {
      if (part.type !== "literal") out[part.type] = part.value;
    });
    return out;
  }

  function parseMinuteOfDay(value, fallback) {
    const raw = typeof value === "string" ? value : fallback;
    const bits = (raw || fallback).split(":");
    const h = Math.max(0, Math.min(23, Number(bits[0]) || 0));
    const m = Math.max(0, Math.min(59, Number(bits[1]) || 0));
    return h * 60 + m;
  }

  function weeklyActive(rule, now, tz) {
    const zone = rule.timezone || tz;
    const p = partsInTz(now, zone);
    const weekday = weekdayMap[String(p.weekday || "").toLowerCase()];
    if (typeof weekday !== "number") return false;

    const dayRule = rule.day;
    let dayNum = dayRule;
    if (typeof dayRule === "string") {
      dayNum = weekdayMap[dayRule.toLowerCase()];
    }
    if (Number(dayNum) !== weekday) return false;

    const nowMins = Number(p.hour) * 60 + Number(p.minute);
    const start = parseMinuteOfDay(rule.start, "00:00");
    const end = parseMinuteOfDay(rule.end, "23:59");
    return nowMins >= start && nowMins <= end;
  }

  function dateRangeActive(rule, now) {
    const start = new Date(rule.start);
    const end = new Date(rule.end);
    if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) return false;
    return now >= start && now <= end;
  }

  function oneTimeActive(rule, now) {
    const start = new Date(rule.start);
    if (Number.isNaN(start.valueOf())) return false;
    const durationMinutes = Math.max(1, Number(rule.duration_minutes) || 60);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    return now >= start && now <= end;
  }

  function ruleActive(rule, now, tz) {
    if (!rule) return true;
    if (rule.enabled === false) return false;
    const type = (rule.type || "always").toLowerCase();
    if (type === "always") return true;
    if (type === "weekly") return weeklyActive(rule, now, tz);
    if (type === "date_range") return dateRangeActive(rule, now);
    if (type === "one_time") return oneTimeActive(rule, now);
    return true;
  }

  function itemActive(item, now, tz) {
    if (item.enabled === false) return false;
    if (Array.isArray(item.windows) && item.windows.length > 0) {
      return item.windows.some((rule) => ruleActive(rule, now, tz));
    }
    return ruleActive(item.active, now, tz);
  }

  function normalizePayload(payload) {
    const rawItems = Array.isArray(payload) ? payload : payload && Array.isArray(payload.items) ? payload.items : [];
    return rawItems
      .filter((item) => item && typeof item.text === "string" && item.text.trim())
      .sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
  }

  async function fetchJson(url) {
    if (!url) return null;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("http-" + res.status);
    return res.json();
  }

  function hideTicker() {
    root.hidden = true;
    track.textContent = "";
    link.hidden = true;
    link.removeAttribute("href");
    if (rotateTimer) {
      window.clearInterval(rotateTimer);
      rotateTimer = null;
    }
  }

  function renderItem(item) {
    const text = item.text.trim();
    track.textContent = text + " \u2022 " + text + " \u2022 " + text;

    if (item.link) {
      link.hidden = false;
      link.href = item.link;
      link.textContent = item.link_text || "Details";
      if (/^https?:\/\//i.test(item.link)) {
        link.target = "_blank";
      } else {
        link.removeAttribute("target");
      }
    } else {
      link.hidden = true;
      link.removeAttribute("href");
      link.removeAttribute("target");
    }
  }

  function startRotation() {
    if (rotateTimer) {
      window.clearInterval(rotateTimer);
      rotateTimer = null;
    }
    if (items.length <= 1) return;
    rotateTimer = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      renderItem(items[currentIndex]);
    }, rotationMs);
  }

  async function loadTicker() {
    const now = new Date();
    let payload = null;

    if (remoteFeed) {
      try {
        payload = await fetchJson(remoteFeed);
      } catch (err) {
        payload = null;
      }
    }

    if (!payload) {
      try {
        payload = await fetchJson(localFeed);
      } catch (err) {
        payload = null;
      }
    }

    if (!payload) {
      hideTicker();
      return;
    }

    const normalized = normalizePayload(payload);
    const activeItems = normalized.filter((item) => itemActive(item, now, defaultTz));

    if (!activeItems.length) {
      hideTicker();
      return;
    }

    items = activeItems;
    currentIndex = 0;
    renderItem(items[currentIndex]);
    root.hidden = false;
    startRotation();
  }

  loadTicker();
  window.setInterval(loadTicker, refreshMs);
})();
