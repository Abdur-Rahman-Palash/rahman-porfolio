import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', reject);
  });
}

async function generateCV() {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const outputPath = path.resolve('public/cv.pdf');
  const tempImagePath = path.resolve('temp_profile.jpg');

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  try {
    // Download profile image
    console.log('Downloading profile image...');
    await downloadImage('https://i.ibb.co/6cd1z1Nq/palash-2.jpg', tempImagePath);

    // Header with profile image and name
    doc.fontSize(10).fillColor('#666');
    try {
      doc.image(tempImagePath, 40, 40, { width: 60, height: 60 });
    } catch (err) {
      console.warn('Could not embed image, continuing without it:', err.message);
    }

    // Name and title
    doc.fontSize(24).fillColor('#000').font('Helvetica-Bold').text('Abdur Rahman Palash', 110, 45);
    doc.fontSize(14).fillColor('#444').font('Helvetica').text('Frontend React Developer', 110, 75);

    // Contact Section
    doc.moveDown(1);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('CONTACT INFORMATION');
    doc.fontSize(10).fillColor('#333').font('Helvetica');
    doc.text('Email: abdurrahmanpalashbd@gmail.com');
    doc.text('Phone: +880786433078');
    doc.text('Location: Dadul, Attpukurhat, Kazihal, Fulbari-5260, Dinajpur, Bangladesh');
    doc.text('GitHub: https://github.com/Abdur-Rahman-Palash');
    doc.text('LinkedIn: https://www.linkedin.com/in/abdur-rahman-palash-019b96251/');

    // Professional Summary
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(
      'Passionate Frontend React Developer with 3+ years of experience building responsive, accessible web applications using React, Tailwind CSS and modern JavaScript. Strong focus on performance optimization, user experience and maintainable code architecture.'
    );

    // Core Skills
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('CORE SKILLS');
    doc.fontSize(10).fillColor('#333').font('Helvetica');
    doc.text('React, JavaScript (ES6+), HTML5 & CSS3, Tailwind CSS, Framer Motion, Vite, Git, Responsive Design, Web Performance Optimization, Component Design, State Management, REST APIs, Accessibility (WCAG)');

    // Professional Experience
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');

    doc.fontSize(10).fillColor('#000').font('Helvetica-Bold').text('Freelance — Frontend React Developer');
    doc.fontSize(9).fillColor('#666').font('Helvetica-Oblique').text('2023 - Present');
    doc.fontSize(10).fillColor('#333').font('Helvetica');
    doc.list([
      'Deliver responsive React applications and reusable UI components with modern best practices',
      'Built Cyber Neon Portfolio using React, Vite, Tailwind CSS and Framer Motion with interactive animations',
      'Implemented contact flows (email & WhatsApp integration) and performance optimizations',
      'Architected component-based design system with DaisyUI for scalable UI development'
    ]);

    // Projects
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('KEY PROJECTS');

    doc.fontSize(10).fillColor('#000').font('Helvetica-Bold').text('Cyber Neon Portfolio');
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(
      'Personal portfolio showcasing projects and skills. Built with React, Vite, Tailwind CSS and Framer Motion. Features include responsive design, neon animations, CV download and WhatsApp contact integration.'
    );

    doc.fontSize(10).fillColor('#000').font('Helvetica-Bold').text('E-Commerce Platform (Sample)');
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(
      'Full-stack e-commerce demonstration. Frontend: React with Tailwind CSS. Backend: Node.js, MongoDB. Payment integration: Stripe. Showcases modern web development stack.'
    );

    doc.fontSize(10).fillColor('#000').font('Helvetica-Bold').text('Task Management App (Sample)');
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(
      'Collaborative task application with real-time updates. Built with React and Firebase. Features include task assignment, real-time notifications and team collaboration.'
    );

    // Education
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('EDUCATION');
    doc.fontSize(10).fillColor('#000').font('Helvetica-Bold').text('Self-Taught — Web Development');
    doc.fontSize(9).fillColor('#666').font('Helvetica-Oblique').text('2022 - Present');
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(
      'Continuous learning in frontend technologies, modern JavaScript frameworks, UI/UX design and web performance optimization.'
    );

    // Languages
    doc.moveDown(0.8);
    doc.fontSize(11).fillColor('#000').font('Helvetica-Bold').text('LANGUAGES');
    doc.fontSize(10).fillColor('#333').font('Helvetica');
    doc.text('Bengali (Native), English (Conversational)');

    // Footer
    doc.fontSize(8).fillColor('#999').text('Available for hire: Yes', 40, doc.page.height - 30, { align: 'center' });
    doc.fontSize(8).fillColor('#999').text('Generated from portfolio data', 40, doc.page.height - 20, { align: 'center' });

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    console.log('✓ CV PDF generated successfully at:', outputPath);

    // Clean up temp image
    if (fs.existsSync(tempImagePath)) {
      fs.unlinkSync(tempImagePath);
    }
  } catch (error) {
    console.error('Error generating CV:', error);
    process.exit(1);
  }
}

generateCV();
