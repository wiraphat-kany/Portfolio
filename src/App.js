import './App.css';
import { useState } from 'react';

//Component
import Navbar from './component/Navbar';
import Banner from './component/Banner';
import About from './component/About';
import Lpphoto from './component/Lpphoto';
import Gamedeveloper from './component/Gamedeveloper';
import Landingpage from './component/Landingpage';
import Skill from './component/Skill';
import PhotoBanner from './component/PhotoBanner';
import Certificate from './component/Certificate';
import Contact from './component/Contact';
import Footer from './component/Footer';

function App() {

  const [currentPage, setCurrentPage] = useState('index');

  // สลับหน้าแล้วดีดกลับขึ้นบนสุด ไม่ให้ค้างอยู่ตำแหน่ง scroll ของหน้าเดิม
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // หน้าที่ไม่ได้ใช้งานต้องถูกจำกัดความสูงไว้ที่ 1 จอ ไม่งั้นมันจะดันความสูงของ
  // document ให้เกินกล่องแม่ของ navbar แล้ว sticky จะหยุดตามที่ขอบกล่องแม่
  const HIDDEN = 'absolute h-screen overflow-hidden opacity-0 pointer-events-none'
  const ACTIVE = 'relative translate-x-0'

  return (
    /* overflow-x-clip ไม่ใช่ overflow-hidden — hidden จะสร้าง scroll container
       ทำให้ <Navbar /> ที่เป็น sticky ข้างในเลื่อนหายไปตอน scroll */
    <div className="relative w-full min-h-screen overflow-x-clip bg-[#0D0B1A]">
      <a href="#main-content" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>

      {/* อยู่นอกกล่องของทั้งสองหน้า เพื่อให้ navbar ค้างอยู่ทุกหน้า */}
      <Navbar currentPage={currentPage} onNavigation={goToPage} />

      {/* inert = คนกด Tab จะไม่หลุดเข้าหน้าที่ซ่อนอยู่ และ screen reader ก็ข้ามไปเลย
          (opacity-0 อย่างเดียวยังโฟกัสเข้าไปได้) */}
      <div
        inert={currentPage === 'photobanner'}
        aria-hidden={currentPage === 'photobanner' || undefined}
        className={`w-full min-h-screen transition-transform duration-500 ease-in-out ${
          currentPage === 'photobanner' ? `${HIDDEN} -translate-x-full` : ACTIVE
        }`}
      >
        <main id="main-content">
          <Banner />
          <About />
          <Landingpage />
          <Lpphoto onNavigation={goToPage} />
          <Gamedeveloper />
          <Skill />
          <Certificate />
          <Contact />
        </main>
        <Footer />
      </div>

      <div
        inert={currentPage !== 'photobanner'}
        aria-hidden={currentPage !== 'photobanner' || undefined}
        className={`w-full min-h-screen top-0 left-0 transition-transform duration-500 ease-in-out ${
          currentPage === 'photobanner' ? ACTIVE : `${HIDDEN} translate-x-full`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <button type="button"
            onClick={() => goToPage('index')}
            className="btn btn-subtle"
          >
            ← ย้อนกลับหน้าหลัก
          </button>
        </div>
        <PhotoBanner />
      </div>

    </div>
  );
}

export default App;
