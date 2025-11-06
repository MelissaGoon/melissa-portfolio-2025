import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import SingleItemPage from '../pages/SingleItemPage';
import NotFoundPage from '../pages/NotFoundPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../utilities/ScrollToTop';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <a className='screen-reader-text' href='#site-main'>Skip To Content</a>


            <Header />

            <Routes>
                <Route path='/' exact element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/projects' element={<ProjectsPage />} />
                <Route path='/projects/:id' element={<SingleItemPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>



            <Footer />

        </BrowserRouter>
    )
}

export default AppRouter