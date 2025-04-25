// components/Footer.tsx
import { Link } from 'react-router-dom';
import { Dumbbell, Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8" />
              <span className="text-xl font-bold">FitPeak</span>
            </div>
            <p className="text-sm text-gray-200">
              Transforming lives through fitness since 2012
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-blue-300 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/membership" className="text-gray-200 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/gyms" className="text-gray-200 hover:text-white transition-colors">
                  Find a Gym
                </Link>
              </li>
              <li>
                <Link to="/classes" className="text-gray-200 hover:text-white transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link to="/trainers" className="text-gray-200 hover:text-white transition-colors">
                  Trainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>123 Fitness Street<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>support@fitpeak.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-200 mb-4">
              Get fitness tips and special offers delivered to your inbox
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} FitPeak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;