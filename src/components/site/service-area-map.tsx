type ServiceAreaMapProps = {
  className?: string;
};

export function ServiceAreaMap({ className }: ServiceAreaMapProps) {
  return (
    <svg
      viewBox="0 0 600 420"
      role="img"
      aria-label="Service area: Texas and Louisiana, headquartered in Beaumont, TX"
      className={className}
    >
      <defs>
        <pattern
          id="tcs-map-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="rgb(255 255 255 / 0.04)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="600" height="420" fill="url(#tcs-map-grid)" />

      {/* Texas */}
      <path
        d="M 70 40
           L 170 40
           L 170 128
           L 430 128
           L 470 138
           L 500 156
           L 512 190
           L 508 230
           L 492 270
           L 466 292
           L 436 304
           L 402 312
           L 358 322
           L 316 336
           L 276 354
           L 244 366
           L 222 356
           L 202 332
           L 176 298
           L 152 266
           L 128 240
           L 104 210
           L 90 180
           L 80 146
           L 74 110
           L 70 78
           Z"
        fill="rgb(255 255 255 / 0.06)"
        stroke="rgb(255 255 255 / 0.35)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Louisiana */}
      <path
        d="M 500 156
           L 576 156
           L 580 182
           L 584 216
           L 580 244
           L 572 268
           L 554 284
           L 540 296
           L 528 302
           L 510 298
           L 492 296
           L 492 270
           L 508 230
           L 512 190
           Z"
        fill="rgb(255 255 255 / 0.06)"
        stroke="rgb(255 255 255 / 0.35)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* State labels */}
      <text
        x="260"
        y="220"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        letterSpacing="4"
        fill="rgb(255 255 255 / 0.55)"
      >
        TEXAS
      </text>
      <text
        x="538"
        y="232"
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        letterSpacing="2"
        fill="rgb(255 255 255 / 0.55)"
      >
        LOUISIANA
      </text>

      {/* Beaumont pin */}
      <g>
        <circle
          cx="470"
          cy="282"
          r="12"
          fill="#f2e607"
          fillOpacity="0.18"
        />
        <circle
          cx="470"
          cy="282"
          r="5"
          fill="#f2e607"
          stroke="#131d4f"
          strokeWidth="1.5"
        />
        <text
          x="470"
          y="266"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fill="#f2e607"
        >
          Beaumont, TX
        </text>
      </g>
    </svg>
  );
}
