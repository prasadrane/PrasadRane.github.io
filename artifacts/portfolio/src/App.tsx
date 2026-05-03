import { useState, useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  Node, Edge, Background, Controls, MiniMap,
  useNodesState, useEdgesState, BackgroundVariant,
  NodeProps, Handle, Position, Panel, useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./architecture.css";

/* ─── Types ─────────────────────────────────────────────────── */
type Detail = { title: string; body: string[]; tags?: string[]; link?: { href: string; text: string }; };
type NodeData = { label: string; subtitle?: string; period?: string; tier: "master"|"hub"|"leaf"; color: string; fd: number; detail?: Detail; focused?: boolean; };
type Step = { nodeId: string; label: string; icon: string; color: string; nodeIds: string[]; sectionIdx: number; sectionLabel: string; isHub: boolean; detail?: Detail; };

/* ─── Circle Node ────────────────────────────────────────────── */
function CircleNode({ data, selected }: NodeProps<NodeData>) {
  const r = data.tier === "master" ? 52 : data.tier === "hub" ? 28 : 14;
  const size = r * 2;
  return (
    <div className={`cn cn--${data.tier}${selected ? " cn--sel" : ""}${data.focused ? " cn--focused" : ""}`}
      style={{ "--c": data.color, "--fd": `${data.fd}s`, width: size, height: size } as React.CSSProperties}>
      <Handle type="source" position={Position.Top}    className="cn-h" style={{ top: r, left: r }} />
      <Handle type="source" position={Position.Bottom} className="cn-h" style={{ top: r, left: r }} />
      <Handle type="source" position={Position.Left}   className="cn-h" style={{ top: r, left: r }} />
      <Handle type="source" position={Position.Right}  className="cn-h" style={{ top: r, left: r }} />
      <Handle type="target" position={Position.Top}    className="cn-h" id="tt" style={{ top: r, left: r }} />
      <Handle type="target" position={Position.Bottom} className="cn-h" id="tb" style={{ top: r, left: r }} />
      <Handle type="target" position={Position.Left}   className="cn-h" id="tl" style={{ top: r, left: r }} />
      <Handle type="target" position={Position.Right}  className="cn-h" id="tr" style={{ top: r, left: r }} />
      <div className="cn-circle">{data.tier === "master" && <span className="cn-master-text">PR</span>}</div>
      <div className="cn-label">
        <span className="cn-label-name">{data.label}</span>
        {data.period   && <span className="cn-label-period">{data.period}</span>}
        {data.subtitle && data.tier === "leaf" && <span className="cn-label-sub">{data.subtitle}</span>}
      </div>
    </div>
  );
}

/* ─── Colours ────────────────────────────────────────────────── */
const COL = { emerald:"#059669", blue:"#2563eb", violet:"#7c3aed", rose:"#e11d48", amber:"#d97706", cyan:"#0891b2", master:"#1e40af" };

/* ─── Helpers ─────────────────────────────────────────────────── */
function px(x: number, y: number) { return { x, y }; }
function n(id: string, pos: { x: number; y: number }, data: NodeData): Node<NodeData> { return { id, type: "circle", position: pos, data }; }
function edge(id: string, src: string, tgt: string, col: string, animated = false): Edge {
  return { id, source: src, target: tgt, animated, style: { stroke: col, strokeWidth: animated ? 1.6 : 1.2, opacity: 0.7 }, type: "straight" };
}

/* ─── Section definitions ─────────────────────────────────────── */
const SECTION_DEFS = [
  { label:"Prasad Rane",    icon:"👤", color:COL.master,  hubId:"prasad",
    overviewIds:["prasad","h-edu","h-exp","h-sk","h-proj","h-cert","h-con"], leafIds:[] },
  { label:"Experience",     icon:"💼", color:COL.blue,    hubId:"h-exp",
    overviewIds:["h-exp","l-cog","l-wip","l-inf","l-rkt"], leafIds:["l-cog","l-wip","l-inf","l-rkt"] },
  { label:"Projects",       icon:"🛠️", color:COL.rose,    hubId:"h-proj",
    overviewIds:["h-proj","l-p-chat","l-p-micro","l-p-dash"], leafIds:["l-p-chat","l-p-micro","l-p-dash"] },
  { label:"Skills",         icon:"⚡", color:COL.violet,  hubId:"h-sk",
    overviewIds:["h-sk","l-sk-be","l-sk-fe","l-sk-cl","l-sk-ai","l-sk-db"], leafIds:["l-sk-be","l-sk-fe","l-sk-cl","l-sk-ai","l-sk-db"] },
  { label:"Certifications", icon:"🏅", color:COL.amber,   hubId:"h-cert",
    overviewIds:["h-cert","l-c-aws","l-c-az","l-c-safe"], leafIds:["l-c-aws","l-c-az","l-c-safe"] },
  { label:"Education",      icon:"🎓", color:COL.emerald, hubId:"h-edu",
    overviewIds:["h-edu","l-bsc","l-msc"], leafIds:["l-bsc","l-msc"] },
  { label:"Contact",        icon:"📡", color:COL.cyan,    hubId:"h-con",
    overviewIds:["h-con","l-resume"], leafIds:["l-resume"] },
];

/* ─── Nodes ──────────────────────────────────────────────────── */
const NODES: Node<NodeData>[] = [
  n("prasad", px(0,0), { tier:"master", label:"Prasad Rane", subtitle:"Software Engineer & AI Enthusiast", color:COL.master, fd:0,
    detail:{ title:"Prasad Rane", body:["10+ years building scalable web apps and AI-driven products.","Senior Software Engineer at Rocket Mortgage — built AI mortgage chatbot with Amazon Bedrock.","Specialises in end-to-end system design, Agile leadership, and modern AI integration.","Exploring new backend frameworks and autonomous AI agents."], tags:["C#",".NET","Angular","AWS","AI","Microservices","Python"] } }),
  // Education
  n("h-edu",  px(-340,-380), { tier:"hub",  label:"Education", color:COL.emerald, fd:0.4, detail:{ title:"Education", body:["Academic foundations in Computer Science and Software Engineering."] } }),
  n("l-bsc",  px(-620,-500), { tier:"leaf", label:"B.E. Computer Science", subtitle:"Univ. of Pune", period:"2009–2013", color:COL.emerald, fd:0.9,
    detail:{ title:"B.E. Computer Science · University of Pune", body:["University of Pune, India · 2009–2013.","Modules: Data Structures, Algorithms, DBMS, OS, Networks.","Foundational skills in C, Java, software engineering."], tags:["Computer Science","Algorithms","Java","C","DBMS"] } }),
  n("l-msc",  px(-220,-560), { tier:"leaf", label:"M.S. Software Engineering", subtitle:"In Progress", period:"2024–2026", color:COL.emerald, fd:1.3,
    detail:{ title:"M.S. Software Engineering", body:["Advanced studies in distributed systems, cloud architecture, and AI/ML.","Focus: scalable system design, machine learning, modern software methodologies."], tags:["Distributed Systems","AI/ML","Cloud Architecture","System Design"] } }),
  // Experience
  n("h-exp",  px(-480,-60),  { tier:"hub",  label:"Experience", color:COL.blue, fd:0.6, detail:{ title:"Work Experience", body:["10+ years across 4 companies, growing from Programmer Analyst to Senior Software Engineer."] } }),
  n("l-cog",  px(-820,-260), { tier:"leaf", label:"Cognizant", subtitle:"Programmer Analyst", period:"2013–2015", color:COL.blue, fd:1.1,
    detail:{ title:"Cognizant · Programmer Analyst", body:["ASP.NET web forms and Web API services for insurance clients.","Maintained legacy VB.NET applications.","SQL stored procedures and BI reports."], tags:["ASP.NET","VB.NET","SQL Server","Web API"] } }),
  n("l-wip",  px(-880,-40),  { tier:"leaf", label:"Wipro Technologies", subtitle:"Software Engineer", period:"2015–2018", color:COL.blue, fd:0.7,
    detail:{ title:"Wipro Technologies · Software Engineer", body:["RESTful APIs and Angular front-ends for enterprise healthcare systems.","Integrated payment gateways and identity providers.","Two-week Agile sprint delivery."], tags:["Angular",".NET Core","REST APIs","Agile"] } }),
  n("l-inf",  px(-820,200),  { tier:"leaf", label:"Infosys", subtitle:"Technology Analyst", period:"2018–2022", color:COL.blue, fd:1.5,
    detail:{ title:"Infosys · Technology Analyst", body:[".NET Core APIs consumed by 50+ downstream services.","3× SQL Server performance improvement.","Angular FinTech dashboards for enterprise clients."], tags:[".NET Core","Angular","SQL Server","Microservices","FinTech"] } }),
  n("l-rkt",  px(-560,360),  { tier:"leaf", label:"Rocket Mortgage", subtitle:"Sr. Software Engineer", period:"2022–Present", color:COL.blue, fd:0.3,
    detail:{ title:"Rocket Mortgage · Senior Software Engineer", body:["AI mortgage chatbot with Amazon Bedrock + RAG → 30% fewer support tickets.","Led microservices migration → 40% throughput gain.","AWS SNS/SQS notification system for 2M+ users.","Angular migration from AngularJS → 60% smaller bundle."], tags:["Amazon Bedrock","RAG","Microservices","AWS","Angular","TypeScript"] } }),
  // Skills
  n("h-sk",   px(380,-60),   { tier:"hub",  label:"Skills", color:COL.violet, fd:0.5, detail:{ title:"Technical Skills", body:["Full-stack expertise spanning backend, frontend, cloud, AI, and databases."] } }),
  n("l-sk-be",px(620,-280),  { tier:"leaf", label:"Backend & APIs", color:COL.violet, fd:1.0, detail:{ title:"Backend & APIs", body:["Enterprise API design across all career stages."], tags:[".NET Core","ASP.NET","REST","GraphQL","Node.js","Microservices","SignalR"] } }),
  n("l-sk-fe",px(740,-40),   { tier:"leaf", label:"Frontend", color:COL.violet, fd:0.6, detail:{ title:"Frontend", body:["Modern web from AngularJS to React."], tags:["Angular","React","TypeScript","RxJS","NgRx","HTML5/CSS3"] } }),
  n("l-sk-cl",px(640,200),   { tier:"leaf", label:"Cloud & DevOps", color:COL.violet, fd:1.4, detail:{ title:"Cloud & DevOps", body:["AWS Certified with production-scale experience."], tags:["AWS (Certified)","Lambda","S3","EC2","SNS/SQS","Docker","Terraform","CI/CD"] } }),
  n("l-sk-ai",px(460,360),   { tier:"leaf", label:"AI & ML", color:COL.violet, fd:0.2, detail:{ title:"AI & Machine Learning", body:["Production AI experience."], tags:["Amazon Bedrock","LangChain","OpenAI","RAG","Prompt Engineering","Python"] } }),
  n("l-sk-db",px(800,320),   { tier:"leaf", label:"Databases", color:COL.violet, fd:1.7, detail:{ title:"Databases", body:["Relational and NoSQL at enterprise scale."], tags:["SQL Server","PostgreSQL","MongoDB","Redis","DynamoDB"] } }),
  // Projects
  n("h-proj", px(-200,360),  { tier:"hub",  label:"Projects", color:COL.rose, fd:0.8, detail:{ title:"Key Projects", body:["Flagship engineering projects built throughout the career."] } }),
  n("l-p-chat",px(-420,540), { tier:"leaf", label:"AI Mortgage Chatbot", subtitle:"Bedrock + RAG", color:COL.rose, fd:1.3,
    detail:{ title:"AI Mortgage Advisor Chatbot", body:["Amazon Bedrock + LangChain + RAG chatbot on Rocket Mortgage's platform.","Personalised loan options and mortgage Q&A.","Reduced support tickets by 30%."], tags:["Amazon Bedrock","LangChain","Python","RAG","AWS Lambda","Angular"] } }),
  n("l-p-micro",px(-100,600),{ tier:"leaf", label:"Loan Origination Platform", subtitle:"Microservices", color:COL.rose, fd:0.4,
    detail:{ title:"Loan Origination Microservices Platform", body:["Re-architected monolith into event-driven microservices.","40% throughput improvement, independent deployments."], tags:[".NET Core","AWS","Docker","Kafka","SQL Server","CI/CD"] } }),
  n("l-p-dash",px(180,560),  { tier:"leaf", label:"Financial Analytics Dashboard", subtitle:"Real-time", color:COL.rose, fd:1.8,
    detail:{ title:"Real-Time Financial Analytics Dashboard", body:["Angular dashboard for real-time financial reporting.","3× SQL query performance improvement."], tags:["Angular",".NET Core","SignalR","SQL Server"] } }),
  // Certifications
  n("h-cert", px(200,-380),  { tier:"hub",  label:"Certifications", color:COL.amber, fd:1.0, detail:{ title:"Certifications", body:["Industry-recognised certifications in cloud, development, and Agile."] } }),
  n("l-c-aws",px(480,-520),  { tier:"leaf", label:"AWS Cloud Practitioner", subtitle:"Amazon Web Services", period:"2023–2026", color:COL.amber, fd:0.6,
    detail:{ title:"AWS Certified Cloud Practitioner", body:["Amazon Web Services · Valid 2023–2026.","Foundational AWS services, security, architecture."], tags:["AWS","Cloud","Architecture"], link:{ href:"https://www.credly.com/badges/", text:"Verify on Credly →" } } }),
  n("l-c-az", px(220,-600),  { tier:"leaf", label:"Azure Developer Associate", subtitle:"Microsoft", period:"2021", color:COL.amber, fd:1.4,
    detail:{ title:"Microsoft Certified: Azure Developer Associate", body:["Microsoft · 2021.","Expertise in designing and building Azure cloud solutions."], tags:["Azure","Microsoft","Cloud"] } }),
  n("l-c-safe",px(680,-440), { tier:"leaf", label:"SAFe® 5 Practitioner", subtitle:"Scaled Agile", period:"2022", color:COL.amber, fd:0.2,
    detail:{ title:"Certified SAFe® 5 Practitioner", body:["Scaled Agile, Inc. · 2022.","Proficient in Scaled Agile Framework for enterprise delivery."], tags:["SAFe","Agile","Leadership"] } }),
  // Contact
  n("h-con",  px(200,360),   { tier:"hub",  label:"Contact", color:COL.cyan, fd:1.1,
    detail:{ title:"Get In Touch", body:["Open to opportunities, collaborations, and AI-focused engineering conversations."], tags:["LinkedIn","GitHub","Email"], link:{ href:"https://linkedin.com/in/prasadrane", text:"LinkedIn →" } } }),
  n("l-resume",px(420,500),  { tier:"leaf", label:"Resume", subtitle:"Download PDF", color:COL.cyan, fd:0.7,
    detail:{ title:"Download Resume", body:["Full CV with detailed work history, skills, and accomplishments."], link:{ href:"https://drive.google.com/file/d/10VFd3_e__YUU_llrlyKj7111EH54Q-hF/view?usp=sharing", text:"Download PDF →" } } }),
];

const EDGES: Edge[] = [
  edge("pr-edu","prasad","h-edu",COL.emerald,true), edge("pr-exp","prasad","h-exp",COL.blue,true),
  edge("pr-sk","prasad","h-sk",COL.violet,true),    edge("pr-proj","prasad","h-proj",COL.rose,true),
  edge("pr-cert","prasad","h-cert",COL.amber,true),  edge("pr-con","prasad","h-con",COL.cyan,true),
  edge("edu-bsc","h-edu","l-bsc",COL.emerald), edge("edu-msc","h-edu","l-msc",COL.emerald),
  edge("exp-cog","h-exp","l-cog",COL.blue), edge("exp-wip","h-exp","l-wip",COL.blue),
  edge("exp-inf","h-exp","l-inf",COL.blue), edge("exp-rkt","h-exp","l-rkt",COL.blue),
  edge("sk-be","h-sk","l-sk-be",COL.violet), edge("sk-fe","h-sk","l-sk-fe",COL.violet),
  edge("sk-cl","h-sk","l-sk-cl",COL.violet), edge("sk-ai","h-sk","l-sk-ai",COL.violet), edge("sk-db","h-sk","l-sk-db",COL.violet),
  edge("pj-ch","h-proj","l-p-chat",COL.rose), edge("pj-mi","h-proj","l-p-micro",COL.rose), edge("pj-da","h-proj","l-p-dash",COL.rose),
  edge("ce-aws","h-cert","l-c-aws",COL.amber), edge("ce-az","h-cert","l-c-az",COL.amber), edge("ce-sf","h-cert","l-c-safe",COL.amber),
  edge("con-res","h-con","l-resume",COL.cyan),
];

/* ─── Build flat STEPS array (25 total) ──────────────────────── */
const STEPS: Step[] = [];
SECTION_DEFS.forEach((sec, sIdx) => {
  const hubData = NODES.find(n => n.id === sec.hubId)?.data;
  STEPS.push({ nodeId: sec.hubId, label: sec.label, icon: sec.icon, color: sec.color,
    nodeIds: sec.overviewIds, sectionIdx: sIdx, sectionLabel: sec.label, isHub: true, detail: hubData?.detail });
  sec.leafIds.forEach(leafId => {
    const ld = NODES.find(n => n.id === leafId)?.data;
    if (!ld) return;
    STEPS.push({ nodeId: leafId, label: ld.label, icon: sec.icon, color: sec.color,
      nodeIds: [sec.hubId, leafId], sectionIdx: sIdx, sectionLabel: sec.label, isHub: false, detail: ld.detail });
  });
});

// First step index per section (for dot-click navigation)
const SECTION_FIRST: number[] = SECTION_DEFS.map((_, sIdx) =>
  STEPS.findIndex(s => s.sectionIdx === sIdx)
);

/* ─── ScrollController (inside ReactFlow — needs useReactFlow) ── */
function ScrollController({ stepIndex, setStepIndex }: { stepIndex: number; setStepIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const { fitBounds, getNodes } = useReactFlow();

  useEffect(() => {
    const step = STEPS[stepIndex];
    const timer = setTimeout(() => {
      const all = getNodes();
      const targets = all.filter(nd => step.nodeIds.includes(nd.id));
      if (!targets.length) return;
      const W = (nd: Node<NodeData>) => nd.measured?.width  ?? (nd.data.tier==="master"?104:nd.data.tier==="hub"?56:200);
      const H = (nd: Node<NodeData>) => nd.measured?.height ?? (nd.data.tier==="master"?160:nd.data.tier==="hub"?90:80);
      let x1=Infinity,y1=Infinity,x2=-Infinity,y2=-Infinity;
      for (const nd of targets) {
        x1=Math.min(x1,nd.position.x); y1=Math.min(y1,nd.position.y);
        x2=Math.max(x2,nd.position.x+W(nd)); y2=Math.max(y2,nd.position.y+H(nd));
      }
      // More padding for leaf-only views so they don't fill the whole viewport
      const pad = step.isHub ? 0.25 : 0.45;
      fitBounds({ x:x1, y:y1, width:x2-x1, height:y2-y1 }, { duration:750, padding:pad });
    }, 60);
    return () => clearTimeout(timer);
  }, [stepIndex, fitBounds, getNodes]);

  useEffect(() => {
    let locked = false;
    const handler = (e: WheelEvent) => {
      const t = e.target as Element;
      if (t.closest(".sec-panel")||t.closest(".pop")||t.closest(".pop-bg")) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      setStepIndex(prev => (prev + dir + STEPS.length) % STEPS.length);
      setTimeout(() => { locked = false; }, 820);
    };
    document.addEventListener("wheel", handler, { passive: false });
    return () => document.removeEventListener("wheel", handler);
  }, [setStepIndex]);

  return null;
}

/* ─── Section Panel ──────────────────────────────────────────── */
function SectionPanel({ stepIndex, onDotClick }: { stepIndex: number; onDotClick: (i: number) => void }) {
  const step = STEPS[stepIndex];

  // Within-section progress: e.g. "2 / 5"
  const secSteps = STEPS.filter(s => s.sectionIdx === step.sectionIdx);
  const withinPos = secSteps.findIndex(s => s.nodeId === step.nodeId) + 1;
  const withinTotal = secSteps.length;

  // All leaf nodeIds in this section (to show mini-cards in hub view)
  const sectionDef = SECTION_DEFS[step.sectionIdx];
  const leafNodes = (sectionDef?.leafIds ?? [])
    .map(id => NODES.find(n => n.id === id)?.data)
    .filter(Boolean) as NodeData[];

  return (
    <div className="sec-panel" style={{ "--sc": step.color } as React.CSSProperties}>
      {/* Header */}
      <div className="sec-header">
        <span className="sec-icon">{step.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sec-title">{step.label}</div>
          {!step.isHub && (
            <div className="sec-breadcrumb">
              <span className="sec-breadcrumb-parent">{step.sectionLabel}</span>
              <span className="sec-breadcrumb-sep"> › </span>
              <span className="sec-breadcrumb-pos">{withinPos} of {withinTotal}</span>
            </div>
          )}
          {step.isHub && withinTotal > 1 && (
            <div className="sec-breadcrumb">
              <span className="sec-breadcrumb-pos">Overview · {withinTotal - 1} item{withinTotal > 2 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content area — scrollable */}
      <div className="sec-content">
        {step.isHub ? (
          /* Hub: description + leaf cards */
          <>
            {step.detail?.body.map((b, i) => (
              <p key={i} className="sec-hub-body">{b}</p>
            ))}
            {leafNodes.length > 0 && (
              <div className="sec-leaves">
                {leafNodes.map((nd, i) => (
                  <div key={i} className="sec-leaf" style={{ "--sc": step.color } as React.CSSProperties}>
                    <div className="sec-leaf-name">{nd.label}</div>
                    {nd.period   && <div className="sec-leaf-period">{nd.period}</div>}
                    {nd.subtitle && <div className="sec-leaf-sub">{nd.subtitle}</div>}
                    {nd.detail?.tags && (
                      <div className="sec-leaf-tags">
                        {nd.detail.tags.slice(0, 4).map(t => <span key={t} className="sec-leaf-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Leaf: full detail */
          <div className="sec-detail">
            {step.detail?.body.map((b, i) => (
              <div key={i} className="sec-detail-bullet">
                <span className="sec-detail-arrow">▸</span>
                <span>{b}</span>
              </div>
            ))}
            {step.detail?.tags && (
              <div className="sec-leaf-tags" style={{ marginTop: 14 }}>
                {step.detail.tags.map(t => <span key={t} className="sec-leaf-tag">{t}</span>)}
              </div>
            )}
            {step.detail?.link && (
              <a href={step.detail.link.href} target="_blank" rel="noopener noreferrer"
                 className="sec-detail-link" style={{ color: step.color, borderColor: step.color + "40" }}>
                {step.detail.link.text}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Section navigation dots */}
      <div className="sec-footer">
        <div className="sec-dots">
          {SECTION_DEFS.map((sec, i) => (
            <button key={i}
              className={`sec-dot${i === step.sectionIdx ? " sec-dot--active" : ""}`}
              style={i === step.sectionIdx ? { background: sec.color, boxShadow: `0 0 0 3px ${sec.color}33` } : {}}
              onClick={() => onDotClick(SECTION_FIRST[i])}
              title={sec.label}
            />
          ))}
        </div>
        <div className="sec-scroll-hint">↕ Scroll to navigate &nbsp;·&nbsp; {stepIndex + 1} / {STEPS.length}</div>
      </div>
    </div>
  );
}

/* ─── Hover/click popup ──────────────────────────────────────── */
type PopupState = Detail & { color: string };

function PopupCard({ data, pinned, onClose, onMouseEnter, onMouseLeave }: {
  data: PopupState; pinned: boolean; onClose: () => void;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  useEffect(() => {
    if (!pinned) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [pinned, onClose]);

  const card = (
    <div className={`pop${pinned?" pop--pinned":" pop--hover"}`}
      style={{ "--pc": data.color } as React.CSSProperties}
      onMouseDown={e => e.stopPropagation()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="pop-bar" />
      {pinned && <button className="pop-x" onClick={onClose}>✕</button>}
      <h2 className="pop-title">{data.title}</h2>
      <ul className="pop-body">{data.body.map((b,i) => <li key={i}>{b}</li>)}</ul>
      {data.tags && (
        <div className="pop-tags">
          {data.tags.map(t => <span key={t} className="pop-tag" style={{ color:data.color, borderColor:data.color+"55" }}>{t}</span>)}
        </div>
      )}
      {data.link && (
        <a href={data.link.href} target="_blank" rel="noopener noreferrer"
           className="pop-link" style={{ color:data.color, borderColor:data.color+"40" }}>{data.link.text}</a>
      )}
      {!pinned && <div className="pop-hint">Click node to pin this panel</div>}
    </div>
  );
  if (pinned) return <div className="pop-bg" onMouseDown={onClose}>{card}</div>;
  return <div className="pop-float">{card}</div>;
}

/* ─── App ────────────────────────────────────────────────────── */
const NT = { circle: CircleNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(NODES);
  const [edges,,onEdgesChange] = useEdgesState(EDGES);
  const nodeTypes = useMemo(() => NT, []);

  const [stepIndex, setStepIndex] = useState(0);

  // Highlight the active node in the graph whenever the step changes
  useEffect(() => {
    const activeId = STEPS[stepIndex].nodeId;
    setNodes(prev => prev.map(nd => ({
      ...nd,
      data: { ...nd.data, focused: nd.id === activeId },
    })));
  }, [stepIndex, setNodes]);

  const [popup,    setPopup]    = useState<PopupState | null>(null);
  const [pinned,   setPinned]   = useState(false);
  const [overCard, setOverCard] = useState(false);

  const closePopup = useCallback(() => { setPopup(null); setPinned(false); setOverCard(false); }, []);
  const onNodeMouseEnter = useCallback((_: React.MouseEvent, nd: Node<NodeData>) => {
    if (nd.data.detail && !pinned) { setPopup({ ...nd.data.detail, color: nd.data.color }); setPinned(false); }
  }, [pinned]);
  const onNodeMouseLeave = useCallback(() => {
    if (!pinned) setTimeout(() => setOverCard(oc => { if (!oc) setPopup(null); return oc; }), 120);
  }, [pinned]);
  const onNodeClick = useCallback((_: React.MouseEvent, nd: Node<NodeData>) => {
    if (nd.data.detail) { setPopup({ ...nd.data.detail, color: nd.data.color }); setPinned(true); }
  }, []);

  const step = STEPS[stepIndex];

  return (
    <div className="app-root">
      <div className="graph-area">
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          onNodeMouseEnter={onNodeMouseEnter} onNodeMouseLeave={onNodeMouseLeave}
          onNodeClick={onNodeClick} onPaneClick={closePopup}
          nodeTypes={nodeTypes}
          fitView fitViewOptions={{ padding: 0.1 }}
          minZoom={0.1} maxZoom={3}
          zoomOnScroll={false} panOnScroll={false}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
        >
          <Background variant={BackgroundVariant.Dots} color="#cbd5e1" gap={32} size={1.2} />
          <Controls style={{ background:"#fff", border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }} />
          <MiniMap style={{ background:"#fff", border:"1px solid #e2e8f0" }}
            nodeColor={nd => (nd.data as NodeData).color} maskColor="rgba(248,250,252,0.75)" />

          <Panel position="top-center">
            <div className="sec-topbar" style={{ "--sc": step.color } as React.CSSProperties}>
              <span className="sec-topbar-icon">{step.icon}</span>
              <span className="sec-topbar-label">{step.label}</span>
              {!step.isHub && (
                <span className="sec-topbar-parent">{step.sectionLabel}</span>
              )}
              <span className="sec-topbar-count">{stepIndex + 1} / {STEPS.length}</span>
            </div>
          </Panel>

          <ScrollController stepIndex={stepIndex} setStepIndex={setStepIndex} />
        </ReactFlow>

        {popup && (
          <PopupCard data={popup} pinned={pinned} onClose={closePopup}
            onMouseEnter={() => setOverCard(true)}
            onMouseLeave={() => { setOverCard(false); if (!pinned) setPopup(null); }} />
        )}
      </div>

      <SectionPanel stepIndex={stepIndex} onDotClick={setStepIndex} />
    </div>
  );
}
