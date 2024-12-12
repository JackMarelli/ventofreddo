export default function SectionHeader({ content = "Untitled Section" }) {
  return (
    <div className="col-span-full md:col-span-6 text-xs uppercase text-secondary my-2">
      / {content} .
    </div>
  );
}
