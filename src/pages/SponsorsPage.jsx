import React from 'react';

const SponsorsPage = () => {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold font-['Cinzel'] text-white mb-8 text-center">
          Our Sponsors
        </h1>
        <p className="text-white/70 text-center mb-12">
          Thank you to our amazing sponsors who make SPARKZ possible
        </p>
        {/* Your sponsors content here */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white/5 p-8 rounded-xl border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-400">S{item}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">Sponsor {item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;