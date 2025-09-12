import React, { useState, useRef } from "react";
import { useUser } from '../../UserContext';
import FileUpload from "./Fileupload";

const Extraction = () => {
  const { 
    userId, 
    currentExtraction, 
    updateCurrentExtraction,
    clearCurrentExtraction 
  } = useUser();
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newField, setNewField] = useState({
    FieldName: "",
    Datatype: "string",
  });
  const [fields, setFields] = useState([]);

  // Left-panel upload button support
  const fileInputRefLeft = useRef(null);
  const handleOpenFilePicker = () => fileInputRefLeft.current && fileInputRefLeft.current.click();
  const handleFileSelectedLeft = (e) => {
    const files = e.target.files && e.target.files.length > 0 ? Array.from(e.target.files) : [];
    setUploadedFiles(files);
    // allow re-selecting the same file
    e.target.value = '';
  };

  const EXTRACTION_API = "https://fn3yrpr3gl.execute-api.ap-south-1.amazonaws.com/Production/extraction";
  const STATUS_API_BASE = "https://fn3yrpr3gl.execute-api.ap-south-1.amazonaws.com/Production/status";

  // Destructure from context
  const { isLoading, jobId, statusMessage, result } = currentExtraction;

  // Field management
  const handleAddField = () => {
    if (newField.FieldName.trim()) {
      setFields([...fields, { name: newField.FieldName, type: newField.Datatype }]);
      setNewField({ FieldName: "", Datatype: "string" });
    }
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewField(prev => ({ ...prev, [name]: value }));
  };

  // Generate schema
  const generateSchema = () => {
    const properties = {};
    fields.forEach(field => {
      properties[field.name] = { type: field.type };
    });
    return {
      additionalProperties: false,
      properties,
      required: fields.map(f => f.name),
      type: "object"
    };
  };

  // Simple API call
  const makeApiCall = async (url, method, body = null) => {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId
      },
      mode: 'cors',
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  };

  // Check status
  const checkStatus = async (currentJobId) => {
    try {
      const data = await makeApiCall(`${STATUS_API_BASE}/${currentJobId}`, 'GET');
      console.log('Status response:', data);
      
      if (data.success && data.overall_status === 'SUCCESS' && data.data) {
        updateCurrentExtraction({
          result: data.data,
          isLoading: false,
          statusMessage: 'Extraction completed!'
        });
        return true; // Stop polling
      } else if (data.success && data.overall_status === 'FAILED') {
        updateCurrentExtraction({
          isLoading: false,
          statusMessage: 'Extraction failed. Please try again.'
        });
        return true; // Stop polling
      } else {
        updateCurrentExtraction({
          statusMessage: `Status: ${data.overall_status || 'Processing'}`
        });
        return false; // Continue polling
      }
    } catch (error) {
      console.error('Status check failed:', error);
      updateCurrentExtraction({
        statusMessage: `Status check failed: ${error.message}`
      });
      return false;
    }
  };

  // Simple polling
  const startPolling = (currentJobId) => {
    let attempts = 0;
    const maxAttempts = 4;
    
    const poll = async () => {
      attempts++;
      console.log(`Poll attempt ${attempts}/${maxAttempts}`);
      
      const shouldStop = await checkStatus(currentJobId);
      
      if (shouldStop || attempts >= maxAttempts) {
        if (attempts >= maxAttempts) {
          updateCurrentExtraction({
            isLoading: false,
            statusMessage: 'Timeout: Please check status manually.'
          });
        }
        return;
      }
      
      // Continue polling
      setTimeout(poll, 5000);
    };
    
    // Start first poll after 3 seconds
    setTimeout(poll, 3000);
  };

  // Start extraction
  const handleExtraction = async () => {
    if (!uploadedFiles.length) {
      alert("Please upload a file first");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field to extract");
      return;
    }

    updateCurrentExtraction({
      isLoading: true,
      result: null,
      statusMessage: "Starting extraction...",
      jobId: null
    });

    try {
      const file = uploadedFiles[0];
      const fileContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Content = fileContent.split(',')[1];

      const payload = {
        filename: file.name,
        file_content: base64Content,
        user_id: userId,
        config: {
          extraction_mode: "ACCURATE",
          data_schema: generateSchema(),
          handle_missing: false
        }
      };

      const data = await makeApiCall(EXTRACTION_API, 'POST', payload);
      
      if (data.job_id) {
        updateCurrentExtraction({
          jobId: data.job_id,
          statusMessage: `Extraction started. Job ID: ${data.job_id}`
        });
        startPolling(data.job_id);
      } else {
        throw new Error('No job ID received');
      }
    } catch (error) {
      console.error('Extraction failed:', error);
      updateCurrentExtraction({
        statusMessage: `Extraction failed: ${error.message}`,
        isLoading: false
      });
      alert(`Extraction failed: ${error.message}`);
    }
  };

  // Manual status check
  const handleStatusCheck = () => {
    if (jobId) {
      checkStatus(jobId);
    } else {
      alert("No active job to check");
    }
  };

  // Reset
  const handleReset = () => {
    clearCurrentExtraction();
  };

  return (
    <div className="extraction">
      {/* Clean, minimal hero */}
      <div className="extraction__hero">
        <h1 className="extraction__hero-title">AI Document Extraction</h1>
        <p className="extraction__hero-subtitle">
          Upload any document and let our AI intelligently extract the information you need
        </p>
      </div>

      <div className="extraction__content">
        {/* Step 1: Upload Only */}
        {!uploadedFiles.length && (
          <div className="extraction__upload-zone">
            <input
              type="file"
              ref={fileInputRefLeft}
              onChange={handleFileSelectedLeft}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
            />
            <div className="extraction__upload-card" onClick={handleOpenFilePicker}>
              <div className="extraction__upload-icon">📄</div>
              <h3>Upload Your Document</h3>
              <p>Drag & drop or click to select your file</p>
              <span className="extraction__supported-formats">
                PDF, Word, Images supported
              </span>
            </div>
          </div>
        )}

        {/* Step 2: Progressive UI after upload */}
        {uploadedFiles.length > 0 && (
          <div className="extraction__workflow">
            <div className="extraction__panel--left">
              <div className="extraction__step-header">
                <h3>✨ What information do you need?</h3>
                <p>Add the specific fields you want extracted from your document</p>
              </div>
              
              {/* Compact fields display */}
              {fields.length > 0 && (
                <div className="extraction__fields-compact">
                  {fields.map((field, index) => (
                    <div key={index} className="extraction__field-tag">
                      <span>{field.name}</span>
                      <button 
                        className="extraction__remove-tag"
                        onClick={() => handleRemoveField(index)}
                        aria-label={`Remove ${field.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Simple add field */}
              <div className="extraction__add-field">
                <input
                  type="text"
                  placeholder="e.g., Invoice Number, Customer Name..."
                  name="FieldName"
                  value={newField.FieldName}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddField()}
                  className="extraction__field-input"
                />
                <button className="extraction__add-btn" onClick={handleAddField}>
                  Add
                </button>
              </div>

              {fields.length > 0 && (
                <button 
                  className="extraction__start-btn"
                  onClick={handleExtraction}
                  disabled={isLoading}
                >
                  {isLoading ? 'Extracting...' : 'Extract Information'}
                </button>
              )}

              {(isLoading || statusMessage) && (
                <div className="extraction__status">
                  {isLoading && (
                    <div className="extraction__loading">
                      <div className="extraction__spinner"></div>
                      <span>AI is analyzing your document...</span>
                    </div>
                  )}
                  {statusMessage && !isLoading && <p>{statusMessage}</p>}
                </div>
              )}
            </div>

            <div className="extraction__panel--right">
              <FileUpload
                onFilesSelected={setUploadedFiles}
                value={uploadedFiles}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {result && result.data && (
          <div className="extraction__results">
            <h3>Extracted Information</h3>
            <div className="extraction__results-grid">
              {Object.entries(result.data).map(([question, answer]) => (
                <div key={question} className="extraction__result-card">
                  <div className="extraction__result-label">{question}</div>
                  <div className="extraction__result-value">{answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default Extraction;