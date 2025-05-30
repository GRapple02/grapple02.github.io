import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  output: 'export',
};

export default withContentlayer(nextConfig);
