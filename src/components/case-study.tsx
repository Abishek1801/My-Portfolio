export function DiagramLegend() {
  return (
    <div className="case-legend">
      <span>
        <i className="case-swatch case-swatch-mine" /> built by me
      </span>
      <span>
        <i className="case-swatch case-swatch-team" /> teammates / external
      </span>
    </div>
  );
}

export function DiagramNode({
  title,
  detail,
  mine = false,
}: {
  title: string;
  detail: string;
  mine?: boolean;
}) {
  return (
    <div className={`case-node ${mine ? "case-node-mine" : "case-node-team"}`}>
      <p className="case-node-title">{title}</p>
      <p className="case-node-detail">{detail}</p>
    </div>
  );
}

export function DiagramArrow({ label }: { label: string }) {
  return (
    <div className="case-arrow" aria-hidden>
      <span>↓</span>
      <span className="case-arrow-label">{label}</span>
    </div>
  );
}
