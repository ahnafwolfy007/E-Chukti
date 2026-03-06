export interface ContractField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ContractTemplate {
  id: string;
  title: string;
  description: string;
  fields: ContractField[];
  generateDocument: (data: Record<string, string>) => string;
}

// Helper function to format date
function formatContractDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  // Add ordinal suffix (st, nd, rd, th)
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  return `${day}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]} day of ${month}, ${year}`;
}

export const contractTemplates: Record<string, ContractTemplate> = {
  service: {
    id: 'service',
    title: 'Service Agreement',
    description: 'Agreement between client and service provider',
    fields: [
      // Agreement Date
      { id: 'agreementDate', label: 'Agreement Date (Date when this contract is made)', type: 'date', required: true, placeholder: 'Select the date this agreement is made' },
      
      // Client Information
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientFatherMotherName', label: "Client's Father's/Mother's Name", type: 'text', required: true },
      { id: 'clientNID', label: 'Client NID/Passport No.', type: 'text', required: true },
      { id: 'clientAddress', label: 'Client Address', type: 'textarea', required: true },
      { id: 'clientMobile', label: 'Client Mobile', type: 'text', required: true },
      { id: 'clientEmail', label: 'Client Email', type: 'text', required: true },
      
      // Service Provider Information
      { id: 'providerName', label: 'Service Provider Name/Business', type: 'text', required: true },
      { id: 'providerFatherMotherName', label: "Provider's Father's/Mother's Name", type: 'text', required: true },
      { id: 'providerNID', label: 'Provider NID/Trade License No.', type: 'text', required: true },
      { id: 'providerAddress', label: 'Provider Address', type: 'textarea', required: true },
      { id: 'providerMobile', label: 'Provider Mobile', type: 'text', required: true },
      { id: 'providerEmail', label: 'Provider Email', type: 'text', required: true },
      
      // Service Details
      { id: 'serviceDescription', label: 'Scope of Services (Detailed Description)', type: 'textarea', required: true, placeholder: 'Describe the services to be provided...' },
      
      // Payment Terms
      { id: 'totalAmount', label: 'Total Amount (BDT)', type: 'number', required: true },
      { id: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: ['Bank Transfer', 'bKash', 'Nagad', 'Cash'] },
      { id: 'paymentSchedule', label: 'Payment Schedule', type: 'textarea', required: true, placeholder: 'e.g., 50% advance, 50% upon completion' },
      
      // Duration
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'End Date', type: 'date', required: true },
      
      // Termination
      { id: 'noticeDays', label: 'Notice Period (Days)', type: 'number', required: true, placeholder: '30' },
      
      // Signatures
      { id: 'clientSignatureDate', label: 'Client Signature Date', type: 'date', required: true },
      { id: 'providerSignatureDate', label: 'Provider Signature Date', type: 'date', required: true },
    ],
    generateDocument: (data) => `
# SERVICE AGREEMENT

This Service Agreement ("Agreement") is made on this ${formatContractDate(data.agreementDate)}.

## BETWEEN

### Client
- **Name:** ${data.clientName}
- **Father's/Mother's Name:** ${data.clientFatherMotherName}
- **NID/Passport No.:** ${data.clientNID}
- **Address:** ${data.clientAddress}
- **Mobile:** ${data.clientMobile}
- **Email:** ${data.clientEmail}

### AND

### Service Provider
- **Name/Business Name:** ${data.providerName}
- **Father's/Mother's Name:** ${data.providerFatherMotherName}
- **NID/Trade License No.:** ${data.providerNID}
- **Address:** ${data.providerAddress}
- **Mobile:** ${data.providerMobile}
- **Email:** ${data.providerEmail}

---

## 1. Scope of Services

${data.serviceDescription}

---

## 2. Payment Terms

- **Total Amount:** BDT ${data.totalAmount}
- **Payment Method:** ${data.paymentMethod}
- **Payment Schedule:** ${data.paymentSchedule}

---

## 3. Duration

This Agreement shall commence on ${data.startDate} and continue until ${data.endDate}.

---

## 4. Confidentiality

Both parties agree to keep confidential any information related to this Agreement.

---

## 5. Termination

- Either party may terminate this Agreement by providing ${data.noticeDays} days written notice.
- Client shall pay for completed services up to termination date.

---

## 6. Governing Law

This Agreement shall be governed by the laws of the People's Republic of Bangladesh.

---

### Signatures

**Client Signature:** _______________________  
**Date:** ${data.clientSignatureDate}

**Service Provider Signature:** _______________________  
**Date:** ${data.providerSignatureDate}
    `
  },

  employment: {
    id: 'employment',
    title: 'Employment Agreement',
    description: 'Agreement between employer and employee',
    fields: [
      // Date
      { id: 'agreementDate', label: 'Agreement Date', type: 'date', required: true },
      
      // Employer Information
      { id: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'companyAddress', label: 'Company Address', type: 'textarea', required: true },
      { id: 'tradeLicenseNo', label: 'Trade License No.', type: 'text', required: true },
      { id: 'authorizedRep', label: 'Authorized Representative', type: 'text', required: true },
      
      // Employee Information
      { id: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { id: 'employeeFatherMotherName', label: "Employee's Father's/Mother's Name", type: 'text', required: true },
      { id: 'employeeNID', label: 'Employee NID No.', type: 'text', required: true },
      { id: 'employeeAddress', label: 'Employee Address', type: 'textarea', required: true },
      { id: 'employeeMobile', label: 'Employee Mobile', type: 'text', required: true },
      { id: 'employeeEmail', label: 'Employee Email', type: 'text', required: true },
      
      // Position Details
      { id: 'position', label: 'Position/Job Title', type: 'text', required: true },
      
      // Salary
      { id: 'monthlySalary', label: 'Monthly Salary (BDT)', type: 'number', required: true },
      { id: 'paymentDate', label: 'Salary Payment Date', type: 'text', required: true, placeholder: 'e.g., Last day of each month' },
      { id: 'otherBenefits', label: 'Other Benefits', type: 'textarea', required: false, placeholder: 'e.g., Health insurance, bonus, etc.' },
      
      // Working Hours
      { id: 'hoursPerDay', label: 'Working Hours per Day', type: 'number', required: true, placeholder: '8' },
      { id: 'daysPerWeek', label: 'Working Days per Week', type: 'number', required: true, placeholder: '5' },
      { id: 'workplace', label: 'Workplace Location', type: 'text', required: true },
      
      // Termination
      { id: 'noticePeriod', label: 'Notice Period (Days)', type: 'number', required: true, placeholder: '30' },
      
      // Signatures
      { id: 'employerSignatureDate', label: 'Employer Signature Date', type: 'date', required: true },
      { id: 'employeeSignatureDate', label: 'Employee Signature Date', type: 'date', required: true },
    ],
    generateDocument: (data) => `
# EMPLOYMENT AGREEMENT

This Employment Agreement is made on ${data.agreementDate}.

### Employer
- **Company Name:** ${data.companyName}
- **Address:** ${data.companyAddress}
- **Trade License No.:** ${data.tradeLicenseNo}
- **Authorized Representative:** ${data.authorizedRep}

### Employee
- **Name:** ${data.employeeName}
- **Father's/Mother's Name:** ${data.employeeFatherMotherName}
- **NID No.:** ${data.employeeNID}
- **Address:** ${data.employeeAddress}
- **Mobile:** ${data.employeeMobile}
- **Email:** ${data.employeeEmail}

---

## 1. Position

The Employee is appointed as **${data.position}**.

---

## 2. Salary

- **Monthly Salary:** BDT ${data.monthlySalary}
- **Payment Date:** ${data.paymentDate}
- **Other Benefits:** ${data.otherBenefits || 'N/A'}

---

## 3. Working Hours

- **${data.hoursPerDay}** hours per day
- **${data.daysPerWeek}** days per week
- **Workplace:** ${data.workplace}

---

## 4. Leave Policy

Leave shall be provided in accordance with applicable Bangladesh Labour Law.

---

## 5. Confidentiality

Employee shall not disclose company confidential information during or after employment.

---

## 6. Termination

Either party may terminate by giving **${data.noticePeriod}** days written notice.

---

## 7. Governing Law

This Agreement shall be governed by the laws of Bangladesh.

---

### Signatures

**Employer Signature:** _______________________  
**Date:** ${data.employerSignatureDate}

**Employee Signature:** _______________________  
**Date:** ${data.employeeSignatureDate}
    `
  },

  rent: {
    id: 'rent',
    title: 'House Rent Agreement',
    description: 'Agreement between landlord and tenant',
    fields: [
      // Date
      { id: 'agreementDate', label: 'Agreement Date', type: 'date', required: true },
      
      // Landlord Information
      { id: 'landlordName', label: 'Landlord Name', type: 'text', required: true },
      { id: 'landlordNID', label: 'Landlord NID No.', type: 'text', required: true },
      { id: 'landlordAddress', label: 'Landlord Address', type: 'textarea', required: true },
      { id: 'landlordMobile', label: 'Landlord Mobile', type: 'text', required: true },
      
      // Tenant Information
      { id: 'tenantName', label: 'Tenant Name', type: 'text', required: true },
      { id: 'tenantNID', label: 'Tenant NID No.', type: 'text', required: true },
      { id: 'tenantAddress', label: 'Tenant Permanent Address', type: 'textarea', required: true },
      { id: 'tenantMobile', label: 'Tenant Mobile', type: 'text', required: true },
      
      // Property Details
      { id: 'propertyAddress', label: 'Rented Property Address (Full Details)', type: 'textarea', required: true, placeholder: 'Include house no., road, area, city, etc.' },
      
      // Rent Details
      { id: 'monthlyRent', label: 'Monthly Rent (BDT)', type: 'number', required: true },
      { id: 'securityDeposit', label: 'Advance/Security Deposit (BDT)', type: 'number', required: true },
      { id: 'rentPaymentDate', label: 'Rent Payment Date', type: 'text', required: true, placeholder: 'e.g., 1st of each month' },
      
      // Duration
      { id: 'startDate', label: 'Agreement Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'Agreement End Date', type: 'date', required: true },
      
      // Utilities
      { id: 'electricityPaidBy', label: 'Electricity Paid By', type: 'select', required: true, options: ['Landlord', 'Tenant', 'Shared'] },
      { id: 'gasPaidBy', label: 'Gas Paid By', type: 'select', required: true, options: ['Landlord', 'Tenant', 'Shared', 'N/A'] },
      { id: 'waterPaidBy', label: 'Water Paid By', type: 'select', required: true, options: ['Landlord', 'Tenant', 'Shared'] },
      { id: 'serviceCharge', label: 'Service Charge (if any)', type: 'text', required: false },
      
      // Termination
      { id: 'noticeMonths', label: 'Notice Period (Months)', type: 'number', required: true, placeholder: '1' },
      
      // Signatures
      { id: 'landlordSignatureDate', label: 'Landlord Signature Date', type: 'date', required: true },
      { id: 'tenantSignatureDate', label: 'Tenant Signature Date', type: 'date', required: true },
    ],
    generateDocument: (data) => `
# HOUSE RENT AGREEMENT

This Agreement is made on ${data.agreementDate}.

### Landlord
- **Name:** ${data.landlordName}
- **NID No.:** ${data.landlordNID}
- **Address:** ${data.landlordAddress}
- **Mobile:** ${data.landlordMobile}

### Tenant
- **Name:** ${data.tenantName}
- **NID No.:** ${data.tenantNID}
- **Permanent Address:** ${data.tenantAddress}
- **Mobile:** ${data.tenantMobile}

---

## 1. Property Details

**Address of rented premises:**

${data.propertyAddress}

---

## 2. Rent Details

- **Monthly Rent:** BDT ${data.monthlyRent}
- **Advance/Security Deposit:** BDT ${data.securityDeposit}
- **Rent Payment Date:** ${data.rentPaymentDate}

---

## 3. Duration

From **${data.startDate}** to **${data.endDate}**.

---

## 4. Utilities

- **Electricity:** Paid by ${data.electricityPaidBy}
- **Gas:** Paid by ${data.gasPaidBy}
- **Water:** Paid by ${data.waterPaidBy}
- **Service Charge:** ${data.serviceCharge || 'N/A'}

---

## 5. Use of Property

The property shall be used for residential purposes only.

---

## 6. Termination

Either party may terminate with **${data.noticeMonths}** month(s) written notice.

---

## 7. Governing Law

Governed by the laws of Bangladesh.

---

### Signatures

**Landlord Signature:** _______________________  
**Date:** ${data.landlordSignatureDate}

**Tenant Signature:** _______________________  
**Date:** ${data.tenantSignatureDate}
    `
  },

  freelance: {
    id: 'freelance',
    title: 'Freelance/Digital Work Agreement',
    description: 'Agreement between client and freelancer',
    fields: [
      // Date
      { id: 'agreementDate', label: 'Agreement Date', type: 'date', required: true },
      
      // Client Information
      { id: 'clientName', label: 'Client Name/Business', type: 'text', required: true },
      { id: 'clientAddress', label: 'Client Address', type: 'textarea', required: true },
      { id: 'clientMobile', label: 'Client Mobile', type: 'text', required: true },
      { id: 'clientEmail', label: 'Client Email', type: 'text', required: true },
      
      // Freelancer Information
      { id: 'freelancerName', label: 'Freelancer Name', type: 'text', required: true },
      { id: 'freelancerAddress', label: 'Freelancer Address', type: 'textarea', required: true },
      { id: 'freelancerMobile', label: 'Freelancer Mobile', type: 'text', required: true },
      { id: 'freelancerEmail', label: 'Freelancer Email', type: 'text', required: true },
      
      // Project Details
      { id: 'projectDescription', label: 'Project Description', type: 'textarea', required: true, placeholder: 'Detailed description of the project...' },
      { id: 'deliverables', label: 'Deliverables', type: 'textarea', required: true, placeholder: 'List all deliverables...' },
      
      // Timeline
      { id: 'startDate', label: 'Project Start Date', type: 'date', required: true },
      { id: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
      { id: 'milestones', label: 'Milestones (if any)', type: 'textarea', required: false, placeholder: 'List project milestones...' },
      
      // Payment
      { id: 'totalFee', label: 'Total Fee (BDT)', type: 'number', required: true },
      { id: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: ['bKash', 'Nagad', 'Bank Transfer', 'Other'] },
      { id: 'paymentTerms', label: 'Payment Terms', type: 'textarea', required: true, placeholder: 'e.g., 50% advance, 50% on delivery' },
      
      // Revisions
      { id: 'revisionsIncluded', label: 'Number of Revisions Included', type: 'number', required: true, placeholder: '2' },
      
      // Signatures
      { id: 'clientSignatureDate', label: 'Client Signature Date', type: 'date', required: true },
      { id: 'freelancerSignatureDate', label: 'Freelancer Signature Date', type: 'date', required: true },
    ],
    generateDocument: (data) => `
# FREELANCE SERVICE AGREEMENT

This Agreement is made on ${data.agreementDate}.

### Client
- **Name/Business:** ${data.clientName}
- **Address:** ${data.clientAddress}
- **Mobile:** ${data.clientMobile}
- **Email:** ${data.clientEmail}

### Freelancer
- **Name:** ${data.freelancerName}
- **Address:** ${data.freelancerAddress}
- **Mobile:** ${data.freelancerMobile}
- **Email:** ${data.freelancerEmail}

---

## 1. Project Description

${data.projectDescription}

---

## 2. Deliverables

${data.deliverables}

---

## 3. Timeline

- **Start Date:** ${data.startDate}
- **Delivery Date:** ${data.deliveryDate}
- **Milestones:** ${data.milestones || 'N/A'}

---

## 4. Payment

- **Total Fee:** BDT ${data.totalFee}
- **Payment Method:** ${data.paymentMethod}
- **Payment Terms:** ${data.paymentTerms}

---

## 5. Revisions

Number of revisions included: **${data.revisionsIncluded}**

---

## 6. Ownership

Upon full payment, ownership transfers to the Client unless otherwise stated.

---

## 7. Confidentiality

Both parties agree to keep project-related information confidential.

---

## 8. Dispute Resolution

Disputes shall be resolved under Bangladesh jurisdiction.

---

### Signatures

**Client Signature:** _______________________  
**Date:** ${data.clientSignatureDate}

**Freelancer Signature:** _______________________  
**Date:** ${data.freelancerSignatureDate}
    `
  }
};

export function getContractTemplate(type: string): ContractTemplate | undefined {
  return contractTemplates[type];
}

export function getAllContractTypes() {
  return Object.values(contractTemplates).map(template => ({
    id: template.id,
    title: template.title,
    description: template.description
  }));
}
