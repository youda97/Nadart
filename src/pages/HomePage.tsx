import SectionTitle from "../components/SectionTitle";
import ShelfRow from "../components/ShelfRow";
import Hero from "../components/Hero";
import InstagramGallery from "../components/InstagramGallery";
import type { Painting } from "../types/painting";
import { useNavigate } from "react-router-dom";
import InquirySection from "../components/InquirySection";
import { Helmet } from "react-helmet-async";

type HomePageProps = {
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
  paintings: Painting[];
  paintingsLoading: boolean;
};

export default function HomePage({
  onQuickView,
  onAddToCart,
  paintings,
  paintingsLoading,
}: HomePageProps) {
  const navigate = useNavigate();

  const latest = paintings.slice(0, 3);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/hero/hero-painting.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/textures/content-bg.webp"
          fetchPriority="high"
        />
      </Helmet>

      <Hero />

      <section className="bg-[#f6f6f4] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Latest Paintings"
            action="View all"
            onAction={() => navigate("/collection")}
            className="mx-auto max-w-[1120px]"
          />

          <ShelfRow
            items={latest}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
            isLoading={paintingsLoading}
          />
        </div>
      </section>

      <InstagramGallery />
      <InquirySection />
    </>
  );
}
