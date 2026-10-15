export default function Footer() {
  return (
    <div className="w-full border-t border-stone-800 py-6 mt-12 text-sm text-stone-400">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-bold text-stone-200 tracking-wider">IC</div>
        <p>© {new Date().getFullYear()} IC. All rights reserved.</p>
      </div>
    </div>
  );
}