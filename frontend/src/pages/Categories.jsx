import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home, Tag, ArrowRight, AlertTriangle, Sun } from 'lucide-react';

// Light-theme single-file Collection page
// - Default export is CollectionPageLight
// - Uses Tailwind CSS utility classes (assumes Tailwind is configured)
// - Responsive, accessible, and built for a light aesthetic
// - Swap images or adjust colors by editing the `collectionData` object below

// --- DATA ---
const collectionData = {
  men: {
    title: "The Men's Edit",
    image:
      'https://images.unsplash.com/photo-1488161628813-04466f872d24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
    brands: [
      { name: 'Aurelien', slug: 'aurelien', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
      { name: 'Vantage', slug: 'vantage', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
      { name: 'Ralph Lauren', slug: 'ralph-lauren', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
    ],
    categories: [
      { name: 'Tops & T-Shirts', slug: 'tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=880&q=80' },
      { name: 'Bottoms & Chinos', slug: 'bottoms', image: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?auto=format&fit=crop&w=880&q=80' },
      { name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1591995518228-2b81b835e073?auto=format&fit=crop&w=880&q=80' },
    ],
    occasions: [
      { name: 'Smart Casual', slug: 'smart-casual', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1287&q=80' },
      { name: 'Weekend Getaway', slug: 'weekend', image: 'https://images.unsplash.com/photo-1563299905-c49423581341?auto=format&fit=crop&w=1287&q=80' },
    ],
    discounts: [
      { name: 'Up to 30% Off', slug: '30' },
      { name: '50% Off & More', slug: '50' },
    ],
  },
  women: {
    title: "The Women's Edit",
    image:
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
    brands: [
      { name: 'Sézane', slug: 'sezane', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
      { name: 'Ganni', slug: 'ganni', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
      { name: 'Reformation', slug: 'reformation', image: 'https://images.unsplash.com/photo-1627483262242-916f2c6a4a2a?w=400' },
    ],
    categories: [
      { name: 'Dresses & Jumpsuits', slug: 'dresses', image: 'https://images.unsplash.com/photo-1590120016145-21d7a9b0c034?auto=format&fit=crop&w=880&q=80' },
      { name: 'Tops & Blouses', slug: 'tops', image: 'https://images.unsplash.com/photo-1554965814-64582f3458d7?auto=format&fit=crop&w=880&q=80' },
      { name: 'Skirts & Trousers', slug: 'bottoms', image: 'https://images.unsplash.com/photo-1594623930133-3db3ada83127?auto=format&fit=crop&w=880&q=80' },
    ],
    occasions: [
      { name: 'Office Chic', slug: 'office-chic', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1771&q=80' },
      { name: 'Vacation Style', slug: 'vacation', image: 'https://images.unsplash.com/photo-1533103445421-53e7c2c01bce?auto=format&fit=crop&w=1287&q=80' },
    ],
    discounts: [
      { name: 'Up to 30% Off', slug: '30' },
      { name: '50% Off & More', slug: '50' },
    ],
  },
  kids: {
    title: "Little Ones",
    image: 'https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?auto=format&fit=crop&w=1280&q=80',
    brands: [],
    categories: [
      { name: 'Babywear', slug: 'baby', image: 'https://images.unsplash.com/photo-1547900690-a3c2f3a2b0d3?auto=format&fit=crop&w=880&q=80' },
    ],
    occasions: [],
    discounts: [],
  },
  accessories: {
    title: 'Accessories & More',
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=1400&q=80',
    brands: [],
    categories: [
      { name: 'Bags', slug: 'bags', image: 'https://images.unsplash.com/photo-1543168256-4188115760ff?auto=format&fit=crop&w=880&q=80' },
    ],
    occasions: [],
    discounts: [],
  },
};

// --- REUSABLE UI PIECES (LIGHT THEME) ---
const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{title}</h2>
    {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
  </div>
);

const LightImageCard = ({ link, imageSrc, title, caption }) => (
  <Link
    to={link}
    className="block rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300"
    aria-label={`View ${title}`}
  >
    <div className="aspect-[4/5] w-full relative">
      <img
        src={imageSrc}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {caption && <p className="text-sm text-slate-500 mt-1">{caption}</p>}
    </div>
  </Link>
);

const BrandCard = ({ link, name, image }) => (
  <Link
    to={link}
    className="flex items-center justify-center rounded-xl border p-4 bg-white hover:bg-slate-50 transition-colors shadow-sm"
  >
    {image ? (
      <img src={image} alt={name} className="h-12 w-auto object-contain" />
    ) : (
      <span className="text-slate-800 font-bold tracking-widest">{name}</span>
    )}
  </Link>
);

// --- PAGE ---
const CollectionPageLight = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const activeCollection = collectionData[category];

  useEffect(() => {
    if (!activeCollection) {
      // graceful redirect back to homepage for unknown categories
      navigate('/', { replace: true });
    }
  }, [category, navigate, activeCollection]);

  if (!activeCollection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Collection Not Found</h2>
          <p className="mt-2 text-slate-600">We couldn't find that collection. Try browsing our collections list.</p>
          <div className="mt-6">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600">
              <Home size={16} /> Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <Sun className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">Aurora</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <Link to="/collections/men" className="hover:text-slate-900">Men</Link>
            <Link to="/collections/women" className="hover:text-slate-900">Women</Link>
            <Link to="/collections/kids" className="hover:text-slate-900">Kids</Link>
            <Link to="/collections/accessories" className="hover:text-slate-900">Accessories</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden shadow-sm bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <nav className="mb-3 text-sm text-slate-600 flex items-center gap-2">
                <Link to="/" className="hover:text-slate-900 flex items-center gap-2"><Home size={14} /> Home</Link>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-slate-900 capitalize">{category}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{activeCollection.title}</h1>
              <p className="mt-4 text-slate-600 max-w-xl">Curated pieces and fresh arrivals — refined staples for every day. Browse by category, brand or occasion.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/products/${category}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600">
                  Shop All
                  <ArrowRight size={14} />
                </Link>
                <Link to={`/products/${category}?discount=30`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white text-slate-800 hover:bg-slate-100">
                  Deals
                </Link>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <img src={activeCollection.image} alt={activeCollection.title} loading="lazy" className="w-full h-64 lg:h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-12">
          <SectionHeader title="Shop by Category" subtitle={`Browse curated ${category} categories`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCollection.categories.map((item) => (
              <LightImageCard
                key={item.slug}
                link={`/products/${category}?category=${item.slug}`}
                imageSrc={item.image}
                title={item.name}
                caption={`Explore ${item.name}`}
              />
            ))}
          </div>
        </section>

        {/* Brands */}
        {activeCollection.brands?.length > 0 && (
          <section className="mt-14 bg-transparent">
            <SectionHeader title="Featured Brands" subtitle="Discover iconic and emerging designers." />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {activeCollection.brands.map((brand) => (
                <BrandCard key={brand.slug} link={`/products/${category}?brand=${brand.slug}`} name={brand.name} image={brand.image} />
              ))}
            </div>
          </section>
        )}

        {/* Occasions */}
        {activeCollection.occasions?.length > 0 && (
          <section className="mt-14">
            <SectionHeader title="Styled for the Occasion" subtitle="Looks tailored to what you have planned." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCollection.occasions.map((item) => (
                <Link
                  key={item.slug}
                  to={`/products/${category}?occasion=${item.slug}`}
                  className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300 flex items-stretch gap-0"
                >
                  <div className="w-1/2 min-h-[160px]">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 w-1/2 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-slate-600 mt-2">Shop edits and outfit ideas for {item.name.toLowerCase()}.</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber-600 font-medium">Explore <ArrowRight size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Discounts Banner */}
        {activeCollection.discounts?.length > 0 && (
          <section className="mt-14">
            <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-50 to-rose-50 border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Tag className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Seasonal Offers</h3>
                    <p className="text-slate-600">Hand-picked deals across categories — limited time only.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {activeCollection.discounts.map((d) => (
                    <Link key={d.slug} to={`/products/${category}?discount=${d.slug}`} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border text-slate-900 hover:bg-slate-100">
                      {d.name}
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer (simple) */}
        <footer className="mt-16 py-12 text-center text-sm text-slate-600">
          <div className="max-w-2xl mx-auto">
            <p>© {new Date().getFullYear()} Aurora. Built with love and Tailwind.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CollectionPageLight;
