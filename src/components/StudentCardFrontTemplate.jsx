import React, { forwardRef } from 'react';

// Simple Barcode Generator Component
const BarcodeGenerator = ({ value, width = 300, height = 35 }) => {
  // Convert value to a string and create a more realistic barcode pattern
  const barcodeValue = value.toString().replace(/[^0-9]/g, ''); // Keep only numbers
  const bars = [];
  
  // Enhanced barcode pattern: each digit creates a longer pattern of bars (Code 128 style)
  for (let i = 0; i < barcodeValue.length; i++) {
    const digit = parseInt(barcodeValue[i]);
    // Create a more detailed pattern based on the digit
    const pattern = [
      [1,1,0,1,0,0,1,0], // 0
      [1,0,1,1,0,0,1,0], // 1
      [1,0,0,1,1,0,1,0], // 2
      [0,1,1,0,1,0,1,0], // 3
      [0,1,0,1,1,0,1,0], // 4
      [0,0,1,1,1,0,1,0], // 5
      [1,1,1,0,0,1,0,0], // 6
      [1,1,0,0,1,0,1,0], // 7
      [1,0,1,0,1,0,1,0], // 8
      [0,1,1,1,0,1,0,0]  // 9
    ][digit];
    
    bars.push(...pattern);
    // Add separator between digits
    if (i < barcodeValue.length - 1) {
      bars.push(0);
    }
  }
  
  // Add start and end patterns (longer for more realistic look)
  const startPattern = [1,1,0,1,0,1];
  const endPattern = [1,0,1,1,0,1];
  const fullPattern = [...startPattern, ...bars, ...endPattern];
  
  const barWidth = width / fullPattern.length;
  
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fullPattern.map((bar, index) => (
        <rect
          key={index}
          x={index * barWidth}
          y={0}
          width={barWidth}
          height={height}
          fill={bar ? '#000' : 'transparent'}
        />
      ))}
    </svg>
  );
};

const StudentCardFrontTemplate = forwardRef(({ data }, ref) => {
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
        background: data.cardColor || '#3e80cc',
        color: 'white',
        padding: '22px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: '22px',
        height: '135px',
        flexShrink: 0
      }}>
        <div style={{
          width: '112px',
          height: '112px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          {data.universityLogo ? (
            <img src={data.universityLogo} alt="Logo" style={{ width: '97px', height: '97px', objectFit: 'contain' }} />
          ) : (
            <svg width="97" height="97" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="#4a5568"/>
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="14">LOGO</text>
            </svg>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '33px', fontWeight: 'bold', marginBottom: '3px', lineHeight: 1.2 }}>
            {data.universityName}
          </div>
          <div style={{ fontSize: '18px', opacity: 0.95, lineHeight: 1.3, textTransform: 'uppercase' }}>
            {data.cardSubtitle || 'INTERNATIONAL STUDENT ID CARD'}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        padding: '25px 30px',
        display: 'flex',
        gap: '30px',
        background: '#fafafa',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Photo */}
        <div style={{
          width: '140px',
          height: '180px',
          background: '#e0e0e0',
          borderRadius: '9px',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #ddd'
        }}>
          {data.studentPhoto ? (
            <img src={data.studentPhoto} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ color: '#999', fontSize: '16px', textAlign: 'center' }}>
              PHOTO<br/>3x4
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: '7px 0'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '15px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.75px', marginBottom: '3px' }}>
              NAME
            </div>
            <div style={{ fontSize: '24px', fontWeight: 500, color: '#333' }}>
              {data.studentName}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '15px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.75px', marginBottom: '3px' }}>
              STUDENT ID
            </div>
            <div style={{ fontSize: '24px', fontWeight: 500, color: '#333' }}>
              {data.studentID}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '15px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.75px', marginBottom: '3px' }}>
              FACULTY
            </div>
            <div style={{ fontSize: '24px', fontWeight: 500, color: '#333' }}>
              {data.college}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '18px 30px',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #e0e0e0',
        height: '90px',
        flexShrink: 0
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', marginBottom: '3px' }}>
            ISSUE DATE
          </div>
          <div style={{ fontSize: '19px', fontWeight: 500, color: '#333' }}>
            {data.cardIssueDate || '01/15/2023'}
          </div>
        </div>
        
        {/* Barcode */}
        <div style={{ textAlign: 'center' }}>
          <BarcodeGenerator value={data.studentID || '123456-7890'} />
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px', letterSpacing: '1px' }}>
            {data.studentID || '123456-7890'}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', marginBottom: '3px' }}>
            VALID UNTIL
          </div>
          <div style={{ fontSize: '19px', fontWeight: 500, color: '#333' }}>
            {data.cardValidDate || '01/15/2027'}
          </div>
        </div>
      </div>
    </div>
  );
});

export default StudentCardFrontTemplate;
