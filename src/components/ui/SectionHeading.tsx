type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
};

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-white/80" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 bg-brand rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
