import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Code, 
  LayersIcon, 
  Cloud, 
  Bot, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  Github,
  Linkedin,
  Radio,
  Settings,
  ExternalLink,
  Calendar,
  Building,
  Award
} from "lucide-react";
import { SiAngular, SiDotnet, SiAmazonaws, SiMicrosoft, SiTypescript } from "react-icons/si";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const downloadResume = () => {
    // For GitHub Pages, you'll need to put the resume in the public folder
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prasad_Rane_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollY = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-github-dark/95 backdrop-blur-sm border-b border-github-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-github-accent">
              Prasad Rane
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`transition-colors duration-300 ${
                    activeSection === id 
                      ? 'text-github-text' 
                      : 'text-github-text-secondary hover:text-github-text'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-github-dark via-github-surface to-github-elevated"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(88,166,255,0.1),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-github-accent to-purple-accent mx-auto mb-8 flex items-center justify-center animate-float">
              <User className="text-4xl text-white" size={64} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-github-text">Prasad Sudhir</span>
              <span className="text-github-accent"> Rane</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-github-text-secondary mb-8">
              Software Engineer & AI Enthusiast
            </h2>
            
            <p className="text-lg text-github-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
              Experienced Software Engineer with 10+ years building scalable web applications using .NET, Angular, AWS, and CI/CD. 
              Now exploring AI for enhanced development solutions and creating innovative user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-github-accent hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                onClick={downloadResume}
                className="border-github-border hover:border-github-accent text-github-text-secondary hover:text-github-accent px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-12">
              <a href="https://linkedin.com/in/Prasad-Sudhir-Rane" target="_blank" rel="noopener noreferrer" className="text-github-text-muted hover:text-github-accent transition-colors duration-300 text-2xl">
                <Linkedin size={32} />
              </a>
              <a href="https://github.com/prasadrane" target="_blank" rel="noopener noreferrer" className="text-github-text-muted hover:text-github-accent transition-colors duration-300 text-2xl">
                <Github size={32} />
              </a>
              <a href="mailto:emailprasadrane@gmail.com" className="text-github-text-muted hover:text-github-accent transition-colors duration-300 text-2xl">
                <Mail size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-github-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text mb-4">About Me</h2>
            <div className="w-20 h-1 bg-github-accent mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-semibold text-github-text mb-6">Professional Journey</h3>
              <p className="text-github-text-secondary leading-relaxed mb-6">
                With over a decade of experience in software engineering, I specialize in building scalable web applications 
                using modern technologies. My expertise spans across backend API development, cloud infrastructure, and 
                front-end frameworks, with recent focus on AI-powered solutions.
              </p>
              <p className="text-github-text-secondary leading-relaxed mb-6">
                I've successfully led design discussions, mentored junior engineers, and delivered enterprise-level 
                applications at companies like Rocket Mortgage and London Computer Systems. My passion for innovation 
                drives me to explore AI tools for enhanced development workflows.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-github-elevated rounded-lg">
                  <div className="text-3xl font-bold text-github-accent">10+</div>
                  <div className="text-github-text-muted">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-github-elevated rounded-lg">
                  <div className="text-3xl font-bold text-github-accent">70%</div>
                  <div className="text-github-text-muted">UI Test Automation</div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-right">
              <div className="bg-github-elevated rounded-xl p-8">
                <h3 className="text-xl font-semibold text-github-text mb-6">Education & Background</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-github-accent pl-6">
                    <h4 className="font-semibold text-github-text">M.S. in Information Systems</h4>
                    <p className="text-github-text-secondary">University of Cincinnati</p>
                    <p className="text-github-text-muted">GPA: 3.8 | Dec 2019</p>
                  </div>
                  <div className="border-l-4 border-purple-accent pl-6">
                    <h4 className="font-semibold text-github-text">B.E. in Electronics & Telecommunication</h4>
                    <p className="text-github-text-secondary">University of Pune</p>
                    <p className="text-github-text-muted">May 2013</p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-github-accent/10 to-purple-accent/10 rounded-lg border border-github-accent/20">
                  <h4 className="font-semibold text-github-accent mb-2">AI Tools Expertise</h4>
                  <p className="text-github-text-secondary text-sm">GitHub Copilot, Claude Code, Amazon Bedrock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-github-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-github-accent mx-auto mb-6"></div>
            <p className="text-github-text-secondary max-w-2xl mx-auto">
              Comprehensive expertise across modern web development technologies, cloud platforms, and emerging AI tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-github-surface rounded-xl p-6 hover:bg-github-elevated transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl text-github-accent mb-4">
                <Code size={48} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-4">Languages</h3>
              <div className="space-y-2">
                {['C#', 'TypeScript', 'SQL', 'LINQ', 'GraphQL', 'SCSS'].map((skill) => (
                  <span key={skill} className="inline-block bg-github-elevated px-3 py-1 rounded-full text-sm text-github-text-secondary mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-github-surface rounded-xl p-6 hover:bg-github-elevated transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl text-purple-accent mb-4">
                <LayersIcon size={48} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-4">Frameworks</h3>
              <div className="space-y-2">
                {['ASP.NET Web API', 'Angular 12', 'NgRx', 'RxJS', 'SignalR'].map((skill) => (
                  <span key={skill} className="inline-block bg-github-elevated px-3 py-1 rounded-full text-sm text-github-text-secondary mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-github-surface rounded-xl p-6 hover:bg-github-elevated transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl text-success mb-4">
                <Cloud size={48} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-4">Cloud & DevOps</h3>
              <div className="space-y-2">
                {['AWS Lambda', 'SQS', 'Terraform', 'CircleCI', 'GitHub Workflows'].map((skill) => (
                  <span key={skill} className="inline-block bg-github-elevated px-3 py-1 rounded-full text-sm text-github-text-secondary mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 hover:from-github-elevated hover:to-github-surface transition-all duration-300 transform hover:scale-105 border border-github-accent/20">
              <div className="text-3xl text-github-accent mb-4">
                <Bot size={48} />
              </div>
              <h3 className="text-xl font-semibold text-github-text mb-4">AI Tools</h3>
              <div className="space-y-2">
                {['GitHub Copilot', 'Claude Code', 'Amazon Bedrock'].map((skill) => (
                  <span key={skill} className="inline-block bg-github-accent/20 px-3 py-1 rounded-full text-sm text-github-accent border border-github-accent/30 mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-github-text text-center mb-8">Development Tools & Technologies</h3>
            <div className="bg-github-surface rounded-xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-github-accent mb-4">IDEs & Editors</h4>
                  <ul className="space-y-2 text-github-text-secondary">
                    <li>Visual Studio</li>
                    <li>VS Code</li>
                    <li>JetBrains Rider</li>
                    <li>MySQL Workbench</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-github-accent mb-4">Tools & Services</h4>
                  <ul className="space-y-2 text-github-text-secondary">
                    <li>ServiceNow</li>
                    <li>JIRA</li>
                    <li>Jenkins</li>
                    <li>Postman & Insomnia</li>
                    <li>Splunk & Dynatrace</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-github-accent mb-4">Monitoring & Support</h4>
                  <ul className="space-y-2 text-github-text-secondary">
                    <li>Fiddler</li>
                    <li>Pager Duty</li>
                    <li>Application Performance Monitoring</li>
                    <li>Log Analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-github-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text mb-4">Professional Experience</h2>
            <div className="w-20 h-1 bg-github-accent mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-github-border h-full hidden lg:block"></div>
            
            <div className="space-y-12">
              {/* Rocket Mortgage */}
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:text-right">
                  <div className="bg-github-elevated rounded-xl p-8 lg:mr-8">
                    <div className="flex items-center mb-4 lg:justify-end">
                      <Building className="text-github-accent mr-3" size={24} />
                      <h3 className="text-xl font-semibold text-github-text">Rocket Mortgage</h3>
                    </div>
                    <h4 className="text-lg font-medium text-github-accent mb-2">Software Engineer</h4>
                    <div className="flex items-center text-github-text-muted mb-4 lg:justify-end">
                      <Calendar size={16} className="mr-2" />
                      <span>Jan 2023 – Present</span>
                      <MapPin size={16} className="ml-4 mr-2" />
                      <span>Remote, IL</span>
                    </div>
                    <ul className="space-y-3 text-github-text-secondary text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Engineered an AI-powered loan information chatbot using Amazon Bedrock (Claude Sonnet) and AWS Lambda
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Built internal and client-facing mortgage servicing apps using .NET APIs, AWS Lambda, SQS, and Angular
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Led design discussions, documented architectural decisions, and mentored junior engineers
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Leveraged AI tools (GitHub Copilot, Claude Code) to accelerate development workflows
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 bg-github-accent rounded-full border-4 border-github-dark"></div>
                </div>
                <div className="lg:col-start-2"></div>
              </div>

              {/* London Computer Systems */}
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:col-start-1"></div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-accent rounded-full border-4 border-github-dark"></div>
                </div>
                <div>
                  <div className="bg-github-elevated rounded-xl p-8 lg:ml-8">
                    <div className="flex items-center mb-4">
                      <Building className="text-purple-accent mr-3" size={24} />
                      <h3 className="text-xl font-semibold text-github-text">London Computer Systems</h3>
                    </div>
                    <h4 className="text-lg font-medium text-purple-accent mb-2">Software Developer</h4>
                    <div className="flex items-center text-github-text-muted mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>Dec 2019 – Jan 2023</span>
                      <MapPin size={16} className="ml-4 mr-2" />
                      <span>Cincinnati, OH</span>
                    </div>
                    <ul className="space-y-3 text-github-text-secondary text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Developed a reusable SignalR framework for real-time features like status updates and notifications
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Designed end-to-end application features including database design and Angular client-server communication
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Implemented NgRx state management for complex application workflows
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Collaborated with cross-functional teams and guided junior developers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* EXFO */}
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:text-right">
                  <div className="bg-github-elevated rounded-xl p-8 lg:mr-8">
                    <div className="flex items-center mb-4 lg:justify-end">
                      <Building className="text-github-accent mr-3" size={24} />
                      <h3 className="text-xl font-semibold text-github-text">EXFO Electro Optical Engineering</h3>
                    </div>
                    <h4 className="text-lg font-medium text-github-accent mb-2">Software Developer</h4>
                    <div className="flex items-center text-github-text-muted mb-4 lg:justify-end">
                      <Calendar size={16} className="mr-2" />
                      <span>Mar 2015 – Jun 2018</span>
                      <MapPin size={16} className="ml-4 mr-2" />
                      <span>Pune, India</span>
                    </div>
                    <ul className="space-y-3 text-github-text-secondary text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Developed MVC-based Web APIs using Test-Driven Development (TDD)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Automated 70% of UI tests by creating a custom Test Complete framework
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Contributed to CI/CD pipelines using Jenkins for automated testing and deployment
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 bg-github-accent rounded-full border-4 border-github-dark"></div>
                </div>
                <div className="lg:col-start-2"></div>
              </div>

              {/* Tanish Infotech */}
              <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:col-start-1"></div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-accent rounded-full border-4 border-github-dark"></div>
                </div>
                <div>
                  <div className="bg-github-elevated rounded-xl p-8 lg:ml-8">
                    <div className="flex items-center mb-4">
                      <Building className="text-purple-accent mr-3" size={24} />
                      <h3 className="text-xl font-semibold text-github-text">Tanish Infotech Solutions</h3>
                    </div>
                    <h4 className="text-lg font-medium text-purple-accent mb-2">Trainee Software Developer</h4>
                    <div className="flex items-center text-github-text-muted mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>Mar 2014 – Feb 2015</span>
                      <MapPin size={16} className="ml-4 mr-2" />
                      <span>Pune, India</span>
                    </div>
                    <ul className="space-y-3 text-github-text-secondary text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Built web and desktop applications on .NET framework
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 flex-shrink-0" size={16} />
                        Documented requirements through direct client engagement and analysis
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-github-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text mb-4">Key Projects & Achievements</h2>
            <div className="w-20 h-1 bg-github-accent mx-auto mb-6"></div>
            <p className="text-github-text-secondary max-w-2xl mx-auto">
              Highlighting significant projects and technical achievements throughout my career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Chatbot Project */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-github-accent/20 hover:border-github-accent/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Bot className="text-github-accent mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">AI-Powered Loan Chatbot</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-github-accent/20 text-github-accent px-3 py-1 rounded-full text-sm border border-github-accent/30">
                  Amazon Bedrock
                </span>
                <span className="inline-block bg-github-accent/20 text-github-accent px-3 py-1 rounded-full text-sm border border-github-accent/30 ml-2">
                  AWS Lambda
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Engineered an intelligent chatbot using Claude Sonnet to process natural language queries about loan information, 
                significantly reducing manual lookup time for customer service teams.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>Production deployment at Rocket Mortgage</span>
              </div>
            </div>

            {/* SignalR Framework */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Radio className="text-purple-accent mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">Real-time SignalR Framework</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-purple-accent/20 text-purple-accent px-3 py-1 rounded-full text-sm border border-purple-accent/30">
                  SignalR
                </span>
                <span className="inline-block bg-purple-accent/20 text-purple-accent px-3 py-1 rounded-full text-sm border border-purple-accent/30 ml-2">
                  Angular
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Developed a reusable real-time communication framework now widely used across the organization for 
                status updates, notifications, and user activity tracking.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>Company-wide adoption at LCS</span>
              </div>
            </div>

            {/* Test Automation */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-success/20 hover:border-success/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Settings className="text-success mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">UI Test Automation</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-sm border border-success/30">
                  Test Complete
                </span>
                <span className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-sm border border-success/30 ml-2">
                  TDD
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Created custom automation framework that automated 70% of UI testing processes, 
                significantly reducing manual testing effort and improving release cycles.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>70% automation achievement</span>
              </div>
            </div>

            {/* Infrastructure as Code */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-github-accent/20 hover:border-github-accent/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Cloud className="text-github-accent mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">Cloud Infrastructure</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-github-accent/20 text-github-accent px-3 py-1 rounded-full text-sm border border-github-accent/30">
                  Terraform
                </span>
                <span className="inline-block bg-github-accent/20 text-github-accent px-3 py-1 rounded-full text-sm border border-github-accent/30 ml-2">
                  AWS
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Managed cloud infrastructure using Infrastructure as Code principles with Terraform, 
                ensuring scalable and maintainable AWS deployments for mortgage servicing applications.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>Enterprise-scale deployment</span>
              </div>
            </div>

            {/* Angular & NgRx */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <SiAngular className="text-purple-accent mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">State Management Solutions</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-purple-accent/20 text-purple-accent px-3 py-1 rounded-full text-sm border border-purple-accent/30">
                  NgRx
                </span>
                <span className="inline-block bg-purple-accent/20 text-purple-accent px-3 py-1 rounded-full text-sm border border-purple-accent/30 ml-2">
                  RxJS
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Implemented complex state management solutions using NgRx for enterprise Angular applications, 
                ensuring predictable state flow and enhanced user experience.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>Client-facing applications</span>
              </div>
            </div>

            {/* CI/CD Pipeline */}
            <div className="bg-gradient-to-br from-github-surface to-github-elevated rounded-xl p-6 border border-success/20 hover:border-success/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Github className="text-success mr-3" size={32} />
                <h3 className="text-xl font-semibold text-github-text">CI/CD Implementation</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-sm border border-success/30">
                  CircleCI
                </span>
                <span className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-sm border border-success/30 ml-2">
                  GitHub Actions
                </span>
              </div>
              <p className="text-github-text-secondary text-sm mb-4">
                Established robust CI/CD pipelines using CircleCI and GitHub Workflows, 
                enabling automated testing, building, and deployment processes.
              </p>
              <div className="flex items-center text-github-text-muted text-sm">
                <Award size={16} className="mr-2" />
                <span>Automated deployment pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-github-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-github-text mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-github-accent mx-auto mb-6"></div>
            <p className="text-github-text-secondary max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities, innovative projects, and technology collaborations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-github-text mb-6">Let's Connect</h3>
                  <p className="text-github-text-secondary leading-relaxed mb-8">
                    Whether you're looking for a skilled software engineer, want to discuss AI in development, 
                    or simply want to connect with a fellow technologist, I'd love to hear from you.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="text-github-accent mr-4" size={24} />
                    <div>
                      <h4 className="font-medium text-github-text">Email</h4>
                      <a href="mailto:emailprasadrane@gmail.com" className="text-github-text-secondary hover:text-github-accent transition-colors">
                        emailprasadrane@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="text-github-accent mr-4" size={24} />
                    <div>
                      <h4 className="font-medium text-github-text">Phone</h4>
                      <a href="tel:513-967-9423" className="text-github-text-secondary hover:text-github-accent transition-colors">
                        513-967-9423
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Linkedin className="text-github-accent mr-4" size={24} />
                    <div>
                      <h4 className="font-medium text-github-text">LinkedIn</h4>
                      <a href="https://linkedin.com/in/Prasad-Sudhir-Rane" target="_blank" rel="noopener noreferrer" className="text-github-text-secondary hover:text-github-accent transition-colors">
                        linkedin.com/in/Prasad-Sudhir-Rane
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h4 className="font-medium text-github-text mb-4">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'AI/ML Integration',
                      'Cloud Architecture', 
                      'Full-Stack Development',
                      'DevOps & CI/CD',
                      'Mentoring',
                      'Technical Leadership'
                    ].map((interest) => (
                      <span key={interest} className="bg-github-elevated px-3 py-1 rounded-full text-sm text-github-text-secondary border border-github-border">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Professional Availability */}
              <div className="bg-github-elevated rounded-xl p-8">
                <h3 className="text-xl font-semibold text-github-text mb-6">Professional Status</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-github-accent/10 rounded-lg border border-github-accent/20">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-github-accent mr-2" size={20} />
                      <h4 className="font-medium text-github-accent">Currently Employed</h4>
                    </div>
                    <p className="text-github-text-secondary text-sm">
                      Software Engineer at Rocket Mortgage
                    </p>
                  </div>
                  
                  <div className="p-4 bg-github-surface rounded-lg border border-github-border">
                    <div className="flex items-center mb-2">
                      <ExternalLink className="text-purple-accent mr-2" size={20} />
                      <h4 className="font-medium text-github-text">Open to Opportunities</h4>
                    </div>
                    <p className="text-github-text-secondary text-sm">
                      Interested in discussing new challenges and career opportunities
                    </p>
                  </div>
                  
                  <div className="p-4 bg-github-surface rounded-lg border border-github-border">
                    <div className="flex items-center mb-2">
                      <Bot className="text-success mr-2" size={20} />
                      <h4 className="font-medium text-github-text">AI Collaboration</h4>
                    </div>
                    <p className="text-github-text-secondary text-sm">
                      Always excited to discuss AI applications in software development
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-github-border">
                  <h4 className="font-medium text-github-text mb-4">Response Time</h4>
                  <p className="text-github-text-secondary text-sm">
                    I typically respond to professional inquiries within 24-48 hours. 
                    For urgent matters, please indicate in your message subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-github-dark border-t border-github-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-github-accent mb-4">Prasad Rane</div>
            <p className="text-github-text-secondary mb-6">
              Software Engineer • AI Enthusiast • Technology Leader
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <a href="https://linkedin.com/in/Prasad-Sudhir-Rane" target="_blank" rel="noopener noreferrer" className="text-github-text-muted hover:text-github-accent transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/prasadrane" target="_blank" rel="noopener noreferrer" className="text-github-text-muted hover:text-github-accent transition-colors duration-300">
                <Github size={24} />
              </a>
              <a href="mailto:emailprasadrane@gmail.com" className="text-github-text-muted hover:text-github-accent transition-colors duration-300">
                <Mail size={24} />
              </a>
            </div>
            <div className="text-github-text-muted text-sm">
              © 2025 Prasad Rane. Built with React & hosted on GitHub Pages.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}