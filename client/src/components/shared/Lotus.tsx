import PeepalLeaf from '@/assets/icons/PeepalLeaf';

const Lotus = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`h-16 mx-auto my-4 flex justify-center items-center ${className}`}>
      <PeepalLeaf color="#f97316" size={40} />
    </div>
  );
};

export default Lotus;
