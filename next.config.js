/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: ['surf-forecast-screenshots.s3.eu-west-2.amazonaws.com'],
    },
};

export default config;
