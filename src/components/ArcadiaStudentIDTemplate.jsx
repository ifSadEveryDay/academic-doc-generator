import React, { forwardRef } from 'react';
import RealisticBarcodeGenerator from './RealisticBarcodeGenerator';

const ArcadiaStudentIDTemplate = forwardRef(({ data }, ref) => {
  return (
    <div 
      ref={ref} 
      style={{
        position: 'relative',
        width: '400px',
        height: '640px',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'visible',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {/* Header - Blue Background */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        height: '120px',
        flexShrink: 0
      }}>
        {/* School Logo */}
        <div style={{
          width: '70px',
          height: '70px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.3)'
        }}>
          {data.universityLogo ? (
            <img src={data.universityLogo} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          ) : (
            <svg width="60" height="60" viewBox="0 0 100 100">
              <rect x="20" y="30" width="60" height="50" fill="#1e3a8a" />
              <polygon points="50,15 20,30 80,30" fill="#2563eb" />
              <rect x="35" y="45" width="10" height="15" fill="white" />
              <rect x="55" y="45" width="10" height="15" fill="white" />
              <rect x="35" y="65" width="30" height="3" fill="white" />
            </svg>
          )}
        </div>
        
        {/* School Name */}
        <div style={{ flex: 1 }}>
          {/* <div style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '2px', lineHeight: 1.1 }}>
            {data.universityName ? data.universityName.split(' ')[0] : 'ARCADIA'}
          </div> */}
          <div style={{ fontSize: '24px', fontWeight: '600', lineHeight: 1.4 }}>
            {data.universityName ? data.universityName.split(' ').join(' ').toUpperCase() : 'HIGH SCHOOL'}
          </div>
        </div>
      </div>

      {/* Body - White Background */}
      <div style={{
        flex: 1,
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fafafa',
        overflow: 'hidden'
      }}>
        {/* Photo */}
        <div style={{
          width: '200px',
          height: '240px',
          background: '#e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #ddd'
        }}>
          {data.studentPhoto ? (
            <img src={data.studentPhoto} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ color: '#999', fontSize: '16px', textAlign: 'center' }}>
              PHOTO
            </div>
          )}
        </div>

        {/* Name */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1a1a1a',
            textTransform: 'capitalize',
            letterSpacing: '0.5px'
          }}>
            {data.studentName}
          </div>
        </div>

        {/* Faculty/Department */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          <div style={{ 
            fontSize: '16px', 
            color: '#666',
            textTransform: 'uppercase',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            FACULTY
          </div>
          <div style={{ 
            fontSize: '18px', 
            color: '#333',
            fontWeight: '500'
          }}>
            {data.department || data.college || 'Department of Computer Science'}
          </div>
        </div>

        {/* Student ID */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1a1a1a',
            letterSpacing: '1px',
            fontFamily: 'monospace'
          }}>
            {data.studentID}
          </div>
        </div>

        {/* Issue Date and Expiry Date */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '10px',
          borderTop: '1px solid #ddd'
        }}>
          {/* Issue Date */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ 
              fontSize: '13px', 
              color: '#666',
              marginBottom: '3px'
            }}>
              Issue Date:
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#333'
            }}>
              {(() => {
                const date = new Date();
                date.setMonth(date.getMonth() - 1);
                return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
              })()}
            </div>
          </div>
          
          {/* Expiry Date */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ 
              fontSize: '13px', 
              color: '#666',
              marginBottom: '3px'
            }}>
              Expires:
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#333'
            }}>
              {data.cardValidDate || '08/2026'}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Barcode Strip */}
      <div style={{
        position: 'absolute',
        right: '8px',
        top: '120px',
        bottom: '0',
        width: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        <div style={{
          transform: 'rotate(90deg)',
          width: '450px',
          height: '28px'
        }}>
          <RealisticBarcodeGenerator 
            value={data.studentID || '910234567'} 
            width={450} 
            height={28}
          />
        </div>
      </div>
    </div>
  );
});

export default ArcadiaStudentIDTemplate;
