import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/colors.module.scss';
import mockEvents from '../../utils/Website/mockEvents.js';

const HUREvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [isApprovedUser, setIsApprovedUser] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    category: 'Training',
    description: '',
    speaker: '',
    link: '',
    cpdPoints: '',
    participationCost: '',
    tags: []
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchedEvents = mockEvents ?? [];
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
      } else {
        console.error('mockEvents is not an array');
        setEvents([]);
        setFilteredEvents([]);
      }
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let results = events;
    
    if (categoryFilter) {
      results = results.filter(event => event.category === categoryFilter);
    }
    
    if (dateFilter) {
      results = results.filter(event => new Date(event.date) >= new Date(dateFilter));
    }
    
    if (searchQuery) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.speaker && event.speaker.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (regionFilter) {
      results = results.filter(event => 
        regionFilter === 'Online' ? !event.venue : event.venue.includes(regionFilter.split(',')[0])
      );
    }
    
    results = results.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredEvents(results);
  }, [categoryFilter, dateFilter, searchQuery, regionFilter, events]);

  const handlePostEvent = (e) => {
    e.preventDefault();
    const newEventWithId = {
      ...newEvent,
      id: events.length + 1,
      posted: new Date().toLocaleDateString('en-GB'),
      participationCost: newEvent.participationCost || 'Free',
      tags: newEvent.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    setEvents([newEventWithId, ...events]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      venue: '',
      category: 'Training',
      description: '',
      speaker: '',
      link: '',
      cpdPoints: '',
      participationCost: '',
      tags: []
    });
    setShowEventForm(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCTAButtonText = (event) => {
    if (!event.venue) return 'Join via Zoom';
    if (event.category === 'Training' && event.cpdPoints) return 'Apply for CPD';
    return 'Reserve Seat';
  };

  return (
    <div className="min-h-screen mt-24" style={{ backgroundColor: styles.primaryColor3 }}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg shadow-md sticky top-8"
              style={{ backgroundColor: styles.primaryColor3, fontFamily: styles.subheadingFont }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold" style={{ color: styles.primaryColor5 }}>
                  Find Events
                </h2>
                {isApprovedUser && (
                  <button
                    onClick={() => setShowEventForm(true)}
                    className="px-3 py-1 text-sm rounded-md transition"
                    style={{ backgroundColor: styles.primaryColor1, color: 'white', hoverBg: styles.primaryColor5 }}
                  >
                    + New Event
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Search Events
                  </label>
                  <input
                    type="text"
                    placeholder="Keywords, speaker, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  >
                    <option value="">All Categories</option>
                    <option value="CPD">CPD / CME</option>
                    <option value="Licensing Exam Prep">Licensing Exam Prep</option>
                    <option value="Community Health">Community Health</option>
                    <option value="NHIF/Nursing Council Briefings">NHIF/Nursing Council Briefings</option>
                    <option value="Public Health Workshops">Public Health Workshops</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Upcoming After
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Region
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                  >
                    <option value="">All Regions</option>
                    <option value="Nairobi, Kenya">Kenya</option>
                    <option value="Kampala, Uganda">Uganda</option>
                    <option value="Dar es Salaam, Tanzania">Tanzania</option>
                    <option value="Kigali, Rwanda">Rwanda</option>
                    <option value="Online">Online Only</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    setCategoryFilter('');
                    setDateFilter('');
                    setSearchQuery('');
                    setRegionFilter('');
                  }}
                  className="w-full py-2 rounded-md transition"
                  style={{ backgroundColor: styles.primaryColor4, color: 'white', hoverBg: styles.primaryColor5 }}
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          </aside>

          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
                Upcoming Events
              </h2>
              <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                {filteredEvents.length} events found
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                <p style={{ color: styles.primaryColor5 }}>No events match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-lg shadow-md overflow-hidden"
                      style={{ backgroundColor: styles.primaryColor3, borderLeft: `4px solid ${styles.primaryColor1}` }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left">
                            <div className="bg-white rounded-lg p-2 shadow-inner">
                              <div className="text-sm font-bold" style={{ color: styles.primaryColor1 }}>
                                {new Date(event.date).toLocaleString('en-GB', { month: 'short' }).toUpperCase()}
                              </div>
                              <div className="text-2xl font-bold" style={{ color: styles.primaryColor5 }}>
                                {new Date(event.date).getDate()}
                              </div>
                              <div className="text-xs" style={{ color: styles.primaryColor4 }}>
                                {new Date(event.date).toLocaleString('en-GB', { weekday: 'short' })}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                              <div>
                                <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                                  {event.title}
                                </h3>
                                <p className="mt-1" style={{ color: styles.primaryColor4 }}>
                                  {event.time} • {event.venue || 'Online'}
                                </p>
                              </div>
                              <span 
                                className="text-xs px-3 py-1 rounded-full self-start"
                                style={{ backgroundColor: styles.primaryColor2, color: styles.primaryColor5 }}
                              >
                                {event.category}
                              </span>
                            </div>
                            
                            <p className="mt-3" style={{ color: styles.primaryColor5 }}>
                              {event.description}
                            </p>
                            
                            {event.speaker && (
                              <p className="mt-2 text-sm" style={{ color: styles.primaryColor4 }}>
                                <span className="font-medium">Speaker/Trainer:</span> {event.speaker}
                              </p>
                            )}
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {event.tags?.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{ backgroundColor: styles.primaryColor2, color: styles.primaryColor5 }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                          <div>
                            <p className="font-medium" style={{ color: styles.primaryColor5 }}>
                              {formatDate(event.date)} • {event.participationCost}
                            </p>
                            {event.cpdPoints && (
                              <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                                CPD Points: {event.cpdPoints}
                              </p>
                            )}
                            {event.posted && (
                              <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                                Posted {event.posted}
                              </p>
                            )}
                          </div>
                          <motion.a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-md transition text-center w-full md:w-auto"
                            style={{ backgroundColor: styles.primaryColor1, color: 'white', hoverBg: styles.primaryColor5 }}
                          >
                            {getCTAButtonText(event)}
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showEventForm && (
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
                    Post a Healthcare Training or Event
                  </h3>
                  <button
                    onClick={() => setShowEventForm(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handlePostEvent}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Event Title*
                      </label>
                      <input
                        type="text"
                        required
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. ACLS Certification, NHIF"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Hosting Organization*
                      </label>
                      <input
                        type="text"
                        required
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. Nairobi Nursing School"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Location (Town, Country or Online)*
                      </label>
                      <input
                        type="text"
                        required
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. Nakuru, Kenya or Zoom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Date*
                      </label>
                      <input
                        type="date"
                        required
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Time*
                      </label>
                      <input
                        type="time"
                        required
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Speaker/Trainer (Optional)
                      </label>
                      <input
                        type="text"
                        value={newEvent.speaker}
                        onChange={(e) => setNewEvent({...newEvent, speaker: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. Dr. Achien'g Otieno, RN"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Event Type*
                      </label>
                      <select
                        required
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                      >
                        <option value="Training">Training</option>
                        <option value="CPD">CPD / CME</option>
                        <option value="Licensing Exam Prep">Licensing Exam Prep</option>
                        <option value="Community Health">Community Health</option>
                        <option value="NHIF/Nursing Council Briefings">NHIF/Nursing Council Briefings</option>
                        <option value="Public Health Workshops">Public Health Workshops</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        CPD Points (Optional)
                      </label>
                      <input
                        type="text"
                        value={newEvent.cpdPoints}
                        onChange={(e) => setNewEvent({...newEvent, cpdPoints: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. 5 points"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Participation Cost*
                      </label>
                      <input
                        type="text"
                        required
                        value={newEvent.participationCost}
                        onChange={(e) => setNewEvent({...newEvent, participationCost: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="e.g. Free, Ksh 1,000, or Sub"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Event Description*
                      </label>
                      <textarea
                        required
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="Overview, learning goals, registration info..."
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Registration Link*
                      </label>
                      <input
                        type="url"
                        required
                        value={newEvent.link}
                        onChange={(e) => setNewEvent({...newEvent, link: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newEvent.tags}
                        onChange={(e) => setNewEvent({...newEvent, tags: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: styles.primaryColor4, focusRing: styles.primaryColor1 }}
                        placeholder="CPD, Nursing Council, In-Person, Online"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ borderColor: styles.primaryColor4, color: styles.primaryColor5, hoverBg: styles.primaryColor2 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ backgroundColor: styles.primaryColor1, color: 'white', hoverBg: styles.primaryColor5 }}
                    >
                      Submit Event
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

export default HUREvents;