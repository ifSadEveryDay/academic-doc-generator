import React, { forwardRef } from 'react';
import RealisticBarcodeGenerator from './RealisticBarcodeGenerator';

const TeacherOfficialLetterTemplate = forwardRef(({ data }, ref) => {
  return (
    <div 
      ref={ref} 
      style={{
        width: '800px',
        minHeight: '1000px',
        backgroundColor: 'white',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Times New Roman', serif",
        padding: '60px 80px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Letterhead */}
      <div style={{
        borderBottom: '3px solid #1e40af',
        paddingBottom: '30px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          flexShrink: 0
        }}>
          {data.universityLogo ? (
            <img src={data.universityLogo} alt="University Seal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              OFFICIAL<br/>SEAL
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af', marginBottom: '5px' }}>
            {data.universityName || 'University Name'}
          </div>
          <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '3px' }}>
            Office of Academic Affairs
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            {data.universityAddress || 'University Address'}
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1e293b',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '10px'
        }}>
          OFFICIAL Teacher VERIFICATION LETTER
        </div>
        <div style={{
          fontSize: '16px',
          color: '#64748b',
          fontStyle: 'italic'
        }}>
          Certificate of Employment and Academic Standing
        </div>
      </div>

      {/* Reference Number and Date */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <div>
          <strong>Reference No:</strong> AA-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}
        </div>
        <div>
          <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Salutation */}
      <div style={{
        fontSize: '16px',
        marginBottom: '30px',
        color: '#1e293b'
      }}>
        To Whom It May Concern:
      </div>

      {/* Main Content */}
      <div style={{
        fontSize: '16px',
        lineHeight: 1.8,
        color: '#1e293b',
        marginBottom: '40px'
      }}>
        <p style={{ marginBottom: '20px' }}>
          This letter serves as official verification that <strong style={{ color: '#1e40af' }}>
          {data.teacherName || data.studentName}</strong> is a current Teacher member in good standing 
          at {data.universityName || 'our institution'}.
        </p>

        <div style={{
          background: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          padding: '25px',
          marginBottom: '25px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e40af', marginBottom: '15px' }}>
            Teacher DETAILS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Full Name:</div>
              <div style={{ fontWeight: '600' }}> {data.teacherName || data.studentName}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Teacher ID:</div>
              <div style={{ fontWeight: '600', fontFamily: 'monospace' }}>{data.teacherID || 'FAC1234'}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Department:</div>
              <div style={{ fontWeight: '600' }}>{data.department || 'Department Name'}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Academic Rank:</div>
              <div style={{ fontWeight: '600' }}>{data.position || 'Professor'}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Specialization:</div>
              <div style={{ fontWeight: '600' }}>{data.major || 'Academic Field'}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '3px' }}>Employment Start:</div>
              <div style={{ fontWeight: '600' }}>{data.employmentStartDate || 'MM/DD/YYYY'}</div>
            </div>
          </div>
        </div>

        <p style={{ marginBottom: '20px' }}>
           {data.teacherName?.split(' ')[1] || 'Teacher'} has been employed with our institution since{' '}
          <strong>{data.employmentStartDate || 'the specified date'}</strong> and maintains an exemplary record 
          of teaching, research, and service. Their academic credentials and professional standing have been 
          verified through our standard institutional processes.
        </p>

        <p style={{ marginBottom: '20px' }}>
          This verification is issued for official purposes and confirms the individual's current employment 
          status, academic qualifications, and professional standing within our academic community.
        </p>

        <p style={{ marginBottom: '30px' }}>
          Should you require additional information or verification, please contact our Office of Academic 
          Affairs at the address listed above or via telephone at (555) 123-4567.
        </p>
      </div>

      {/* Closing */}
      <div style={{
        fontSize: '16px',
        marginBottom: '50px',
        color: '#1e293b'
      }}>
        <p style={{ marginBottom: '10px' }}>Sincerely,</p>
      </div>

      {/* Signature Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '30px'
      }}>
        <div style={{ flex: 1 }}>
          {/* President Signature */}
          <div style={{
            fontSize: '32px',
            fontFamily: "'Brush Script MT', cursive",
            color: '#1e40af',
            marginBottom: '5px',
            height: '50px',
            display: 'flex',
            alignItems: 'center'
          }}>
             {data.presidentName || 'Margaret Thompson'}
          </div>
          <div style={{
            borderTop: '1px solid #64748b',
            paddingTop: '8px',
            fontSize: '14px',
            color: '#1e293b'
          }}>
            <div style={{ fontWeight: '600' }}> {data.presidentName || 'Margaret Thompson'}</div>
            <div style={{ color: '#64748b' }}>President</div>
            <div style={{ color: '#64748b' }}>{data.universityName || 'University Name'}</div>
          </div>
        </div>

        {/* Official Seal */}
        <div style={{
          width: '100px',
          height: '100px',
          marginLeft: '40px'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '3px solid #1e40af',
            position: 'relative'
          }}>
            <div>
              OFFICIAL<br/>UNIVERSITY<br/>SEAL
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              fontSize: '8px',
              color: '#64748b'
            }}>
              AUTHENTICATED
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Security Features */}
      <div style={{
        borderTop: '3px solid #1e40af',
        paddingTop: '25px',
        marginTop: '20px'
      }}>
        {/* Document Barcode Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '15px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '8px',
          border: '1px solid #cbd5e1'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '11px', 
              color: '#1e40af', 
              fontWeight: '600', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              DOCUMENT AUTHENTICATION CODE
            </div>
            <RealisticBarcodeGenerator 
              value={`${data.referenceNumber || 'AA-2024-1234'}-${data.teacherID || 'FAC1234'}`} 
              width={400} 
              height={35} 
            />
            <div style={{ 
              fontSize: '10px', 
              color: '#64748b', 
              marginTop: '5px', 
              fontFamily: 'monospace',
              letterSpacing: '1px'
            }}>
              {data.referenceNumber || 'AA-2024-1234'}-{data.teacherID || 'FAC1234'}
            </div>
          </div>
        </div>

        {/* Simple Footer Information */}
        <div style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#64748b'
        }}>
          <div>
            <div>
              {/* <strong>Online Verification:</strong> www.{data.universityName?.toLowerCase().replace(/\s+/g, '') || 'university'}.edu/verify */}
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div>Issued: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit' 
            })}</div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: '120px',
        color: 'rgba(30, 64, 175, 0.03)',
        fontWeight: 'bold',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        OFFICIAL
      </div>
    </div>
  );
});

export default TeacherOfficialLetterTemplate;
