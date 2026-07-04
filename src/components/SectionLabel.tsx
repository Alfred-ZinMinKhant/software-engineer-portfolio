type SectionLabelProps = {
  // Optional ordinal, e.g. "02". Encodes real sequence, not decoration.
  index?: string;
  children: React.ReactNode;
  className?: string;
};

// Monospace document label, e.g. "02 / IDENTITY PLATFORM".
// Uses the .doc-label treatment defined in globals.css.
export function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  return (
    <p className={`doc-label ${className}`}>
      {index ? (
        <>
          <span className="text-brass">{index}</span>
          <span className="mx-2 text-line">/</span>
        </>
      ) : null}
      {children}
    </p>
  );
}
