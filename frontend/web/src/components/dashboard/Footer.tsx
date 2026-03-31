const Footer = () => {
  return (
    <footer className="mt-8 py-6 border-t border-border/30">
      <div className="flex items-center justify-between text-xs text-muted-foreground/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
              <span className="text-[8px] font-bold">R</span>
            </div>
            <span className="font-bold text-muted-foreground/80">CENTRAL RIBAS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Retossing</span>
          <span>contrasentes mrentas</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Reterto Reles</span>
          <span>UMEDIOJ5</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
