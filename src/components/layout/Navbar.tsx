import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                Inspo <span className="text-secondary italic">Daily</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Vogue', 'Lifestyle', 'Culture', 'Beauty'].map((item) => (
                <Link
                  key={item}
                  href={`/category/${item.toLowerCase()}`}
                  className="px-3 py-2 text-sm font-medium tracking-[0.05rem] text-foreground/70 transition-colors hover:text-primary uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
             <button className="text-foreground/70 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
