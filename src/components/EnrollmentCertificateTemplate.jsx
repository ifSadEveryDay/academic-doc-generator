import React, { forwardRef } from 'react';

const EnrollmentCertificateTemplate = forwardRef(({ data }, ref) => {
  const formatReferenceNumber = () => {
    if (data.referenceNumber) return data.referenceNumber;
    const rawIssueDate = typeof data.issueDate === 'string' ? data.issueDate : '';
    const yyyymmdd = rawIssueDate.replace(/[^0-9]/g, '').slice(-8);
    const idPart = data.studentID ? String(data.studentID).replace(/\s+/g, '') : 'STUDENT';
    return `REG-${idPart}-${yyyymmdd || '00000000'}`;
  };

  const labelCellStyle = {
    padding: '6px 0',
    width: '240px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
  };

  const valueCellStyle = {
    padding: '6px 0',
    verticalAlign: 'top',
    wordBreak: 'break-word',
  };

  return (
    <div ref={ref} style={{ 
        fontFamily: "'Times New Roman', Times, serif", 
        lineHeight: 1.8, 
        padding: '50px', 
        color: '#333',
        backgroundColor: 'white',
        width: '800px',
        minHeight: '1000px',
        boxSizing: 'border-box'
    }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#333' }}>{data.universityName}</h1>
            <div style={{ fontSize: '14px', color: '#666' }}>Office of the University Registrar</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{data.universityAddress || '123 University Blvd, City, State, 12345'}</div>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
                Certificate of Enrollment
            </h2>
        </div>

        <div style={{ fontSize: '14px', textAlign: 'right', marginBottom: '40px' }}>
            <div><strong>Reference No.:</strong> {formatReferenceNumber()}</div>
            <div><strong>Date Issued:</strong> {data.issueDate}</div>
        </div>

        {/* Body */}
        <div style={{ fontSize: '16px', lineHeight: '2', textAlign: 'justify', marginBottom: '60px' }}>
            <p style={{ marginBottom: '30px' }}>To Whom It May Concern:</p>
            
            <p>
                This is to certify that <strong>{data.studentName}</strong> (Student ID: <strong>{data.studentID}</strong>) is currently enrolled as a
                <strong> full-time</strong> student at <strong>{data.universityName}</strong>.
            </p>

            <div style={{ backgroundColor: '#f8f9fa', padding: '18px 20px', margin: '25px 0', border: '1px solid #e5e7eb' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', tableLayout: 'fixed' }}>
                <tbody>
                  <tr>
                    <td style={labelCellStyle}>Program:</td>
                    <td style={valueCellStyle}>{data.program}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>Major:</td>
                    <td style={valueCellStyle}>{data.major}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>College/School:</td>
                    <td style={valueCellStyle}>{data.college}</td>
                  </tr>
                  {data.passportNumber ? (
                    <tr>
                      <td style={labelCellStyle}>Passport No.:</td>
                      <td style={valueCellStyle}>{data.passportNumber}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td style={labelCellStyle}>Term:</td>
                    <td style={valueCellStyle}>
                      {data.term}{data.academicYear ? <> (Academic Year: <strong>{data.academicYear}</strong>)</> : null}
                    </td>
                  </tr>
                  {/* {data.termStartDate && data.termEndDate ? (
                    <tr>
                      <td style={labelCellStyle}>Term Dates:</td>
                      <td style={valueCellStyle}>{data.termStartDate} to {data.termEndDate}</td>
                    </tr>
                  ) : null} */}
                  {data.registrationDate ? (
                    <tr>
                      <td style={labelCellStyle}>Registration Date:</td>
                      <td style={valueCellStyle}>{data.registrationDate}</td>
                    </tr>
                  ) : null}
                  {data.admissionDate ? (
                    <tr>
                      <td style={labelCellStyle}>Admission/Matriculation Date:</td>
                      <td style={valueCellStyle}>{data.admissionDate}</td>
                    </tr>
                  ) : null}
                  {data.currentTermCreditHours ? (
                    <tr>
                      <td style={labelCellStyle}>Credit Load (Current Term):</td>
                      <td style={valueCellStyle}>{data.currentTermCreditHours} credit hours</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td style={labelCellStyle}>Anticipated Graduation Date:</td>
                    <td style={valueCellStyle}>{data.anticipatedGraduationDate || 'May 2028'}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>Academic Standing:</td>
                    <td style={valueCellStyle}>{data.academicStanding || 'Good Standing'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>
                This certification is issued by the Office of the University Registrar upon the request of the student and is intended for official purposes.
            </p>

            <p style={{ marginTop: '20px' }}>
                This certificate is not valid if altered or if erasures appear.
            </p>
            
            <p style={{ marginTop: '30px' }}>
                If additional information is required, please contact the Office of the University Registrar.
            </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <div style={{
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive",
                  fontSize: '38px',
                  color: '#111',
                  lineHeight: 1,
                  marginBottom: '6px'
                }}>
                  {data.officials ? data.officials.registrar : 'Registrar Name'}
                </div>
                <div style={{ borderBottom: '1px solid #333', width: '250px', marginBottom: '10px' }}></div>
                <div style={{ fontWeight: 'bold' }}>{data.officials ? data.officials.registrar : 'Registrar Name'}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>University Registrar</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', maxWidth: '320px' }}>
                  {data.universityAddress || '123 University Blvd, City, State, 12345'}
                </div>
                {(data.registrarPhone || data.registrarEmail) ? (
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {data.registrarPhone ? <>{data.registrarPhone}</> : null}
                    {(data.registrarPhone && data.registrarEmail) ? <>{' | '}</> : null}
                    {data.registrarEmail ? <>{data.registrarEmail}</> : null}
                  </div>
                ) : null}
                {/* <div style={{ fontSize: '12px', color: '#666' }}>
                  {data.registrarPhone || '(000) 000-0000'}
                  {' | '}
                  {data.registrarEmail || 'registrar@university.edu'}
                </div> */}
            </div>
            
            <div style={{ textAlign: 'right', maxWidth: '240px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                  <em>This document is electronically generated and valid without a physical signature.</em>
                </div>
            </div>
        </div>
    </div>
  );
});

export default EnrollmentCertificateTemplate;
