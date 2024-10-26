export default function Attempt({
  count = "0000",
  code = "XXXXXXX",
  color = "text-primary",
}) {
  return (
    <div className="block  tracking">
      <span className="hidden xs:inline text-secondary me-2 text-sm md:text-md">
        {count}
      </span>
      <span className={`${color} text-sm md:text-md`}>{code}</span>
    </div>
  );
}
