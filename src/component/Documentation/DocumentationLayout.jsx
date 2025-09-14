import React, { useState } from 'react';
import { Search, Menu, X, Moon, Sun, Github, Mail, Copy, Check } from 'lucide-react';
import './Documentation.css';

const DocumentationLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sidebarNavigation = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '#introduction', active: true },
        { title: 'Quick Start', href: '#quick-start' },
        { title: 'Installation', href: '#installation' }
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { title: 'ICR vs OCR', href: '#icr-vs-ocr' },
        { title: 'RAG Architecture', href: '#rag-architecture' },
        { title: 'Prompt Engineering', href: '#prompt-engineering' }
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Extraction API', href: '#extraction-api' },
        { title: 'Status API', href: '#status-api' },
        { title: 'History API', href: '#history-api' }
      ]
    },
    {
      title: 'Examples',
      items: [
        { title: 'Invoice Processing', href: '#invoice-example' },
        { title: 'Form Extraction', href: '#form-example' },
        { title: 'Custom Fields', href: '#custom-fields' }
      ]
    }
  ];

  const tableOfContents = [
    { title: 'Introduction', href: '#introduction' },
    { title: 'What is ICR?', href: '#what-is-icr' },
    { title: 'Key Features', href: '#key-features' },
    { title: 'Getting Started', href: '#getting-started' },
    { title: 'Basic Usage', href: '#basic-usage' },
    { title: 'Advanced Features', href: '#advanced-features' }
  ];

  return (
    <div className={`docs-layout ${darkMode ? 'docs-dark' : 'docs-light'}`}>
      {/* Header */}
      <header className="docs-header">
        <div className="docs-header-left">
          <button className="docs-mobile-toggle" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <div className="docs-logo">
            <span className="docs-logo-icon">🦙</span>
            <span className="docs-logo-text">ICR Docs</span>
          </div>
          <nav className="docs-main-nav">
            <a href="#home" className="docs-nav-link active">Home</a>
            <a href="#learn" className="docs-nav-link">Learn</a>
            <a href="#api" className="docs-nav-link">API Reference</a>
            <a href="#examples" className="docs-nav-link">Examples</a>
            <a href="#community" className="docs-nav-link">Community</a>
          </nav>
        </div>
        <div className="docs-header-right">
          <div className="docs-search">
            <Search size={16} />
            <input type="text" placeholder="Search documentation..." />
          </div>
          <button className="docs-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="docs-container">
        {/* Sidebar */}
        <aside className={`docs-sidebar ${sidebarOpen ? 'docs-sidebar-open' : 'docs-sidebar-closed'}`}>
          <div className="docs-sidebar-header">
            <span className="docs-version">v2.0.0</span>
            <button className="docs-sidebar-close" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          </div>
          
          <nav className="docs-sidebar-nav">
            {sidebarNavigation.map((section, index) => (
              <div key={index} className="docs-nav-section">
                <h3 className="docs-nav-section-title">{section.title}</h3>
                <ul className="docs-nav-section-list">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a 
                        href={item.href} 
                        className={`docs-nav-link ${item.active ? 'active' : ''}`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="docs-main">
          <div className="docs-content">
            <div className="docs-breadcrumb">
              <span>Documentation</span>
              <span className="docs-breadcrumb-separator">/</span>
              <span>Introduction</span>
            </div>

            <article className="docs-article">
              <h1 className="docs-title">Welcome to ICR Documentation 🦙 !</h1>
              
              <p className="docs-subtitle">
                ICR (Intelligent Character Recognition) is the leading framework for building LLM-powered document extraction over your data with RAG and AI workflows.
              </p>

              <div className="docs-card-grid">
                <div className="docs-card">
                  <h3>🚀 Introduction</h3>
                  <p>What is ICR? How does it differ from OCR? Learn the fundamentals of intelligent document processing.</p>
                </div>
                <div className="docs-card">
                  <h3>🔧 Use Cases</h3>
                  <p>What kind of documents can you process? Who should use ICR? Explore real-world applications.</p>
                </div>
                <div className="docs-card">
                  <h3>⚡ Getting Started</h3>
                  <p>Get started with document extraction in just a few simple steps!</p>
                </div>
                <div className="docs-card">
                  <h3>☁️ API Reference</h3>
                  <p>Complete API documentation including extraction, status, and history endpoints.</p>
                </div>
              </div>

              <section id="introduction">
                <h2>Introduction</h2>
                <h3>What is ICR?</h3>
                <p>
                  ICR (Intelligent Character Recognition) goes beyond traditional OCR by leveraging AI and natural language processing 
                  to understand document context, extract meaningful information, and adapt to various document formats without 
                  predefined templates.
                </p>

                <div className="docs-feature-comparison">
                  <div className="docs-comparison-item">
                    <h4>🤖 ICR (Our Approach)</h4>
                    <ul>
                      <li>Prompt-driven extraction</li>
                      <li>No templates required</li>
                      <li>Context-aware understanding</li>
                      <li>Flexible field definitions</li>
                      <li>AI-powered accuracy</li>
                    </ul>
                  </div>
                  <div className="docs-comparison-item">
                    <h4>📄 Traditional OCR</h4>
                    <ul>
                      <li>Template-based extraction</li>
                      <li>Rigid field positioning</li>
                      <li>Case-sensitive matching</li>
                      <li>Limited adaptability</li>
                      <li>Manual configuration</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="key-features">
                <h2>Key Features</h2>
                <div className="docs-features-grid">
                  <div className="docs-feature">
                    <div className="docs-feature-icon">🧠</div>
                    <h3>AI-Powered</h3>
                    <p>Uses advanced LLMs with RAG architecture for intelligent document understanding</p>
                  </div>
                  <div className="docs-feature">
                    <div className="docs-feature-icon">🎯</div>
                    <h3>Prompt-Driven</h3>
                    <p>Natural language prompts instead of rigid templates for maximum flexibility</p>
                  </div>
                  <div className="docs-feature">
                    <div className="docs-feature-icon">⚡</div>
                    <h3>Fast & Serverless</h3>
                    <p>High-performance extraction with serverless architecture for scalability</p>
                  </div>
                  <div className="docs-feature">
                    <div className="docs-feature-icon">📊</div>
                    <h3>Rich Analytics</h3>
                    <p>Detailed extraction history and performance analytics</p>
                  </div>
                </div>
              </section>

              <section id="getting-started">
                <h2>Getting Started</h2>
                <p>Follow these simple steps to start extracting data from your documents:</p>
                
                <div className="docs-steps">
                  <div className="docs-step">
                    <div className="docs-step-number">1</div>
                    <div className="docs-step-content">
                      <h3>Upload Document</h3>
                      <p>Upload your PDF, Word document, or image file</p>
                    </div>
                  </div>
                  <div className="docs-step">
                    <div className="docs-step-number">2</div>
                    <div className="docs-step-content">
                      <h3>Define Fields</h3>
                      <p>Describe what information you want to extract using natural language</p>
                    </div>
                  </div>
                  <div className="docs-step">
                    <div className="docs-step-number">3</div>
                    <div className="docs-step-content">
                      <h3>Extract & Review</h3>
                      <p>Get your extracted data and review the results</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="basic-usage">
                <h2>Basic Usage</h2>
                <p>Here's how to use the extraction API:</p>
                
                <div className="docs-code-block">
                  <div className="docs-code-header">
                    <span>POST /extraction</span>
                    <button 
                      className="docs-copy-button"
                      onClick={() => copyCode('curl -X POST https://api.example.com/extraction \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "filename": "invoice.pdf",\n    "file_content": "base64_encoded_content",\n    "user_id": "your_user_id",\n    "config": {\n      "extraction_mode": "ACCURATE",\n      "data_schema": {\n        "properties": {\n          "invoice_number": { "type": "string" },\n          "total_amount": { "type": "number" }\n        }\n      }\n    }\n  }\'', 0)}
                    >
                      {copiedCode === 0 ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="docs-code-content">
{`curl -X POST https://api.example.com/extraction \\
  -H "Content-Type: application/json" \\
  -d '{
    "filename": "invoice.pdf",
    "file_content": "base64_encoded_content",
    "user_id": "your_user_id",
    "config": {
      "extraction_mode": "ACCURATE",
      "data_schema": {
        "properties": {
          "invoice_number": { "type": "string" },
          "total_amount": { "type": "number" }
        }
      }
    }
  }'`}
                  </pre>
                </div>
              </section>

              <section id="advanced-features">
                <h2>Advanced Features</h2>
                <div className="docs-info-box">
                  <h3>💡 Pro Tip</h3>
                  <p>
                    Use natural language prompts like "Find all contact information" or "Extract invoice details and line items" 
                    for best results. The AI understands context and can adapt to various document layouts.
                  </p>
                </div>

                <h3>Supported File Types</h3>
                <ul className="docs-list">
                  <li><strong>PDF:</strong> Multi-page documents with text and images</li>
                  <li><strong>Images:</strong> PNG, JPG, JPEG formats</li>
                  <li><strong>Word Documents:</strong> DOCX files</li>
                  <li><strong>Text Files:</strong> Plain text documents</li>
                </ul>
              </section>
            </article>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="docs-toc">
          <h3>Table of contents</h3>
          <nav>
            {tableOfContents.map((item, index) => (
              <a key={index} href={item.href} className="docs-toc-link">
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Footer */}
      <footer className="docs-footer">
        <div className="docs-footer-content">
          <div className="docs-footer-section">
            <h3>Documentation</h3>
            <ul>
              <li><a href="#getting-started">Getting Started</a></li>
              <li><a href="#api-reference">API Reference</a></li>
              <li><a href="#examples">Examples</a></li>
            </ul>
          </div>
          <div className="docs-footer-section">
            <h3>Community</h3>
            <ul>
              <li><a href="#github"><Github size={16} /> GitHub</a></li>
              <li><a href="#contact"><Mail size={16} /> Contact</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="docs-footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#changelog">Changelog</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="docs-footer-bottom">
          <p>&copy; 2024 ICR Documentation. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default DocumentationLayout;