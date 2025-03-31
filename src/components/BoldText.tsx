interface BoldTextProps {
  children: React.ReactNode;
}

export default function BoldText({ children }: BoldTextProps) {
  return <strong className="custom-bold">{children}</strong>;
} 