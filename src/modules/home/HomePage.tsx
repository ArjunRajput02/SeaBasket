import Header from "@/components/layout/Header";
import TrendingCarousel from "./TrendingCarousel";
import Categories from "./Categories";
import Footer from "@/components/layout/Footer";
import Banner from "./Banner"

export default function HomePage() {
  return (
    <>
      <Header />
      <Categories />
      <Banner />
      <TrendingCarousel />
      <Footer />
    </>
  );
}
