import {
  Bot,
  Target,
  Eye,
  Heart,
  Users,
  Globe,
  Award,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-accent">RoboVault</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            We&apos;re on a mission to make premium robotics accessible to everyone.
            From cutting-edge industrial automation to personal robot companions,
            RoboVault connects buyers with the world&apos;s finest robots.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Founded in 2024, RoboVault started with a simple idea: make it easy
              for anyone to find and purchase the perfect robot. We noticed that
              the robotics market was fragmented, with buyers struggling to find
              reliable sources for quality robots.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Today, we&apos;ve grown into the world&apos;s leading online
              marketplace for robots, serving customers in over 50 countries.
              Our team of robotics engineers and industry experts carefully
              curates every robot listed on our platform.
            </p>
            <p className="text-muted leading-relaxed">
              Whether you&apos;re a factory looking to automate production lines,
              an educator teaching the next generation of engineers, or simply
              someone who wants a robot companion, RoboVault has you covered.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "10K+", label: "Robots Sold" },
                { number: "50+", label: "Countries" },
                { number: "500+", label: "Happy Clients" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-accent text-3xl font-bold">{stat.number}</p>
                  <p className="text-muted text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              description:
                "To democratize access to robotics technology by providing a trusted, transparent marketplace that connects buyers with premium robots from around the world.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              description:
                "A world where every person and business has access to the robotic solutions they need to thrive, innovate, and push the boundaries of what's possible.",
            },
            {
              icon: Heart,
              title: "Our Values",
              description:
                "Quality over quantity. Transparency in every transaction. Innovation that serves humanity. We believe in building a future where humans and robots work together.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <item.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-foreground font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          Why Choose RoboVault?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: "Certified Quality",
              description: "Every robot passes our rigorous 50-point inspection.",
            },
            {
              icon: Globe,
              title: "Global Reach",
              description: "Shipping to 50+ countries with full tracking.",
            },
            {
              icon: Users,
              title: "Expert Support",
              description: "Our robotics engineers are available 24/7 to help.",
            },
            {
              icon: Lightbulb,
              title: "Innovation First",
              description: "We partner with the world's leading robot manufacturers.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-border rounded-xl p-6 text-center"
            >
              <item.icon className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
              <p className="text-muted text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="careers">
        <div className="bg-surface border border-border rounded-xl p-8 md:p-12 text-center">
          <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Join Our Team
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-6">
            We&apos;re always looking for passionate people who believe in the
            future of robotics. Check out our open positions and help us build the
            future.
          </p>
          <a
            href="#"
            className="bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
