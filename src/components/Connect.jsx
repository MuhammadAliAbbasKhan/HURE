import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/colors.module.scss';
import mockProfessionals from '../../utils/Website/mockProfessionals.js';

const HUREConnect = () => {
  // State for professionals data
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [roleFilter, setRoleFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Discussion board states
  const [discussions, setDiscussions] = useState([]);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'General',
    visibility: 'Public'
  });

  // East Africa specific data
  const eastAfricaCountries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan'];
  const eastAfricaSpecialties = [
    'Maternal Health', 
    'Community Health', 
    'NHIF Knowledge', 
    'Infection Prevention',
    'HIV/AIDS Care',
    'Malaria Treatment',
    'TB Management',
    'Pediatric Care'
  ];
  const discussionCategories = [
    'General',
    'Clinical',
    'NHIF & Compliance',
    'Task Shifting in Rural Clinics',
    'Mobile Clinics & Outreach',
    'Medical Supply Chain',
    'Administrative',
    'Research'
  ];

  // Mock data fetch
  useEffect(() => {
    setTimeout(() => {
      const fetchedProfessionals = mockProfessionals ?? [];
      if (Array.isArray(fetchedProfessionals)) {
        // Add some East Africa specific mock data
        const eastAfricaProfessionals = [
          ...fetchedProfessionals,
          {
            id: 1001,
            name: 'Dr. Amina Omondi',
            role: 'Community Health Specialist',
            facility: 'Kisumu County Hospital',
            location: 'Kisumu, Kenya',
            country: 'Kenya',
            bio: 'Specialized in maternal health and community outreach programs in Western Kenya.',
            specialties: ['Maternal Health', 'Community Health', 'NHIF Knowledge'],
            photo: null
          },
          {
            id: 1002,
            name: 'Dr. Robert Mugabe',
            role: 'Infectious Disease Specialist',
            facility: 'Muhimbili National Hospital',
            location: 'Dar es Salaam, Tanzania',
            country: 'Tanzania',
            bio: 'Expert in infection prevention and control in resource-limited settings.',
            specialties: ['Infection Prevention', 'HIV/AIDS Care', 'TB Management'],
            photo: null
          }
        ];
        setProfessionals(eastAfricaProfessionals);
        setFilteredProfessionals(eastAfricaProfessionals);
      } else {
        console.error('mockProfessionals is not an array');
        setProfessionals([]);
        setFilteredProfessionals([]);
      }
      
      // Mock discussions data with East Africa context
      setDiscussions([
        {
          id: 1,
          title: 'NHIF reimbursement challenges in rural clinics',
          author: 'Dr. James Kariuki',
          role: 'Medical Officer',
          facility: 'Nyeri County Hospital',
          country: 'Kenya',
          date: '2023-05-15',
          category: 'NHIF & Compliance',
          content: 'Has anyone experienced delays in NHIF reimbursements for services provided in rural clinics? Looking for best practices to streamline this process...',
          replies: 8,
          visibility: 'Public'
        },
        {
          id: 2,
          title: 'Task shifting for nurses in understaffed facilities',
          author: 'Sr. Mary Wambui',
          role: 'Nurse Practitioner',
          facility: 'Kakamega General Hospital',
          country: 'Kenya',
          date: '2023-05-10',
          category: 'Task Shifting in Rural Clinics',
          content: 'Our facility is implementing task shifting to address staff shortages. Would love to hear from others who have done this successfully...',
          replies: 5,
          visibility: 'Public'
        },
        {
          id: 3,
          title: 'Mobile clinic best practices for pastoral communities',
          author: 'Dr. Ahmed Mohamed',
          role: 'Public Health Specialist',
          facility: 'Garissa County Health',
          country: 'Kenya',
          date: '2023-05-08',
          category: 'Mobile Clinics & Outreach',
          content: 'Sharing our experience running mobile clinics in Northern Kenya. What strategies have worked for others in reaching nomadic populations?',
          replies: 12,
          visibility: 'Public'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filter professionals based on criteria
  useEffect(() => {
    let results = professionals;
    
    if (roleFilter) {
      results = results.filter(professional => 
        professional.role === roleFilter
      );
    }
    
    if (facilityFilter) {
      results = results.filter(professional => 
        professional.facility === facilityFilter
      );
    }
    
    if (locationFilter) {
      results = results.filter(professional => 
        professional.location.includes(locationFilter)
      );
    }
    
    if (countryFilter) {
      results = results.filter(professional => 
        professional.country === countryFilter
      );
    }
    
    if (searchQuery) {
      results = results.filter(professional => 
        professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.specialties?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredProfessionals(results);
  }, [roleFilter, facilityFilter, locationFilter, countryFilter, searchQuery, professionals]);

  // Handle discussion posting
  const handlePostDiscussion = (e) => {
    e.preventDefault();
    const newDiscussionWithId = {
      ...newDiscussion,
      id: discussions.length + 1,
      author: 'You',
      role: 'Your Role',
      facility: 'Your Facility',
      country: 'Your Country',
      date: new Date().toISOString().split('T')[0],
      replies: 0
    };
    setDiscussions([newDiscussionWithId, ...discussions]);
    setNewDiscussion({
      title: '',
      content: '',
      category: 'General',
      visibility: 'Public'
    });
    setShowDiscussionForm(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get unique values for filters
  const uniqueRoles = [...new Set(professionals.map(p => p.role))];
  const uniqueFacilities = [...new Set(professionals.map(p => p.facility))];
  const uniqueLocations = [...new Set(professionals.map(p => {
    // Extract town/county from location (format: "Town, County" or "City, Country")
    const parts = p.location.split(', ');
    return parts.length > 0 ? parts[0] : p.location;
  }))];
  const uniqueCountries = [...new Set(professionals.map(p => p.country))].filter(Boolean);

  return (
    <div className="min-h-screen mt-24" style={{ backgroundColor: styles.primaryColor3 }}>
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
              HURE Connect - East Africa
            </h1>
            <p className="mt-2" style={{ color: styles.primaryColor4 }}>
              Connect with healthcare professionals across East Africa
            </p>
          </div>
          
          {/* Two Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Professionals Directory Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Find Professionals
                </h2>
                <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                  {filteredProfessionals.length} professionals found
                </p>
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Name, specialty, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Roles</option>
                    {uniqueRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Facility
                  </label>
                  <select
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Facilities</option>
                    {uniqueFacilities.map(facility => (
                      <option key={facility} value={facility}>{facility}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Town/County
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Country
                  </label>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Countries</option>
                    {eastAfricaCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Professionals Grid */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
                </div>
              ) : filteredProfessionals.length === 0 ? (
                <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                  <p style={{ color: styles.primaryColor5 }}>No professionals match your filters. Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredProfessionals.map((professional) => (
                      <motion.div
                        key={professional.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg shadow-md overflow-hidden"
                        style={{ backgroundColor: styles.primaryColor3 }}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                                {professional.photo ? (
                                  <img 
                                    src={professional.photo} 
                                    alt={professional.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: styles.primaryColor2 }}>
                                    <span className="text-xl font-medium" style={{ color: styles.primaryColor5 }}>
                                      {professional.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold" style={{ color: styles.primaryColor5 }}>
                                {professional.name}
                              </h3>
                              <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                                {professional.role}
                              </p>
                              <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                                {professional.facility}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm" style={{ color: styles.primaryColor5 }}>
                              {professional.bio.substring(0, 100)}{professional.bio.length > 100 ? '...' : ''}
                            </p>
                          </div>
                          
                          {professional.specialties && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {professional.specialties.map((specialty, index) => (
                                <span 
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{ 
                                    backgroundColor: styles.primaryColor2,
                                    color: styles.primaryColor5
                                  }}
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-4 pt-3 border-t flex justify-between items-center" style={{ borderColor: styles.primaryColor4 }}>
                            <div>
                              <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                                {professional.location}
                              </p>
                              {professional.country && (
                                <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                                  {professional.country}
                                </p>
                              )}
                            </div>
                            <button
                              className="text-xs px-3 py-1 rounded-full transition"
                              style={{ 
                                backgroundColor: styles.primaryColor1,
                                color: 'white',
                                hoverBg: styles.primaryColor5
                              }}
                            >
                              Connect
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
            
            {/* Discussion Board Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Community Discussions
                </h2>
                <button
                  onClick={() => setShowDiscussionForm(true)}
                  className="px-3 py-1 text-sm rounded-md transition"
                  style={{ 
                    backgroundColor: styles.primaryColor1,
                    color: 'white',
                    hoverBg: styles.primaryColor5
                  }}
                >
                  + New Discussion
                </button>
              </div>
              
              {/* Discussion Categories */}
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                {discussionCategories.map(category => (
                  <button 
                    key={category}
                    className="px-3 py-1 text-sm rounded-full whitespace-nowrap"
                    style={{ backgroundColor: styles.primaryColor2 }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Discussions List */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
                </div>
              ) : discussions.length === 0 ? (
                <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                  <p style={{ color: styles.primaryColor5 }}>No discussions yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {discussions.map((discussion) => (
                      <motion.div
                        key={discussion.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                        className="rounded-lg shadow-sm p-4 cursor-pointer"
                        style={{ 
                          backgroundColor: styles.primaryColor3,
                          borderLeft: `3px solid ${styles.primaryColor1}`
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold" style={{ color: styles.primaryColor5 }}>
                              {discussion.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <p className="text-sm mr-2" style={{ color: styles.primaryColor4 }}>
                                {discussion.author}
                              </p>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: styles.primaryColor2 }}>
                                {discussion.category}
                              </span>
                              {discussion.visibility !== 'Public' && (
                                <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: styles.primaryColor2 }}>
                                  {discussion.visibility}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                              {formatDate(discussion.date)}
                            </p>
                            {discussion.country && (
                              <p className="text-xs" style={{ color: styles.primaryColor4 }}>
                                {discussion.country}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm" style={{ color: styles.primaryColor5 }}>
                          {discussion.content.substring(0, 150)}{discussion.content.length > 150 ? '...' : ''}
                        </p>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            <span className="text-xs" style={{ color: styles.primaryColor4 }}>
                              {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
                            </span>
                          </div>
                          <button className="text-xs px-2 py-1 rounded transition" style={{ color: styles.primaryColor1 }}>
                            View Discussion
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* New Discussion Modal */}
      <AnimatePresence>
        {showDiscussionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: styles.primaryColor3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                    Start a New Discussion
                  </h3>
                  <button
                    onClick={() => setShowDiscussionForm(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handlePostDiscussion}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Title*
                      </label>
                      <input
                        type="text"
                        required
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                          Category*
                        </label>
                        <select
                          required
                          value={newDiscussion.category}
                          onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: styles.primaryColor4,
                            focusRing: styles.primaryColor1
                          }}
                        >
                          {discussionCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                          Visibility*
                        </label>
                        <select
                          required
                          value={newDiscussion.visibility}
                          onChange={(e) => setNewDiscussion({...newDiscussion, visibility: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          style={{ 
                            borderColor: styles.primaryColor4,
                            focusRing: styles.primaryColor1
                          }}
                        >
                          <option value="Public">Public to all HURE users</option>
                          <option value="Clinic-Internal">Clinic-Internal (private)</option>
                          <option value="Role-Based">Role-Based (e.g., HR-only)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Content*
                      </label>
                      <textarea
                        required
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                        rows="6"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowDiscussionForm(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        color: styles.primaryColor5,
                        hoverBg: styles.primaryColor2
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ 
                        backgroundColor: styles.primaryColor1,
                        color: 'white',
                        hoverBg: styles.primaryColor5
                      }}
                    >
                      Post Discussion
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HUREConnect;