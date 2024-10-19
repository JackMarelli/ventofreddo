export default function Attempt({
  count = "0000",
  code = "XXXXXXX",
  color = "text-primary",
}) {
  return (
    <div className="col-span-4 text-lg">
      <span className="text-secondary me-2">{count}</span>
      <span className={`${color}`}>{code}</span>
    </div>
  );
}
