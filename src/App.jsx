import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Pricing from  './pages/Pricing';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';






import ProtectedRoute from './components/ProtectedRoute';




// import Gallery from './pages/Gallery';


import Cookie from './components/Cookie';

import HUREHire from './components/Hire';
import HUREEvents from './components/Events';

import ContactPage from './pages/ContactPage';

import Teams from './pages/Teams';

import Testimonials from './pages/Testimonials';




import ProjectExplorer from './pages/Explore';
// import Web_Projects from './pages/features/Web_Projects';
// import Design_Projects from './pages/features/Design_Projects';
// import ML_Projects from './pages/features/ML_Projects';
// import Android_Projects from './pages/features/Android_Projects';
// import DS_Projects from './pages/features/DS_Projects';


import FAQs from './pages/FAQs';
import HUREConnect from './components/Connect';
import DemoRequestPage from './components/RequestDemo';
import UserDashboard from './pages/UsersDashboard';
import ClinicDashboard from './pages/ClinicDashboard';








function App() {
  return (  
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        
        <Route path="cookies" element={<Cookie />} />
        <Route path="explore" element={<ProjectExplorer />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="team" element={<Teams   />} />
        <Route path="testimonials" element={<Testimonials   />} />
        <Route path="faqs" element={<FAQs   />} />
        
        <Route path="hire" element={<HUREHire  />} />
        <Route path="event" element={<HUREEvents  />} />
        <Route path="connect" element={<HUREConnect />} />
        
        <Route path="requestdemo" element={<DemoRequestPage />} />
        
        <Route path="userdashboard" element={<UserDashboard />} />
        <Route path="clinicdashboard" element={<ClinicDashboard />} />


{/* 

        <Route path="/categories/web" element={<Web_Projects   />} />
        <Route path="/categories/gd" element={<Design_Projects   />} />
        <Route path="/categories/ml" element={<ML_Projects   />} />

        <Route path="/categories/ml" element={<ML_Projects   />} />
        <Route path="/categories/android" element={<Android_Projects   />} />
        <Route path="/categories/data" element={<DS_Projects   />} />
 */}
        
          
        
        
      
          
     
          
          


        
        
          
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        <Route path="pricing" element={<Pricing/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;