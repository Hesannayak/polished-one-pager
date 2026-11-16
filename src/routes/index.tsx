import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Activity,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const walletAddress = "TiMS...JXNw";

const posts = [
  { name: "papidom", tag: "Conviction", tone: "green", time: "17h ago", text: "I’ve seen so many pfps I think we are just at the start of returning to timmy time" },
  { name: "RZDxbT", tag: "Holding", tone: "gold", time: "19h ago", text: "Every time I think I have enough I look at his hat and have to buy more" },
  { name: "Purpslushx", tag: "Rally", tone: "orange", time: "21h ago", text: "I’ve onboarded 3 irl friends. Made them download X and start bagworking." },
  { name: "downbandozz", tag: "Conviction", tone: "green", time: "21h ago", text: "man this community showing real strength & real cult vibes" },
  { name: "TastyWhiteLynx", tag: "Conviction", tone: "green", time: "22h ago", text: "timmy has a real chance at resurrecting memecoins keep launchpads for attention coins and bring back real memecoins" },
];

const charts = {
  "24H": ["M0 140 C35 136 37 95 68 108 S103 143 128 118 163 113 181 75 215 93 241 71 277 84 300 54 342 67 362 40 398 61 430 29 470 42 500 25 540 38 570 18 610 27 650 11 700 17", "M0 112 C32 101 48 125 70 116 S104 92 130 105 170 129 198 98 230 91 260 100 300 69 330 81 360 61 395 78 430 55 460 63 500 49 540 60 580 34 620 48 660 31 700 36"],
  "7D": ["M0 123 C40 96 59 118 88 90 S134 94 167 71 211 100 244 66 284 80 316 55 352 80 385 48 421 62 454 33 488 49 520 26 560 44 590 18 625 32 657 12 700 22", "M0 88 C39 110 60 84 91 105 S134 75 170 90 210 66 242 81 280 58 318 74 351 48 390 66 424 40 458 54 493 32 530 49 565 27 603 42 646 22 700 31"],
  "30D": ["M0 126 C30 102 56 115 84 92 S122 111 151 75 184 100 218 68 249 83 282 62 313 75 344 47 379 65 407 38 441 52 475 29 506 43 538 24 567 40 599 18 631 31 664 15 700 20", "M0 92 C32 78 57 105 87 88 S122 70 152 93 188 67 218 83 253 49 284 70 313 52 345 69 379 44 410 58 442 36 474 55 507 31 539 47 571 28 603 45 637 25 700 34"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Timmy — Token intelligence" },
      { name: "description", content: "Market performance, community conviction and token health for Timmy." },
      { property: "og:title", content: "Timmy — Token intelligence" },
      { property: "og:description", content: "Market performance, community conviction and token health for Timmy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [range, setRange] = useState<keyof typeof charts>("7D");
  const [filter, setFilter] = useState("All voices");
  const [copied, setCopied] = useState(false);
  const visiblePosts = filter === "All voices" ? posts : posts.filter((post) => post.tag === filter);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <a className="brand-mark" href="#overview" aria-label="Timmy dashboard home"><span className="brand-dot">t</span><span>token<span className="brand-muted">/scope</span></span></a>
        <nav className="top-links" aria-label="Page sections">
          <a href="#overview">Overview</a><a href="#signals">Signals</a><a href="#community">Community</a>
        </nav>
        <a href="#health" className="live-label"><span className="pulse-dot" /> LIVE SNAPSHOT</a>
      </header>

      <section id="overview" className="overview-section page-section">
        <div className="token-heading-row">
          <div className="token-identity">
            <div className="token-avatar" aria-label="Timmy token avatar">t<span>◡</span></div>
            <div className="identity-copy">
              <div className="eyebrow"><span className="status-chip"><span className="status-led" /> GRADUATED</span><span>AGE 15D</span><span className="chain-tag">SOLANA</span></div>
              <h1>timmy <span className="ticker">$TIMMY</span></h1>
              <div className="address-line"><span className="mono">{walletAddress}</span><Button variant="ghost" size="icon" className="copy-button" onClick={copyAddress} aria-label="Copy token address" title="Copy address">{copied ? <Check /> : <Copy />}</Button>{copied && <span className="copy-confirmation">Copied</span>}</div>
            </div>
          </div>
          <div className="community-score">
            <div className="score-label">COMMUNITY STRENGTH</div>
            <div className="score-value">69.4 <span>/ 100</span></div>
            <span className="score-status"><span className="score-dot" /> COOKING</span>
            <div className="score-meter"><span /></div>
            <div className="score-updated">Updated 3 minutes ago</div>
          </div>
        </div>
        <div className="metrics-row">
          <Metric label="Price" value="$0.000739" change="+34.7%" positive />
          <Metric label="Market cap" value="$739.3K" />
          <Metric label="Liquidity" value="$58.8K" />
          <Metric label="24h volume" value="$207.2K" />
          <div className="quick-links"><a href="#market">Chart <ExternalLink /></a><a href="#community">Social <ExternalLink /></a><a href="#health">Token health <ChevronRight /></a></div>
        </div>
      </section>

      <div className="data-note"><span className="note-mark">i</span><span>One source is more than 15 minutes behind. Some signals may be delayed.</span><span className="note-time">LAST CHECK · 3 MIN AGO</span></div>

      <section id="signals" className="page-section read-section">
        <SectionHeading kicker="THE SHORT READ" title="A steady hand in a loud market." detail="A snapshot of what the numbers and community are saying." />
        <div className="read-layout">
          <article className="read-panel">
            <div className="panel-topline"><span className="tiny-label">SIGNAL SUMMARY</span><span className="confidence"><span /> MODERATE CONFIDENCE</span></div>
            <p className="read-lede">Top-ranked stewardship, backed by holders who have stayed through the noise.</p>
            <div className="strength-grid">
              <div className="strength-column">
                <h3>WHAT’S WORKING</h3>
                <SignalItem positive text="Stewardship sits at the top of the tracked group." rank="100th pct" />
                <SignalItem positive text="Conviction authors are showing a multi-day streak." rank="67th pct" />
                <SignalItem positive text="Notable holders carry high-percentile positions." rank="86th pct" />
              </div>
              <div className="strength-column">
                <h3>WHAT TO WATCH</h3>
                <SignalItem text="Identity signals and week-over-week holder change are limited." rank="DATA GAP" />
                <SignalItem text="Recent account activity is quieter than the community discussion." rank="14TH PCT" />
              </div>
            </div>
            <div className="read-foot"><span>LEADER DAYS <b>0</b></span><span>THESIS DAYS <b>4</b></span><span>HOLDER GROWTH <b>—</b></span><span className="disclaimer">Not financial advice.</span></div>
          </article>
          <div className="score-breakdown">
            <div className="breakdown-heading"><span className="tiny-label">SCORE BREAKDOWN</span><a href="#health">How it works <ArrowUpRight /></a></div>
            <div className="breakdown-grid">
              <ScoreCard label="HANDS" tag="HOLDING STRONG" value="61.2" tone="gold" detail="10 holders · flat today" />
              <ScoreCard label="NOISE" tag="TALKING" value="44.0" tone="neutral" detail="9 authors posting in 24h" />
              <ScoreCard label="CULT" tag="NOT TRACKED YET" tone="neutral" detail="Community identity signals" />
              <ScoreCard label="DEV" tag="DEV LOCKED IN" value="100.0" tone="green" detail="No recent dev sells" />
            </div>
            <div className="delta-strip"><span className="tiny-label">24H DELTAS</span><span>No notable change in the last day.</span><span className="delta-icon"><Activity /></span></div>
          </div>
        </div>
      </section>

      <section id="market" className="page-section market-section">
        <SectionHeading kicker="MARKET & HOLDERS" title="The shape of the last 7 days." detail="Trend lines for score, holders, voice and stewardship." />
        <div className="chart-grid">
          <ChartPanel title="Score history" subtitle="Relative signals over time" range={range} setRange={setRange} />
          <HolderPanel />
        </div>
      </section>

      <section id="community" className="page-section community-section">
        <SectionHeading kicker="COMMUNITY PULSE" title="What people are saying." detail="A little conviction, a little rally. The conversation at a glance." />
        <div className="community-layout">
          <div className="voice-summary">
            <div className="voice-top"><div><span className="tiny-label">X ACTIVITY</span><h3>Quiet account.<br />Active community.</h3></div><span className="empty-social-icon"><MessageCircle /></span></div>
            <p className="subdued-copy">No posts from this account in the last 12 hours.</p>
            <div className="voice-divider" />
            <div className="voice-stat-row"><span>COMMUNITY AUTHORS</span><b>16</b></div>
            <div className="voice-stat-row"><span>THESIS POSTS · 24H</span><b>9</b></div>
            <div className="voice-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="voice-chart-labels"><span>12H AGO</span><span>NOW</span></div>
          </div>
          <div className="posts-panel">
            <div className="posts-header"><div><span className="tiny-label">COMMUNITY THESIS</span><div className="posts-count">Recent voices <span>· {visiblePosts.length} posts</span></div></div><div className="filter-buttons">{["All voices", "Conviction", "Holding", "Rally"].map((item) => <Button key={item} variant="ghost" size="sm" className={`filter-button${filter === item ? " selected" : ""}`} onClick={() => setFilter(item)}>{item}</Button>)}</div></div>
            <div className="post-list">{visiblePosts.map((post) => <article className="post-item" key={post.name}><div className={`post-avatar ${post.tone}`}>{post.name.slice(0, 1).toUpperCase()}</div><div className="post-body"><div className="post-meta"><b>{post.name}</b><span className={`thesis-tag ${post.tone}`}>{post.tag}</span><time>{post.time}</time></div><p>{post.text}</p></div><span className="post-replies">0 replies</span></article>)}</div>
            <a href="#health" className="all-voices-link">Explore community signals <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section id="health" className="page-section health-section">
        <SectionHeading kicker="TOKEN HEALTH" title="Built to hold its ground." detail="Ownership, stewardship and the signals that protect a token." />
        <div className="health-grid">
          <div className="health-panel holder-health"><div className="health-title"><span className="health-icon green"><Users /></span><div><span className="tiny-label">DISTRIBUTION</span><h3>Holders</h3></div><span className="health-indicator"><span /> STABLE</span></div><div className="holder-stats"><div><span>TOTAL HOLDERS</span><b>10</b></div><div><span>TOP-10 SHARE</span><b>25.4%</b></div><div><span>NET CHANGE · 24H</span><b className="change-flat">— 0.0</b></div></div><div className="distribution-bar"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="distribution-labels"><span>TOP HOLDER <b>3.1%</b></span><span>WIDELY DISTRIBUTED</span></div></div>
          <div className="health-panel stewardship-panel"><div className="health-title"><span className="health-icon gold"><ShieldCheck /></span><div><span className="tiny-label">DEVELOPER ACTIVITY</span><h3>Stewardship</h3></div><span className="health-indicator healthy"><span /> HEALTHY</span></div><div className="steward-score"><span>Stewardship score</span><b>100.0</b><div className="steward-meter"><span /></div></div><div className="stewardship-details"><div><span>LAST DEV SALE</span><b className="good-text">None detected</b></div><div><span>DEV SELLS</span><b>0</b></div><div><span>FEES CLAIMED</span><b>—</b></div></div></div>
          <div className="health-panel risk-panel"><div className="health-title"><span className="health-icon neutral"><ShieldCheck /></span><div><span className="tiny-label">ON-CHAIN CHECKS</span><h3>Risk flags</h3></div></div><RiskRow title="No dominant wallet" detail="Largest wallet holds 3.1% of supply." good /><RiskRow title="Holders stable" detail="Holder count unchanged in 24h." good /><RiskRow title="Authorities" detail="Mint and freeze authority not tracked." /></div>
          <div className="health-panel data-panel"><div className="health-title"><span className="health-icon orange"><Activity /></span><div><span className="tiny-label">SOURCE STATUS</span><h3>Data freshness</h3></div></div><div className="source-list"><span><i className="source-dot fresh" /> Backfill</span><span><i className="source-dot fresh" /> Classifier</span><span><i className="source-dot fresh" /> Dexscreener</span><span><i className="source-dot fresh" /> Helius</span><span><i className="source-dot fresh" /> Pulse</span><span><i className="source-dot delayed" /> Pumpfomo</span><span><i className="source-dot fresh" /> Pushers</span><span><i className="source-dot delayed" /> X activity</span></div><div className="source-updated">Last refresh <b>3 minutes ago</b></div></div>
        </div>
      </section>

      <footer className="page-footer"><a className="brand-mark footer-brand" href="#overview"><span className="brand-dot">t</span><span>token<span className="brand-muted">/scope</span></span></a><span>Independent token intelligence <span className="footer-separator">·</span> Not financial advice</span><a href="#overview" className="back-top">Back to top <ArrowUpRight /></a></footer>
    </main>
  );
}

function Metric({ label, value, change, positive = false }: { label: string; value: string; change?: string; positive?: boolean }) {
  return <div className="metric"><span className="metric-label">{label}</span><span className="metric-value">{value}{change && <span className={positive ? "positive" : "negative"}>{change}</span>}</span></div>;
}

function SectionHeading({ kicker, title, detail }: { kicker: string; title: string; detail: string }) {
  return <div className="section-heading"><div><span className="section-kicker"><span />{kicker}</span><h2>{title}</h2><p>{detail}</p></div><ChevronRight className="section-heading-icon" /></div>;
}

function SignalItem({ text, rank, positive = false }: { text: string; rank: string; positive?: boolean }) {
  return <div className="signal-item"><span className={`signal-bullet${positive ? " positive-bullet" : ""}`} /> <p>{text}</p><span className={`signal-rank${positive ? " rank-positive" : ""}`}>{rank}</span></div>;
}

function ScoreCard({ label, tag, value, tone }: { label: string; tag: string; value?: string; tone: string }) {
  const detail = label === "HANDS" ? "10 holders · flat today" : label === "NOISE" ? "9 authors posting in 24h" : label === "CULT" ? "Community identity signals" : "No recent dev sells";
  return <div className="score-card"><div className="score-card-top"><span>{label}</span>{value && <b>{value}</b>}</div><span className={`score-tag ${tone}`}>{tag}</span><p>{detail}</p></div>;
}

function ChartPanel({ title, subtitle, range, setRange }: { title: string; subtitle: string; range: keyof typeof charts; setRange: (range: keyof typeof charts) => void }) {
  return <article className="chart-panel"><div className="chart-heading"><div><span className="tiny-label">SIGNAL TIMELINE</span><h3>{title}</h3><span className="chart-subtitle">{subtitle}</span></div><div className="chart-range">{(Object.keys(charts) as Array<keyof typeof charts>).map((item) => <Button key={item} variant="ghost" size="sm" className={`range-button${range === item ? " selected" : ""}`} onClick={() => setRange(item)}>{item}</Button>)}</div></div><div className="line-chart"><div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg viewBox="0 0 700 160" preserveAspectRatio="none" role="img" aria-label={`${range} token signal chart`}><path className="chart-gridline" d="M0 16H700 M0 48H700 M0 80H700 M0 112H700 M0 144H700" /><path className="line-green" d={charts[range][0]} /><path className="line-gold" d={charts[range][1]} /></svg></div><div className="chart-legend"><span><i className="legend-green" />Holders</span><span><i className="legend-gold" />Voice</span><span><i className="legend-orange" />Stewardship</span><span className="chart-axis"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></span></div></article>;
}

function HolderPanel() {
  return <article className="chart-panel holder-panel"><div className="chart-heading"><div><span className="tiny-label">OWNERSHIP</span><h3>Holder count</h3><span className="chart-subtitle">Net holders · 7 days</span></div><div className="holder-total"><b>10</b><span>holders</span></div></div><div className="holder-chart"><div className="chart-y-labels"><span>15</span><span>10</span><span>5</span><span>0</span></div><svg viewBox="0 0 560 150" preserveAspectRatio="none" role="img" aria-label="Holder count trend chart"><path className="chart-gridline" d="M0 15H560 M0 55H560 M0 95H560 M0 135H560" /><path className="holder-area" d="M0 127 L18 126 18 66 55 65 93 62 127 64 163 58 199 61 235 59 270 61 306 56 341 58 376 55 410 61 446 60 481 63 516 60 560 62 L560 135 L0 135Z" /><path className="line-green" d="M0 127 L18 126 18 66 55 65 93 62 127 64 163 58 199 61 235 59 270 61 306 56 341 58 376 55 410 61 446 60 481 63 516 60 560 62" /></svg></div><div className="chart-legend"><span><i className="legend-green" />Holders</span><span className="chart-axis"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></span></div></article>;
}

function RiskRow({ title, detail, good = false }: { title: string; detail: string; good?: boolean }) {
  return <div className="risk-row"><span className={`risk-dot${good ? " good" : ""}`} /><div><b>{title}</b><p>{detail}</p></div><ChevronRight /></div>;
}