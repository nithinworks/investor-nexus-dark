import InvestorApplicationForm from "@/components/forms/InvestorApplicationForm";

const InvestorApplication = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join Our Investor Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with ambitious startups and innovative entrepreneurs. 
            Apply to be featured in our curated investor database.
          </p>
        </div>
        
        <InvestorApplicationForm />
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Submit Application</h3>
              <p className="text-sm text-muted-foreground">
                Fill out your investor profile with your investment focus and experience
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Review Process</h3>
              <p className="text-sm text-muted-foreground">
                Our team reviews your application within 2-3 business days
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Start Connecting</h3>
              <p className="text-sm text-muted-foreground">
                Get featured in our database and start receiving quality deal flow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorApplication;