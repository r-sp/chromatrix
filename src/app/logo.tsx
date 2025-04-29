import type { JSX } from "react";

export default function Logo(): JSX.Element {
  return (
    <svg role="img" aria-label="Chromatrix Logo" className="size-12" width={48} height={48} viewBox="0 0 48 48" fill="none">
      <g clipPath="url(#icon)">
        <rect width="48" height="48" rx="24" fill="url(#bg)" />
        <g clipPath="url(#mb)">
          <g transform="matrix(4.44949e-10 0.0125 -0.0199852 7.1139e-10 24.0001 25.5)">
            <rect x="0" y="0" width="1061.11" height="694.732" fill="url(#wb)" opacity="1" shapeRendering="crispEdges" />
            <rect
              x="0"
              y="0"
              width="1061.11"
              height="694.732"
              transform="scale(1 -1)"
              fill="url(#wb)"
              opacity="1"
              shapeRendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="1061.11"
              height="694.732"
              transform="scale(-1 1)"
              fill="url(#wb)"
              opacity="1"
              shapeRendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="1061.11"
              height="694.732"
              transform="scale(-1)"
              fill="url(#wb)"
              opacity="1"
              shapeRendering="crispEdges"
            />
          </g>
        </g>
        <path d="M24.0001 37.7639L11.1157 31.3218L24.0001 25.1005L36.8844 31.3218L24.0001 37.7639Z" />
        <path d="M38 17.2361V29.6395L25 23.3624V10.7361L38 17.2361Z" fill="url(#wc)" />
        <g clipPath="url(#mt)">
          <g transform="matrix(-0.014 -0.0065 0.00713114 -0.0153594 23 23.5)">
            <rect x="0" y="0" width="1198.18" height="762.079" fill="url(#wt)" opacity="1" shapeRendering="crispEdges" />
            <rect
              x="0"
              y="0"
              width="1198.18"
              height="762.079"
              transform="scale(1 -1)"
              fill="url(#wt)"
              opacity="1"
              shapeRendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="1198.18"
              height="762.079"
              transform="scale(-1 1)"
              fill="url(#wt)"
              opacity="1"
              shapeRendering="crispEdges"
            />
            <rect
              x="0"
              y="0"
              width="1198.18"
              height="762.079"
              transform="scale(-1)"
              fill="url(#wt)"
              opacity="1"
              shapeRendering="crispEdges"
            />
          </g>
        </g>
        <path d="M10 17.2361L23 10.7361V23.3624L10 29.6395V17.2361Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M25 8.5V39H23V8.5H25Z" fill="url(#xc)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.3352 30.2843L9.53419 15.8947L8.66455 17.6957L38.4656 32.0853L39.3352 30.2843Z"
          fill="url(#xl)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.3352 17.6957L9.53419 32.0853L8.66455 30.2843L38.4656 15.8947L39.3352 17.6957Z"
          fill="url(#xr)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 8L8 16V32L24 40L40 32V16L24 8ZM38 17.2361L24 10.2361L10 17.2361V30.7639L24 37.7639L38 30.7639V17.2361Z"
          fill="url(#ol)"
        />
      </g>
      <defs>
        <clipPath id="mb">
          <path d="M24.0001 37.7639L11.1157 31.3218L24.0001 25.1005L36.8844 31.3218L24.0001 37.7639Z" />
        </clipPath>
        <clipPath id="mt">
          <path d="M10 17.2361L23 10.7361V23.3624L10 29.6395V17.2361Z" />
        </clipPath>
        <radialGradient
          id="bg"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(24 24) rotate(90) scale(24)"
        >
          <stop offset="0.32" />
          <stop offset="0.64" stopColor="#242424" />
          <stop offset="1" />
        </radialGradient>
        <linearGradient id="wb" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="wc" x1="38" y1="17" x2="27" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="wt" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="xc" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="0.4" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="xl" x1="7.99988" y1="16" x2="39.9999" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0.6" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="xr" x1="7.99988" y1="32" x2="39.9999" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0.6" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="ol" x1="8" y1="16" x2="40" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0.2" stopColor="#FFFFFF" />
          <stop offset="0.8" stopColor="#DBDBDB" />
        </linearGradient>
        <clipPath id="icon">
          <rect width="48" height="48" rx="24" fill="#FFFFFF" />
        </clipPath>
      </defs>
    </svg>
  );
}
