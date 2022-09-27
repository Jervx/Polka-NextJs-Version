/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
    CLID : process.env.GOOGLE_CLIENT_ID,
    GSEC : process.env.GOOGLE_CLIENT_SECRET,
    MONGOURI : process.env.MONGOURI,
  }
}

module.exports = nextConfig
