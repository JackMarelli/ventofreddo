export default function SectionHeader({ content = "Untitled Section" }) {
  return (
    <div className="col-span-full text-sm uppercase text-secondary my-2">
      / {content} .
    </div>
  );
}
