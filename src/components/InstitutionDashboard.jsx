import React, { useState } from 'react';
import { 
  Brain, Users, TrendingUp, Building2, Eye, PieChart, Settings, 
  UserCheck, Target, Award, LogOut, UserCircle, ChevronDown, Sun, Moon
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, BarChart, Bar, Legend
} from 'recharts';

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

// Profile Dropdown Component
const ProfileDropdown = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    // Navigate to profile page
    console.log('Navigating to profile...');
    alert('Profile page navigation would happen here');
  };

  const handleLogout = () => {
    // Handle logout
    console.log('Logging out...');
    alert('Logout functionality would happen here');
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowProfile(!showProfile)}
        className="inline-flex items-center px-2 py-1 rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
      </button>
      {showProfile && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-200 dark:border-gray-600">
          <div className="py-1">
            <button 
              onClick={handleProfileClick}
              className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <UserCircle className="w-4 h-4 mr-2" /> Profile
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtitle, color = "purple", trend, delay = 0 }) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg transition-transform duration-200 hover:scale-110`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className="flex items-center space-x-1 text-green-600 animate-bounce-gentle">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      )}
    </div>
  </div>
);

const InstitutionDashboard = () => {
  const [selectedDepartments, setSelectedDepartments] = useState(['CSE', 'ISE', 'ECE', 'EEE', 'EIE']);
  const [yearRange, setYearRange] = useState({ from: '2020', to: '2024*' });
  
  const data = {
    name: "JNTUH College of Engineering",
    totalStudents: 1250,
    placedStudents: 890,
    placementRate: 71.2,
    averagePackage: 12.5,
    topPackage: 45
  };

  const trendData = [
    { month: 'Jan', placed: 4 },
    { month: 'Feb', placed: 7 },
    { month: 'Mar', placed: 6 },
    { month: 'Apr', placed: 10 },
    { month: 'May', placed: 8 },
  ];

  const internshipData = [
    { year: '2020', CSE: 35, ISE: 12, ECE: 8, EEE: 5, EIE: 3 },
    { year: '2021', CSE: 28, ISE: 22, ECE: 6, EEE: 4, EIE: 2 },
    { year: '2022', CSE: 82, ISE: 52, ECE: 68, EEE: 18, EIE: 22 },
    { year: '2023', CSE: 168, ISE: 138, ECE: 145, EEE: 45, EIE: 38 },
    { year: '2024*', CSE: 122, ISE: 115, ECE: 18, EEE: 28, EIE: 8 }
  ];

  const departmentColors = {
    CSE: "#3b82f6",
    ISE: "#f97316", 
    ECE: "#6b7280",
    EEE: "#eab308",
    EIE: "#06b6d4"
  };

  const years = ['2020', '2021', '2022', '2023', '2024*'];

  const handleDepartmentToggle = (dept) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const filteredData = internshipData.filter(item => {
    const yearIndex = years.indexOf(item.year);
    const fromIndex = years.indexOf(yearRange.from);
    const toIndex = years.indexOf(yearRange.to);
    return yearIndex >= fromIndex && yearIndex <= toIndex;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 animate-slide-down relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-2">Placify</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold animate-slide-in-left">Welcome back, {data.name}!</h1>
              <p className="text-purple-100 text-lg animate-slide-in-left" style={{ animationDelay: '200ms' }}>Here's the placement snapshot for 2023-24</p>
            </div>
            <Building2 className="w-16 h-16 text-purple-200 hidden md:block animate-float" />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Total Students" 
            value={data.totalStudents.toLocaleString()} 
            subtitle="Registered" 
            color="blue" 
            delay={0}
          />
          <StatCard 
            icon={UserCheck} 
            title="Students Placed" 
            value={data.placedStudents.toLocaleString()} 
            subtitle={`${data.placementRate}% Placement Rate`} 
            color="green" 
            trend="+12%" 
            delay={100}
          />
          <StatCard 
            icon={Target} 
            title="Average Package" 
            value={`₹${data.averagePackage}L`} 
            subtitle="Per Annum" 
            color="purple" 
            trend="+8%" 
            delay={200}
          />
          <StatCard 
            icon={Award} 
            title="Highest Package" 
            value={`₹${data.topPackage}L`} 
            subtitle="This Year" 
            color="orange" 
            delay={300}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Placement Trend Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: '400ms' }}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Placement Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="placed" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Placements */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: '450ms' }}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Placements</h2>
            <div className="space-y-4">
              {[
                { name: "Rahul Sharma", company: "Google", package: "45L", role: "SDE-I" },
                { name: "Priya Patel", company: "Microsoft", package: "42L", role: "SDE-I" },
                { name: "Arjun Kumar", company: "Amazon", package: "38L", role: "SDE-I" },
                { name: "Sneha Reddy", company: "Flipkart", package: "35L", role: "SDE-I" },
                { name: "Vikash Singh", company: "TCS", package: "8L", role: "Software Engineer" }
              ].map((placement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {placement.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{placement.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{placement.role} at {placement.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">₹{placement.package}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats & Department Internship Performance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Recruiting Companies */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: '500ms' }}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Recruiting Companies</h2>
            <div className="space-y-3">
              {[
                { company: "Google", count: 12, logo: "🔍" },
                { company: "Microsoft", count: 10, logo: "💻" },
                { company: "Amazon", count: 8, logo: "📦" },
                { company: "TCS", count: 25, logo: "🏢" },
                { company: "Infosys", count: 20, logo: "ℹ️" }
              ].map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{company.logo}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{company.company}</span>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm font-medium">
                    {company.count} hires
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Department-wise Internship Offers */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: '550ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Department-wise Internship Offers</h2>
            </div>
            
            {/* Filters */}
            <div className="mb-6 space-y-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Departments:
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(departmentColors).map(dept => (
                    <button
                      key={dept}
                      onClick={() => handleDepartmentToggle(dept)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedDepartments.includes(dept)
                          ? 'text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      style={{
                        backgroundColor: selectedDepartments.includes(dept) ? departmentColors[dept] : undefined
                      }}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Range Filter */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    From Year:
                  </label>
                  <select
                    value={yearRange.from}
                    onChange={(e) => setYearRange(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year.replace('*', '')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    To Year:
                  </label>
                  <select
                    value={yearRange.to}
                    onChange={(e) => setYearRange(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year.replace('*', '')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedDepartments.map(dept => (
                  <Bar 
                    key={dept}
                    dataKey={dept} 
                    fill={departmentColors[dept]} 
                    name={dept} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">* Data as of 5.7.2024</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-all duration-300 group animate-fade-in hover:scale-105" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-all duration-200 group-hover:scale-110">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">View Detailed Performance</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyze student performance metrics</p>
              </div>
            </div>
          </button>

          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-all duration-300 group animate-fade-in hover:scale-105" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-all duration-200 group-hover:scale-110">
                <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Generate Reports</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download placement analytics</p>
              </div>
            </div>
          </button>

          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-all duration-300 group animate-fade-in hover:scale-105" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-all duration-200 group-hover:scale-110">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Manage Settings</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure dashboard preferences</p>
              </div>
            </div>
          </button>
        </section>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InstitutionDashboard;