import React, { forwardRef } from 'react';

const ScheduleTemplate = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} style={{ 
        fontFamily: "'Times New Roman', Times, serif", 
        lineHeight: 1.6, 
        padding: '40px', 
        color: '#333',
        backgroundColor: 'white',
        width: '800px',
        minHeight: '1000px',
        boxSizing: 'border-box'
    }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#50212f' }}>{data.universityName}</h1>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Office of the University Registrar</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{data.universityAddress || '123 University Blvd, City, State, 12345'}</div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0' }}>
                Official Course Schedule
            </h2>
            <div style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>{data.term}</div>
        </div>

        {/* Date and Student Info */}
        <div style={{ marginBottom: '25px', border: '1px solid #ccc', padding: '15px', backgroundColor: '#f9f9f9' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <tr>
                        <td style={{ padding: '4px 8px', width: '25%' }}><strong>Student Name:</strong></td>
                        <td style={{ padding: '4px 8px', width: '25%' }}>{data.studentName}</td>
                        <td style={{ padding: '4px 8px', width: '25%' }}><strong>Student ID:</strong></td>
                        <td style={{ padding: '4px 8px', width: '25%' }}>{data.studentID}</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 8px' }}><strong>Program:</strong></td>
                        <td style={{ padding: '4px 8px' }}>{data.program}</td>
                        <td style={{ padding: '4px 8px' }}><strong>Major:</strong></td>
                        <td style={{ padding: '4px 8px' }}>{data.major}</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 8px' }}><strong>College:</strong></td>
                        <td style={{ padding: '4px 8px', fontSize: '13px' }}>{data.college}</td>
                        <td style={{ padding: '4px 8px' }}><strong>Date Issued:</strong></td>
                        <td style={{ padding: '4px 8px' }}>{data.issueDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Course Schedule Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Course</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Section</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Course Title</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'center', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Credits</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Days</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Time</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Location</th>
                    <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Instructor</th>
                </tr>
            </thead>
            <tbody>
                {data.courses && data.courses.current ? data.courses.current.map((course, idx) => (
                    <tr key={idx}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.code}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.section}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{course.hours}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.days}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.time}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.location}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.instructor}</td>
                    </tr>
                )) : (
                    <tr><td colSpan="8" style={{ border: '1px solid #ddd', padding: '8px' }}>No schedule data</td></tr>
                )}
            </tbody>
        </table>
        
        {/* Summary Section */}
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <tr>
                        <td style={{ padding: '4px 8px' }}><strong>Total Registered Credits:</strong></td>
                        <td style={{ padding: '4px 8px' }}>{data.stats && data.stats.current ? data.stats.current.attempted.toFixed(2) : '0.00'}</td>
                        <td style={{ padding: '4px 8px' }}><strong>Enrollment Status:</strong></td>
                        <td style={{ padding: '4px 8px' }}>Full-Time Student</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '4px 8px' }}><strong>Academic Standing:</strong></td>
                        <td style={{ padding: '4px 8px' }}>Good Standing</td>
                        <td style={{ padding: '4px 8px' }}><strong>Registration Date:</strong></td>
                        <td style={{ padding: '4px 8px' }}>{data.statementDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Important Notes */}
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', backgroundColor: '#fffef0' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>Important Information:</div>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', lineHeight: '1.8' }}>
                <li>This schedule is official and valid for the {data.term} academic term.</li>
                <li>Students are responsible for attending all registered courses.</li>
                <li>Course schedules are subject to change. Check with the Registrar's Office for updates.</li>
                <li>Add/Drop period ends two weeks after the start of the semester.</li>
                <li>Withdrawal deadline: See academic calendar for specific dates.</li>
            </ul>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ccc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div style={{ borderBottom: '1px solid #333', width: '250px', marginBottom: '8px' }}></div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{data.officials ? data.officials.registrar : 'University Registrar'}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Office of the University Registrar</div>
                </div>
                
                <div style={{ textAlign: 'right', fontSize: '11px', color: '#888', maxWidth: '250px' }}>
                    <div style={{ marginBottom: '5px' }}><strong>Document ID:</strong> SCH-{data.studentID}-{new Date().getFullYear()}</div>
                    <em>This is an official document. Any alterations will invalidate this schedule.</em>
                </div>
            </div>
        </div>

        {/* Bottom Notice */}
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
            *** OFFICIAL COURSE SCHEDULE - {data.universityName.toUpperCase()} ***
        </div>
    </div>
  );
});

export default ScheduleTemplate;
