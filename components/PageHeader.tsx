type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({title, subtitle}: PageHeaderProps) {
  return (
    <header className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
      <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-gray-600">{subtitle}</p>
    </header>
  );
}
