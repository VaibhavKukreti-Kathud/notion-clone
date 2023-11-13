const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-red-500 text-white">
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
