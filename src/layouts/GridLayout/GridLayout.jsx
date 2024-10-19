export default function GridLayout({ children }) {
  return (
    <div className="w-full h-fit grid grid-cols-12 gap-x-2 md:gap-x-4 px-4 md:px-8">
      {children}
    </div>
  );
}
