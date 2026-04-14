interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

/**
 * SVG logo component — renders the Ribas mark + wordmark.
 * When `collapsed`, shows only the R mark (suitable for narrow sidebar).
 * Fully scalable, no background, theme-neutral (works on both light & dark).
 */
const Logo = ({ collapsed = false, className = "" }: LogoProps) => (
  <svg
    viewBox={collapsed ? "0 0 90 72" : "0 0 216 72"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Ribas"
    role="img"
  >
    <defs>
      <linearGradient id="ribas-mark" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%"   stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="ribas-text" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#bfdbfe" />
      </linearGradient>
    </defs>

    {/* ── Three diagonal wing stripes ─────────────────────────────── */}
    {/* Each is a parallelogram: top-left, top-right, bottom-right, bottom-left */}
    {/* They lean right as they go down (speed-line / wing motif)     */}
    <polygon points="0,64  11,64  22,8  11,8"  fill="url(#ribas-mark)" />
    <polygon points="14,64 25,64  36,8  25,8"  fill="url(#ribas-mark)" />
    <polygon points="28,64 39,64  50,8  39,8"  fill="url(#ribas-mark)" />

    {/* ── R letterform ────────────────────────────────────────────── */}
    {/* Bowl: filled ring shape (outer rect minus inner rect via even-odd) */}
    <path
      fillRule="evenodd"
      d="
        M 50,8
        H 66
        C 79,8 88,17 88,30
        C 88,43 79,52 66,52
        H 50
        V 42
        H 64
        C 72,42 77,37 77,30
        C 77,23 72,18 64,18
        H 50
        Z
      "
      fill="url(#ribas-mark)"
    />

    {/* Leg: diagonal stroke going lower-right */}
    <path
      d="M 50,52 L 80,64 H 68 L 50,57 Z"
      fill="url(#ribas-mark)"
    />

    {/* ── Wordmark ────────────────────────────────────────────────── */}
    {!collapsed && (
      <text
        x="100"
        y="44"
        fontFamily="'Inter', 'Sora', sans-serif"
        fontWeight="700"
        fontSize="25"
        letterSpacing="6"
        fill="url(#ribas-text)"
      >
        RIBAS
      </text>
    )}
  </svg>
);

export default Logo;
