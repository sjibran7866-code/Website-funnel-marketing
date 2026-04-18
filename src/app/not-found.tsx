import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-8xl font-bold text-brand mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It may have been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary">Go Home</Button>
          <Button href="/contact" variant="outline">Contact Us</Button>
          <Button href="/book" variant="secondary">Book a Booth</Button>
        </div>
      </div>
    </section>
  );
}
