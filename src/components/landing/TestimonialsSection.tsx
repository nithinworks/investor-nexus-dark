import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Found our Series A lead investor in just two weeks. The AI matching was incredibly accurate and saved us months of research.",
      author: "Sarah Chen",
      title: "CEO",
      company: "TechFlow",
      avatar: "SC",
      rating: 5,
    },
    {
      quote:
        "The platform saved us months of research. Every investor match was relevant to our industry and stage. Game-changing for fundraising.",
      author: "Marcus Johnson",
      title: "Founder",
      company: "GreenTech Labs",
      avatar: "MJ",
      rating: 5,
    },
    {
      quote:
        "Simple, clean interface with powerful features. Exactly what we needed for our fundraising. The export functionality is brilliant.",
      author: "Elena Rodriguez",
      title: "Co-founder",
      company: "DataViz",
      avatar: "ER",
      rating: 5,
    },
    {
      quote:
        "The detailed investor profiles helped us prepare better pitches. We raised $2M Series A with connections from TheFinance.",
      author: "James Park",
      title: "Founder",
      company: "HealthTech Pro",
      avatar: "JP",
      rating: 5,
    },
    {
      quote:
        "Outstanding customer support and continuous platform improvements. The AI tools are getting better every month.",
      author: "Lisa Zhang",
      title: "CEO",
      company: "EdTech Solutions",
      avatar: "LZ",
      rating: 5,
    },
    {
      quote:
        "Best ROI of any tool we've used for fundraising. Paid for itself after finding just one quality investor connection.",
      author: "David Kim",
      title: "Co-founder",
      company: "FinTech Innovations",
      avatar: "DK",
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < rating ? "text-red-400" : "text-white/20"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Trusted by founders worldwide
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join thousands of successful founders who have raised funding using
            our platform
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center">{renderStars(5)}</div>
            <span className="text-white/60 text-sm ml-2">
              4.9/5 from 500+ reviews
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white/5 border border-red-500/20 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 text-sm leading-relaxed mb-6 relative">
                  <span className="text-red-400/60 text-2xl absolute -top-2 -left-1">
                    "
                  </span>
                  <span className="relative z-10">{testimonial.quote}</span>
                  <span className="text-red-400/60 text-2xl absolute -bottom-4 -right-1">
                    "
                  </span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center mr-3 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300">
                    <span className="text-white text-sm font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-red-400/70 text-xs">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-white/60 text-base mb-6">
            Ready to join these successful founders?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-white/60 text-sm">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-white/60 text-sm">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-white/60 text-sm">Secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
