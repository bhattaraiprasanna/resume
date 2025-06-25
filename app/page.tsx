import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PrintButton } from "@/components/print-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">PRASANNA BHATTARAI</h1>
          <p className="text-xl mt-2 text-gray-700">
            Frontend developer
          </p>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <a href="tel:+9779841028722" className="hover:text-blue-600">
                +977 9841028722
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:prasannabhattarai10@gmail.com"
                className="hover:text-blue-600"
              >
                prasannabhattarai10@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <a
                href="https://github.com/bhattaraiprasanna"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                github.com/bhattaraiprasanna
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <a
                href="https://www.linkedin.com/in/prasanna-bhattarai-47a396329"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                linkedin.com/in/prasannabhattarai
              </a>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Pokhara, Nepal</span>
            </div>
          </div>
        </header>

        {/* Summary Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            SUMMARY
          </h2>
          <p className="text-gray-700">
          Frontend Developer with expertise in building modern, 
          responsive, and accessible user interfaces. Skilled in JavaScript and React.js, with a strong understanding of UI/UX principles,
           performance optimization, and cross-browser compatibility. Passionate about 
           delivering polished and maintainable code.
          </p>
        </section>

        {/* Core Skills Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            CORE SKILLS
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700"> 
            <li>
              <span className="font-semibold">Frontend Technologies:</span>{" "}
              React.js, HTML, CSS, JavaScript
            </li> 
            <li>
              <span className="font-semibold">UI/UX & Tools:</span>{" "}
              Figma, ShadCN, Lucide Icons, Responsive Design, Git, GitHub 
            </li>
          </ul>
        </section>

        {/* Professional Experience Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-800">
              Frontend Developer
              </h3>
              <p className="text-gray-600">
                Adbreakmedia, December 2024 - Present
              </p>
            </div>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li>
              <span className="font-medium">Frontend Development:</span>{" "}
                Built and maintained highly interactive user interfaces using React.js and Tailwind CSS
              </li>
              <li>
                <span className="font-medium">UI Collaboration:</span>{" "}
                Worked closely with product designers to implement pixel-perfect, responsive components
              </li>
              <li>
                <span className="font-medium">Dashboard Engineering:</span>{" "}
                Developed dynamic dashboards for advertisers and publishers with data visualization tools
              </li>
              <li>
                <span className="font-medium">Performance Optimization:</span>{" "}
                Improved page performance through lazy loading, code splitting, and caching strategies
              </li>
              <li>
                <span className="font-medium">CI/CD & DevOps Collaboration:</span>{" "}
                Supported deployment pipelines using GitHub Actions and worked with backend/devops for staging & production rollouts
              </li>
            </ul>

            <h4 className="text-md font-semibold text-gray-800 mt-4 mb-2">
              Key Products Developed:
            </h4>

            <div className="space-y-4 pl-5">
            <div>
              <h5 className="font-semibold text-gray-800">
                WizzGift (
                <a
                  href="https://wizzgift.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  wizzgift.com
                </a>
                )
              </h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Designed and implemented a modern, responsive frontend for the WizzGift gift card marketplace using react.js and Tailwind CSS
                </li>
                <li>
                  Built reusable UI components and maintained consistent styling across the platform
                </li>
                <li>
                  Collaborated with the backend team to integrate RESTful APIs for product listings, order processing, and payment handling
                </li>
                <li>
                  Developed and optimized admin dashboard views for inventory management, analytics, and order tracking
                </li>
                <li>
                  Ensured accessibility, SEO optimization, and cross-device compatibility
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-800">
                b2b.wizzgift (B2B Platform) (
                <a
                  href="https://business.wizzgift.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  dashboard.wizzgift.com
                </a>
                )
              </h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Led the design and frontend development of WizzGift's B2B dashboard using React.js, Tailwind CSS, and TypeScript
                </li>
                <li>
                  Designed the complete UI/UX flow from wireframing to high-fidelity components, focusing on usability and business utility
                </li>
                <li>
                  Built modular and responsive components to manage client orders, invoices, product listings, and reporting dashboards
                </li>
                <li>
                  Integrated charts, filters, pagination, and export options to support real-time data insights for business users
                </li>
                <li>
                  Ensured performance, accessibility (WCAG compliance), and responsive behavior across desktop and tablet devices
                </li>
              </ul>
            </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-800">
                College projects 
              </h3> 
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Appointium</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Built an online doctor appointment system with real-time slot booking and patient profiles
                </li>
                <li>
                  Developed the entire frontend using React, Tailwind CSS, and custom hooks for form validation
                </li>
                <li>
                  Integrated calendar views, time slot filters, and appointment reminders via email
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">ReRead</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Developed a full-featured secondhand book marketplace frontend using React and Firebase
                </li>
                <li>
                  Implemented product listings, dynamic search with filters, and user messaging
                </li>
                <li>
                  Designed the UI for a seamless mobile and desktop experience, including dark mode support
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">Recruiters</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Built a recruitment platform for streamlining job posting and candidate management workflows
                </li>
                <li>
                  Designed intuitive UI for job creation, application tracking, and role-based access control
                </li>
                <li>
                  Integrated charts and metrics dashboards for HR teams to monitor hiring efficiency
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            EDUCATION
          </h2>
          <h3 className="text-lg font-semibold text-gray-800">
            Bachelor of Engineering in Computer Engineering (2019-2025)
          </h3>
          <p className="text-gray-700">
            Gandaki College Of Engineering and Science | Pokhara, Nepal
          </p>
        </section>

        {/* Additional Information Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            ADDITIONAL INFORMATION
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              <span className="font-medium">
                Communication & Collaboration:
              </span>{" "}
              Strong verbal and written communication skills, collaborative team
              player with experience working in diverse, cross-functional teams
            </li>
            <li>
              <span className="font-medium">Continuous Learning:</span> Actively
              engaged in staying up-to-date with emerging technologies, best
              practices, and industry trends through online courses and
              technical blogs
            </li>
          </ul>
        </section>
      </div>
      <PrintButton />
    </main>
  );
}
