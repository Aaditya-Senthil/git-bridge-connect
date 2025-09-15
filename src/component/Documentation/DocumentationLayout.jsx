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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarNavigation = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '#introduction', active: true },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { title: 'ICR vs OCR', href: '#icr-vs-ocr' },
        { title: 'RAG Architecture', href: '#rag-architecture' },
        { title: 'AWS', href: '#aws' }
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

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const tableOfContents = [
    { title: 'LLAMA Docs', href: '#introduction' },
    { title: 'AWS Architecture', href: '#what-is-icr' },
    { title: 'RAG Model', href: '#key-features' },
    { title: 'Hugging Face', href: '#getting-started' },
    { title: 'Groq Embeddings', href: '#basic-usage' },
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
            <span className="docs-logo-icon"></span>
            <span className="docs-logo-text">Docs</span>
          </div>
          <nav className="docs-main-nav">
            <a href="#home" className="docs-nav-link active">Home</a>
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
                      <button 
                        onClick={() => handleNavClick(item.href)}
                        className={`docs-nav-link ${item.active ? 'active' : ''}`}
                      >
                        {item.title}
                      </button>
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

              <section id="introduction" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Introduction</h2>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>What is ICR?</h3>
                <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                  ICR (Intelligent Character Recognition) goes beyond traditional OCR by leveraging AI and natural language processing 
                  to understand document context, extract meaningful information, and adapt to various document formats without 
                  predefined templates.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                    border: `1px solid ${darkMode ? '#10b981' : '#10b981'}`,
                    borderRadius: '0.75rem'
                  }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#10b981' }}>
                      🤖 ICR (Our Approach)
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {['Prompt-driven extraction', 'No templates required', 'Context-aware understanding', 'Flexible field definitions', 'AI-powered accuracy'].map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>  
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                    border: `1px solid ${darkMode ? '#64748b' : '#64748b'}`,
                    borderRadius: '0.75rem'
                  }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#64748b' }}>
                      📄 Traditional OCR
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {['Template-based extraction', 'Rigid field positioning', 'Case-sensitive matching', 'Limited adaptability', 'Manual configuration'].map((item, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: '#64748b' }}>−</span>
                          <span>{item}</span>
                        </li>
                      ))}
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

                            <section id="rag-architecture" style={{ marginBottom: '4rem' }}>
                              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>RAG Architecture</h2>
                              
                              <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                                Our Retrieval-Augmented Generation (RAG) architecture combines the power of large language models with a robust document understanding pipeline to deliver highly accurate extraction results.
                              </p>
              
                              <div style={{
                                padding: '2rem',
                                backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                borderRadius: '0.75rem',
                                marginBottom: '2rem'
                              }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Architecture Components</h3>
                                
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                  {[
                                    {
                                      title: '1. Document Preprocessing',
                                      desc: 'Advanced OCR and layout analysis to extract text while preserving document structure',
                                      features: ['Multi-format support (PDF, images, Word)', 'Layout detection and preservation', 'Text quality enhancement', 'Table and form recognition']
                                    },
                                    {
                                      title: '2. Vector Embedding',
                                      desc: 'Convert document content into high-dimensional vectors for semantic understanding',
                                      features: ['Contextual embeddings', 'Multi-modal representation', 'Semantic chunking', 'Relationship mapping']
                                    },
                                    {
                                      title: '3. Retrieval System',
                                      desc: 'Intelligent retrieval of relevant document sections based on extraction prompts',
                                      features: ['Semantic similarity search', 'Context-aware retrieval', 'Multi-hop reasoning', 'Relevance scoring']
                                    },
                                    {
                                      title: '4. Generation & Extraction',
                                      desc: 'LLM-powered extraction using retrieved context and user-defined schemas',
                                      features: ['Prompt-based extraction', 'Schema validation', 'Confidence scoring', 'Error correction']
                                    }
                                  ].map((component, index) => (
                                    <div key={index} style={{
                                      padding: '1.5rem',
                                      backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                      borderRadius: '0.5rem',
                                      border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`
                                    }}>
                                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#3b82f6' }}>
                                        {component.title}
                                      </h4>
                                      <p style={{ marginBottom: '1rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                        {component.desc}
                                      </p>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                                        {component.features.map((feature, i) => (
                                          <div key={i} style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: '#10b981' }}>•</span>
                                            <span>{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
              
                              <div style={{
                                padding: '1.5rem',
                                backgroundColor: darkMode ? '#1e40af20' : '#3b82f620',
                                border: `1px solid ${darkMode ? '#3b82f6' : '#3b82f6'}`,
                                borderRadius: '0.75rem',
                                marginBottom: '2rem'
                              }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: '#3b82f6' }}>
                                  💡 RAG Benefits
                                </h3>
                                <p style={{ marginBottom: '0', lineHeight: '1.6' }}>
                                  By combining retrieval with generation, our RAG architecture ensures that extraction is both contextually aware and highly accurate. 
                                  The system can understand document relationships, maintain context across pages, and adapt to new document types without retraining.
                                </p>
                              </div>
                            </section>
              
                            <section id="api-reference" style={{ marginBottom: '4rem' }}>
                              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>API Reference</h2>
                              
                              <div id="extraction-api" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Extraction API</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Extract structured data from documents using AI-powered analysis.
                                </p>
              
                                <div style={{
                                  backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                  borderRadius: '0.75rem',
                                  overflow: 'hidden',
                                  marginBottom: '1.5rem'
                                }}>
                                  <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>POST /api/v1/extraction</span>
                                    <button 
                                      onClick={() => copyCode(`curl -X POST https://api.icr.dev/v1/extraction \\
                -H "Authorization: Bearer YOUR_API_KEY" \\
                -H "Content-Type: application/json" \\
                -d '{
                  "filename": "invoice.pdf",
                  "file_content": "base64_encoded_content",
                  "config": {
                    "extraction_mode": "ACCURATE",
                    "data_schema": {
                      "type": "object",
                      "properties": {
                        "invoice_number": { 
                          "type": "string", 
                          "description": "The invoice number" 
                        },
                        "total_amount": { 
                          "type": "number", 
                          "description": "Total amount due" 
                        },
                        "line_items": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "description": { "type": "string" },
                              "quantity": { "type": "number" },
                              "unit_price": { "type": "number" }
                            }
                          }
                        }
                      },
                      "required": ["invoice_number", "total_amount"]
                    }
                  }
                }'`, 1)}
                                      style={{
                                        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      {copiedCode === 1 ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                  </div>
                                  <pre style={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    backgroundColor: 'transparent'
                                  }}>
              {`curl -X POST https://api.icr.dev/v1/extraction \\
                -H "Authorization: Bearer YOUR_API_KEY" \\
                -H "Content-Type: application/json" \\
                -d '{
                  "filename": "invoice.pdf",
                  "file_content": "base64_encoded_content",
                  "config": {
                    "extraction_mode": "ACCURATE",
                    "data_schema": {
                      "type": "object",
                      "properties": {
                        "invoice_number": { 
                          "type": "string", 
                          "description": "The invoice number" 
                        },
                        "total_amount": { 
                          "type": "number", 
                          "description": "Total amount due" 
                        },
                        "line_items": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "description": { "type": "string" },
                              "quantity": { "type": "number" },
                              "unit_price": { "type": "number" }
                            }
                          }
                        }
                      },
                      "required": ["invoice_number", "total_amount"]
                    }
                  }
                }'`}
                                  </pre>
                                </div>
              
                                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Parameters</h4>
                                <div style={{ overflowX: 'auto' }}>
                                  <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    marginBottom: '2rem',
                                    fontSize: '0.875rem'
                                  }}>
                                    <thead>
                                      <tr style={{ backgroundColor: darkMode ? '#1e293b' : '#f8fafc' }}>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>Parameter</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>Type</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>Required</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>Description</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { param: 'filename', type: 'string', required: 'Yes', desc: 'Original filename of the document' },
                                        { param: 'file_content', type: 'string', required: 'Yes', desc: 'Base64 encoded file content' },
                                        { param: 'config.extraction_mode', type: 'string', required: 'No', desc: 'FAST, ACCURATE, or COMPREHENSIVE (default: ACCURATE)' },
                                        { param: 'config.data_schema', type: 'object', required: 'Yes', desc: 'JSON Schema defining the expected output structure' }
                                      ].map((row, i) => (
                                        <tr key={i}>
                                          <td style={{ padding: '0.75rem', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`, fontFamily: 'monospace' }}>{row.param}</td>
                                          <td style={{ padding: '0.75rem', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>{row.type}</td>
                                          <td style={{ padding: '0.75rem', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
                                            <span style={{ 
                                              color: row.required === 'Yes' ? '#ef4444' : '#10b981',
                                              fontWeight: '600'
                                            }}>
                                              {row.required}
                                            </span>
                                          </td>
                                          <td style={{ padding: '0.75rem', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>{row.desc}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
              
                              <div id="status-api" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Status API</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Check the status of an extraction job.
                                </p>
              
                                <div style={{
                                  backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                  borderRadius: '0.75rem',
                                  overflow: 'hidden',
                                  marginBottom: '1.5rem'
                                }}>
                                  <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontFamily: 'monospace', fontWeight: '600' }}></span>
                                    <button 
                                      onClick={() => copyCode(`curl -X GET https://api.icr.dev/v1/extraction/abc123/status \\
                -H "Authorization: Bearer YOUR_API_KEY"`, 2)}
                                      style={{
                                        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      {copiedCode === 2 ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                  </div>
                                  <pre style={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    backgroundColor: 'transparent'
                                  }}>
              {`curl -X GET https://api.icr.dev/v1/extraction/abc123/status \\
                -H "Authorization: Bearer YOUR_API_KEY"`}
                                  </pre>
                                </div>
                              </div>
              
                              <div id="history-api" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>History API</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Retrieve extraction history and analytics.
                                </p>
              
                                <div style={{
                                  backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                  borderRadius: '0.75rem',
                                  overflow: 'hidden',
                                  marginBottom: '2rem'
                                }}>
                                  <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>GET /api/v1/history</span>
                                    <button 
                                      onClick={() => copyCode(`curl -X GET "https://api.icr.dev/v1/history?limit=10&offset=0" \\
                -H "Authorization: Bearer YOUR_API_KEY"`, 3)}
                                      style={{
                                        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      {copiedCode === 3 ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                  </div>
                                  <pre style={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    backgroundColor: 'transparent'
                                  }}>
              {`curl -X GET "https://api.icr.dev/v1/history?limit=10&offset=0" \\
                -H "Authorization: Bearer YOUR_API_KEY"`}
                                  </pre>
                                </div>
                              </div>
                            </section>
              
                            <section id="examples" style={{ marginBottom: '4rem' }}>
                              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Examples</h2>
                              
                              <div id="invoice-example" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Invoice Processing</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Extract key information from invoices including line items, totals, and vendor details.
                                </p>
              
                                <div style={{
                                  backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                  borderRadius: '0.75rem',
                                  overflow: 'hidden',
                                  marginBottom: '1.5rem'
                                }}>
                                  <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontWeight: '600' }}>Invoice Schema Example</span>
                                    <button 
                                      onClick={() => copyCode(`{
                "type": "object",
                "properties": {
                  "vendor": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string" },
                      "address": { "type": "string" },
                      "phone": { "type": "string" },
                      "email": { "type": "string" }
                    }
                  },
                  "invoice_details": {
                    "type": "object", 
                    "properties": {
                      "invoice_number": { "type": "string" },
                      "invoice_date": { "type": "string", "format": "date" },
                      "due_date": { "type": "string", "format": "date" },
                      "payment_terms": { "type": "string" }
                    }
                  },
                  "line_items": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "description": { "type": "string" },
                        "quantity": { "type": "number" },
                        "unit_price": { "type": "number" },
                        "total": { "type": "number" }
                      }
                    }
                  },
                  "totals": {
                    "type": "object",
                    "properties": {
                      "subtotal": { "type": "number" },
                      "tax": { "type": "number" },
                      "total": { "type": "number" }
                    }
                  }
                },
                "required": ["vendor", "invoice_details", "line_items", "totals"]
              }`, 4)}
                                      style={{
                                        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      {copiedCode === 4 ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                  </div>
                                  <pre style={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    backgroundColor: 'transparent'
                                  }}>
              {`{
                "type": "object",
                "properties": {
                  "vendor": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string" },
                      "address": { "type": "string" },
                      "phone": { "type": "string" },
                      "email": { "type": "string" }
                    }
                  },
                  "invoice_details": {
                    "type": "object", 
                    "properties": {
                      "invoice_number": { "type": "string" },
                      "invoice_date": { "type": "string", "format": "date" },
                      "due_date": { "type": "string", "format": "date" },
                      "payment_terms": { "type": "string" }
                    }
                  },
                  "line_items": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "description": { "type": "string" },
                        "quantity": { "type": "number" },
                        "unit_price": { "type": "number" },
                        "total": { "type": "number" }
                      }
                    }
                  },
                  "totals": {
                    "type": "object",
                    "properties": {
                      "subtotal": { "type": "number" },
                      "tax": { "type": "number" },
                      "total": { "type": "number" }
                    }
                  }
                },
                "required": ["vendor", "invoice_details", "line_items", "totals"]
              }`}
                                  </pre>
                                </div>
                              </div>
              
                              <div id="form-example" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Form Extraction</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Extract structured data from forms, applications, and surveys.
                                </p>
              
                                <div style={{
                                  backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
                                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                  borderRadius: '0.75rem',
                                  overflow: 'hidden',
                                  marginBottom: '1.5rem'
                                }}>
                                  <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                                    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontWeight: '600' }}>Application Form Schema</span>
                                    <button 
                                      onClick={() => copyCode(`{
                "type": "object",
                "properties": {
                  "personal_info": {
                    "type": "object",
                    "properties": {
                      "full_name": { "type": "string" },
                      "date_of_birth": { "type": "string", "format": "date" },
                      "email": { "type": "string", "format": "email" },
                      "phone": { "type": "string" },
                      "address": {
                        "type": "object",
                        "properties": {
                          "street": { "type": "string" },
                          "city": { "type": "string" },
                          "state": { "type": "string" },
                          "zip_code": { "type": "string" }
                        }
                      }
                    }
                  },
                  "employment": {
                    "type": "object",
                    "properties": {
                      "current_employer": { "type": "string" },
                      "job_title": { "type": "string" },
                      "annual_income": { "type": "number" },
                      "employment_duration": { "type": "string" }
                    }
                  },
                  "references": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": { "type": "string" },
                        "relationship": { "type": "string" },
                        "contact": { "type": "string" }
                      }
                    }
                  }
                }
              }`, 5)}
                                      style={{
                                        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      {copiedCode === 5 ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                  </div>
                                  <pre style={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    overflow: 'auto',
                                    backgroundColor: 'transparent'
                                  }}>
              {`{
                "type": "object",
                "properties": {
                  "personal_info": {
                    "type": "object",
                    "properties": {
                      "full_name": { "type": "string" },
                      "date_of_birth": { "type": "string", "format": "date" },
                      "email": { "type": "string", "format": "email" },
                      "phone": { "type": "string" },
                      "address": {
                        "type": "object",
                        "properties": {
                          "street": { "type": "string" },
                          "city": { "type": "string" },
                          "state": { "type": "string" },
                          "zip_code": { "type": "string" }
                        }
                      }
                    }
                  },
                  "employment": {
                    "type": "object",
                    "properties": {
                      "current_employer": { "type": "string" },
                      "job_title": { "type": "string" },
                      "annual_income": { "type": "number" },
                      "employment_duration": { "type": "string" }
                    }
                  },
                  "references": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": { "type": "string" },
                        "relationship": { "type": "string" },
                        "contact": { "type": "string" }
                      }
                    }
                  }
                }
              }`}
                                  </pre>
                                </div>
                              </div>
              
                              <div id="custom-fields" style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Custom Fields</h3>
                                <p style={{ marginBottom: '1.5rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                  Define custom extraction fields using natural language descriptions.
                                </p>
              
                                <div style={{
                                  padding: '1.5rem',
                                  backgroundColor: darkMode ? '#1e40af20' : '#3b82f620',
                                  border: `1px solid ${darkMode ? '#3b82f6' : '#3b82f6'}`,
                                  borderRadius: '0.75rem',
                                  marginBottom: '2rem'
                                }}>
                                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#3b82f6' }}>
                                    💡 Natural Language Prompts
                                  </h4>
                                  <div style={{ display: 'grid', gap: '1rem' }}>
                                    {[
                                      { prompt: '"Find all monetary amounts and their descriptions"', use: 'Financial documents, receipts' },
                                      { prompt: '"Extract names, titles, and contact information"', use: 'Business cards, resumes' },
                                      { prompt: '"Identify key dates and their associated events"', use: 'Contracts, agreements' },
                                      { prompt: '"Find product names, quantities, and prices"', use: 'Purchase orders, catalogs' }
                                    ].map((example, index) => (
                                      <div key={index} style={{
                                        padding: '1rem',
                                        backgroundColor: darkMode ? '#0f172a80' : '#ffffff80',
                                        borderRadius: '0.5rem',
                                        border: `1px solid ${darkMode ? '#475569' : '#d1d5db'}`
                                      }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                                          {example.prompt}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                                          Best for: {example.use}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
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
              <button key={index} onClick={() => handleNavClick(item.href)} className="docs-toc-link">
                {item.title}
              </button>
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
          <p>&copy; 2025 ICR-RAG Documentation. Built with ❤️ for developers. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DocumentationLayout;