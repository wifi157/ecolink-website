import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Carbon Tracking', 'CSR/ESG', 'SDGs', 'Verification', 'Wales Focus'];

const articles = [
  {
    id: 1,
    title: 'The Complete Guide to Carbon Verification Standards',
    excerpt: 'Understanding the key frameworks and methodologies for verifying carbon reduction claims in Wales.',
    category: 'Verification',
    date: '2024-03-15',
    readTime: '8 min read',
    image: '/hero_card_solar.jpg',
  },
  {
    id: 2,
    title: 'How to Build an Effective CSR Strategy in Wales',
    excerpt: 'Best practices for Welsh organisations looking to align their corporate social responsibility with measurable impact.',
    category: 'CSR/ESG',
    date: '2024-03-10',
    readTime: '6 min read',
    image: '/hero_card_buildings.jpg',
  },
  {
    id: 3,
    title: 'SDG 13: Climate Action for Welsh Businesses',
    excerpt: 'Practical steps Welsh companies can take to contribute to UN Sustainable Development Goal 13.',
    category: 'SDGs',
    date: '2024-03-05',
    readTime: '5 min read',
    image: '/hero_card_nature.jpg',
  },
  {
    id: 4,
    title: 'Real-Time Carbon Tracking: Technology and Best Practices',
    excerpt: 'How sensor technology and data platforms are revolutionising emissions monitoring across Wales.',
    category: 'Carbon Tracking',
    date: '2024-02-28',
    readTime: '7 min read',
    image: '/dashboard_chart_ui.jpg',
  },
  {
    id: 5,
    title: 'Milestone-Based Funding: Reducing Risk in Green Investments',
    excerpt: 'Why structured payment releases are becoming the standard for Welsh carbon project financing.',
    category: 'Verification',
    date: '2024-02-20',
    readTime: '6 min read',
    image: '/hero_card_waste.jpg',
  },
  {
    id: 6,
    title: 'CSRD Compliance: What Welsh Companies Need to Know',
    excerpt: 'A practical guide to the Corporate Sustainability Reporting Directive for Wales-based businesses.',
    category: 'CSR/ESG',
    date: '2024-02-15',
    readTime: '9 min read',
    image: '/report_cover_ui.jpg',
  },
];

export function Insights() {
  return (
    <div className="min-h-screen bg-[#0A1F15] pt-24 lg:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
            Ecosystem Insights
          </h1>
          <p className="text-[#A8C4B0] max-w-xl mx-auto">
            Thought leadership on carbon tracking, CSR/ESG reporting, and verified impact across Wales.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === 'All'
                  ? 'bg-[#2D8A4E] text-white'
                  : 'bg-white/5 text-[#A8C4B0] hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="glass-card overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#2D8A4E]/20 text-xs text-[#2D8A4E]">
                  {articles[0].category}
                </span>
                <span className="text-xs text-[#A8C4B0] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {articles[0].date}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-heading">
                {articles[0].title}
              </h2>
              <p className="text-[#A8C4B0] mb-6 leading-relaxed">
                {articles[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A8C4B0]">{articles[0].readTime}</span>
                <Link
                  to="#"
                  className="text-[#2D8A4E] hover:underline flex items-center gap-1"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <Link
              key={article.id}
              to="#"
              className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 rounded-full bg-[#2D8A4E]/20 text-[10px] text-[#2D8A4E]">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#A8C4B0]">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2D8A4E] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[#A8C4B0] line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 glass-card p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2 font-heading">
            Subscribe to our newsletter
          </h2>
          <p className="text-[#A8C4B0] mb-6">
            Get the latest insights on carbon tracking and ESG reporting delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-[#2D8A4E]/30 text-white placeholder-[#A8C4B0] outline-none focus:border-[#2D8A4E] transition-colors"
            />
            <button className="btn-primary">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
