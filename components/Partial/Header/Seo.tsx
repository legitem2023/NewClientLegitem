import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const defaultMeta = {
  title: "E-Crowd - Your Ultimate Marketplace",
  description: "Discover top products and deals on E-Crowd. Shop smarter and faster with our user-friendly platform.",
  keywords: "E-Crowd, online shopping, best deals, marketplace, e-commerce",
  image: "/image/Crowd.svg", // Update with your actual image path
  url: "https://new-client-legitem.vercel.app", // Update with your actual domain
};

const SEO: React.FC<SEOProps> = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
}) => {
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="E-Crowd Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="E-Crowd" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default SEO;
