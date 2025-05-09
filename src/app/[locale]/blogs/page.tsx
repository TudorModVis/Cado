
import { trpc } from "@/app/_trpc/server";
import Hero from "@/components/blog/Hero";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Faq from "@/components/home/faq/Faq";
import Recommendations from "@/components/home/recommendations/Recommendations";
import LinksMenu from "@/components/LinksMenu";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

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
  trpc.blog.getAllBlogs.prefetch();

  return (
    <>
        <Header />
        <Hero />
        <Recommendations />
        <Faq />
        <Footer />
        <LinksMenu />
    </>
  );
}