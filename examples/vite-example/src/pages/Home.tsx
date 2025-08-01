import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GlassCard, 
  GlassButton, 
  GlassProgressBar,
  GlassBadge
} from 'liquidify';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Palette, 
  Code, 
  Layers,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Sparkles,
    title: 'Glassmorphism Design',
    description: 'Beautiful frosted glass effects with backdrop blur and transparency for modern UI experiences.',
    progress: 95,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized components with minimal bundle size and excellent runtime performance.',
    progress: 92,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Accessibility First',
    description: 'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.',
    progress: 98,
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Palette,
    title: 'Customizable Themes',
    description: 'Flexible theming system with CSS variables and dark mode support out of the box.',
    progress: 88,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'TypeScript Ready',
    description: 'Full TypeScript support with comprehensive type definitions and IntelliSense.',
    progress: 96,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Layers,
    title: 'Component Library',
    description: 'Comprehensive collection of 50+ components for building modern web applications.',
    progress: 85,
    color: 'from-teal-500 to-cyan-500'
  }
];

const stats = [
  { label: 'Components', value: '50+' },
  { label: 'Bundle Size', value: '<60KB' },
  { label: 'Performance', value: '98/100' },
  { label: 'Accessibility', value: 'AA' }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <GlassBadge 
                variant="outline" 
                className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30"
              >
                ✨ Now in Beta
              </GlassBadge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-7xl font-bold mb-8"
            >
              <span className="block text-white mb-2">Beautiful</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Glassmorphism
              </span>
              <span className="block text-white">Components</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create stunning user interfaces with our comprehensive React component library 
              featuring modern glassmorphism design, accessibility, and performance.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <GlassButton 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4"
                asChild
              >
                <Link to="/components">
                  <Layers className="mr-2 h-5 w-5" />
                  Explore Components
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlassButton>

              <GlassButton 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
                asChild
              >
                <a 
                  href="https://liquidify.dev/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Started
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </GlassButton>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  custom={index}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full backdrop-blur-sm"
        />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-white mb-4"
            >
              Why Choose LiqUIdify?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/70 max-w-3xl mx-auto"
            >
              Built for modern web development with performance, accessibility, and developer experience in mind.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <GlassCard className="p-8 h-full hover:scale-105 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/60">Completion</span>
                      <span className="text-sm font-semibold text-white">{feature.progress}%</span>
                    </div>
                    <GlassProgressBar 
                      value={feature.progress} 
                      className="h-2"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <GlassCard className="p-12">
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-white mb-6"
              >
                Ready to build something amazing?
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-white/70 mb-8"
              >
                Join thousands of developers creating beautiful interfaces with LiqUIdify.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <GlassButton 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8"
                  asChild
                >
                  <Link to="/playground">
                    <Code className="mr-2 h-5 w-5" />
                    Try Playground
                  </Link>
                </GlassButton>
                
                <GlassButton 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white px-8"
                  asChild
                >
                  <a 
                    href="https://github.com/liquidify/liquidify"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </GlassButton>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}