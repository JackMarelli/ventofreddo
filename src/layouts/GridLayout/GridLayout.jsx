export default function GridLayout({ children , className}) {
  return (
    <div className={`w-full h-fit grid grid-cols-12 gap-x-2 md:gap-x-4 px-4 md:px-8 py-8 ${className}`}>
      {children}
    </div>
  );
}
