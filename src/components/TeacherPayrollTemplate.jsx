import React, { forwardRef } from 'react';

const TeacherPayrollTemplate = forwardRef(({ data }, ref) => {
  const currentDate = new Date();
  const payrollDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const payrollPeriod = `${payrollDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
  
  // Calculate pay period dates
  const periodStart = new Date(payrollDate.getFullYear(), payrollDate.getMonth(), 1);
  const periodEnd = new Date(payrollDate.getFullYear(), payrollDate.getMonth() + 1, 0);
  
  return (
    <div
      ref={ref}
      style={{
        width: '800px',
        minHeight: '1000px',
        backgroundColor: 'white',
        padding: '50px',
        fontFamily: "'Times New Roman', serif",
        color: '#1a1a1a',
        lineHeight: 1.5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '2px solid #000',
        paddingBottom: '25px'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          marginRight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {data.universityLogo ? (
            <img src={data.universityLogo} alt="University Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <svg width="70" height="70" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#1e40af"/>
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">UNI</text>
            </svg>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', color: '#000', margin: 0, fontWeight: 'normal', letterSpacing: '0.5px' }}>
            {data.universityName || 'University Name'}
          </h1>
          <p style={{ fontSize: '14px', color: '#444', margin: '8px 0 0 0', fontWeight: '400' }}>
            Human Resources Department
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>
            {data.universityAddress || '123 University Ave, City, State, ZIP'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', letterSpacing: '1px' }}>
            PAYROLL STATEMENT
          </div>
          <div style={{ fontSize: '13px', color: '#555', marginTop: '8px' }}>
            Pay Period: {payrollPeriod}
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '35px',
        backgroundColor: '#fafafa',
        padding: '25px',
        border: '1px solid #ddd'
      }}>
        <div>
          <h3 style={{ fontSize: '16px', color: '#000', marginBottom: '18px', borderBottom: '1px solid #999', paddingBottom: '8px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            EMPLOYEE INFORMATION
          </h3>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Name: </span>
            <span> {data.teacherName || 'John Doe'}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Employee ID: </span>
            <span style={{ fontFamily: 'monospace' }}>{data.teacherID || 'FAC1234'}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Department: </span>
            <span>{data.department || 'Computer Science'}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Position: </span>
            <span>{data.position || 'Professor'}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600', color: '#222' }}>Employment Type: </span>
            <span>{data.employmentType || 'Full-Time Faculty'}</span>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '16px', color: '#000', marginBottom: '18px', borderBottom: '1px solid #999', paddingBottom: '8px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            PAY PERIOD DETAILS
          </h3>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Pay Period: </span>
            <span>{periodStart.toLocaleDateString()} - {periodEnd.toLocaleDateString()}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Pay Date: </span>
            <span>{new Date(periodEnd.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Pay Frequency: </span>
            <span>Monthly</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#222' }}>Tax Year: </span>
            <span>{currentDate.getFullYear()}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600', color: '#222' }}>Check Number: </span>
            <span style={{ fontFamily: 'monospace' }}>{data.checkNumber || `CHK${Math.floor(Math.random() * 100000)}`}</span>
          </div>
        </div>
      </div>

      {/* Earnings Section */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          color: '#000', 
          marginBottom: '15px', 
          backgroundColor: '#f5f5f5', 
          padding: '12px 15px', 
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          borderLeft: '4px solid #000'
        }}>
          EARNINGS
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f8f8' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Hours/Units</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Current</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #ddd' }}>Base Salary</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.baseSalary || '8,500.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>1.00</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.baseSalary || '8,500.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.ytdBaseSalary || '76,500.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #ddd' }}>Research Stipend</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.researchStipend || '1,200.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>1.00</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.researchStipend || '1,200.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.ytdResearchStipend || '10,800.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #ddd' }}>Teaching Overload</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.overloadRate || '85.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {data.overloadHours || '12'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.overloadPay || '1,020.00'}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'monospace' }}>
                ${data.ytdOverloadPay || '6,120.00'}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
              <td style={{ padding: '12px', borderBottom: '2px solid #999' }} colSpan="3">TOTAL EARNINGS</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontFamily: 'monospace' }}>
                ${data.totalEarnings || '10,720.00'}
              </td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontFamily: 'monospace' }}>
                ${data.ytdTotalEarnings || '93,420.00'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deductions Section */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          color: '#000', 
          marginBottom: '15px', 
          backgroundColor: '#f5f5f5', 
          padding: '12px 15px', 
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          borderLeft: '4px solid #666'
        }}>
          DEDUCTIONS
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f8f8' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>Current</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #999', fontWeight: 'bold' }}>YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Federal Income Tax</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.federalTax || '2,358.40'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdFederalTax || '20,552.40'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>State Income Tax</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.stateTax || '536.00'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdStateTax || '4,671.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Social Security</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.socialSecurity || '664.64'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdSocialSecurity || '5,792.04'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Medicare</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.medicare || '155.44'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdMedicare || '1,354.59'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Health Insurance</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.healthInsurance || '285.50'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdHealthInsurance || '2,569.50'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Retirement (403b)</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.retirement || '1,072.00'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdRetirement || '9,342.00'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Dental Insurance</td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.dentalInsurance || '28.75'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.ytdDentalInsurance || '258.75'}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#fef2f2', fontWeight: '600' }}>
              <td style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>TOTAL DEDUCTIONS</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #cbd5e1', fontFamily: 'monospace' }}>
                ${data.totalDeductions || '5,100.73'}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #cbd5e1', fontFamily: 'monospace' }}>
                ${data.ytdTotalDeductions || '44,540.28'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Net Pay Summary */}
      <div style={{
        backgroundColor: '#f9f9f9',
        border: '3px solid #000',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '22px', color: '#000', margin: '0 0 12px 0', fontWeight: 'bold', letterSpacing: '1px' }}>
              NET PAY
            </h3>
            <div style={{ fontSize: '15px', color: '#555' }}>
              Total Earnings - Total Deductions
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#000', fontFamily: 'monospace' }}>
              ${data.netPay || '5,619.27'}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              YTD Net: ${data.ytdNetPay || '48,879.72'}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Deposit Information */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          color: '#000', 
          marginBottom: '15px', 
          backgroundColor: '#f5f5f5', 
          padding: '12px 15px', 
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          borderLeft: '4px solid #333'
        }}>
          DIRECT DEPOSIT
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Account Type</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Bank Name</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Account Number</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>Checking</td>
              <td style={{ padding: '8px 10px', borderBottom: '1px solid #e5e7eb' }}>
                {data.bankName || 'First National Bank'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ****{data.accountLastFour || '7892'}
              </td>
              <td style={{ padding: '8px 10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                ${data.netPay || '5,619.27'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '2px solid #ccc',
        paddingTop: '20px',
        fontSize: '12px',
        color: '#555'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <strong>Questions about your pay?</strong><br/>
            Contact HR: (555) 123-4567 | hr@university.edu
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>Employee Self-Service:</strong><br/>
            portal.university.edu/payroll
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
          <strong>CONFIDENTIAL:</strong> This document contains sensitive financial information. 
          Please keep this payroll statement secure and dispose of it properly when no longer needed.
        </div>
      </div>
    </div>
  );
});

TeacherPayrollTemplate.displayName = 'TeacherPayrollTemplate';

export default TeacherPayrollTemplate;
