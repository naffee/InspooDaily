export function FollowPopup({ authorName }: { authorName: string }) {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-on-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          notifications_active
        </span>
      </div>
      <div>
        <h4 className="font-manrope text-sm font-bold tracking-widest text-secondary uppercase mb-2">Subscribe</h4>
        <p className="font-serif italic text-xl text-on-surface">
          Never miss a story from {authorName}.
        </p>
      </div>
      <div className="space-y-4 pt-4">
        <input 
          type="email" 
          placeholder="your@email.com" 
          className="w-full bg-surface-variant border-none focus:ring-1 focus:ring-primary py-4 px-6 rounded-xl font-manrope outline-none"
        />
        <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-manrope font-bold hover:opacity-90 transition-all shadow-lg uppercase tracking-widest text-xs">
          Join the Atelier
        </button>
      </div>
      <p className="text-[10px] text-on-surface/40 font-manrope">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export function ContactPopup({ authorName }: { authorName: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h4 className="font-manrope text-sm font-bold tracking-widest text-secondary uppercase mb-2">Get in Touch</h4>
        <p className="font-serif italic text-xl text-on-surface">
          Write to {authorName}
        </p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full bg-surface-variant border-none focus:ring-1 focus:ring-primary py-4 px-6 rounded-xl font-manrope outline-none"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-surface-variant border-none focus:ring-1 focus:ring-primary py-4 px-6 rounded-xl font-manrope outline-none"
          />
        </div>
        <textarea 
          placeholder="Your message..." 
          rows={4}
          className="w-full bg-surface-variant border-none focus:ring-1 focus:ring-primary py-4 px-6 rounded-xl font-manrope outline-none resize-none"
        ></textarea>
        <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-manrope font-bold hover:opacity-90 transition-all shadow-lg uppercase tracking-widest text-xs">
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
