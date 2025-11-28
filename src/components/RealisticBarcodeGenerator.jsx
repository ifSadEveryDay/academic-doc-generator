import React from 'react';

// More realistic barcode generator using Code 128 encoding
const RealisticBarcodeGenerator = ({ value, width = 300, height = 35 }) => {
  // Code 128 character set patterns (simplified version)
  const code128Patterns = {
    // Start codes
    'START_A': [1,1,0,1,0,0,1,1,0,0,0],
    'START_B': [1,1,0,1,0,0,1,0,1,1,0],
    'START_C': [1,1,0,1,0,0,1,0,0,1,1],
    
    // Numbers 0-9
    '0': [1,1,0,1,1,0,0,1,1,0,0],
    '1': [1,1,0,0,1,1,0,1,1,0,0],
    '2': [1,1,0,0,1,1,0,0,1,1,0],
    '3': [1,0,0,1,0,1,1,0,0,1,1],
    '4': [1,0,0,1,0,0,1,1,0,1,1],
    '5': [1,0,0,1,1,0,1,0,0,1,1],
    '6': [1,0,0,1,1,0,0,1,0,1,1],
    '7': [1,0,0,1,0,1,1,0,1,1,0],
    '8': [1,0,0,1,0,1,0,1,1,0,1],
    '9': [1,1,0,1,0,1,0,0,1,0,1],
    
    // Letters A-Z (simplified selection)
    'A': [1,0,1,0,0,1,1,0,1,1,0],
    'B': [1,0,1,0,0,1,0,1,1,0,1],
    'C': [1,0,1,0,0,1,0,1,0,1,1],
    'D': [1,0,1,1,0,1,0,0,1,0,1],
    'E': [1,0,1,1,0,0,1,0,1,0,1],
    'F': [1,0,1,1,0,0,1,0,0,1,1],
    'G': [1,0,1,0,1,1,0,0,1,0,1],
    'H': [1,0,1,0,1,0,1,1,0,0,1],
    'I': [1,0,1,0,1,0,1,0,1,1,0],
    'J': [1,1,0,1,0,1,0,1,0,0,1],
    'K': [1,1,0,1,0,0,1,0,1,0,1],
    'L': [1,1,0,1,0,0,1,0,0,1,1],
    'M': [1,0,0,1,1,0,1,1,0,1,0],
    'N': [1,0,0,1,1,0,1,0,1,1,0],
    'O': [1,0,0,1,1,0,1,0,1,0,1],
    'P': [1,1,0,0,1,0,1,1,0,1,0],
    'Q': [1,1,0,0,1,0,1,0,1,1,0],
    'R': [1,1,0,0,1,0,1,0,1,0,1],
    'S': [1,0,1,1,0,1,1,0,0,1,0],
    'T': [1,0,1,1,0,0,1,1,0,1,0],
    'U': [1,0,1,0,1,1,0,1,1,0,0],
    'V': [1,0,1,0,0,1,1,0,1,1,0],
    'W': [1,0,1,0,0,1,1,0,0,1,1],
    'X': [1,0,1,1,0,0,1,1,0,0,1],
    'Y': [1,0,1,1,0,0,1,0,1,1,0],
    'Z': [1,0,1,1,0,0,1,0,1,0,1],
    
    // Special characters
    '-': [1,0,0,1,0,1,0,1,1,0,1],
    ' ': [1,1,0,0,1,0,1,0,0,1,1],
    
    // Stop pattern
    'STOP': [1,1,0,0,0,1,1,0,1,0,0,0,1,1]
  };

  // Clean and prepare the value
  const cleanValue = value.toString().toUpperCase().replace(/[^A-Z0-9\-\s]/g, '');
  
  // Generate barcode pattern
  const generatePattern = () => {
    const bars = [];
    
    // Add start pattern (START_B for alphanumeric)
    bars.push(...code128Patterns['START_B']);
    
    // Add quiet zone
    bars.push(0, 0);
    
    // Encode each character
    for (let i = 0; i < cleanValue.length; i++) {
      const char = cleanValue[i];
      const pattern = code128Patterns[char];
      
      if (pattern) {
        bars.push(...pattern);
        // Add inter-character gap
        if (i < cleanValue.length - 1) {
          bars.push(0);
        }
      }
    }
    
    // Add checksum simulation (simplified)
    const checksumPattern = code128Patterns[Math.floor(Math.random() * 10).toString()];
    bars.push(0, ...checksumPattern);
    
    // Add stop pattern
    bars.push(0, ...code128Patterns['STOP']);
    
    // Add quiet zone
    bars.push(0, 0);
    
    return bars;
  };

  const fullPattern = generatePattern();
  const barWidth = width / fullPattern.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg 
        width={width} 
        height={height} 
        style={{ 
          display: 'block',
          background: 'white',
          border: '1px solid #f0f0f0',
          borderRadius: '2px'
        }}
      >
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="white" />
        
        {/* Barcode bars */}
        {fullPattern.map((bar, index) => {
          const x = index * barWidth;
          const barHeight = bar ? height * 0.85 : 0; // Bars are 85% of total height
          const y = height * 0.075; // Start bars 7.5% from top
          
          return bar ? (
            <rect
              key={index}
              x={x}
              y={y}
              width={Math.max(barWidth * 0.8, 0.5)} // Minimum width for thin bars
              height={barHeight}
              fill="#000000"
            />
          ) : null;
        })}
        
        {/* Guard patterns (start, middle, end) */}
        <rect x="2" y="0" width="1" height={height} fill="#000" opacity="0.3" />
        <rect x={width/2 - 0.5} y="0" width="1" height={height} fill="#000" opacity="0.3" />
        <rect x={width - 3} y="0" width="1" height={height} fill="#000" opacity="0.3" />
      </svg>
    </div>
  );
};

export default RealisticBarcodeGenerator;
