interface Props {
    dim?: number;
}

export const BrainwaveIcon = ({ dim = 24 }: Props) => {
    return (
        <svg width={dim} height={dim} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.87 4.46a1.26 1.26 0 0 0-1.8.2l-4.6 5.82L3.42 29.45c.27.22.54.45.78.7a9.42 9.42 0 0 1 1.13 1.32l.1.13a9.15 9.15 0 0 1 .8 1.43c.29.62.5 1.28.65 1.95a2.5 2.5 0 0 0 2.45 1.93H38.7a1.27 1.27 0 0 0 1.27-1.3 42.43 42.43 0 0 0-15.1-31.15z"
                fill="#9A66FF"
            ></path>
            <path
                d="M27.8 21.98A33.82 33.82 0 0 0 5.95 4.28a1.29 1.29 0 0 0-1.56.98L.1 25.4a2.54 2.54 0 0 0 1.4 2.88 9.48 9.48 0 0 1 2.72 1.87l.17.17c.35.36.67.74.96 1.15l.1.13a9.15 9.15 0 0 1 .8 1.43l20.94-9.31a1.29 1.29 0 0 0 .62-1.74z"
                fill="url(#product-icon-radar-SiteMenu-a)"
            ></path>
            <path
                d="M18.46 10.48l.47.38a33.82 33.82 0 0 1 8.87 11.12 1.29 1.29 0 0 1-.62 1.74L6.25 33.03a9.15 9.15 0 0 0-.8-1.43l-.1-.13-.23-.3c-.23-.3-.47-.58-.74-.85a9.7 9.7 0 0 0-.95-.86l15.03-18.98z"
                fill="url(#product-icon-radar-SiteMenu-b)"
            ></path>
            <defs>
                <linearGradient
                    id="product-icon-radar-SiteMenu-a"
                    x1="13.98"
                    y1="4.24"
                    x2="13.98"
                    y2="33.03"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset=".26" stopColor="#67e8f9"></stop>
                    <stop offset=".91" stopColor="#06b6d4"></stop>
                </linearGradient>
                <linearGradient
                    id="product-icon-radar-SiteMenu-b"
                    x1="15.68"
                    y1="10.48"
                    x2="15.68"
                    y2="33.03"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#6E00F5"></stop>
                    <stop offset="1" stopColor="#9860FE"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};
