# Wiraphat Khanyos — Developer Portfolio

เว็บพอร์ตโฟลิโอส่วนตัว รวมผลงานเว็บแอปพลิเคชัน เกม 2D งานออกแบบแบนเนอร์ และใบประกาศนียบัตรสาย Fullstack Developer

**Stack:** React 19 · Tailwind CSS 3 · Create React App

---

## เริ่มใช้งาน

```bash
npm install
npm start     # เปิด http://localhost:3000
npm run build # build ไปที่ build/
npm test      # รันเทสต์
```

---

## โครงสร้าง

```
src/
├─ App.js                 สลับระหว่างหน้าหลักกับหน้าแกลเลอรีแบนเนอร์
├─ index.css              design tokens + สไตล์ที่ใช้ร่วมกันทุก section
└─ component/
   ├─ Navbar.jsx          เมนู sticky + scroll-spy
   ├─ Banner.jsx          hero + รูปโปรไฟล์ + terminal typer
   ├─ About.jsx           แนะนำตัว
   ├─ Landingpage.jsx     การ์ดโปรเจค + modal รายละเอียด
   ├─ Lpphoto.jsx         ตัวอย่างงานออกแบบแบนเนอร์ (ลิงก์ไปหน้าแกลเลอรี)
   ├─ Gamedeveloper.jsx   ผลงานเกมพร้อมวิดีโอ
   ├─ Skill.jsx           ทักษะและเครื่องมือ
   ├─ Certificate.jsx     ใบประกาศนียบัตร + modal ดูตัวเต็ม
   ├─ Contact.jsx         ช่องทางติดต่อ
   ├─ PhotoBanner.jsx     แกลเลอรีแบนเนอร์เต็มหน้า (โหลดจาก image.json)
   └─ Reveal.jsx          scroll reveal wrapper ใช้ร่วมทุก section
```

---

## จัดการรูปภาพ

ไฟล์ต้นฉบับความละเอียดเต็ม (PNG/JPG/PSD/วิดีโอดิบ) เก็บอยู่ใน **`assets-original/`** ซึ่งถูก gitignore ไว้ — ไม่ขึ้น git และไม่ถูก deploy

ไฟล์ใน `public/` เป็นเวอร์ชันที่ผ่านการบีบอัดแล้วทั้งหมด (WebP / H.264) เวลาเพิ่มรูปใหม่ให้แปลงก่อนเสมอ:

```bash
# รูป → WebP กว้างสูงสุด 1600px
python3 -c "from PIL import Image; im=Image.open('ต้นฉบับ.png'); im.thumbnail((1600,1600)); im.save('public/images/ใหม่.webp','WEBP',quality=78)"

# วิดีโอ → H.264 720p/1280p พร้อม faststart
ffmpeg -i ต้นฉบับ.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 27 -preset veryfast \
       -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/video/ใหม่.mp4
```

รายชื่อรูปในหน้าแกลเลอรีอ่านจาก `public/images/image.json` — เพิ่มรูปแล้วต้องอัปเดตไฟล์นี้ด้วย

---

## ก่อน deploy

แก้ `https://your-domain.com` ใน `public/index.html` เป็นโดเมนจริง (มี 4 จุด: canonical, og:url, og:image, twitter:image และใน JSON-LD) ไม่งั้นรูปพรีวิวจะไม่ขึ้นตอนแชร์ลิงก์

---

## หมายเหตุการพัฒนา

- `overflow-x: clip` ไม่ใช่ `hidden` — `hidden` จะสร้าง scroll container ใหม่ทำให้ navbar sticky พัง
- Modal ทุกตัว render ผ่าน `createPortal` ไปที่ `document.body` เพราะ wrapper ใน `App.js` มี `transform` ซึ่งทำให้ `position: fixed` ยึดกับ wrapper แทน viewport
- `.reveal` ใช้ `animation-timeline: view()` ถ้าเบราว์เซอร์รองรับ และตกกลับไปใช้ transition + IntersectionObserver ถ้าไม่รองรับ ตอนล็อกสกอลล์ (เปิด modal) ต้องหยุดอนิเมชันด้วย `body.modal-open` ไม่งั้นเนื้อหาจะหายทั้งหน้า
