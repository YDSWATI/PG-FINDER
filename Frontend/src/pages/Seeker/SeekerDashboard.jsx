// src/pages/SeekerDashboard.jsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── Sidebar nav items for seeker ─────────────────────────────────────────────
const SEEKER_NAV = [
  {
    to: "/home",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    to: "/myprofile",
    label: "My Profile",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    to: "/profile/edit",
    label: "Update Profile",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M11 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    to: "/saved",
    label: "Saved Listings",
    badge: 4,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    to: "/quiz",
    label: "Update Habits",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    to: "/chat",
    label: "Messages",
    badge: 2,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

// ── Reusable sidebar ──────────────────────────────────────────────────────────
function Sidebar({ user, navItems, role }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); navigate("/login"); };
  const isActive = (path) => location.pathname === path;

  const roleColor = role === "owner"
    ? { bg: "rgba(74,222,128,0.1)", color: "#4ade80" }
    : { bg: "rgba(124,111,247,0.15)", color: "#a89cf7" };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarGlow} />

      {/* Logo */}
      <div style={styles.sidebarLogo}>
        <div style={styles.logoIcon}>PG</div>
        <span style={styles.logoText}>PGMatch</span>
      </div>

      {/* User */}
      <div style={styles.sidebarUser}>
        <div style={{
          ...styles.userAvatar,
          background: role === "owner"
            ? "linear-gradient(135deg,#4ade80,#06b6d4)"
            : "linear-gradient(135deg,#7c6ff7,#f472b6)",
        }}>
          {user?.name?.slice(0, 2).toUpperCase() || "??"}
        </div>
        <div style={styles.userMeta}>
          <div style={styles.userName}>{user?.name || "User"}</div>
          <div style={{ ...styles.userRole, background: roleColor.bg, color: roleColor.color }}>
            {role}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={styles.navSection}>
        <div style={styles.navSectionLabel}>Menu</div>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
            <div style={{
              ...styles.navItem,
              ...(isActive(item.to) ? styles.navItemActive : {}),
            }}>
              {isActive(item.to) && <div style={styles.navActiveBar} />}
              <div style={styles.navIcon}>{item.icon}</div>
              <span style={styles.navLabel}>{item.label}</span>
              {item.badge && <span style={styles.navBadge}>{item.badge}</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div style={styles.sidebarBottom}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ ...styles.statCard, "--accent-color": accent }}>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statVal, color: accent }}>{value}</div>
      <div style={styles.statSub}>{sub}</div>
      <div style={{ ...styles.statBar, background: accent }} />
    </div>
  );
}

// ── Mini bar ──────────────────────────────────────────────────────────────────
function MiniBar({ label, value, max, pct, color = "#7c6ff7" }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={styles.chartLabel}>{label}</span>
        <span style={styles.chartVal}>{value}/{max}</span>
      </div>
      <div style={styles.chartTrack}>
        <div style={{ ...styles.chartFill, width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Main seeker dashboard ─────────────────────────────────────────────────────
export default function SeekerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const savedPGs = [
    { icon: "🏠", name: "Sunshine PG for Boys", area: "Koramangala 5th Block", rent: "₹8,500/mo", match: 87, matchColor: "#4ade80" },
    { icon: "🏢", name: "Green Nest PG",         area: "HSR Layout Sector 2",   rent: "₹11,000/mo", match: 72, matchColor: "#fbbf24" },
    { icon: "🏡", name: "Royal Stay PG",          area: "BTM Layout",            rent: "₹7,000/mo",  match: 61, matchColor: "#a89cf7" },
  ];

  const topMatches = [
    { initials: "RK", name: "Rohit Kumar",  detail: "Engineering · Night owl", score: "91%", scoreColor: "#4ade80",  grad: "linear-gradient(135deg,#7c6ff7,#f472b6)" },
    { initials: "AM", name: "Arjun Mehta",  detail: "IT · Early bird",         score: "74%", scoreColor: "#a89cf7",  grad: "linear-gradient(135deg,#4ade80,#06b6d4)" },
    { initials: "SP", name: "Saurav Patil", detail: "MBA · Flexible",           score: "68%", scoreColor: "#fbbf24",  grad: "linear-gradient(135deg,#fbbf24,#f97316)" },
  ];

  const habits = [
    { emoji: "🌙", label: "Sleep",    value: "Night owl" },
    { emoji: "🥗", label: "Food",     value: "Veg" },
    { emoji: "🔇", label: "Noise",    value: "Silent" },
    { emoji: "✨",  label: "Clean",   value: "Very neat" },
    { emoji: "💻", label: "Field",    value: "Engineering" },
  ];

  return (
    <div style={styles.app}>
      <Sidebar user={user} navItems={SEEKER_NAV} role="seeker" />

      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.topbarTitle}>
            Good morning, {user?.name?.split(" ")[0] || "there"} 👋
          </div>
          <div style={styles.notifBtn}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={styles.notifDot} />
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>

          {/* Stats */}
          <div style={styles.statGrid}>
            <StatCard label="PGs Saved"         value="4"    sub="in Bengaluru"          accent="#7c6ff7" />
            <StatCard label="Roommate Matches"   value="12"   sub="above 60% compatible"  accent="#4ade80" />
            <StatCard label="Messages"           value="3"    sub="2 unread"               accent="#f472b6" />
            <StatCard label="Quiz Score"         value="5/5"  sub="Profile complete"       accent="#fbbf24" />
          </div>

          {/* Row 2 */}
          <div style={styles.row2}>

            {/* Saved PGs */}
            <div style={styles.panel}>
              <div style={styles.panelHead}>
                <span style={styles.panelTitle}>Saved PGs</span>
                <Link to="/saved" style={styles.panelAction}>View all →</Link>
              </div>
              {savedPGs.map((pg, i) => (
                <div key={i} style={{ ...styles.pgItem, borderBottom: i < savedPGs.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={styles.pgThumb}>{pg.icon}</div>
                  <div style={styles.pgInfo}>
                    <div style={styles.pgName}>{pg.name}</div>
                    <div style={styles.pgLoc}>{pg.area}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={styles.pgPrice}>{pg.rent}</div>
                    <div style={{ ...styles.badge, color: pg.matchColor, background: pg.matchColor + "18" }}>
                      {pg.match}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Matches */}
            <div style={styles.panel}>
              <div style={styles.panelHead}>
                <span style={styles.panelTitle}>Top Roommate Matches</span>
                <Link to="/matches" style={styles.panelAction}>See all →</Link>
              </div>
              {topMatches.map((m, i) => (
                <div key={i} style={{ ...styles.matchItem, borderBottom: i < topMatches.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ ...styles.mAvatar, background: m.grad }}>{m.initials}</div>
                  <div style={styles.mInfo}>
                    <div style={styles.mName}>{m.name}</div>
                    <div style={styles.mDetail}>{m.detail}</div>
                  </div>
                  <div style={{ ...styles.mScore, color: m.scoreColor }}>{m.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 */}
          <div style={styles.row3}>

            {/* My Habits */}
            <div style={styles.panel}>
              <div style={styles.panelHead}>
                <span style={styles.panelTitle}>My Habits</span>
                <Link to="/quiz" style={styles.panelAction}>Update →</Link>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                {habits.map((h, i) => (
                  <div key={i} style={styles.habitChip}>
                    {h.emoji} {h.label} <span style={{ color: "#f0eff8", fontWeight: 500 }}>{h.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility breakdown */}
            <div style={styles.panel}>
              <div style={styles.panelHead}>
                <span style={styles.panelTitle}>Top Match Breakdown</span>
                <span style={{ ...styles.panelAction, color: "#55546a", cursor: "default" }}>Rohit Kumar · 91%</span>
              </div>
              <MiniBar label="Sleep schedule"  value={30} max={30} pct={100} color="#4ade80" />
              <MiniBar label="Food preference" value={20} max={20} pct={100} color="#4ade80" />
              <MiniBar label="Noise level"     value={10} max={20} pct={50}  color="#fbbf24" />
              <MiniBar label="Cleanliness"     value={15} max={15} pct={100} color="#4ade80" />
              <MiniBar label="Field of work"   value={15} max={15} pct={100} color="#4ade80" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  app: { display: "flex", height: "100vh", background: "#0c0c0f", fontFamily: "'DM Sans', sans-serif", color: "#f0eff8" },
  sidebar: { width: 230, background: "#131318", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0, position: "relative", overflow: "hidden" },
  sidebarGlow: { position: "absolute", top: -60, left: -60, width: 200, height: 200, background: "rgba(124,111,247,0.12)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" },
  sidebarLogo: { padding: "22px 20px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" },
  logoIcon: { width: 30, height: 30, borderRadius: 8, background: "#7c6ff7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" },
  logoText: { fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 600, color: "#f0eff8", letterSpacing: "-0.02em" },
  sidebarUser: { padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" },
  userAvatar: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", flexShrink: 0 },
  userMeta: { flex: 1, minWidth: 0 },
  userName: { fontSize: 13, fontWeight: 500, color: "#f0eff8", lineHeight: 1.2 },
  userRole: { fontSize: 10, padding: "1px 7px", borderRadius: 99, display: "inline-block", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.05em" },
  navSection: { padding: "14px 12px 6px" },
  navSectionLabel: { fontSize: 9, fontWeight: 600, color: "#55546a", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 6 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, color: "#8b8a9e", cursor: "pointer", position: "relative", marginBottom: 2, textDecoration: "none" },
  navItemActive: { background: "rgba(124,111,247,0.12)", color: "#a89cf7" },
  navActiveBar: { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, borderRadius: "0 3px 3px 0", background: "#7c6ff7" },
  navIcon: { width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" },
  navLabel: { fontSize: 13, fontWeight: 400 },
  navBadge: { marginLeft: "auto", fontSize: 10, fontWeight: 600, background: "#7c6ff7", color: "#fff", padding: "1px 6px", borderRadius: 99, minWidth: 18, textAlign: "center" },
  sidebarBottom: { marginTop: "auto", padding: 12, borderTop: "1px solid rgba(255,255,255,0.07)" },
  logoutBtn: { width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, color: "#f87171", cursor: "pointer", background: "transparent", border: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 13, opacity: 0.8 },
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { padding: "0 28px", height: 60, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#131318" },
  topbarTitle: { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 600, color: "#f0eff8", letterSpacing: "-0.02em" },
  notifBtn: { width: 34, height: 34, borderRadius: 8, background: "#1a1a22", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8b8a9e", position: "relative" },
  notifDot: { width: 6, height: 6, borderRadius: "50%", background: "#7c6ff7", position: "absolute", top: 6, right: 6, border: "1.5px solid #131318" },
  content: { flex: 1, overflowY: "auto", padding: 28, display: "flex", flexDirection: "column", gap: 16 },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 },
  statCard: { background: "#131318", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px", position: "relative", overflow: "hidden" },
  statBar: { position: "absolute", bottom: 0, left: 0, right: 0, height: 2, opacity: 0.6 },
  statLabel: { fontSize: 11, color: "#8b8a9e", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" },
  statVal: { fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" },
  statSub: { fontSize: 11, color: "#55546a", marginTop: 4 },
  row2: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  panel: { background: "#131318", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20 },
  panelHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  panelTitle: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600, color: "#f0eff8" },
  panelAction: { fontSize: 11, color: "#7c6ff7", cursor: "pointer", textDecoration: "none" },
  pgItem: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0" },
  pgThumb: { width: 44, height: 44, borderRadius: 8, background: "#22222e", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  pgInfo: { flex: 1, minWidth: 0 },
  pgName: { fontSize: 13, fontWeight: 500, color: "#f0eff8" },
  pgLoc: { fontSize: 11, color: "#8b8a9e", marginTop: 2 },
  pgPrice: { fontSize: 13, fontWeight: 600, color: "#a89cf7" },
  badge: { fontSize: 10, padding: "2px 8px", borderRadius: 99, fontWeight: 500 },
  matchItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0" },
  mAvatar: { width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" },
  mInfo: { flex: 1, minWidth: 0 },
  mName: { fontSize: 13, fontWeight: 500, color: "#f0eff8" },
  mDetail: { fontSize: 11, color: "#8b8a9e", marginTop: 1 },
  mScore: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600 },
  habitChip: { display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, background: "#1a1a22", border: "1px solid rgba(255,255,255,0.07)", fontSize: 12, color: "#8b8a9e" },
  chartLabel: { fontSize: 11, color: "#8b8a9e" },
  chartVal: { fontSize: 11, fontWeight: 500, color: "#f0eff8" },
  chartTrack: { height: 4, background: "#22222e", borderRadius: 99, overflow: "hidden" },
  chartFill: { height: "100%", borderRadius: 99 },
};