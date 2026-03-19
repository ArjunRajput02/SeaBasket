export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">SeaBasket</h2>
          <p className="text-sm leading-relaxed">
            Discover premium products with seamless shopping experience. Fast
            delivery and secure checkout guaranteed.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Press</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer">
              <img src="/instagram.png" />
            </div>
            <div className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer">
              <img src="/facebook.png" />
            </div>
            <div className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer">
              <img src="/linkedin.png" />
            </div>
            <div className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center cursor-pointer">
              <img src="/twitter.png" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} SeaBasket. All rights reserved.
      </div>
    </footer>
  );
}
