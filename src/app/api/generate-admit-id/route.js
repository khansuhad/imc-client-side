import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import AdmitCardPDF from '../../dashboard/(DashboardComponents)/AdminNavItems/AdmitCard';


export async function POST(req) {
  try {
    const studentInfo = await req.json();
    console.log(studentInfo, 'Received student info');

    // Generate PDF as a Blob
    const blob = await pdf(<AdmitCardPDF studentInfo={studentInfo} />).toBlob();
    
    // Convert Blob to Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set headers for PDF download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="admit-card.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}