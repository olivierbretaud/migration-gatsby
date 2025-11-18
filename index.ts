export interface PostPageProps {
  params: { slug: string };
}

export interface Article {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedText;
  meta_title: string;
  meta_description: string;
  yoast_head_json: YoastHeadJSON;
  content: RenderedText;
  excerpt: RenderedText;
  author: number;
  featured_media: number | null;
  categories: number[];
  tags: string[];
  acf: ACFData;
}

export interface RenderedText {
  rendered: string;
}

export interface YoastHeadJSON {
  title: string;
  description: string;
  robots: {
    index: string;
    follow: string;
  };
  canonical: string;
  schema: SchemaArticle;
}

export interface SchemaArticle {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  image: string[];
  datePublished: string;
  dateModified: string;
}

export interface ACFData {
  profil_exemple: {
    revenu_mensuel: number;
    apport: number;
  };
  capacite_emprunt: CapaciteEmprunt[];
}

export interface CapaciteEmprunt {
  duree: string;
  taux: string;
  mensualite_max: string;
  montant_emprunt: string;
}