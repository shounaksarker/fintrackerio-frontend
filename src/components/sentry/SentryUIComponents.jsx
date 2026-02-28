const Badge = ({ config }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg}`}
  >
    {config.dot && <span className={`inline-block size-1.5 rounded-full ${config.dot}`} />}
    {config.label}
  </span>
);

const StatCard = ({ label, value, color }) => (
  <div className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <span className="text-xs font-medium tracking-wide text-gray-500">{label}</span>
    <span className={`text-2xl font-bold ${color || 'text-gray-900'}`}>{value ?? '—'}</span>
  </div>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-gray-500">
    {label}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm capitalize text-gray-800 focus:border-pest focus:outline-none focus:ring-1 focus:ring-pest"
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
