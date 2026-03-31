import { getAllSponsors } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import { TierBadge } from '@/components/ui/StatusBadge'
import { ExternalLink, Handshake } from 'lucide-react'

export const metadata = {
  title: 'Sponsors - MSU Platform',
  description: 'Learn about our sponsors and partnership opportunities',
}

export default async function SponsorsPage() {
  const sponsors = await getAllSponsors()
  
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum')
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold')
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver')
  const bronzeSponsors = sponsors.filter(s => s.tier === 'Bronze')

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Sponsors</h1>
        <p className="text-gray-600">
          Thank you to our amazing sponsors who make student activities possible
        </p>
      </div>

      {platinumSponsors.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TierBadge tier="Platinum" />
            Platinum Partners
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {platinumSponsors.map((sponsor) => (
              <div key={sponsor.id} className="card p-6 flex items-center gap-6">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-24 h-16 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{sponsor.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{sponsor.description}</p>
                  <a 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-msu-blue text-sm hover:underline flex items-center gap-1"
                  >
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {goldSponsors.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TierBadge tier="Gold" />
            Gold Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {goldSponsors.map((sponsor) => (
              <div key={sponsor.id} className="card p-5">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-12 object-contain mb-4"
                />
                <h3 className="font-semibold text-gray-900">{sponsor.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{sponsor.description}</p>
                <a 
                  href={sponsor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-msu-blue text-sm hover:underline flex items-center gap-1"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {silverSponsors.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TierBadge tier="Silver" />
            Silver Partners
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {silverSponsors.map((sponsor) => (
              <div key={sponsor.id} className="card p-4 text-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-10 object-contain mb-3"
                />
                <h3 className="font-medium text-gray-900 text-sm">{sponsor.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {bronzeSponsors.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TierBadge tier="Bronze" />
            Bronze Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {bronzeSponsors.map((sponsor) => (
              <div key={sponsor.id} className="card p-3 text-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-8 object-contain mb-2"
                />
                <h3 className="font-medium text-gray-900 text-xs">{sponsor.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-msu-blue to-blue-800 rounded-xl p-8 text-white text-center">
        <Handshake className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Become a Sponsor</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Partner with MSU to support student activities and gain visibility with our community 
          of over 2,000 students. We offer various sponsorship tiers to match your goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-gold">
            Contact Us
          </a>
          <a href="#" className="btn bg-white/10 text-white hover:bg-white/20">
            Download Sponsorship Kit
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Sponsorship Benefits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Brand Visibility</h3>
            <p className="text-gray-600 text-sm">
              Get your brand in front of our student community through event sponsorships, 
              website presence, and social media mentions.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Recruitment Access</h3>
            <p className="text-gray-600 text-sm">
              Connect with talented students for internships, part-time positions, 
              and career opportunities.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Community Impact</h3>
            <p className="text-gray-600 text-sm">
              Make a meaningful difference in student life by supporting clubs, 
              events, and initiatives.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
