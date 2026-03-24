import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
            <AlertCircle className="w-24 h-24 text-primary-600 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
                to="/" 
                className="bg-primary-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
