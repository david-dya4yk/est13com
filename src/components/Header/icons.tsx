export const IconChev = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x={3} y={4} width={18} height={16} rx={2} />
    <path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2" />
  </svg>
);

export const IconBot = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x={4} y={7} width={16} height={12} rx={3} />
    <path d="M12 7V4M9 13h.01M15 13h.01M2 12v3M22 12v3" />
  </svg>
);

export const IconAi = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5z" />
    <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
  </svg>
);

export const IconBrand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.5 1-2 2.5-2H19a2 2 0 0 0 2-2 7 7 0 0 0-7-7" />
    <circle cx={7.5} cy={11} r={1} />
    <circle cx={10} cy={7} r={1} />
    <circle cx={15} cy={7.5} r={1} />
  </svg>
);

export const SERVICE_ICONS = {
  web: IconWeb,
  bot: IconBot,
  ai: IconAi,
  brand: IconBrand,
} as const;
