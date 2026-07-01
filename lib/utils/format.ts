export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatAddress(address: string, city: string): string {
  return city ? `${address}, ${city}` : address;
}

export function generateQuotePDF(
  quote: any,
  businessName: string = 'Real Estate Media'
): string {
  // Basic PDF generation using HTML template
  // This would be replaced with a proper PDF library like jsPDF or react-pdf
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #1a202c; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a202c; padding-bottom: 20px; }
        .business-name { font-size: 24px; font-weight: bold; color: #d4af37; }
        .title { font-size: 20px; font-weight: bold; margin-top: 20px; }
        .section { margin-top: 20px; }
        .section-title { font-weight: bold; margin-top: 15px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        .two-column { display: flex; gap: 40px; }
        .column { flex: 1; }
        .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .label { font-weight: bold; }
        .breakdown { margin-left: 20px; margin-top: 10px; }
        .breakdown-item { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 14px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
        .disclaimer { font-size: 12px; color: #666; margin-top: 20px; }
        .total-row { font-weight: bold; font-size: 16px; display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #d4af37; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="business-name">${businessName}</div>
        <div class="title">Real Estate Media Quote</div>
      </div>

      <div class="section">
        <div class="section-title">Agent Information</div>
        <div class="row"><span class="label">Name:</span><span>${quote.agentInfo.name}</span></div>
        <div class="row"><span class="label">Brokerage:</span><span>${quote.agentInfo.brokerage}</span></div>
        <div class="row"><span class="label">Email:</span><span>${quote.agentInfo.email}</span></div>
        <div class="row"><span class="label">Phone:</span><span>${quote.agentInfo.phone}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Property Information</div>
        <div class="row"><span class="label">Address:</span><span>${quote.propertyInfo.address}, ${quote.propertyInfo.city}</span></div>
        <div class="row"><span class="label">Square Footage:</span><span>${quote.propertyInfo.squareFootage.toLocaleString()}</span></div>
        <div class="row"><span class="label">Listing Price:</span><span>$${quote.propertyInfo.listingPrice.toLocaleString()}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Quote Details</div>
        <div class="row"><span class="label">Package:</span><span>${quote.selectedPackage || 'Custom'}</span></div>
        <div class="row"><span class="label">Status:</span><span>${quote.status}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Pricing Breakdown</div>
        <div class="breakdown">
          ${quote.clientNotes ? `<div class="breakdown-item"><span>Notes:</span><span>${quote.clientNotes}</span></div>` : ''}
          ${quote.finalTotal ? `<div class="total-row"><span>Final Total:</span><span>$${quote.finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>` : ''}
        </div>
      </div>

      <div class="footer">
        <div class="disclaimer">
          <strong>Disclaimer:</strong> This is an estimate. Final pricing may vary based on property size, condition, travel distance, complexity, and final scope.
        </div>
        <div class="disclaimer" style="margin-top: 15px;">
          <strong>Next Steps:</strong> To approve this quote and schedule your shoot, please reply confirming the selected package, property address, and preferred shoot date.
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}
