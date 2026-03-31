import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Users, Calendar, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'

export const metadata = {
  title: 'About - MSU Platform',
  description: 'Learn about Marianopolis Student Union and how to get in touch',
}

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-msu-blue to-blue-800 text-white">
        <div className="page-container py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">About MSU</h1>
            <p className="text-xl text-blue-100">
              The Marianopolis Student Union is dedicated to enhancing student life 
              through events, advocacy, and community building.
            </p>
          </div>
        </div>
      </section>

      <section className="page-container">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              The Marianopolis Student Union (MSU) serves as the representative body for all 
              students at Marianopolis College. We are committed to creating a vibrant, 
              inclusive, and engaging campus community.
            </p>
            <p className="text-gray-600 mb-4">
              Through our various initiatives, events, and services, we aim to:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-msu-blue mt-0.5" />
                <span>Promote student welfare and represent student interests</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-msu-blue mt-0.5" />
                <span>Organize events and activities that enrich student life</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-5 h-5 text-msu-blue mt-0.5" />
                <span>Support student clubs and organizations</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-msu-blue mt-0.5" />
                <span>Foster a sense of community and belonging</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
            <div className="space-y-4">
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Events & Activities</h3>
                <p className="text-gray-600 text-sm">
                  From social gatherings to academic workshops, we organize diverse events 
                  throughout the year.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Student Advocacy</h3>
                <p className="text-gray-600 text-sm">
                  We represent student interests to the administration and work to improve 
                  campus policies.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Club Support</h3>
                <p className="text-gray-600 text-sm">
                  We provide funding, resources, and guidance to student clubs and organizations.
                </p>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Community Service</h3>
                <p className="text-gray-600 text-sm">
                  We coordinate volunteer opportunities and community outreach programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="page-container py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">MSU Executive Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Alex Johnson', role: 'President', image: 'https://via.placeholder.com/150' },
              { name: 'Sarah Chen', role: 'Vice President', image: 'https://via.placeholder.com/150' },
              { name: 'Michael Brown', role: 'Treasurer', image: 'https://via.placeholder.com/150' },
              { name: 'Emma Wilson', role: 'Secretary', image: 'https://via.placeholder.com/150' },
            ].map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="page-container py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-msu-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600 text-sm">
                    4873 Westmount Ave<br />
                    Westmount, QC H3Y 1X9
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-msu-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:msu@marianopolis.edu" className="text-msu-blue hover:underline text-sm">
                    msu@marianopolis.edu
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-msu-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600 text-sm">(514) 931-8792</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-msu-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Office Hours</p>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <Input label="Name" placeholder="Your name" required />
              <Input label="Email" type="email" placeholder="your.email@example.com" required />
              <Input label="Subject" placeholder="What is this about?" required />
              <Textarea label="Message" placeholder="Your message..." required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
