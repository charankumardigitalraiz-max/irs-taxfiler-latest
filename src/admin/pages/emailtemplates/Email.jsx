import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link, Image as ImageIcon, Video, X, Code, HelpCircle, List, ListOrdered, Table } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { api } from '../../api';

const sampleUrl = new URL('../../../assets/sample.csv', import.meta.url).href;

const Email = () => {
  const [formData, setFormData] = useState({
    name: '',
    to: '',
    emailTemplate: '',
    subject: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedTemplateData, setSelectedTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [userType, setUserType] = useState('single'); 
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('DM Sans');
  const [finalHTML, setFinalHTML] = useState(''); 
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await api.email.getTemplates();
        if (response.success && response.data) {
          setEmailTemplates(response.data);
          if (response.data.length > 0) {
            const firstTemplate = response.data[0];
            try {
              const fullTemplateResponse = await api.email.getTemplateById(firstTemplate._id);
              if (fullTemplateResponse.success && fullTemplateResponse.data) {
                const template = fullTemplateResponse.data;
                setSelectedTemplateData(template);
                const rawHtml = fullTemplateResponse.finalHTML || template.finalHTML || template.body || '';
                setFinalHTML(rawHtml);
                const messageContent = template.body || '';
                setFormData(prev => ({
                  ...prev,
                  emailTemplate: firstTemplate._id,
                  subject: firstTemplate.subject || '',
                  message: messageContent
                }));
                if (editorRef.current) {
                  editorRef.current.innerHTML = messageContent;
                }
                if (previewRef.current) {
                  previewRef.current.srcdoc = rawHtml;
                }
              }
            } catch (error) {
              const messageContent = firstTemplate.body || '';
              setFinalHTML(firstTemplate.body || '');
              setSelectedTemplateData(firstTemplate);
              setFormData(prev => ({
                ...prev,
                emailTemplate: firstTemplate._id,
                subject: firstTemplate.subject || '',
                message: messageContent
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching email templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateChange = async (templateId) => {
    if (!templateId) {
      setSelectedTemplateData(null);
      return;
    }

    try {
      setLoadingTemplate(true);
      const response = await api.email.getTemplateById(templateId);
      if (response.success && response.data) {
        const template = response.data;
        setSelectedTemplateData(template);
        const rawHtml = response.finalHTML || template.finalHTML || template.body || '';
        setFinalHTML(rawHtml);
        const messageContent = template.body || '';
        
        setFormData(prev => ({
          ...prev,
          emailTemplate: templateId,
          subject: template.subject || '',
          message: messageContent
        }));
        
        if (editorRef.current) {
          editorRef.current.innerHTML = messageContent;
        }
        if (previewRef.current) {
          previewRef.current.srcdoc = rawHtml;
        }
      }
    } catch (error) {
      console.error('Error fetching template details:', error);
      const template = emailTemplates.find(t => t._id === templateId);
      if (template) {
        const htmlContent = template.body || '';
        setFormData(prev => ({
          ...prev,
          emailTemplate: templateId,
          subject: template.subject || '',
          message: htmlContent
        }));
        if (editorRef.current) {
          editorRef.current.innerHTML = htmlContent;
        }
      }
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSampleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = sampleUrl;
      link.download = 'sample.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      window.open(sampleUrl, '_blank');
    }
  };

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFormat = (command) => {
    executeCommand(command);
  };

  const handleColorChange = (e) => {
    setFontColor(e.target.value);
    executeCommand('foreColor', e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
    executeCommand('fontName', e.target.value);
  };

  const handleMessageChange = (e) => {
    const content = e.target.innerHTML || e.target.innerText || '';
    setFormData(prev => ({
      ...prev,
      message: content
    }));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  useEffect(() => {
    if (editorRef.current && formData.message && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = formData.message;
    }
  }, [formData.message]);

  const handleSend = async () => {
    if (userType === 'single') {
      if (!formData.to || !formData.emailTemplate) {
        alert('Please fill in all required fields (Email and Template)');
        return;
      }
    } else {
      if (!formData.emailTemplate || !selectedFile) {
        alert('Please select a template and upload an Excel file');
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name || '');
      // For single user, send the email; for multiple users, send empty (emails are in Excel file)
      formDataToSend.append('toemail', userType === 'single' ? formData.to : '');
      formDataToSend.append('subject', formData.subject || '');
      formDataToSend.append('body', editorRef.current?.innerHTML || formData.message || '');
      formDataToSend.append('single', userType === 'single' ? 'true' : 'false');
      formDataToSend.append('multiple', userType === 'multiple' ? 'true' : 'false');
      formDataToSend.append('templateId', formData.emailTemplate);
      let templateFileName = '';
      if (selectedTemplateData && selectedTemplateData.template) {
        templateFileName = selectedTemplateData.template;
      } else {
        const template = emailTemplates.find(t => t._id === formData.emailTemplate);
        if (template && template.template) {
          templateFileName = template.template;
        }
      }
      formDataToSend.append('template', templateFileName);
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      const response = await api.email.sendEmail(formDataToSend);
      if (response.success) {
        alert('Email sent successfully!');
        if (emailTemplates.length > 0) {
          const firstTemplate = emailTemplates[0];
          try {
            const fullTemplateResponse = await api.email.getTemplateById(firstTemplate._id);
            if (fullTemplateResponse.success && fullTemplateResponse.data) {
              const template = fullTemplateResponse.data;
              const rawHtml = fullTemplateResponse.finalHTML || template.finalHTML || template.body || '';
              setFinalHTML(rawHtml);
              const messageContent = template.body || '';
              setFormData({
                name: '',
                to: '',
                emailTemplate: firstTemplate._id,
                subject: firstTemplate.subject || '',
                message: messageContent
              });
              if (editorRef.current) {
                editorRef.current.innerHTML = messageContent;
              }
              if (previewRef.current) {
                previewRef.current.srcdoc = rawHtml;
              }
            }
          } catch (error) {
            const messageContent = firstTemplate.body || '';
            setFinalHTML(firstTemplate.body || '');
            setFormData({
              name: '',
              to: '',
              emailTemplate: firstTemplate._id,
              subject: firstTemplate.subject || '',
              message: messageContent
            });
            if (editorRef.current) {
              editorRef.current.innerHTML = messageContent;
            }
            if (previewRef.current) {
              previewRef.current.srcdoc = firstTemplate.body || '';
            }
          }
        }
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Card className="h-fit">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Send Email</h2>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={handleSampleDownload}
                  >
                    Sample Download
                  </Button>
                </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select User Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="single"
                    checked={userType === 'single'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Single User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="multiple"
                    checked={userType === 'multiple'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Multiple User</span>
                </label>
              </div>
            </div>

            {userType === 'single' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    To
                  </label>
                  <input
                    type="email"
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            )}

            {userType === 'multiple' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Upload Excel File (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    Choose File
                  </label>
                  <span className="text-sm text-gray-500">
                    {selectedFile ? selectedFile.name : 'No file chosen'}
                  </span>
                  {selectedFile && (
                    <button
                      onClick={handleFileRemove}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Template
              </label>
              <select
                value={formData.emailTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                disabled={loading || loadingTemplate}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <option value="">Loading templates...</option>
                ) : emailTemplates.length === 0 ? (
                  <option value="">No templates available</option>
                ) : (
                  <>
                    <option value="">Select a template</option>
                    {emailTemplates.map(template => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {loadingTemplate && (
                <p className="mt-1 text-xs text-gray-500">Loading template preview...</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message
              </label>
              
              <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                  <button
                    type="button"
                    onClick={() => handleFormat('bold')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('underline')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('italic')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                  <label className="flex items-center cursor-pointer">
                    <span className="mr-1 text-xs">A</span>
                    <input
                      type="color"
                      value={fontColor}
                      onChange={handleColorChange}
                      className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                      title="Font Color"
                    />
                  </label>
                </div>

                <div className="border-r border-gray-300 pr-2">
                  <select
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none"
                    title="Font Family"
                  >
                    <option value="DM Sans">DM Sans</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                  <button
                    type="button"
                    onClick={() => handleFormat('insertUnorderedList')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('insertOrderedList')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                  <button
                    type="button"
                    onClick={() => handleFormat('justifyLeft')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Align Left"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('justifyCenter')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Align Center"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('justifyRight')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Align Right"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat('justifyFull')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Justify"
                  >
                    <AlignJustify className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Enter URL:');
                      if (url) executeCommand('createLink', url);
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Insert Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Enter image URL:');
                      if (url) executeCommand('insertImage', url);
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Insert Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Enter video URL:');
                      if (url) {
                        const iframe = `<iframe src="${url}" width="560" height="315"></iframe>`;
                        document.execCommand('insertHTML', false, iframe);
                      }
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Insert Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>

                <div className="border-r border-gray-300 pr-2">
                  <button
                    type="button"
                    onClick={() => {
                      const rows = prompt('Number of rows:', '3');
                      const cols = prompt('Number of columns:', '3');
                      if (rows && cols) {
                        let table = '<table border="1" style="border-collapse: collapse;">';
                        for (let i = 0; i < rows; i++) {
                          table += '<tr>';
                          for (let j = 0; j < cols; j++) {
                            table += '<td>&nbsp;</td>';
                          }
                          table += '</tr>';
                        }
                        table += '</table>';
                        document.execCommand('insertHTML', false, table);
                      }
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Insert Table"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleFormat('removeFormat')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Remove Formatting"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const editor = editorRef.current;
                      if (editor) {
                        editor.textContent = editor.innerText;
                      }
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Code View"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Help"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={editorRef}
                contentEditable
                onInput={handleMessageChange}
                onPaste={handlePaste}
                className="min-h-[200px] px-3 py-2 text-sm border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ fontFamily: fontFamily }}
                suppressContentEditableWarning
              />
            </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-600">
                    {userType === 'single' ? 'Sending to single user' : 'Sending to multiple users'}
                  </div>
                  <Button
                    onClick={handleSend}
                    size="md"
                    className="px-6"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card className="h-fit">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
                </div>
                
                {loadingTemplate ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500">Loading preview...</div>
                  </div>
                ) : finalHTML ? (
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-white p-0">
                    <iframe
                      ref={previewRef}
                      srcDoc={finalHTML}
                      className="w-full min-h-[700px] border-0 p-0"
                      title="Email Preview"
                      sandbox="allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px] border border-gray-300 rounded-lg bg-gray-50">
                    <div className="text-gray-500 text-center">
                      <p className="mb-2">No template selected</p>
                      <p className="text-sm">Select an email template to see the preview</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
