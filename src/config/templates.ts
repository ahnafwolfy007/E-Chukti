export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'select';

export interface TemplateField {
  id: string;
  labelEn: string;
  labelBn: string;
  type: FieldType;
  required: boolean;
  options?: { value: string; labelEn: string; labelBn: string }[];
  placeholder?: string;
}

export interface ContractTemplate {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  fields: TemplateField[];
}

const defaultPartiesFields: TemplateField[] = [
  { id: 'firstPartyName', labelEn: 'First Party Name', labelBn: 'প্রথম পক্ষের নাম', type: 'text', required: true },
  { id: 'firstPartyAddress', labelEn: 'First Party Address', labelBn: 'প্রথম পক্ষের ঠিকানা', type: 'textarea', required: true },
  { id: 'secondPartyName', labelEn: 'Second Party Name', labelBn: 'দ্বিতীয় পক্ষের নাম', type: 'text', required: true },
  { id: 'secondPartyAddress', labelEn: 'Second Party Address', labelBn: 'দ্বিতীয় পক্ষের ঠিকানা', type: 'textarea', required: true },
];

const defaultFinancialFields: TemplateField[] = [
  { id: 'monthlyRent', labelEn: 'Monthly Rent (BDT)', labelBn: 'মাসিক ভাড়া (টাকা)', type: 'number', required: true },
  { id: 'advancePayment', labelEn: 'Advance Payment (BDT)', labelBn: 'অগ্রিম প্রদান (টাকা)', type: 'number', required: true },
  { id: 'tenureMonths', labelEn: 'Tenure (Months)', labelBn: 'মেয়াদ (মাস)', type: 'number', required: true },
];

export const templates: ContractTemplate[] = [
  {
    id: 'sme-mou',
    slug: 'sme-mou',
    titleEn: 'SME Memorandum of Understanding (MoU)',
    titleBn: 'এসএমই সমঝোতা স্মারক',
    descriptionEn: 'Standard MoU for Small and Medium Enterprises in Bangladesh.',
    descriptionBn: 'বাংলাদেশের ক্ষুদ্র ও মাঝারি উদ্যোগের জন্য আদর্শ সমঝোতা স্মারক।',
    fields: [
      ...defaultPartiesFields,
      { id: 'businessNature', labelEn: 'Nature of Business', labelBn: 'ব্যবসার ধরন', type: 'text', required: true },
      { id: 'partnershipRatio', labelEn: 'Partnership Ratio (%)', labelBn: 'অংশীদারিত্বের অনুপাত (%)', type: 'text', required: false }
    ]
  },
  {
    id: 'general-office',
    slug: 'general-office',
    titleEn: 'General Office Space Agreement',
    titleBn: 'সাধারণ অফিস স্পেস চুক্তি',
    descriptionEn: 'Agreement for renting commercial office spaces.',
    descriptionBn: 'বাণিজ্যিক অফিস স্পেস ভাড়ার চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'officeSizeSqft', labelEn: 'Office Size (Sq. ft)', labelBn: 'অফিসের আকার (বর্গফুট)', type: 'number', required: true },
      { id: 'maintenanceFee', labelEn: 'Maintenance Fee (BDT)', labelBn: 'রক্ষণাবেক্ষণ ফি (টাকা)', type: 'number', required: true }
    ]
  },
  {
    id: 'super-shop',
    slug: 'super-shop',
    titleEn: 'Super Shop / Department Store Agreement',
    titleBn: 'সুপার শপ / ডিপার্টমেন্ট স্টোর চুক্তি',
    descriptionEn: 'Rental agreement customized for super shops and retail stores.',
    descriptionBn: 'সুপার শপ এবং খুচরা দোকানের জন্য কাস্টমাইজড ভাড়া চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'storeSizeSqft', labelEn: 'Store Size (Sq. ft)', labelBn: 'দোকানের আকার (বর্গফুট)', type: 'number', required: true },
      { id: 'tradeLicenseRequired', labelEn: 'Trade License Required?', labelBn: 'ট্রেড লাইসেন্স প্রয়োজন?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] }
    ]
  },
  {
    id: 'restaurant-cafe',
    slug: 'restaurant-cafe',
    titleEn: 'Restaurant / Café Agreement',
    titleBn: 'রেস্তোরাঁ / ক্যাফে চুক্তি',
    descriptionEn: 'Specialized agreement for restaurants, covering kitchen facilities.',
    descriptionBn: 'রেস্তোরাঁর জন্য বিশেষ চুক্তি, রান্নাঘরের সুবিধাসহ।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'kitchenSetupIncluded', labelEn: 'Kitchen Setup Included?', labelBn: 'রান্নাঘরের সেটআপ অন্তর্ভুক্ত?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] },
      { id: 'gasUtilityResponsibility', labelEn: 'Gas Utility Responsibility', labelBn: 'গ্যাস ইউটিলিটি দায়িত্ব', type: 'select', required: true, options: [{value: 'landlord', labelEn: 'Landlord', labelBn: 'বাড়িওয়ালা'}, {value: 'tenant', labelEn: 'Tenant', labelBn: 'ভাড়াটিয়া'}] }
    ]
  },
  {
    id: 'warehouse',
    slug: 'warehouse',
    titleEn: 'Warehouse / Storage Agreement',
    titleBn: 'গুদাম / স্টোরেজ চুক্তি',
    descriptionEn: 'Agreement for renting industrial warehouses and storage spaces.',
    descriptionBn: 'শিল্প গুদাম এবং স্টোরেজ স্পেস ভাড়ার চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'storageCapacitySqft', labelEn: 'Storage Capacity (Sq. ft)', labelBn: 'স্টোরেজ ক্ষমতা (বর্গফুট)', type: 'number', required: true },
      { id: 'heavyVehicleAccess', labelEn: 'Heavy Vehicle Access?', labelBn: 'ভারী যানবাহনের প্রবেশাধিকার?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] }
    ]
  },
  {
    id: 'showroom',
    slug: 'showroom',
    titleEn: 'Showroom Agreement',
    titleBn: 'শোরুম চুক্তি',
    descriptionEn: 'Agreement for commercial showrooms in prime locations.',
    descriptionBn: 'প্রাইম লোকেশনে বাণিজ্যিক শোরুমের জন্য চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'displayAreaSqft', labelEn: 'Display Area (Sq. ft)', labelBn: 'প্রদর্শন এলাকা (বর্গফুট)', type: 'number', required: true }
    ]
  },
  {
    id: 'clinic-hospital',
    slug: 'clinic-hospital',
    titleEn: 'Clinic / Hospital Agreement',
    titleBn: 'ক্লিনিক / হাসপাতাল চুক্তি',
    descriptionEn: 'Agreement for medical facilities requiring specific health standards.',
    descriptionBn: 'নির্দিষ্ট স্বাস্থ্য মান প্রয়োজন এমন চিকিৎসা সুবিধার জন্য চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'medicalWasteDisposal', labelEn: 'Medical Waste Disposal Responsibility', labelBn: 'মেডিকেল বর্জ্য নিষ্পত্তির দায়িত্ব', type: 'select', required: true, options: [{value: 'landlord', labelEn: 'Landlord', labelBn: 'বাড়িওয়ালা'}, {value: 'tenant', labelEn: 'Tenant (Clinic)', labelBn: 'ভাড়াটিয়া (ক্লিনিক)'}] }
    ]
  },
  {
    id: 'bank-atm',
    slug: 'bank-atm',
    titleEn: 'Bank or ATM Booth Space Agreement',
    titleBn: 'ব্যাংক বা এটিএম বুথ স্পেস চুক্তি',
    descriptionEn: 'Secure space rental agreement for Banks and ATMs.',
    descriptionBn: 'ব্যাংক এবং এটিএমের জন্য নিরাপদ স্পেস ভাড়া চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'securityArrangements', labelEn: 'Security Arrangements By', labelBn: 'নিরাপত্তা ব্যবস্থা কার দ্বারা', type: 'select', required: true, options: [{value: 'bank', labelEn: 'Bank', labelBn: 'ব্যাংক'}, {value: 'landlord', labelEn: 'Landlord', labelBn: 'বাড়িওয়ালা'}] }
    ]
  },
  {
    id: 'education-inst',
    slug: 'education-inst',
    titleEn: 'Educational Institution Agreement',
    titleBn: 'শিক্ষা প্রতিষ্ঠান চুক্তি',
    descriptionEn: 'Rental agreement for schools, colleges, and coaching centers.',
    descriptionBn: 'স্কুল, কলেজ এবং কোচিং সেন্টারের জন্য ভাড়া চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'numberOfClassrooms', labelEn: 'Number of Classrooms', labelBn: 'শ্রেণীকক্ষের সংখ্যা', type: 'number', required: true }
    ]
  },
  {
    id: 'cloud-kitchen',
    slug: 'cloud-kitchen',
    titleEn: 'Kitchen / Cloud Kitchen Agreement',
    titleBn: 'কিচেন / ক্লাউড কিচেন চুক্তি',
    descriptionEn: 'Agreement for commercial cloud kitchens.',
    descriptionBn: 'বাণিজ্যিক ক্লাউড কিচেনের জন্য চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'commercialGasLine', labelEn: 'Commercial Gas Line Available?', labelBn: 'বাণিজ্যিক গ্যাস লাইন উপলব্ধ?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] }
    ]
  },
  {
    id: 'beauty-salon',
    slug: 'beauty-salon',
    titleEn: 'Beauty Salon / Spa Agreement',
    titleBn: 'বিউটি সেলুন / স্পা চুক্তি',
    descriptionEn: 'Agreement for beauty parlors and spas.',
    descriptionBn: 'বিউটি পার্লার এবং স্পার জন্য চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'waterSupplyRequirement', labelEn: 'Special Water Supply Required?', labelBn: 'বিশেষ জল সরবরাহ প্রয়োজন?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] }
    ]
  },
  {
    id: 'gym-fitness',
    slug: 'gym-fitness',
    titleEn: 'Gym / Fitness Center Agreement',
    titleBn: 'জিম / ফিটনেস সেন্টার চুক্তি',
    descriptionEn: 'Rental agreement for heavy equipment gyms.',
    descriptionBn: 'ভারী সরঞ্জামের জিমের জন্য ভাড়া চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'floorReinforcement', labelEn: 'Floor Reinforcement Done?', labelBn: 'মেঝে শক্তিশালীকরণ করা হয়েছে?', type: 'select', required: true, options: [{value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ'}, {value: 'no', labelEn: 'No', labelBn: 'না'}] }
    ]
  },
  {
    id: 'exhibition-event',
    slug: 'exhibition-event',
    titleEn: 'Exhibition / Event Space Agreement',
    titleBn: 'প্রদর্শনী / ইভেন্ট স্পেস চুক্তি',
    descriptionEn: 'Short-term rental for events and exhibitions.',
    descriptionBn: 'ইভেন্ট এবং প্রদর্শনীর জন্য স্বল্পমেয়াদী ভাড়া।',
    fields: [
      ...defaultPartiesFields,
      { id: 'eventStartDate', labelEn: 'Event Start Date', labelBn: 'ইভেন্ট শুরুর তারিখ', type: 'date', required: true },
      { id: 'eventEndDate', labelEn: 'Event End Date', labelBn: 'ইভেন্ট শেষ হওয়ার তারিখ', type: 'date', required: true },
      { id: 'totalRent', labelEn: 'Total Rent (BDT)', labelBn: 'মোট ভাড়া (টাকা)', type: 'number', required: true }
    ]
  },
  {
    id: 'factory-industrial',
    slug: 'factory-industrial',
    titleEn: 'Factory / Industrial Unit Agreement',
    titleBn: 'কারখানা / শিল্প ইউনিট চুক্তি',
    descriptionEn: 'Large scale industrial and factory rental agreement.',
    descriptionBn: 'বড় আকারের শিল্প এবং কারখানা ভাড়া চুক্তি।',
    fields: [
      ...defaultPartiesFields,
      ...defaultFinancialFields,
      { id: 'powerLoadKw', labelEn: 'Required Power Load (kW)', labelBn: 'প্রয়োজনীয় বিদ্যুৎ লোড (কিলোওয়াট)', type: 'number', required: true },
      { id: 'environmentalClearance', labelEn: 'Environmental Clearance Provided By', labelBn: 'পরিবেশগত ছাড়পত্র প্রদানকারী', type: 'select', required: true, options: [{value: 'landlord', labelEn: 'Landlord', labelBn: 'বাড়িওয়ালা'}, {value: 'tenant', labelEn: 'Tenant', labelBn: 'ভাড়াটিয়া'}] }
    ]
  }
];
