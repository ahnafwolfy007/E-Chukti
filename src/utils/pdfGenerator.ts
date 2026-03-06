import jsPDF from 'jspdf';

// Add custom fonts for better quality (matches LaTeX)
const addCustomStyling = (doc: jsPDF) => {
  // LaTeX-style spacing and typography settings
  doc.setProperties({
    title: 'eChukti Contract',
    subject: 'Legal Contract Document',
    author: 'eChukti Platform',
    creator: 'eChukti Digital Contract System'
  });
};

// Helper function to render text with inline bold formatting
function renderLineWithInlineBold(doc: jsPDF, text: string, startX: number, startY: number, _maxWidth: number) {
  const parts = text.split('**');
  let xPosition = startX;
  
  parts.forEach((part, index) => {
    if (part === '') return;
    
    // Odd indices are bold, even are normal
    if (index % 2 === 1) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
    }
    
    doc.text(part, xPosition, startY);
    xPosition += doc.getTextWidth(part);
  });
}

export function generatePDF(content: string, filename: string = 'contract.pdf') {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  addCustomStyling(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25.4; // 1 inch = 25.4mm (matches LaTeX)
  const maxLineWidth = pageWidth - (margin * 2);
  const lineHeight = 6; // Tighter spacing like LaTeX
  let yPosition = margin;

  // Professional header matching format.tex style
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('eChukti', margin, yPosition);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(' | Contract Template', margin + 18, yPosition);
  
  // Page number placeholder (will be added per page)
  doc.text(String(doc.getCurrentPageInfo().pageNumber), pageWidth - margin, yPosition);
  
  // Header rule
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.3);
  doc.line(margin, yPosition + 1.5, pageWidth - margin, yPosition + 1.5);
  
  yPosition += 12; // Line spacing set to 1.15 * font size

  // Parse markdown-style content and add to PDF
  const lines = content.split('\n');
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    const trimmedLine = line.trim();

    // Skip empty lines but add some space
    if (trimmedLine === '' || trimmedLine === '---') {
      yPosition += lineHeight / 2;
      return;
    }

    // Handle headers
    if (trimmedLine.startsWith('# ')) {
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      const text = trimmedLine.substring(2);
      doc.text(text, margin, yPosition);
      yPosition += lineHeight * 1.5;
    } else if (trimmedLine.startsWith('## ')) {
      yPosition += lineHeight / 2;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      const text = trimmedLine.substring(3);
      doc.text(text, margin, yPosition);
      yPosition += lineHeight * 1.3;
    } else if (trimmedLine.startsWith('### ')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      const text = trimmedLine.substring(4);
      doc.text(text, margin, yPosition);
      yPosition += lineHeight * 1.2;
    } 
    // Handle list items
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const text = '• ' + trimmedLine.substring(2);
      
      // Handle inline bold in list items
      if (text.includes('**')) {
        renderLineWithInlineBold(doc, text, margin + 5, yPosition, maxLineWidth - 5);
        yPosition += lineHeight;
      } else {
        const splitText = doc.splitTextToSize(text, maxLineWidth - 5);
        splitText.forEach((textLine: string) => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(textLine, margin + 5, yPosition);
          yPosition += lineHeight;
        });
      }
    } 
    // Handle text with inline bold
    else if (trimmedLine.includes('**')) {
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      renderLineWithInlineBold(doc, trimmedLine, margin, yPosition, maxLineWidth);
      yPosition += lineHeight;
    } 
    // Regular paragraph text
    else {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const splitText = doc.splitTextToSize(trimmedLine, maxLineWidth);
      splitText.forEach((textLine: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(textLine, margin, yPosition);
        yPosition += lineHeight;
      });
    }
  });

  // Add footer on all pages (LaTeX-style)
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer with page number (centered, like LaTeX)
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(
      String(i),
      pageWidth / 2,
      pageHeight - 20,
      { align: 'center' }
    );
    
    // Bottom text
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      'Generated by eChukti Digital Platform',
      pageWidth / 2,
      pageHeight - 13,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(filename);
}

export function previewPDF(content: string): string {
  // For preview, we'll return the HTML formatted version
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^\* (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^---$/gm, '<hr class="my-4 border-neutral-300" />')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, '<br />');
}
