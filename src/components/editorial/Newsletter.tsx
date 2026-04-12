"use client";

export default function Newsletter() {
  return (
    <section className="py-24 bg-surface-container">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h3 className="font-serif text-4xl italic mb-6">Join The Atelier</h3>
        <p className="font-manrope text-on-surface-variant mb-12">
          Weekly curations of style, substance, and sustainability delivered to your inbox.
        </p>
        <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="flex-grow bg-surface border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary px-4 py-4 font-manrope transition-colors outline-none"
            placeholder="Your email address" 
            type="email"
            required
          />
          <button 
            type="submit"
            className="bg-primary text-on-primary font-manrope font-bold py-4 px-12 rounded-full shadow-lg hover:bg-primary-dim transition-all uppercase tracking-widest text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
