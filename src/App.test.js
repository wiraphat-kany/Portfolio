import { render, screen } from '@testing-library/react';
import App from './App';

// jsdom ไม่มี IntersectionObserver / matchMedia ซึ่ง Reveal และ Certificate เรียกใช้
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

test('แสดงชื่อเจ้าของพอร์ตในหน้าแรก', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /wiraphat khanyos/i })).toBeInTheDocument();
});

test('มีลิงก์ข้ามไปเนื้อหาหลักสำหรับผู้ใช้คีย์บอร์ด', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /ข้ามไปยังเนื้อหาหลัก/ })).toBeInTheDocument();
});
