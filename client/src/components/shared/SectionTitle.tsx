import Lotus from './Lotus';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionTitle = ({ title, subtitle, light = false }: SectionTitleProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className={`font-heading text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-[#3A2718]'} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-accent text-lg ${light ? 'text-[#D4AF37]' : 'text-[#9D2933]'} max-w-3xl mx-auto`}>
          {subtitle}
        </p>
      )}
      <Lotus />
    </div>
  );
};

export default SectionTitle;
