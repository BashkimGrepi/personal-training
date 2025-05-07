import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Hero section with image */}
                <div className="relative h-80">
                    <img 
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                        alt="Personal Training" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
                        <div className="ml-8 text-white max-w-md">
                            <h1 className="text-4xl font-bold mb-2">Personal Training Management</h1>
                            <p className="text-lg">Manage your clients and training sessions with ease</p>
                        </div>
                    </div>
                </div>
                
                {/* Content section */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the Training Management System</h2>
                    
                    <p className="mb-6 text-gray-600">
                        This platform helps you organize and track all your personal training activities.
                        Easily manage your customer information, schedule training sessions, and keep track of your calendar.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                        <Link to="/customers" 
                            className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                            <div>
                                <h3 className="font-semibold text-blue-800">Customers</h3>
                                <p className="text-sm text-blue-600">Manage your client information</p>
                            </div>
                            <ChevronRightIcon className="text-blue-500" />
                        </Link>
                        
                        <Link to="/trainings"
                            className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                            <div>
                                <h3 className="font-semibold text-green-800">Trainings</h3>
                                <p className="text-sm text-green-600">Schedule and track sessions</p>
                            </div>
                            <ChevronRightIcon className="text-green-500" />
                        </Link>
                        
                        <Link to="/calendar"
                            className="flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                            <div>
                                <h3 className="font-semibold text-purple-800">Calendar</h3>
                                <p className="text-sm text-purple-600">View your training schedule</p>
                            </div>
                            <ChevronRightIcon className="text-purple-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;