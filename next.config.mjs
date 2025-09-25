/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const withPWAFunc = withPWA({
  dest: "public", // output directory for sw.js
  register: true, // auto register the service worker
  skipWaiting: true, // immediately activate new SW
  cacheOnFrontEndNav: true, // cache pages during client-side nav
  reloadOnOnline: true, // reload when back online
  disable: process.env.NODE_ENV === "development", // disable PWA in dev
  mode: process.env.NODE_ENV === "development" ? "development" : "production", // use dev mode in development
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWAFunc(nextConfig);
