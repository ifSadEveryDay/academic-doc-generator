import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, CardBody, Divider, ScrollShadow, Spacer, Select, SelectItem, Tabs, Tab } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateRandomData } from './utils/dataGenerator';

// Import default student photos
import img1 from './assets/images/img1.png';
import img2 from './assets/images/img2.png';
import img3 from './assets/images/img3.png';
import img4 from './assets/images/img4.png';
import img5 from './assets/images/img5.png';
import img6 from './assets/images/img6.png';
import img7 from './assets/images/img7.png';
import img8 from './assets/images/img8.png';

import TuitionTemplate from './components/TuitionTemplate';
import TranscriptTemplate from './components/TranscriptTemplate';
import ScheduleTemplate from './components/ScheduleTemplate';
import AdmissionLetterTemplate from './components/AdmissionLetterTemplate';
import EnrollmentCertificateTemplate from './components/EnrollmentCertificateTemplate';
import StudentCardFrontTemplate from './components/StudentCardFrontTemplate';
import StudentCardBackTemplate from './components/StudentCardBackTemplate';
import TeacherCardFrontTemplate from './components/TeacherCardFrontTemplate';
import TeacherCardBackTemplate from './components/TeacherCardBackTemplate';
import TeacherOfficialLetterTemplate from './components/TeacherOfficialLetterTemplate';
import TeacherPayrollTemplate from './components/TeacherPayrollTemplate';

// Default student photos array
const defaultPhotos = [
  { id: 1, src: img1, name: 'Student 1' },
  { id: 2, src: img2, name: 'Student 2' },
  { id: 3, src: img3, name: 'Student 3' },
  { id: 4, src: img4, name: 'Student 4' },
  { id: 5, src: img5, name: 'Student 5' },
  { id: 6, src: img6, name: 'Student 6' },
  { id: 7, src: img7, name: 'Student 7' },
  { id: 8, src: img8, name: 'Student 8' }
];

const App = () => {
  const [formData, setFormData] = useState(generateRandomData());

  const [exportMode, setExportMode] = useState("stitched-horizontal"); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(0.55); 
  const [activeCanvas, setActiveCanvas] = useState("main"); // "main" or "extra"
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      // Auto-collapse sidebar on mobile
      if (isMobileDevice) {
        setSidebarCollapsed(true);
        // Set smaller scale for mobile
        setScale(0.3);
      } else {
        // Reset to desktop scale
        setScale(0.55);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tuitionRef = useRef(null);
  const transcriptRef = useRef(null);
  const scheduleRef = useRef(null);
  const admissionRef = useRef(null);
  const enrollmentRef = useRef(null);
  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData(prev => ({ ...prev, universityLogo: event.target.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData(prev => ({ ...prev, studentPhoto: event.target.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleDefaultPhotoSelect = (photoSrc) => {
    setFormData(prev => ({ ...prev, studentPhoto: photoSrc }));
  };

  const regenerateData = () => {
    setFormData(prev => ({
        ...generateRandomData(),
        universityName: prev.universityName,
        universityLogo: prev.universityLogo
        // Remove studentPhoto and teacherPhoto preservation to allow random switching
    }));
  };

  const exportStitched = async (forceHorizontal = false) => {
    if (!containerRef.current) return;
    setIsGenerating(true);
    
    // Add exporting class to reset transforms
    containerRef.current.classList.add('exporting');
    
    const originalStyle = containerRef.current.style.cssText;

    try {
      // Temporarily enforce styles if horizontal mode
      if (forceHorizontal) {
        containerRef.current.style.cssText = `
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0;
          width: max-content;
          justify-content: flex-start;
          align-items: flex-start;
          position: relative;
          background-color: #ffffff;
        `;
      } else {
        // For grid export, ensuring it captures everything by fitting content
        containerRef.current.style.width = "max-content";
        containerRef.current.style.height = "max-content";
        containerRef.current.style.position = "relative";
        containerRef.current.style.backgroundColor = "#ffffff";
      }

      // Small delay to allow style reflow
      await new Promise(resolve => setTimeout(resolve, 300)); // Increased delay slightly

      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: '#ffffff', 
        scale: 2,
        useCORS: true,
        ignoreElements: (element) => element.classList.contains('doc-label'), 
        logging: false,
        // Force no background transparency
        onclone: (document) => {
            const element = document.querySelector('.exporting');
            if (element) {
                element.style.backgroundColor = '#ffffff';
                element.style.backgroundImage = 'none';
                element.style.boxShadow = 'none';
                element.style.backdropFilter = 'none'; // CRITICAL: Remove any frost effect
            }
            // Also ensure all document cards have solid backgrounds
            const cards = document.querySelectorAll('.document-card > div'); // The inner div with shadow
            cards.forEach(card => {
                card.style.boxShadow = 'none';
                card.style.backgroundColor = '#ffffff';
            });
        }
      });
      
      canvas.toBlob((blob) => {
        saveAs(blob, "SheerID_Documents_Combined.png");
        setIsGenerating(false);
        
        // Restore styles and remove class
        containerRef.current.classList.remove('exporting');
        containerRef.current.style.cssText = originalStyle;
      });
    } catch (err) {
      console.error(err);
      alert("Export failed");
      setIsGenerating(false);
      containerRef.current.classList.remove('exporting');
      containerRef.current.style.cssText = originalStyle;
    }
  };

  const exportZipped = async () => {
    setIsGenerating(true);
    try {
      const zip = new JSZip();
      
      const capture = async (ref, name) => {
        if (!ref.current) return;
        const canvas = await html2canvas(ref.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true
        });
        return { name, data: canvas.toDataURL('image/png').split(',')[1] };
      };

      const images = await Promise.all([
        capture(hiddenTuitionRef, "Tuition_Statement.png"),
        capture(hiddenTranscriptRef, "Transcript.png"),
        capture(hiddenScheduleRef, "Schedule.png")
      ]);

      images.forEach(img => {
        if(img) zip.file(img.name, img.data, {base64: true});
      });

      const content = await zip.generateAsync({type:"blob"});
      saveAs(content, "SheerID_Documents.zip");
      setIsGenerating(false);

    } catch (err) {
      console.error(err);
      alert("Export failed");
      setIsGenerating(false);
    }
  };

  // Hidden refs for export (Always mounted, off-screen)
  // Using a separate set of refs for export ensures that canvas scaling/drag transforms
  // do not affect the generated images.
  const hiddenTuitionRef = useRef(null);
  const hiddenTranscriptRef = useRef(null);
  const hiddenScheduleRef = useRef(null);
  const hiddenAdmissionRef = useRef(null);
  const hiddenEnrollmentRef = useRef(null);
  const hiddenCardFrontRef = useRef(null);
  const hiddenCardBackRef = useRef(null);
  const cardFrontRef = useRef(null);
  const cardBackRef = useRef(null);
  const hiddenTeacherCardFrontRef = useRef(null);
  const hiddenTeacherCardBackRef = useRef(null);
  const teacherCardFrontRef = useRef(null);
  const teacherCardBackRef = useRef(null);
  const hiddenTeacherLetterRef = useRef(null);
  const teacherLetterRef = useRef(null);
  const hiddenTeacherPayrollRef = useRef(null);
  const teacherPayrollRef = useRef(null);

  const exportSingle = async (ref, filename) => {
    if (!ref.current) return;
    setIsGenerating(true);
    try {
        const canvas = await html2canvas(ref.current, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher res
            useCORS: true,
            logging: false
        });
        canvas.toBlob((blob) => {
            saveAs(blob, filename);
            setIsGenerating(false);
        });
    } catch (err) {
        console.error(err);
        alert("Export failed");
        setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (exportMode === "stitched") {
      exportStitched(false); 
    } else if (exportMode === "stitched-horizontal") {
      exportStitched(true);
    } else {
      exportZipped();
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.2));

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(prev => Math.max(0.2, Math.min(2, prev + delta)));
  };

  const handlePanStart = (e) => {
    if (e.target.closest('.document-card')) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handlePanMove = (e) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStartRef.current.x,
      y: e.clientY - panStartRef.current.y
    });
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (e.target.closest('.document-card')) return;
    const touch = e.touches[0];
    setIsPanning(true);
    panStartRef.current = { x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y };
  };

  const handleTouchMove = (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const touch = e.touches[0];
    setPanOffset({
      x: touch.clientX - panStartRef.current.x,
      y: touch.clientY - panStartRef.current.y
    });
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      // Hide success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Generate random teacher name
  const generateRandomTeacherName = () => {
    const firstNames = [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
      'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
      'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
      'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
      'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle'
    ];
    
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
      'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
      'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
      'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    setFormData(prev => ({ ...prev, teacherName: `${firstName} ${lastName}` }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar Controls */}
      <div className={`
        ${sidebarCollapsed ? (isMobile ? 'w-0' : 'w-16') : (isMobile ? 'w-full' : 'w-80')} 
        ${isMobile && sidebarCollapsed ? 'hidden' : 'flex-shrink-0'} 
        ${isMobile && !sidebarCollapsed ? 'fixed inset-0 z-50' : 'relative z-20'} 
        border-r border-divider bg-content1 flex flex-col transition-all duration-300
        ${isMobile && !sidebarCollapsed ? 'h-screen' : ''}
      `}>
        {sidebarCollapsed ? (
          /* Collapsed Sidebar - Gear Icon */
          <div className="flex flex-col items-center justify-start p-4">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              className="w-10 h-10"
              onClick={() => setSidebarCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
          </div>
        ) : (
          /* Expanded Sidebar */
          <>
            {/* Sticky Header with Button */}
            <div className={`sticky top-0 bg-content1 z-50 p-6 pb-4 border-b border-divider ${isMobile ? 'flex-shrink-0' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-primary`}>
                  Input Information
                </h2>
                <Button
                  isIconOnly
                  color="default"
                  variant="light"
                  size={isMobile ? "md" : "sm"}
                  onClick={() => setSidebarCollapsed(true)}
                  aria-label="Collapse sidebar"
                >
                  {isMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  )}
                </Button>
              </div>
              <Button 
                color="secondary" 
                variant="flat"
                className="w-full"
                onClick={regenerateData}
              >
                Regenerate Random Data
              </Button>
            </div>
            
            {/* Scrollable Content */}
            <ScrollShadow 
              className="flex-1 p-6 pt-4" 
              style={isMobile ? { 
                height: 'calc(100vh - 140px)', // Subtract header height
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch' // Enable smooth scrolling on iOS
              } : {}}
            >
          
          <div className="flex flex-col gap-6">
            <Select 
              label="University Name" 
              name="universityName" 
              selectedKeys={[formData.universityName]} 
              onChange={(e) => setFormData(prev => ({ ...prev, universityName: e.target.value }))}
              variant="bordered"
              labelPlacement="outside"
            >
              <SelectItem key="Northwest Florida State College" value="Northwest Florida State College">Northwest Florida State College</SelectItem>
              <SelectItem key="Arkansas Tech University" value="Arkansas Tech University">Arkansas Tech University</SelectItem>
              <SelectItem key="Auburn University at Montgomery" value="Auburn University at Montgomery">Auburn University at Montgomery</SelectItem>
              <SelectItem key="Hudson County Community College" value="Hudson County Community College">Hudson County Community College</SelectItem>
            </Select>
            <Input label="University Address" name="universityAddress" value={formData.universityAddress} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter university address" />
            
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">University Logo (Optional)</label>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100
                      cursor-pointer
                    "
                />
            </div>

            <div className="relative">
              <Input 
                label="Student Name" 
                name="studentName" 
                value={formData.studentName} 
                onChange={handleInputChange} 
                variant="bordered" 
                labelPlacement="outside" 
                placeholder="Enter student name"
                endContent={
                  <div className="flex items-center gap-2">
                    {copySuccess && (
                      <span className="text-success text-xs font-medium animate-pulse">
                        Copied!
                      </span>
                    )}
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className={`${copySuccess ? 'text-success' : 'text-default-400 hover:text-default-600'} transition-colors`}
                      onClick={() => copyToClipboard(formData.studentName)}
                      aria-label="Copy student name"
                    >
                      {copySuccess ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.375A2.25 2.25 0 014.125 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      )}
                    </Button>
                  </div>
                }
              />
            </div>
            <Input label="Student ID" name="studentID" value={formData.studentID} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter student ID" />
            <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter address" />
            <Input label="Term" name="term" value={formData.term} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter term" />
            <Input label="Major" name="major" value={formData.major} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter major" />
            <Input label="Program" name="program" value={formData.program} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter program" />
            <Input label="College" name="college" value={formData.college} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter college" />
            
            <Divider className="my-2" />
            <h3 className="text-xl font-semibold">Dates</h3>
            
            <Input label="Statement Date" name="statementDate" value={formData.statementDate} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="MM/DD/YYYY" />
            <Input label="Due Date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="MM/DD/YYYY" />
            <Input label="Issue Date" name="issueDate" value={formData.issueDate} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="MM/DD/YYYY" />
            
            <Divider className="my-2" />
            
            <Select 
              label="Export Format" 
              selectedKeys={[exportMode]} 
              onChange={(e) => setExportMode(e.target.value)}
              variant="bordered"
              labelPlacement="outside"
            >
              <SelectItem key="stitched" value="stitched">One Stitched Image (Grid)</SelectItem>
              <SelectItem key="stitched-horizontal" value="stitched-horizontal">One Stitched Image (Horizontal Row)</SelectItem>
              <SelectItem key="zipped" value="zipped">Three Separate Images (Zip)</SelectItem>
            </Select>

            <Button 
              color="primary" 
              className="w-full font-bold text-lg mt-4" 
              size="lg"
              onClick={handleExport}
              isLoading={isGenerating}
            >
              {isGenerating ? "Generating..." : "Download"}
            </Button>

            <Divider className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Individual Downloads</h3>
            <div className="flex flex-col gap-3">
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTuitionRef, "Tuition_Statement.png")}
                    isLoading={isGenerating}
                >
                    Download Tuition Statement
                </Button>
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTranscriptRef, "Transcript.png")}
                    isLoading={isGenerating}
                >
                    Download Transcript
                </Button>
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenScheduleRef, "Schedule.png")}
                    isLoading={isGenerating}
                >
                    Download Course Schedule
                </Button>
            </div>

            <Divider className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Extra Documents</h3>
            <div className="flex flex-col gap-3">
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenAdmissionRef, "Admission_Letter.png")}
                    isLoading={isGenerating}
                >
                    Download Admission Letter
                </Button>
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenEnrollmentRef, "Enrollment_Certificate.png")}
                    isLoading={isGenerating}
                >
                    Download Enrollment Cert
                </Button>
            </div>

            <Divider className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Student ID Card</h3>
            
            {/* Card Color Configuration */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Card Header Color</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="color" 
                        name="cardColor"
                        value={formData.cardColor || '#3e80cc'} 
                        onChange={handleInputChange}
                        className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                        title="Choose card header color"
                    />
                    <Input 
                        name="cardColor"
                        value={formData.cardColor || '#3e80cc'} 
                        onChange={handleInputChange}
                        variant="bordered" 
                        placeholder="#3e80cc"
                        className="flex-1"
                        size="sm"
                    />
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Student Photo</label>
                
                {/* Default Photos Selector */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-3">Choose from default photos:</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {defaultPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                                    formData.studentPhoto === photo.src 
                                        ? 'border-primary ring-2 ring-primary/20' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handleDefaultPhotoSelect(photo.src)}
                            >
                                <img 
                                    src={photo.src} 
                                    alt={photo.name}
                                    className="w-full h-16 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Photo Upload */}
                <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-2">Or upload your own:</p>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-violet-700
                          hover:file:bg-violet-100
                          cursor-pointer
                        "
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenCardFrontRef, "Student_ID_Front.png")}
                    isLoading={isGenerating}
                >
                    Download ID Front
                </Button>
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenCardBackRef, "Student_ID_Back.png")}
                    isLoading={isGenerating}
                >
                    Download ID Back
                </Button>
            </div>

            <Divider className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Teacher Information</h3>
            <div className="flex flex-col gap-4">
                <div className="relative">
                  <Input 
                    label="Teacher Name" 
                    name="teacherName" 
                    value={formData.teacherName || ''} 
                    onChange={handleInputChange} 
                    variant="bordered" 
                    labelPlacement="outside" 
                    placeholder="Enter teacher name"
                    endContent={
                      <div className="flex items-center gap-2">
                        {copySuccess && (
                          <span className="text-success text-xs font-medium animate-pulse">
                            Copied!
                          </span>
                        )}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-default-400 hover:text-primary transition-colors"
                          onClick={generateRandomTeacherName}
                          aria-label="Generate random teacher name"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l3-3" />
                          </svg>
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className={`${copySuccess ? 'text-success' : 'text-default-400 hover:text-default-600'} transition-colors`}
                          onClick={() => copyToClipboard(formData.teacherName || '')}
                          aria-label="Copy teacher name"
                        >
                          {copySuccess ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.375A2.25 2.25 0 014.125 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                            </svg>
                          )}
                        </Button>
                      </div>
                    }
                  />
                </div>
                <Input label="Teacher ID" name="teacherID" value={formData.teacherID || ''} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter teacher ID" />
                <Input label="Department" name="department" value={formData.department || ''} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter department" />
                <Input label="Position" name="position" value={formData.position || ''} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="Enter academic position" />
                <Input label="Employment Start Date" name="employmentStartDate" value={formData.employmentStartDate || ''} onChange={handleInputChange} variant="bordered" labelPlacement="outside" placeholder="MM/DD/YYYY" />
                
                {/* Teacher Photo Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Teacher Photo</label>
                    
                    {/* Default Photos Selector */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-3">Choose from default photos:</p>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {defaultPhotos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                                        formData.teacherPhoto === photo.src 
                                            ? 'border-primary ring-2 ring-primary/20' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setFormData(prev => ({ ...prev, teacherPhoto: photo.src }))}
                                >
                                    <img 
                                        src={photo.src} 
                                        alt={photo.name}
                                        className="w-full h-16 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Photo Upload */}
                    <div className="mb-2">
                        <p className="text-sm text-gray-600 mb-2">Or upload your own:</p>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.type.startsWith('image/')) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setFormData(prev => ({ ...prev, teacherPhoto: event.target.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100
                              cursor-pointer
                            "
                        />
                    </div>
                </div>
            </div>

            <Divider className="my-4" />
            <h3 className="text-xl font-semibold mb-2">Teacher ID Card Downloads</h3>
            <div className="flex flex-col gap-3">
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTeacherCardFrontRef, "Teacher_ID_Front.png")}
                    isLoading={isGenerating}
                >
                    Download Teacher ID Front
                </Button>
                <Button 
                    color="default" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTeacherCardBackRef, "Teacher_ID_Back.png")}
                    isLoading={isGenerating}
                >
                    Download Teacher ID Back
                </Button>
                <Button 
                    color="primary" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTeacherLetterRef, "Teacher_Official_Letter.png")}
                    isLoading={isGenerating}
                >
                    Download Official Letter
                </Button>
                <Button 
                    color="primary" 
                    variant="flat" 
                    className="w-full" 
                    onClick={() => exportSingle(hiddenTeacherPayrollRef, "Teacher_Payroll_Statement.png")}
                    isLoading={isGenerating}
                >
                    Download Payroll Statement
                </Button>
            </div>
          </div>
            </ScrollShadow>
          </>
        )}
      </div>

      {/* Mobile Backdrop - Outside sidebar to prevent interference */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarCollapsed(true)}
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Mobile Floating Gear Button */}
      {isMobile && sidebarCollapsed && (
        <Button
          isIconOnly
          color="primary"
          className="fixed top-16 left-4 z-40 w-12 h-12 shadow-lg"
          onClick={() => setSidebarCollapsed(false)}
          aria-label="Open settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Button>
      )}

      {/* Hidden Export Containers - Rendered purely for capture */}
      {/* Positioned way off-screen to ensure no visual interference but valid DOM rendering */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', display: 'flex', flexDirection: 'column' }}>
          {/* Core 3 Docs */}
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <TuitionTemplate ref={hiddenTuitionRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <TranscriptTemplate ref={hiddenTranscriptRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <ScheduleTemplate ref={hiddenScheduleRef} data={formData} />
          </div>
          
          {/* Extra 2 Docs */}
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <AdmissionLetterTemplate ref={hiddenAdmissionRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <EnrollmentCertificateTemplate ref={hiddenEnrollmentRef} data={formData} />
          </div>
          
          {/* Student ID Card */}
          <div style={{ backgroundColor: 'white', width: '750px', height: '480px' }}>
            <StudentCardFrontTemplate ref={hiddenCardFrontRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '750px', height: '480px' }}>
            <StudentCardBackTemplate ref={hiddenCardBackRef} data={formData} />
          </div>
          
          {/* Teacher ID Card */}
          <div style={{ backgroundColor: 'white', width: '750px', height: '480px' }}>
            <TeacherCardFrontTemplate ref={hiddenTeacherCardFrontRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '750px', height: '480px' }}>
            <TeacherCardBackTemplate ref={hiddenTeacherCardBackRef} data={formData} />
          </div>
          
          {/* Teacher Official Letter */}
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <TeacherOfficialLetterTemplate ref={hiddenTeacherLetterRef} data={formData} />
          </div>
          <div style={{ backgroundColor: 'white', width: '800px', minHeight: '1000px' }}>
            <TeacherPayrollTemplate ref={hiddenTeacherPayrollRef} data={formData} />
          </div>
      </div>

      {/* Main Preview Area - Infinite Canvas Style */}
      <div 
        className={`flex-grow overflow-hidden bg-zinc-900 relative ${isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'} flex flex-col items-center justify-center`}
        onWheel={!isMobile ? handleWheel : undefined}
        onMouseDown={!isMobile ? handlePanStart : undefined}
        onMouseMove={!isMobile ? handlePanMove : undefined}
        onMouseUp={!isMobile ? handlePanEnd : undefined}
        onMouseLeave={!isMobile ? handlePanEnd : undefined}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        
        {/* Canvas Switcher Tabs - Floating at Top */}
        <div className={`absolute ${isMobile ? 'top-2 left-20 right-2' : 'top-6'} z-40`}>
            <Tabs 
                aria-label="Canvas Selection" 
                color="primary" 
                variant="bordered"
                selectedKey={activeCanvas}
                onSelectionChange={setActiveCanvas}
                size={isMobile ? "sm" : "md"}
                classNames={{
                    tabList: "bg-zinc-800/80 backdrop-blur-md border border-white/10 p-1 rounded-lg",
                    cursor: "bg-primary",
                    tab: `${isMobile ? 'h-8 px-3 text-xs' : 'h-10 px-6 text-sm'}`,
                    tabContent: "group-data-[selected=true]:text-white text-zinc-400 font-medium"
                }}
            >
                <Tab key="main" title={isMobile ? "Standard (3)" : "Standard Documents (3)"} />
                <Tab key="extra" title={isMobile ? "Extra (2)" : "Extra Documents (2)"} />
                <Tab key="card" title={isMobile ? "Student ID" : "Student ID Card"} />
                <Tab key="teacher" title={isMobile ? "Teacher ID" : "Teacher ID Card"} />
                <Tab key="letter" title={isMobile ? "Official Letter" : "Teacher Official Letter"} />
                <Tab key="payroll" title={isMobile ? "Payroll" : "Teacher Payroll"} />
            </Tabs>
        </div>

        {/* Dot Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{
                 backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
             }}
        />
        
        {/* Zoom Controls */}
        <div className={`absolute ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'} flex gap-2 z-30`}>
            <Button 
                isIconOnly 
                color="secondary" 
                variant="flat" 
                size={isMobile ? "sm" : "md"}
                onClick={handleZoomOut} 
                aria-label="Zoom Out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isMobile ? "w-4 h-4" : "w-6 h-6"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
            </Button>
            <div className={`bg-zinc-800 text-white ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} rounded-lg flex items-center font-mono`}>
                {Math.round(scale * 100)}%
            </div>
            <Button 
                isIconOnly 
                color="secondary" 
                variant="flat" 
                size={isMobile ? "sm" : "md"}
                onClick={handleZoomIn} 
                aria-label="Zoom In"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isMobile ? "w-4 h-4" : "w-6 h-6"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Button>
        </div>
        
        {/* Canvas Container - Scaled to fit view */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
        >
            <AnimatePresence mode="wait">
                {activeCanvas === "main" && (
                    <motion.div 
                        key="main-canvas"
                        ref={containerRef} 
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Tuition Statement</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TuitionTemplate ref={tuitionRef} data={formData} />
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Transcript</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TranscriptTemplate ref={transcriptRef} data={formData} />
                            </div>
                        </motion.div>

                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Course Schedule</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <ScheduleTemplate ref={scheduleRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {activeCanvas === "extra" && (
                    <motion.div 
                        key="extra-canvas"
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Admission Letter</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <AdmissionLetterTemplate ref={admissionRef} data={formData} />
                            </div>
                        </motion.div>

                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Enrollment Cert</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <EnrollmentCertificateTemplate ref={enrollmentRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {activeCanvas === "card" && (
                    <motion.div 
                        key="card-canvas"
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Student ID (Front)</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <StudentCardFrontTemplate ref={cardFrontRef} data={formData} />
                            </div>
                        </motion.div>

                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Student ID (Back)</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <StudentCardBackTemplate ref={cardBackRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {activeCanvas === "teacher" && (
                    <motion.div 
                        key="teacher-canvas"
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Teacher ID (Front)</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TeacherCardFrontTemplate ref={teacherCardFrontRef} data={formData} />
                            </div>
                        </motion.div>

                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Teacher ID (Back)</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TeacherCardBackTemplate ref={teacherCardBackRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {activeCanvas === "letter" && (
                    <motion.div 
                        key="letter-canvas"
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Teacher Official Letter</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TeacherOfficialLetterTemplate ref={teacherLetterRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {activeCanvas === "payroll" && (
                    <motion.div 
                        key="payroll-canvas"
                        className="absolute flex flex-row gap-10 p-20 origin-center"
                        initial={{ opacity: 0, scale: scale * 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        exit={{ opacity: 0, scale: scale * 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                        }}
                    >
                        <motion.div 
                            drag 
                            dragMomentum={false}
                            className="relative group document-card"
                        >
                            <div className="absolute -top-8 left-0 bg-zinc-800 text-white px-3 py-1 rounded-t text-sm doc-label shadow-lg">Teacher Payroll Statement</div>
                            <div className="shadow-2xl transition-shadow hover:shadow-blue-500/20">
                                <TeacherPayrollTemplate ref={teacherPayrollRef} data={formData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
