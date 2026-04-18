import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

type BoothCard = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
  startingPrice: number;
};

type BoothShowcaseProps = {
  title: string;
  booths: BoothCard[];
};

export default function BoothShowcase({ title, booths }: BoothShowcaseProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} subtitle="From classic photo strips to 360 videos, we have the perfect booth for your event." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booths.map((booth) => (
            <Link
              key={booth.id}
              href={`/book?booth=${booth.id}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold">
                  From ${booth.startingPrice}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground group-hover:text-brand transition-colors">
                  {booth.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{booth.tagline}</p>
                <div className="mt-4 flex items-center text-brand font-semibold text-sm">
                  Learn More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
