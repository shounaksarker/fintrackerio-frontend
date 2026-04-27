const Badge = ({ config }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg}`}
  >
    {config.dot && <span className={`inline-block size-1.5 rounded-full ${config.dot}`} />}
    {config.label}
  </span>
);

const StatCard = ({ label, value, color }) => (
  <div className="app-surface flex flex-col gap-1 rounded-2xl p-4">
    <span className="text-xs font-bold uppercase tracking-wide text-finance-muted">{label}</span>
    <span className={`text-2xl font-black ${color || 'text-finance-ink'}`}>{value ?? '—'}</span>
  </div>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="flex flex-col gap-1 text-xs font-bold text-finance-muted">
    {label}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-finance-border bg-white px-3 py-2 text-sm capitalize text-finance-ink shadow-sm focus:border-pest focus:outline-none focus:ring-2 focus:ring-pest/15"
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="capitalize">
          {opt}
        </option>
      ))}
    </select>
  </label>
);

export { Badge, StatCard, FilterSelect };
