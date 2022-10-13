export const defaultSeoConfig = {
  titleTemplate: "%s | Blog | Abhin Rustagi",
  defaultTitle: "Blog - Abhin Rustagi",
  noindex: false,
  nofollow: false,
  openGraph: {
    type: "website",
  },
};

export const buildSeoConfig = (props) => {
  const { title, img, desc, path } = props;

  let config = {};

  if (title) config = { ...config, title };
  if (desc) config = { ...config, description: desc };
  if (img)
    config = {
      ...config,
      openGraph: { images: [{ url: img, width: 800, height: 600 }] },
    };
  if (path) {
    const url = process.env.BASE_URL + path;

    config = {
      ...config,
      canonical: url,
      openGraph: { ...config.openGraph, url },
    };
  }

  return config;
};
