
import Hero from "@/components/about-us/Hero";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Blog from "@/components/blog/Blog";
import Collaboration from "@/components/home/collaboration/Collaboration";
import Faq from "@/components/home/faq/Faq";
import Reviews from "@/components/home/reviews/Reviews";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import LinksMenu from "@/components/LinksMenu";

export async function generateMetadata() {
  const t = await getTranslations('index.meta');
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutUs({params}: {params: Promise<{locale: string}>;}) {
  const {locale} = use(params);
  setRequestLocale(locale);

  return (
    <>
        <Header />
        <Hero />
        <Collaboration />
        <Reviews />
        <Blog />
        <Faq />
        <Footer />
        <LinksMenu />
    </>
  );
}