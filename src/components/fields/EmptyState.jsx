import React from 'react';

const EmptyState = ({
  title = 'Nothing here yet',
  description = 'Add a new record to see it here.',
  action,
  compact = false,
  className = '',
}) => {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-finance-border bg-white/70 px-5 text-center shadow-soft ${compact ? 'min-h-[170px] py-7' : 'min-h-[260px] py-10'} ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-gradient-to-r from-pest/10 via-finance-accent/10 to-finance-pink/10 blur-2xl" />
      <div className="relative mb-4 flex size-16 items-end justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-white to-finance-panel shadow-soft">
        <span className="mb-4 h-6 w-2 rounded-full bg-pest/75" />
        <span className="mb-4 ml-1 h-9 w-2 rounded-full bg-finance-accent/70" />
        <span className="mb-4 ml-1 h-4 w-2 rounded-full bg-finance-pink/70" />
      </div>
      <h3 className="relative text-base font-black text-finance-ink md:text-lg">{title}</h3>
      {description && (
        <p className="relative mt-2 max-w-md text-sm font-medium leading-6 text-finance-muted">
          {description}
        </p>
      )}
      {action && <div className="relative mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
