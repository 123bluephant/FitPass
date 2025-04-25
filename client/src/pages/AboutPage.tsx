import { motion } from 'framer-motion';
import { Dumbbell, HeartPulse, Users, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeamMember } from '../components/cards/Teammamber';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Head Trainer & Founder',
      bio: 'Certified personal trainer with 12+ years experience in strength conditioning',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Nutrition Specialist',
      bio: 'Registered dietitian focused on sports nutrition and meal planning',
      image: '/team/michael.jpg'
    },
    {
      name: 'Emma Wilson',
      role: 'Yoga Instructor',
      bio: '500-hour certified yoga teacher specializing in mobility training',
      image: '/team/emma.jpg'
    }
  ];

  const coreValues = [
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Holistic Health",
      description: "We integrate physical training with mental wellness and proper nutrition"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "Our supportive network keeps members motivated and accountable"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Proven Results",
      description: "Science-backed programs that deliver measurable progress"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Access",
      description: "Flexible workout schedules that fit your lifestyle"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Dumbbell className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Revolutionizing Fitness Through Community
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Where cutting-edge facilities meet personalized wellness journeys
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              From Garage Gym to Fitness Movement
            </h2>
            <p className="text-gray-600 mb-8">
              What started in 2012 as a single neighborhood training space has grown into 
              a network of 15+ premium fitness hubs. Our founder's vision remains unchanged - 
              to make world-class training accessible while maintaining the personal touch 
              of a local gym.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Locations Nationwide</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
                <div className="text-sm text-gray-600">Members Empowered</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">300+</div>
                <div className="text-sm text-gray-600">Weekly Group Classes</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Member Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Fitness Philosophy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every program we create
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Certified professionals dedicated to helping you achieve your fitness goals
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Transformation Today
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join our community and experience fitness done right
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/membership">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  View Memberships
                </button>
              </Link>
              <Link to="/gyms">
                <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Find a Gym
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;