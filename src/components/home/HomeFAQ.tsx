import Accordion from "@/components/ui/Accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { FAQ } from "@/types";

type HomeFAQProps = {
  faqs: FAQ[];
};

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const items = faqs.slice(0, 6).map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <SectionHeading title="Frequently Asked Questions" subtitle="Quick answers to common questions about our photo booth rentals." />
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={150}>
          <Accordion items={items} />
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={300}>
          <div className="mt-10 text-center">
            <Button href="/faq" variant="outline" className="btn-animate">
              View All FAQs
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
