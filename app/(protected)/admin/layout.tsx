interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: ProtectedLayoutProps) {
  return <>{children}</>;
}
