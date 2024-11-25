import Head from "next/head";
import React from "react";
import Script from "next/script";

function CustomHead({
  seo,
  lang,
  slugs,
}: {
  seo: Seo;
  lang: "fr" | "en";
  slugs?: { fr: { current: string }; en: { current: string } };
}) {
  const pageTitle =
    seo && seo.pageTitle && seo.pageTitle[lang]
      ? `Anne-Sophie Hayek | ${seo.pageTitle[lang]}`
      : "Anne-Sophie Hayek";

  const baseUrl = "https://www.annesophie-hayek.ch";

  const languages = [
    { lang: "fr", href: `${baseUrl}/fr/${slugs ? slugs.fr.current : ""}` },
    { lang: "fr-FR", href: `${baseUrl}/fr/${slugs ? slugs.fr.current : ""}` },
    { lang: "fr-CH", href: `${baseUrl}/fr/${slugs ? slugs.fr.current : ""}` },
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {seo && seo.metaDescription && seo.metaDescription[lang] && (
          <meta name="description" content={seo.metaDescription[lang]} />
        )}
        <link
          key="en"
          rel="canonical"
          hrefLang="en"
          href={`${baseUrl}/${slugs ? slugs.en.current : ""}`}
        />
        {languages.map((language) => (
          <link
            key={language.lang}
            rel="alternate"
            hrefLang={language.lang}
            href={language.href}
          />
        ))}
      </Head>
      <Script
        id="biskoui-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.biskouiSettings = {
              clientId: "3268953",
            };
            (function (d, s) {
              var t = d.getElementsByTagName(s)[0],
              e = d.createElement(s);
              e.async = true;
              e.src = "https://static.biskoui.ch/sdk.js";
              t.parentNode.insertBefore(e, t);
            })(document, "script");
          `,
        }}
      />
    </>
  );
}

export default CustomHead;
