/** @type {import('next').NextConfig} */
const nextConfig = {};

import nextPWA from '@ducanh2912/next-pwa';

const withPWA = nextPWA({
  dest: "public",
  cacheOnFrontEndNav:true,
  aggressiveFrontEndNavCaching:true,
  reloadOnOnline:true,
  swcMinify:true,
  disable:false,
  workboxOptions: {
    disableDevLogs:true,
  }
});


export default withPWA(nextConfig);
