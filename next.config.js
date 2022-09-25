/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
    CLID : process.env.CLID,
    MONGOURI : process.env.MONGOURI
  }
}

module.exports = nextConfig
