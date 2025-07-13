import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-github-dark flex items-center justify-center">
      <div className="text-center max-w-lg px-6">
        <div className="text-8xl font-bold text-github-accent mb-4">404</div>
        <h1 className="text-2xl font-semibold text-github-text mb-4">Page Not Found</h1>
        <p className="text-github-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </Button>
          <Button onClick={() => window.location.href = "/"} className="flex items-center gap-2">
            <Home size={16} />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}