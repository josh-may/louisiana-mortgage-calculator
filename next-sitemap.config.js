/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "https://www.mortgagecalculatorillinois.com/",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // Exclude server-side sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.mortgagecalculatorillinois.com/sitemap.xml", // Add server-side sitemap
    ],
  },
};
