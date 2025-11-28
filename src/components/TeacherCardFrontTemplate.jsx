import React, { forwardRef } from 'react';
import RealisticBarcodeGenerator from './RealisticBarcodeGenerator';

const TeacherCardFrontTemplate = forwardRef(({ data }, ref) => {
  return (
    <div 
      ref={ref} 
      style={{
        width: '750px',
        height: '480px',
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
        color: 'white',
        padding: '20px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        height: '140px',
        flexShrink: 0,
        position: 'relative'
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <div style={{
          width: '100px',
          height: '100px',
          background: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.2)'
        }}>
          {data.universityLogo ? (
            <img src={data.universityLogo} alt="Logo" style={{ width: '85px', height: '85px', objectFit: 'contain' }} />
          ) : (
            <svg width="85" height="85" viewBox="0 0 100 100">
              <rect x="10" y="10" width="80" height="80" fill="#1e40af" rx="8"/>
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Teacher</text>
            </svg>
          )}
        </div>
        <div style={{ flex: 1, zIndex: 1 }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px', lineHeight: 1.1 }}>
            {data.universityName}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.95, lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Teacher IDENTIFICATION
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '2px', fontWeight: '500' }}>
            Academic Staff Credential
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        padding: '25px 30px',
        display: 'flex',
        gap: '25px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Photo */}
        <div style={{
          width: '130px',
          height: '170px',
          background: '#f1f5f9',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {data.teacherPhoto ? (
            <img src={data.teacherPhoto} alt="Teacher" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
              Teacher<br/>PHOTO
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '5px 0'
        }}>
          {/* Teacher Name */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '13px', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600' }}>
              Teacher NAME
            </div>
            <div style={{ fontSize: '22px', fontWeight: 600, color: '#1e293b', letterSpacing: '0.5px' }}>
               {data.teacherName || data.studentName}
            </div>
          </div>

          {/* Teacher ID */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '13px', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600' }}>
              Teacher ID
            </div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', fontFamily: 'monospace', letterSpacing: '1px' }}>
              {data.teacherID || data.studentID}
            </div>
          </div>

          {/* Department */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '13px', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600' }}>
              DEPARTMENT
            </div>
            <div style={{ fontSize: '18px', fontWeight: 500, color: '#334155', lineHeight: 1.2 }}>
              {data.department || data.college}
            </div>
          </div>

          {/* Academic Rank */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '13px', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600' }}>
              ACADEMIC RANK
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              color: '#7c3aed',
              padding: '4px 12px',
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              borderRadius: '6px',
              display: 'inline-block',
              border: '1px solid #c4b5fd'
            }}>
              {data.position || 'Professor'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 30px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '2px solid #1e40af',
        height: '85px',
        flexShrink: 0,
        position: 'relative'
      }}>
        {/* Security strip */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #1e40af 0%, #7c3aed 50%, #1e40af 100%)'
        }} />
        
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: '#1e40af', textTransform: 'uppercase', marginBottom: '2px', fontWeight: '600' }}>
            ISSUED
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
            {data.cardIssueDate || '01/15/2023'}
          </div>
        </div>
        
        {/* Barcode */}
        <div style={{ textAlign: 'center', flex: 1, maxWidth: '280px' }}>
          <RealisticBarcodeGenerator value={data.teacherID || data.studentID || 'T1234-567'} width={220} height={26} />
          <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px', letterSpacing: '1px', fontFamily: 'monospace' }}>
            Teacher ID: {data.teacherID || data.studentID || 'T1234-567'}
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#1e40af', textTransform: 'uppercase', marginBottom: '2px', fontWeight: '600' }}>
            EXPIRES
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
            {data.cardValidDate || '01/15/2027'}
          </div>
        </div>
        
        {/* Security hologram indicator */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          right: '8px',
          fontSize: '8px',
          color: '#64748b',
          opacity: 0.7
        }}>
          🔒 SECURE
        </div>
      </div>
    </div>
  );
});

export default TeacherCardFrontTemplate;
