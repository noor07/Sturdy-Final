export interface Exam {
  name: string;
  conductingBody: string;
  purpose: string;
  subjects: string;
}

export interface ExamCategory {
  categoryName: string;
  exams: Exam[];
}

export const EXAM_DATA: ExamCategory[] = [
  {
    categoryName: 'School-Level & Foundational Exams',
    exams: [
      { name: 'Class 10 Board Exams', conductingBody: 'CBSE, CISCE (ICSE), State Boards', purpose: 'Certification for completion of secondary education.', subjects: 'English, Second Language, Mathematics, Science, Social Science.' },
      { name: 'Class 12 Board Exams', conductingBody: 'CBSE, CISCE (ISC), State Boards', purpose: 'Certification for higher secondary education, basis for UG admissions.', subjects: 'Varies by stream (Science: PCM/B; Commerce: Accounts, Business Studies, Economics; Arts: History, etc.)' },
      { name: 'NTSE (National Talent Search Exam)', conductingBody: 'NCERT', purpose: 'Identify and nurture talented students with a scholarship program.', subjects: 'Mental Ability Test (MAT), Scholastic Aptitude Test (SAT - Science, Social Science, Maths).' },
      { name: 'KVPY (Kishore Vaigyanik Protsahan Yojana)', conductingBody: 'IISc', purpose: 'Scholarship for students talented in basic sciences to pursue research. (Now subsumed by INSPIRE).', subjects: 'Physics, Chemistry, Mathematics, Biology.' },
      { name: 'Science/Math Olympiads', conductingBody: 'Homi Bhabha Centre for Science Education', purpose: 'Nurture excellence in science and mathematics.', subjects: 'Subject-specific (Physics, Chemistry, Biology, Mathematics, Astronomy).' },
    ],
  },
  {
    categoryName: 'Engineering Entrance Exams',
    exams: [
      { name: 'JEE Main', conductingBody: 'National Testing Agency (NTA)', purpose: 'Admission to B.E./B.Tech in NITs, IIITs, etc.', subjects: 'Physics, Chemistry, Mathematics.' },
      { name: 'JEE Advanced', conductingBody: 'One of the 7 Zonal IITs', purpose: 'Admission to B.Tech programs in IITs.', subjects: 'Advanced Physics, Chemistry, Mathematics.' },
      { name: 'BITSAT', conductingBody: 'BITS Pilani', purpose: 'Admission to BITS Pilani campuses.', subjects: 'Physics, Chemistry, Mathematics, English Proficiency, Logical Reasoning.' },
      { name: 'VITEEE', conductingBody: 'Vellore Institute of Technology', purpose: 'Admission to VIT campuses.', subjects: 'Physics, Chemistry, Mathematics/Biology, English, Aptitude.' },
      { name: 'GATE', conductingBody: 'IISc & IITs', purpose: 'Admission to M.Tech programs & PSU recruitment.', subjects: 'Core Engineering Subject, Engineering Mathematics, General Aptitude.' },
      { name: 'MHT CET', conductingBody: 'State CET Cell, Maharashtra', purpose: 'Admission to professional courses in Maharashtra.', subjects: 'Physics, Chemistry, Mathematics, Biology.' },
      { name: 'WBJEE', conductingBody: 'WBJEE Board', purpose: 'Admission to professional courses in West Bengal.', subjects: 'Physics, Chemistry, Mathematics.' },
      { name: 'COMEDK UGET', conductingBody: 'Consortium of Medical, Engg. & Dental Colleges of Karnataka', purpose: 'Admission to private engineering colleges in Karnataka.', subjects: 'Physics, Chemistry, Mathematics.' },
      { name: 'AMUEEE', conductingBody: 'Aligarh Muslim University', purpose: 'Admission to B.Tech at AMU.', subjects: 'Physics, Chemistry, Mathematics.' },
    ],
  },
  {
    categoryName: 'Medical Entrance Exams',
    exams: [
      { name: 'NEET-UG', conductingBody: 'National Testing Agency (NTA)', purpose: 'Admission to MBBS, BDS, AYUSH courses.', subjects: 'Physics, Chemistry, Biology (Botany & Zoology).' },
      { name: 'NEET-PG', conductingBody: 'National Board of Examinations (NBE)', purpose: 'Admission to postgraduate MD/MS courses.', subjects: 'Subjects from the MBBS curriculum.' },
      { name: 'INI CET', conductingBody: 'AIIMS, Delhi', purpose: 'Admission to PG courses at AIIMS, JIPMER, PGIMER, NIMHANS.', subjects: 'Clinical, Pre-clinical, and Para-clinical subjects from MBBS.' },
      { name: 'FMGE', conductingBody: 'National Board of Examinations (NBE)', purpose: 'Screening test for foreign medical graduates to practice in India.', subjects: 'Subjects from the MBBS curriculum.' },
    ],
  },
  {
    categoryName: 'Civil Services (UPSC)',
    exams: [
      { name: 'UPSC CSE', conductingBody: 'Union Public Service Commission', purpose: 'Recruitment to IAS, IPS, IFS, etc.', subjects: 'Prelims: General Studies, CSAT; Mains: Essay, GS Papers, Optionals.' },
      { name: 'UPSC ESE', conductingBody: 'Union Public Service Commission', purpose: 'Recruitment of government engineers.', subjects: 'General Studies & Engineering Aptitude, Core engineering Subject paper.' },
      { name: 'UPSC IES/ISS', conductingBody: 'Union Public Service Commission', purpose: 'Recruitment of government economists/statisticians.', subjects: 'General English, General Studies, Subject-specific papers (Economics/Statistics).' },
      { name: 'UPSC CAPF', conductingBody: 'Union Public Service Commission', purpose: 'Recruitment of Assistant Commandants in CAPFs.', subjects: 'General Ability & Intelligence, General Studies, Essay & Comprehension.' },
    ],
  },
  {
    categoryName: 'Defense services Exams',
    exams: [
      { name: 'NDA & NA', conductingBody: 'Union Public Service Commission', purpose: 'Admission to National Defence Academy & Naval Academy.', subjects: 'Mathematics, General Ability Test (English, GK, Science, History, Geography).' },
      { name: 'CDS', conductingBody: 'Union Public Service Commission', purpose: 'Recruitment of commissioned officers in the armed forces.', subjects: 'English, General Knowledge, Elementary Mathematics.' },
      { name: 'AFCAT', conductingBody: 'Indian Air Force', purpose: 'Officer recruitment in the Indian Air Force.', subjects: 'General Awareness, Verbal Ability, Numerical Ability, Reasoning & Military Aptitude.' },
      { name: 'INET', conductingBody: 'Indian Navy', purpose: 'Officer recruitment in the Indian Navy.', subjects: 'English, Reasoning & Numerical Ability, General Science, Mathematical Aptitude, GK.' },
    ],
  },
  {
    categoryName: 'Banking & Insurance Exams',
    exams: [
      { name: 'SBI PO', conductingBody: 'State Bank of India', purpose: 'Recruitment of Probationary Officers in SBI.', subjects: 'Prelims: English, Quant, Reasoning; Mains adds GA & Computer Aptitude.' },
      { name: 'IBPS PO', conductingBody: 'Institute of Banking Personnel Selection', purpose: 'Recruitment of Probationary Officers in Public Sector Banks.', subjects: 'Prelims: English, Quant, Reasoning; Mains adds GA & Computer Aptitude.' },
      { name: 'SBI Clerk', conductingBody: 'State Bank of India', purpose: 'Recruitment of Junior Associates (Clerks) in SBI.', subjects: 'Quantitative Aptitude, Reasoning Ability, General/Financial Awareness.' },
      { name: 'IBPS Clerk', conductingBody: 'Institute of Banking Personnel Selection', purpose: 'Recruitment of Clerks in Public Sector Banks.', subjects: 'English, Quantitative Aptitude, Reasoning Ability, General/Financial Awareness.' },
      { name: 'RBI Grade B', conductingBody: 'Reserve Bank of India', purpose: 'Recruitment of Grade B Officers in RBI.', subjects: 'Phase-I: GA, English, Quant, Reasoning; Phase-II: Economic & Social Issues, Finance.' },
      { name: 'IBPS RRB', conductingBody: 'Institute of Banking Personnel Selection', purpose: 'Recruitment for Regional Rural Banks.', subjects: 'Reasoning, Quantitative Aptitude, English/Hindi, Computer Knowledge, GA.' },
      { name: 'NABARD Grade A', conductingBody: 'National Bank for Agriculture & Rural Development', purpose: 'Recruitment of Assistant Managers in NABARD.', subjects: 'Reasoning, English, Computer, Quant, Decision Making, GA, ESI, ARD.' },
      { name: 'LIC AAO', conductingBody: 'Life Insurance Corporation', purpose: 'Recruitment of Assistant Administrative Officers.', subjects: 'Reasoning, Quantitative Aptitude, English, General Awareness, Insurance & Financial Market.' },
    ],
  },
  {
    categoryName: 'SSC & Railway Exams',
    exams: [
      { name: 'SSC CGL', conductingBody: 'Staff Selection Commission', purpose: 'Recruitment to Group \'B\' & \'C\' government posts.', subjects: 'Reasoning, General Awareness, Quantitative Aptitude, English Comprehension.' },
      { name: 'SSC CHSL', conductingBody: 'Staff Selection Commission', purpose: 'Recruitment of LDC, Postal Assistant, DEO, etc.', subjects: 'Reasoning, General Awareness, Quantitative Aptitude, English Language.' },
      { name: 'SSC CPO', conductingBody: 'Staff Selection Commission', purpose: 'Recruitment of Sub-Inspectors in Delhi Police & CAPFs.', subjects: 'Reasoning, GA, Quantitative Aptitude, English Comprehension; English Language (Mains).' },
      { name: 'SSC GD', conductingBody: 'Staff Selection Commission', purpose: 'Recruitment of Constables in CAPFs, etc.', subjects: 'General Knowledge, Reasoning, Elementary Mathematics, English/Hindi.' },
      { name: 'RRB NTPC', conductingBody: 'Railway Recruitment Boards', purpose: 'Recruitment for non-technical posts in Indian Railways.', subjects: 'Mathematics, General Intelligence & Reasoning, General Awareness.' },
      { name: 'RRB Group D', conductingBody: 'Railway Recruitment Boards', purpose: 'Recruitment for Level 1 posts in Indian Railways.', subjects: 'General Science, Mathematics, General Intelligence & Reasoning, General Awareness.' },
      { name: 'RRB ALP', conductingBody: 'Railway Recruitment Boards', purpose: 'Recruitment of Assistant Loco Pilots.', subjects: 'Maths, Reasoning, General Science, GK/Current Affairs, Relevant Trade Theory.' },
    ],
  },
  {
    categoryName: 'Management & Law Exams',
    exams: [
      { name: 'CAT', conductingBody: 'Indian Institutes of Management', purpose: 'Admission to MBA/PGDM programs.', subjects: 'Verbal Ability & Reading Comprehension, Data Interpretation & Logical Reasoning, QA.' },
      { name: 'XAT', conductingBody: 'XLRI Jamshedpur', purpose: 'Admission to MBA/PGDM programs.', subjects: 'Verbal & Logical Ability, Decision Making, QA & Data Interpretation, GK.' },
      { name: 'CMAT', conductingBody: 'National Testing Agency (NTA)', purpose: 'Admission to AICTE-approved MBA programs.', subjects: 'Quantitative Aptitude, Logical Reasoning, Language Comprehension, GA, Innovation & Entrepreneurship.' },
      { name: 'CLAT', conductingBody: 'Consortium of NLUs', purpose: 'Admission to UG & PG law programs at NLUs.', subjects: 'English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques.' },
      { name: 'AILET', conductingBody: 'National Law University, Delhi', purpose: 'Admission to law programs at NLU Delhi.', subjects: 'English, Current Affairs, Legal Reasoning, Logical Reasoning.' },
    ],
  },
  {
    categoryName: 'Postgraduate & Academic Exams',
    exams: [
      { name: 'UGC NET', conductingBody: 'National Testing Agency (NTA)', purpose: 'Eligibility for Assistant Professor & JRF in Arts/Commerce/Humanities.', subjects: 'Paper-I: Teaching/Research Aptitude; Paper-II: Subject Specific.' },
      { name: 'CSIR UGC NET', conductingBody: 'National Testing Agency (NTA)', purpose: 'Eligibility for JRF & Lectureship in Science stream.', subjects: 'Part-A: General Aptitude; Part-B & C: Subject Specific (e.g., Life Sciences).' },
      { name: 'JAM', conductingBody: 'IITs & IISc', purpose: 'Admission to M.Sc. programs.', subjects: 'Subject-specific (e.g., Mathematics, Physics, Chemistry, Geology).' },
      { name: 'CEED', conductingBody: 'IIT Bombay', purpose: 'Admission to postgraduate design programs (M.Des).', subjects: 'Part-A: Visualisation, Analytical & Logical Reasoning; Part-B: Drawing, Creativity.' },
    ],
  },
  {
    categoryName: 'Other Professional & State-Level Exams',
    exams: [
      { name: 'State PSC Exams', conductingBody: 'State Public Service Commissions', purpose: 'Recruitment for state-level civil service jobs.', subjects: 'General Studies, State-specific GK, Language, Aptitude, Optional Subjects.' },
      { name: 'CTET', conductingBody: 'Central Board of Secondary Education', purpose: 'Eligibility for teaching posts in central govt. schools.', subjects: 'Child Pedagogy, Language I & II, Maths, Environmental/Social Studies.' },
      { name: 'State TET', conductingBody: 'State Examination Bodies', purpose: 'Eligibility for teaching posts in state govt. schools.', subjects: 'Similar to CTET, often with a focus on state curriculum.' },
      { name: 'NATA', conductingBody: 'Council of Architecture', purpose: 'Admission to B.Arch programs.', subjects: 'Aptitude (Diagrammatic/Numerical/Verbal Reasoning, GK), Drawing.' },
      { name: 'NCHM JEE', conductingBody: 'National Testing Agency (NTA)', purpose: 'Admission to hospitality & hotel administration courses.', subjects: 'Numerical Ability, Reasoning, GK & Current Affairs, English, Service Sector Aptitude.' },
    ],
  },
  {
    categoryName: 'Accounting and Finance',
    exams: [
      { name: 'CA Foundation', conductingBody: 'Institute of Chartered Accountants of India (ICAI)', purpose: 'Entry-level test for the Chartered Accountancy course.', subjects: 'Accounting, Business Laws, Maths & Stats, Business Economics.' },
      { name: 'CA Intermediate', conductingBody: 'Institute of Chartered Accountants of India (ICAI)', purpose: 'Second level, testing working knowledge of core subjects.', subjects: 'Accounting, Law, Taxation, Costing, Auditing, EIS-SM, FM-Eco.' },
      { name: 'CA Final', conductingBody: 'Institute of Chartered Accountants of India (ICAI)', purpose: 'Final level, testing expert knowledge before qualification.', subjects: 'Financial Reporting, SFM, Auditing, Corporate Laws, SCMPE, Taxation, Elective Paper.' },
    ],
  },
];
