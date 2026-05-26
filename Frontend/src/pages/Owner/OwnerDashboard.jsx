// src/pages/owner/OwnerDashboard.jsx

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── Sidebar nav items for owner ───────────────────────────────────────────────
const OWNER_NAV = [
  
  {
    to: "/owner/profile",
    label: "My Profile",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    to: "/updateProfile",
    label: "Update Profile",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M11 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    to: "/owner/listings",
    label: "My Listings",
    badge: 3,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
  to: "/createpg",
  label: "Add new PG",

  icon: (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9 21v-6h6v6" />
      <path d="M19 6v4" />
      <path d="M17 8h4" />
    </svg>
  ),
},
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ user, navItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); navigate("/login"); };
  const isActive = (path) => location.pathname === path;

  return (
    <aside style={S.sidebar}>
      <div style={S.sidebarGlow} />

      <div style={S.sidebarLogo}>
        <div style={S.logoIcon}>PG</div>
        <span style={S.logoText}>PGMatch</span>
      </div>

      <div style={S.sidebarUser}>
        <div style={{ ...S.userAvatar, background: "linear-gradient(135deg,#4ade80,#06b6d4)" }}>
          {user?.name?.slice(0, 2).toUpperCase() || "??"}
        </div>
        <div style={S.userMeta}>
          <div style={S.userName}>{user?.name || "Owner"}</div>
          <div style={{ ...S.userRole, background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
            Owner
          </div>
        </div>
      </div>

      <div style={S.navSection}>
        <div style={S.navSectionLabel}>Menu</div>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
            <div style={{ ...S.navItem, ...(isActive(item.to) ? S.navItemActive : {}) }}>
              {isActive(item.to) && <div style={S.navActiveBar} />}
              <div style={S.navIcon}>{item.icon}</div>
              <span style={S.navLabel}>{item.label}</span>
              {item.badge && <span style={S.navBadge}>{item.badge}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div style={S.sidebarBottom}>
        <button onClick={handleLogout} style={S.logoutBtn}>
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
    <div style={S.statCard}>
      <div style={S.statLabel}>{label}</div>
      <div style={{ ...S.statVal, color: accent }}>{value}</div>
      <div style={S.statSub}>{sub}</div>
      <div style={{ ...S.statBar, background: accent }} />
    </div>
  );
}

// ── Mini bar ──────────────────────────────────────────────────────────────────
function MiniBar({ label, value, pct, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={S.chartLabel}>{label}</span>
        <span style={S.chartVal}>{value}</span>
      </div>
      <div style={S.chartTrack}>
        <div style={{ ...S.chartFill, width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Main owner dashboard ──────────────────────────────────────────────────────
export default function OwnerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const listings = [
    { icon: "🏠", name: "Sunshine PG for Boys", meta: "Koramangala · ₹8,500/mo · 2 vacancies", status: "Active", statusColor: "#4ade80", statusBg: "rgba(74,222,128,0.08)" },
    { icon: "🏢", name: "Green Nest PG",         meta: "HSR Layout · ₹11,000/mo · Full",        status: "Full",   statusColor: "#fbbf24", statusBg: "rgba(251,191,36,0.08)" },
    { icon: "🏡", name: "Royal Stay PG",          meta: "BTM Layout · ₹7,000/mo · 2 vacancies",  status: "Active", statusColor: "#4ade80", statusBg: "rgba(74,222,128,0.08)" },
  ];

  const enquiries = [
    { initials: "AK", name: "Aryan Kumar",  pg: "Sunshine PG for Boys", time: "2m ago",  grad: "linear-gradient(135deg,#7c6ff7,#f472b6)" },
    { initials: "RM", name: "Rahul Mishra", pg: "Royal Stay PG",         time: "1h ago",  grad: "linear-gradient(135deg,#4ade80,#06b6d4)" },
    { initials: "PJ", name: "Priya Joshi",  pg: "Royal Stay PG",         time: "3h ago",  grad: "linear-gradient(135deg,#fbbf24,#f97316)" },
    { initials: "SD", name: "Sneha Desai",  pg: "Sunshine PG for Boys",  time: "5h ago",  grad: "linear-gradient(135deg,#f472b6,#a855f7)" },
  ];

  return (
    <div style={S.app}>
      <Sidebar user={user} navItems={OWNER_NAV} />

      <div style={S.main}>
        {/* Topbar */}
        <div style={S.topbar}>
          <div style={S.topbarTitle}>Owner Dashboard</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => navigate("/createpg")} style={S.addBtn}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              List a PG
            </button>
            <div style={S.notifBtn}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div style={S.notifDot} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={S.content}>

          {/* Stats */}
          <div style={S.statGrid}>
            <StatCard label="Active Listings" value="3"  sub="2 fully occupied"      accent="#7c6ff7" />
            <StatCard label="Total Saves"      value="47" sub="across all listings"   accent="#4ade80" />
            <StatCard label="Enquiries"        value="18" sub="this month"            accent="#f472b6" />
            <StatCard label="Vacancies"        value="4"  sub="across 2 listings"     accent="#fbbf24" />
          </div>

          {/* Row 2 */}
          <div style={S.row2}>

            {/* My Listings */}
            <div style={S.panel}>
              <div style={S.panelHead}>
                <span style={S.panelTitle}>My PG Listings</span>
                <Link to="/owner/listing/new" style={S.panelAction}>+ Add new</Link>
              </div>
              {listings.map((l, i) => (
                <div key={i} style={{ ...S.listingRow, borderBottom: i < listings.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={S.listingThumb}>{l.icon}</div>
                  <div style={S.listingInfo}>
                    <div style={S.listingName}>{l.name}</div>
                    <div style={S.listingMeta}>{l.meta}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, fontWeight: 500, color: l.statusColor, background: l.statusBg }}>
                      {l.status}
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button onClick={() => navigate(`/owner/listing/${i + 1}/edit`)} style={S.actionBtn}>Edit</button>
                      <button style={{ ...S.actionBtn, color: "#f87171" }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enquiries */}
            <div style={S.panel}>
              <div style={S.panelHead}>
                <span style={S.panelTitle}>Recent Enquiries</span>
                <span style={S.panelAction}>View all →</span>
              </div>
              {enquiries.map((e, i) => (
                <div key={i} style={{ ...S.enqItem, borderBottom: i < enquiries.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ ...S.enqAvatar, background: e.grad }}>{e.initials}</div>
                  <div style={S.enqInfo}>
                    <div style={S.enqName}>{e.name}</div>
                    <div style={S.enqPg}>{e.pg}</div>
                  </div>
                  <div style={S.enqTime}>{e.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div style={S.panel}>
            <div style={S.panelHead}>
              <span style={S.panelTitle}>Listing Performance — Saves</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              <MiniBar label="Sunshine PG"   value="24 saves" pct={80} color="#7c6ff7" />
              <MiniBar label="Green Nest PG" value="15 saves" pct={50} color="#4ade80" />
              <MiniBar label="Royal Stay PG" value="8 saves"  pct={27} color="#fbbf24" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
  app: { display: "flex", height: "100vh", background: "#0c0c0f", fontFamily: "'DM Sans', sans-serif", color: "#f0eff8" },
  sidebar: { width: 230, background: "#131318", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0, position: "relative", overflow: "hidden" },
  sidebarGlow: { position: "absolute", top: -60, left: -60, width: 200, height: 200, background: "rgba(74,222,128,0.08)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" },
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
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, color: "#8b8a9e", cursor: "pointer", position: "relative", marginBottom: 2 },
  navItemActive: { background: "rgba(124,111,247,0.12)", color: "#a89cf7" },
  navActiveBar: { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, borderRadius: "0 3px 3px 0", background: "#7c6ff7" },
  navIcon: { width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" },
  navLabel: { fontSize: 13 },
  navBadge: { marginLeft: "auto", fontSize: 10, fontWeight: 600, background: "#7c6ff7", color: "#fff", padding: "1px 6px", borderRadius: 99, minWidth: 18, textAlign: "center" },
  sidebarBottom: { marginTop: "auto", padding: 12, borderTop: "1px solid rgba(255,255,255,0.07)" },
  logoutBtn: { width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, color: "#f87171", cursor: "pointer", background: "transparent", border: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 13, opacity: 0.8 },
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { padding: "0 28px", height: 60, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#131318" },
  topbarTitle: { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 600, color: "#f0eff8", letterSpacing: "-0.02em" },
  addBtn: { display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "#7c6ff7", color: "#fff", border: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, cursor: "pointer" },
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
  panel: { background: "#131318", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20 },
  panelHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  panelTitle: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 600, color: "#f0eff8" },
  panelAction: { fontSize: 11, color: "#7c6ff7", cursor: "pointer", textDecoration: "none" },
  listingRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0" },
  listingThumb: { width: 48, height: 48, borderRadius: 8, background: "#22222e", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  listingInfo: { flex: 1, minWidth: 0 },
  listingName: { fontSize: 13, fontWeight: 500, color: "#f0eff8" },
  listingMeta: { fontSize: 11, color: "#8b8a9e", marginTop: 2 },
  actionBtn: { fontSize: 11, padding: "5px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)", background: "transparent", color: "#8b8a9e", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" },
  enqItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0" },
  enqAvatar: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff", flexShrink: 0 },
  enqInfo: { flex: 1 },
  enqName: { fontSize: 12, fontWeight: 500, color: "#f0eff8" },
  enqPg: { fontSize: 11, color: "#8b8a9e" },
  enqTime: { fontSize: 10, color: "#55546a" },
  chartLabel: { fontSize: 11, color: "#8b8a9e" },
  chartVal: { fontSize: 11, fontWeight: 500, color: "#f0eff8" },
  chartTrack: { height: 4, background: "#22222e", borderRadius: 99, overflow: "hidden" },
  chartFill: { height: "100%", borderRadius: 99 },
};