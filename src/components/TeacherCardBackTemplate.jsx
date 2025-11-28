import React, { forwardRef } from 'react';

const TeacherCardBackTemplate = forwardRef(({ data }, ref) => {
  return (
    <div 
      ref={ref} 
      style={{
        width: '750px',
        height: '480px',
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        overflow: 'hidden',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Security magnetic stripe */}
      <div style={{
        height: '60px',
        background: 'linear-gradient(90deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        width: '100%',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '10px',
          letterSpacing: '2px'
        }}>
          MAGNETIC STRIPE - DO NOT DAMAGE
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '25px 30px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        {/* Header with security pattern */}
        <div style={{
          marginBottom: '20px',
          padding: '15px 20px',
          background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
          borderRadius: '8px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100%',
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }} />
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', zIndex: 1, position: 'relative' }}>
            FACULTY IDENTIFICATION CARD
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9, zIndex: 1, position: 'relative' }}>
            Academic Staff Credential • Security Level: High
          </div>
        </div>

        {/* Faculty Information Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Left Column */}
          <div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                fontSize: '12px',
                color: '#1e40af',
                textTransform: 'uppercase',
                marginBottom: '4px',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                OFFICE ADDRESS
              </div>
              <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.4 }}>
                {data.address}
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                fontSize: '12px',
                color: '#1e40af',
                textTransform: 'uppercase',
                marginBottom: '4px',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                ACADEMIC CREDENTIALS
              </div>
              <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.4 }}>
                Ph.D. in {data.department || data.college}<br/>
                M.A. in Education<br/>
                B.S. in {data.major || 'Science'}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                fontSize: '12px',
                color: '#1e40af',
                textTransform: 'uppercase',
                marginBottom: '4px',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                EMPLOYMENT DETAILS
              </div>
              <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Department:</strong> {data.department || data.college}
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Rank:</strong> {data.position || 'Professor'}
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Tenure:</strong> {data.employmentStartDate || '08/15/2020'}
                </div>
                <div>
                  <strong>Office:</strong> Room {Math.floor(Math.random() * 900) + 100}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div style={{
          fontSize: '13px',
          color: '#64748b',
          lineHeight: 1.4,
          padding: '12px 15px',
          background: '#f1f5f9',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          marginBottom: '20px'
        }}>
          <strong style={{ color: '#1e40af' }}>SECURITY NOTICE:</strong> This faculty identification card is the property of {data.universityName || 'the University'} and grants access to restricted academic facilities, laboratories, and administrative areas. This card must be displayed at all times while on campus. Loss or theft must be reported immediately to Campus Security. Unauthorized use is prohibited and subject to disciplinary action.
        </div>

        {/* Signature and Seal section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
          paddingTop: '15px',
          borderTop: '2px solid #e2e8f0'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '24px',
              fontFamily: "'Brush Script MT', cursive",
              color: '#1e293b',
              marginBottom: '2px'
            }}>
              Dr. {data.teacherName || data.studentName}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
              Faculty Member Signature
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Authorized by Human Resources • ID Verified
            </div>
          </div>
          <div style={{ 
            width: '100px', 
            height: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {data.universityLogo ? (
              <img src={data.universityLogo} alt="Official Seal" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
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
            <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '4px', textAlign: 'center' }}>
              OFFICIAL SEAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TeacherCardBackTemplate;
