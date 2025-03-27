const Lotus = ({ className = "" }: { className?: string }) => {
  return (
    <div 
      className={`h-16 mx-auto my-4 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 100 100'%3E%3Cpath fill='%23D4AF37' d='M50,0 C60,30 80,50 100,50 C80,50 60,70 50,100 C40,70 20,50 0,50 C20,50 40,30 50,0 Z'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain"
      }}
      aria-hidden="true"
    />
  );
};

export default Lotus;
