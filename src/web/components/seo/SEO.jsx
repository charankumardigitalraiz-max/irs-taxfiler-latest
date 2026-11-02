// src/components/SEO.jsx
// import { Helmet } from "react-helmet-async";
import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  canonical,
  image,
  keywords,
  type = "website",
  noIndex = false,
  jsonLd = null
}) {
  const robots = noIndex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      {title && <title>{title}</title>}

      {description && (
        <meta name="description" content={description} />
      )}

      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="robots" content={robots} />

      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && (
        <meta property="og:description" content={description} />
      )}
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
