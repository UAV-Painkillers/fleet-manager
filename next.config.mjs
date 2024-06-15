/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/pilot-id",
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
