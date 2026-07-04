export type Metric = { value: string; label: string };

type MetricRowProps = {
  metrics: Metric[];
  className?: string;
};

// A row of verified, defensible numbers. No vanity stats.
export function MetricRow({ metrics, className = "" }: MetricRowProps) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface px-5 py-6">
          <dt className="font-display text-3xl font-medium tracking-tight text-text">
            {m.value}
          </dt>
          <dd className="mt-1 text-sm leading-snug text-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}
