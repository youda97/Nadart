import SectionTitle from "../components/SectionTitle";
import ShelfRow from "../components/ShelfRow";
import Hero from "../components/Hero";
import InstagramGallery from "../components/InstagramGallery";
import type { Painting } from "../types/painting";
import { useNavigate } from "react-router-dom";
import { paintings } from "../data/paintings";
import InquirySection from "../components/InquirySection";

type HomePageProps = {
  onQuickView: (painting: Painting) => void;
  onAddToCart: (painting: Painting) => void;
};

export default function HomePage({ onQuickView, onAddToCart }: HomePageProps) {
  const navigate = useNavigate();

  const latest = paintings.slice(0, 3);

  return (
    <>
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
          />
        </div>
      </section>

      <InstagramGallery />
      <InquirySection />
    </>
  );
}
