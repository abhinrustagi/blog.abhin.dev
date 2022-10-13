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
  let config = {};

  if (props.hasOwnProperty("title")) config = { ...config, title: props.title };
  if (props.hasOwnProperty("desc"))
    config = { ...config, description: props.desc };
  if (props.hasOwnProperty("img"))
    config = {
      ...config,
      openGraph: { images: [{ url: props.img, width: 800, height: 600 }] },
    };
  if (props.hasOwnProperty("path")) {
    const url = process.env.BASE_URL + props.path;

    config = {
      ...config,
      canonical: url,
      openGraph: { ...config.openGraph, url },
    };
  }

  return config;
};
