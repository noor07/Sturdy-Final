interface RawSubTopic { name: string; }
interface RawTopic { name: string; subTopics: RawSubTopic[]; }
interface RawSubject { name: string; topics: RawTopic[]; }

export const SYLLABUS_DATA: Record<string, RawSubject[]> = {
  'Class 10 Board Exams': [
      // Science
      {
        name: 'Science',
        topics: [
          { name: 'Chemical Reactions and Equations', subTopics: [{ name: 'Balancing chemical equations' }, { name: 'Types of chemical reactions (Combination, Decomposition, Displacement, etc.)' }, { name: 'Redox reactions (Oxidation and Reduction)' }] },
          { name: 'Acids, Bases and Salts', subTopics: [{ name: 'Properties of acids and bases' }, { name: 'Concept of pH scale and its daily importance' }, { name: 'Chemical formula and uses of common salts (Baking Soda, Washing Soda, Plaster of Paris)' }] },
          { name: 'Metals and Non-metals', subTopics: [{ name: 'Reactivity series of metals' }, { name: 'Properties of ionic compounds' }, { name: 'Basic metallurgical processes (extraction of metals)' }] },
          { name: 'Carbon and Its Compounds', subTopics: [{ name: 'Versatile nature of carbon (catenation, tetravalency)' }, { name: 'Homologous series and IUPAC nomenclature' }, { name: 'Soaps and detergents' }] },
          { name: 'Life Processes', subTopics: [{ name: 'Nutrition in human beings (digestive system)' }, { name: 'Respiration (human respiratory system)' }, { name: 'Transportation (human heart and blood circulation)' }, { name: 'Excretion (human excretory system)' }] },
          { name: 'Control and Coordination', subTopics: [{ name: 'Structure and functions of the human brain' }, { name: 'Reflex action and reflex arc' }, { name: 'Plant hormones (Auxin, Gibberellin, etc.)' }] },
          { name: 'How Do Organisms Reproduce?', subTopics: [{ name: 'Asexual vs. Sexual reproduction' }, { name: 'Reproduction in flowering plants (structure of a flower, pollination)' }, { name: 'Human reproductive system (male and female)' }] },
          { name: 'Heredity', subTopics: [{ name: 'Mendel\'s laws of inheritance' }, { name: 'Sex determination in human beings' }] },
          { name: 'Light – Reflection and Refraction', subTopics: [{ name: 'Ray diagrams for spherical mirrors and lenses' }, { name: 'Mirror formula and Lens formula' }, { name: 'Refractive index' }] },
          { name: 'The Human Eye & Colourful World', subTopics: [{ name: 'Structure and function of the human eye' }, { name: 'Defects of vision (myopia, hypermetropia) and their correction' }, { name: 'Dispersion of light through a prism' }] },
          { name: 'Electricity', subTopics: [{ name: 'Ohm\'s law and resistance' }, { name: 'Combination of resistors (series and parallel)' }, { name: 'Joule\'s law of heating' }] },
          { name: 'Magnetic Effects of Electric Current', subTopics: [{ name: 'Magnetic field lines due to a current-carrying conductor' }, { name: 'Fleming\'s Left-Hand Rule and the principle of an electric motor' }, { name: 'Electromagnetic induction and Fleming\'s Right-Hand Rule' }] },
          { name: 'Our Environment', subTopics: [{ name: 'Food chains and food webs' }, { name: 'Ozone layer and its depletion' }, { name: 'Waste management' }] },
        ]
      },
      // Mathematics
      {
        name: 'Mathematics',
        topics: [
          { name: 'Real Numbers', subTopics: [{ name: 'Euclid\'s division lemma' }, { name: 'Fundamental Theorem of Arithmetic (HCF & LCM)' }, { name: 'Proving irrationality of numbers (e.g., √2, √3)' }] },
          { name: 'Polynomials', subTopics: [{ name: 'Finding the zeros of a polynomial' }, { name: 'Relationship between zeros and coefficients' }] },
          { name: 'Pair of Linear Equations', subTopics: [{ name: 'Solving equations using substitution and elimination methods' }, { name: 'Graphical representation of linear equations' }] },
          { name: 'Quadratic Equations', subTopics: [{ name: 'Solving quadratic equations using the quadratic formula' }, { name: 'Understanding the nature of roots' }] },
          { name: 'Arithmetic Progressions', subTopics: [{ name: 'Finding the nth term (an)' }, { name: 'Finding the sum of the first n terms (Sn)' }] },
          { name: 'Triangles', subTopics: [{ name: 'Basic Proportionality Theorem (BPT)' }, { name: 'Criteria for similarity of triangles' }, { name: 'Pythagoras Theorem' }] },
          { name: 'Coordinate Geometry', subTopics: [{ name: 'Distance formula' }, { name: 'Section formula' }, { name: 'Area of a triangle' }] },
          { name: 'Introduction to Trigonometry', subTopics: [{ name: 'Trigonometric ratios (sin, cos, tan, etc.)' }, { name: 'Trigonometric identities (especially sin²θ + cos²θ = 1)' }] },
          { name: 'Applications of Trigonometry', subTopics: [{ name: 'Solving problems on heights and distances' }, { name: 'Angles of elevation and depression' }] },
          { name: 'Circles', subTopics: [{ name: 'Theorems related to tangents from a point to a circle' }] },
          { name: 'Areas Related to Circles', subTopics: [{ name: 'Calculating the area of sectors and segments' }] },
          { name: 'Surface Areas and Volumes', subTopics: [{ name: 'Surface area and volume of a combination of solids' }] },
          { name: 'Statistics', subTopics: [{ name: 'Calculating mean, median, and mode of grouped data' }] },
          { name: 'Probability', subTopics: [{ name: 'Solving basic problems on the probability of an event' }] },
        ]
      },
      // Social Science
      {
        name: 'Social Science',
        topics: [
          { name: 'The Rise of Nationalism in Europe', subTopics: [{ name: 'The French Revolution' }, { name: 'Unification of Germany and Italy' }] },
          { name: 'Nationalism in India', subTopics: [{ name: 'Non-Cooperation Movement' }, { name: 'Civil Disobedience Movement and the Salt March' }] },
          { name: 'Resources and Development', subTopics: [{ name: 'Types of resources and resource planning' }, { name: 'Major soil types in India' }] },
          { name: 'Agriculture', subTopics: [{ name: 'Major crops of India (food and non-food)' }, { name: 'Types of farming' }] },
          { name: 'Minerals and Energy Resources', subTopics: [{ name: 'Distribution of major minerals' }, { name: 'Conventional vs. Non-conventional sources of energy' }] },
          { name: 'Manufacturing Industries', subTopics: [{ name: 'Classification and importance of industries' }, { name: 'Industrial pollution and its control' }] },
          { name: 'Lifelines of National Economy', subTopics: [{ name: 'Major means of transport (Roadways, Railways, etc.)' }, { name: 'Importance of communication' }] },
          { name: 'Power Sharing', subTopics: [{ name: 'Forms of power-sharing' }, { name: 'The Belgian model of accommodation' }] },
          { name: 'Federalism', subTopics: [{ name: 'Key features of federalism' }, { name: 'Decentralization in India' }] },
          { name: 'Political Parties', subTopics: [{ name: 'Functions of political parties' }, { name: 'Challenges faced by political parties' }] },
          { name: 'Outcomes of Democracy', subTopics: [{ name: 'Accountability and legitimacy of democratic governments' }] },
          { name: 'Development', subTopics: [{ name: 'Different development goals' }, { name: 'National income and per capita income' }] },
          { name: 'Sectors of the Indian Economy', subTopics: [{ name: 'Primary, Secondary, and Tertiary sectors' }, { name: 'Organized vs. Unorganized sectors' }] },
          { name: 'Money and Credit', subTopics: [{ name: 'Functions of money and the role of the RBI' }, { name: 'Formal vs. Informal sources of credit' }] },
          { name: 'Globalisation & the Indian Economy', subTopics: [{ name: 'Role of Multinational Corporations (MNCs)' }, { name: 'World Trade Organisation (WTO)' }] },
        ]
      },
      // English
      {
        name: 'English',
        topics: [
          { name: 'A Letter to God', subTopics: [{ name: 'Understanding themes of faith, humanity, and conflict' }, { name: 'Character sketch of Lencho' }] },
          { name: 'Nelson Mandela: Long Walk to Freedom', subTopics: [{ name: 'Understanding the meaning of freedom and apartheid' }, { name: 'Significance of the inauguration ceremony' }] },
          { name: 'Two Stories about Flying', subTopics: [{ name: 'Themes of courage, self-confidence, and overcoming fear' }] },
          { name: 'From the Diary of Anne Frank', subTopics: [{ name: 'Understanding Anne\'s character and her perspective on life' }, { name: 'The importance of having a diary as a friend' }] },
          { name: 'Glimpses of India', subTopics: [{ name: 'Understanding the cultural diversity and unique aspects of Goa, Coorg, and Assam' }] },
          { name: 'Mijbil the Otter', subTopics: [{ name: 'The bond between humans and animals' }, { name: 'Author\'s experiences and observations' }] },
          { name: 'Madam Rides the Bus', subTopics: [{ name: 'Themes of innocence, curiosity, and the journey of life and death' }, { name: 'Character sketch of Valli' }] },
          { name: 'The Sermon at Benares', subTopics: [{ name: 'Gautama Buddha\'s teachings on life, death, and grief' }] },
          { name: 'The Proposal (Play)', subTopics: [{ name: 'Understanding the characters and the satirical nature of the play' }, { name: 'Themes of marriage, wealth, and pride' }] },
          { name: 'Dust of Snow & Fire and Ice', subTopics: [{ name: 'Symbolism and central idea' }, { name: 'Understanding the healing power of nature' }] },
          { name: 'A Tiger in the Zoo', subTopics: [{ name: 'Theme of freedom vs. captivity' }, { name: 'Contrast between the tiger\'s life in the zoo and in the wild' }] },
          { name: 'The Ball Poem', subTopics: [{ name: 'Theme of loss, grief, and the responsibility of growing up' }] },
          { name: 'Amanda!', subTopics: [{ name: 'Understanding the struggles of a child being nagged' }, { name: 'Amanda\'s imagination and desire for freedom' }] },
          { name: 'The Trees', subTopics: [{ name: 'Symbolism of trees representing nature and womanhood' }, { name: 'Conflict between man and nature' }] },
          { name: 'Fog', subTopics: [{ name: 'Use of metaphor (comparing fog to a cat)' }] },
          { name: 'The Tale of Custard the Dragon', subTopics: [{ name: 'Understanding the ballad form' }, { name: 'Theme of bravery and appearances' }] },
          { name: 'For Anne Gregory', subTopics: [{ name: 'Theme of inner vs. outer beauty and true love' }] },
          { name: 'A Triumph of Surgery', subTopics: [{ name: 'Character sketch of Mrs. Pumphrey and Dr. Herriot' }, { name: 'Message about over-pampering' }] },
          { name: 'The Thief\'s Story', subTopics: [{ name: 'Themes of trust, kindness, and transformation' }, { name: 'Character sketches of Hari Singh and Anil' }] },
          { name: 'The Midnight Visitor', subTopics: [{ name: 'Understanding how Ausable outsmarted Max using his wit' }, { name: 'Theme of intelligence over physical strength' }] },
          { name: 'A Question of Trust', subTopics: [{ name: 'Understanding the irony in the story' }, { name: 'Theme that there is "honour among thieves"' }] },
          { name: 'Footprints without Feet', subTopics: [{ name: 'Understanding the character of Griffin and the misuse of science' }] },
          { name: 'The Making of a Scientist', subTopics: [{ name: 'Factors that contributed to Richard Ebright\'s success' }, { name: 'The importance of curiosity and perseverance' }] },
          { name: 'The Necklace', subTopics: [{ name: 'Theme of pride, materialism, and its consequences' }, { name: 'Character sketch of Matilda' }] },
          { name: 'Bholi', subTopics: [{ name: 'Theme of the importance of education for girls' }, { name: 'Bholi\'s transformation' }] },
          { name: 'Tenses', subTopics: [{ name: 'Correct usage of verb forms' }] },
          { name: 'Modals', subTopics: [{ name: 'Correct usage of modals (can, could, may, must, etc.)' }] },
          { name: 'Subject-Verb Concord', subTopics: [{ name: 'Making the verb agree with the subject' }] },
          { name: 'Reported Speech', subTopics: [{ name: 'Converting direct speech to indirect speech (Commands, Requests, Statements, Questions)' }] },
          { name: 'Formal Letter Writing', subTopics: [{ name: 'Letter to the Editor: Format, and how to present an issue' }, { name: 'Letter of Complaint / Enquiry: Format, and how to state the problem or query clearly' }] },
          { name: 'Analytical Paragraph Writing', subTopics: [{ name: 'Analyzing data from a given chart, graph, map, or cues' }, { name: 'Structuring the paragraph with an introduction, body, and conclusion' }] },
        ]
      },
    ],
  'Class 12 Board Exams': [
      {
        name: 'Mathematics',
        topics: [
            { name: 'Relations and Functions', subTopics: [{ name: 'Types of relations and functions (one-one, onto)' }, { name: 'Basic properties' }] },
            { name: 'Inverse Trigonometric Functions', subTopics: [{ name: 'Principal value branches' }] },
            { name: 'Matrices & Determinants', subTopics: [{ name: 'Inverse of a matrix using elementary operations' }, { name: 'Solving systems of linear equations' }] },
            { name: 'Continuity and Differentiability', subTopics: [{ name: 'Concept of continuity and differentiability' }, { name: 'Derivatives of composite, implicit, and inverse trigonometric functions' }] },
            { name: 'Application of Derivatives', subTopics: [{ name: 'Tangents and normals' }, { name: 'Maxima and minima' }, { name: 'Rate of change of quantities' }] },
            { name: 'Integrals', subTopics: [{ name: 'Integration by substitution, by partial fractions, and by parts' }, { name: 'Properties of definite integrals' }] },
            { name: 'Application of Integrals', subTopics: [{ name: 'Finding the area under simple curves' }] },
            { name: 'Differential Equations', subTopics: [{ name: 'Solving first-order, first-degree differential equations (homogeneous, linear)' }] },
            { name: 'Vector Algebra & 3D Geometry', subTopics: [{ name: 'Dot and Cross products' }, { name: 'Shortest distance between two lines in 3D' }, { name: 'Equations of lines and planes' }] },
            { name: 'Linear Programming', subTopics: [{ name: 'Formulating and solving LPPs graphically' }] },
            { name: 'Probability', subTopics: [{ name: 'Conditional probability and independence' }, { name: 'Bayes\' theorem' }] },
        ]
      },
      {
        name: 'English (Core)',
        topics: [
            { name: 'Reading Skills', subTopics: [{ name: 'Unseen Passage (Factual/Descriptive)' }, { name: 'Analyzing data-based passages with visual inputs' }, { name: 'Note-Making and Summarization' }] },
            { name: 'Writing Skills', subTopics: [{ name: 'Invitations: Formal and informal invitations and their replies' }, { name: 'Letter Writing: Application for a job (with bio-data/resume), Letter to the Editor' }, { name: 'Article and Report Writing' }] },
            { name: 'The Last Lesson', subTopics: [{ name: 'Theme: Linguistic chauvinism, importance of one\'s language' }, { name: 'Character: M. Hamel' }] },
            { name: 'Lost Spring', subTopics: [{ name: 'Themes: Grinding poverty, child labour, lost childhood' }, { name: 'Characters: Saheb and Mukesh' }] },
            { name: 'Deep Water', subTopics: [{ name: 'Themes: Overcoming fear, perseverance, psychological analysis of fear' }] },
            { name: 'The Rattrap', subTopics: [{ name: 'Themes: Inherent human goodness, metaphor of the world as a rattrap' }] },
            { name: 'Indigo', subTopics: [{ name: 'Themes: Effective leadership, civil disobedience, Champaran Movement' }, { name: 'Role of Mahatma Gandhi' }] },
            { name: 'Going Places', subTopics: [{ name: 'Themes: Adolescent fantasies, hero-worship, escapism vs. reality' }, { name: 'Character: Sophie' }] },
            { name: 'My Mother at Sixty-Six', subTopics: [{ name: 'Themes: Aging, fear of separation, filial bond' }, { name: 'Poetic Devices: Simile, metaphor, personification' }] },
            { name: 'Keeping Quiet', subTopics: [{ name: 'Themes: Introspection, peace, universal brotherhood' }, { name: 'Symbolism' }] },
            { name: 'A Thing of Beauty', subTopics: [{ name: 'Themes: Nature\'s beauty and its healing power' }, { name: 'Poetic Devices' }] },
            { name: 'A Roadside Stand', subTopics: [{ name: 'Themes: Rural-urban divide, the plight of the poor, unfulfilled promises' }] },
            { name: 'Aunt Jennifer\'s Tigers', subTopics: [{ name: 'Themes: Patriarchal oppression, artistic expression as an escape' }, { name: 'Symbolism of the tigers' }] },
            { name: 'The Third Level', subTopics: [{ name: 'Themes: Intersection of time and space, escapism from modern life' }] },
            { name: 'The Tiger King', subTopics: [{ name: 'Themes: Satire on power, pride, and bureaucracy; wildlife conservation' }] },
            { name: 'Journey to the end of the Earth', subTopics: [{ name: 'Themes: Impact of humans on Earth, climate change, the importance of Antarctica' }] },
            { name: 'The Enemy', subTopics: [{ name: 'Themes: Conflict between patriotism and humanity, kindness' }] },
            { name: 'On the Face of It', subTopics: [{ name: 'Themes: Loneliness, optimism, perspective, looking beyond appearances' }] },
            { name: 'Memories of Childhood', subTopics: [{ name: 'Themes: Caste and racial discrimination, protest, and dignity' }] },
        ]
      },
      {
        name: 'Physics',
        topics: [
            { name: 'Electric Charges and Fields', subTopics: [{ name: 'Coulomb\'s Law' }, { name: 'Electric Field and Dipole' }, { name: 'Gauss\'s Law and its applications' }] },
            { name: 'Electrostatic Potential and Capacitance', subTopics: [{ name: 'Electric Potential and Equipotential surfaces' }, { name: 'Capacitance in series and parallel' }, { name: 'Energy stored in a capacitor' }] },
            { name: 'Current Electricity', subTopics: [{ name: 'Ohm\'s Law and Kirchhoff\'s Laws' }, { name: 'Potentiometer and Meter Bridge' }] },
            { name: 'Moving Charges and Magnetism', subTopics: [{ name: 'Biot-Savart Law and Ampere\'s Law' }, { name: 'Lorentz Force and Cyclotron' }] },
            { name: 'Electromagnetic Induction & AC', subTopics: [{ name: 'Faraday\'s Law of Induction and Lenz\'s Law' }, { name: 'LCR series circuit and resonance' }, { name: 'AC Generator and Transformer' }] },
            { name: 'Optics (Ray & Wave)', subTopics: [{ name: 'Lens Maker\'s formula, Microscope, Telescope' }, { name: 'Huygens\' principle, Interference (YDSE), Diffraction' }] },
            { name: 'Dual Nature, Atoms & Nuclei', subTopics: [{ name: 'Photoelectric effect, de Broglie relation' }, { name: 'Bohr model of the atom' }, { name: 'Mass-energy relation, nuclear fission and fusion' }] },
            { name: 'Semiconductor Electronics', subTopics: [{ name: 'Energy bands in solids' }, { name: 'P-N junction diode' }, { name: 'Diode as a rectifier' }] },
        ]
      },
      {
        name: 'Chemistry',
        topics: [
            { name: 'Solutions', subTopics: [{ name: 'Colligative properties (RLVP, Ebullition, etc.)' }, { name: 'Galvanic cells' }] },
            { name: 'Electrochemistry', subTopics: [{ name: 'Nernst equation' }, { name: 'Kohlrausch\'s law' }] },
            { name: 'Chemical Kinetics', subTopics: [{ name: 'Order of a reaction' }, { name: 'Integrated rate equations (zero and first order)' }, { name: 'Arrhenius equation' }] },
            { name: 'd- and f-Block & Coordination', subTopics: [{ name: 'General trends in properties of transition metals' }, { name: 'Lanthanoid contraction' }, { name: 'Nomenclature, VBT, and CFT of coordination compounds' }] },
            { name: 'Haloalkanes, Alcohols, Phenols', subTopics: [{ name: 'Mechanism of SN1 and SN2 reactions' }] },
            { name: 'Aldehydes, Ketones, Carboxylic Acids', subTopics: [{ name: 'Important named reactions (Aldol, Cannizzaro, etc.)' }, { name: 'Acidity' }] },
            { name: 'Amines & Biomolecules', subTopics: [{ name: 'Basicity of amines' }, { name: 'Diazonium salts' }, { name: 'Carbohydrates, Proteins, Nucleic Acids' }] },
        ]
      },
      {
        name: 'Biology',
        topics: [
            { name: 'Reproduction', subTopics: [{ name: 'Sexual Reproduction in Flowering Plants (Double fertilization)' }, { name: 'Human Reproduction (Menstrual cycle)' }, { name: 'Reproductive Health (Contraception, STDs)' }] },
            { name: 'Genetics and Evolution', subTopics: [{ name: 'Principles of Inheritance (Mendel\'s Laws, Genetic disorders)' }, { name: 'Molecular Basis of Inheritance (DNA replication, transcription, translation)' }] },
            { name: 'Biology and Human Welfare', subTopics: [{ name: 'Human Health and Disease (Immunity, Cancer, AIDS)' }] },
            { name: 'Biotechnology', subTopics: [{ name: 'Principles and Processes (Recombinant DNA technology)' }, { name: 'Applications in agriculture (Bt-cotton) and medicine (Insulin)' }] },
            { name: 'Ecology and Environment', subTopics: [{ name: 'Organisms and Populations (Population interactions)' }, { name: 'Ecosystem (Trophic levels, Pyramids)' }, { name: 'Biodiversity and its Conservation' }] },
        ]
      },
      {
        name: 'Accountancy',
        topics: [
            { name: 'Partnership & Company Accounts', subTopics: [{ name: 'Valuation of Goodwill, Admission/Retirement of Partner' }, { name: 'Issue of Shares and Debentures, Forfeiture of Shares' }] },
            { name: 'Analysis of Financial Statements', subTopics: [{ name: 'Comparative and Common-size statements' }, { name: 'Accounting Ratios: Liquidity, Solvency, etc.' }, { name: 'Cash Flow Statement (Operating, Investing, Financing activities)' }] },
        ]
      },
      {
        name: 'Business Studies',
        topics: [
            { name: 'Principles & Functions of Management', subTopics: [{ name: 'Fayol\'s principles, Taylor\'s scientific management' }, { name: 'Planning, Organising, Staffing, Directing, Controlling' }] },
            { name: 'Business Finance and Marketing', subTopics: [{ name: 'Financial Management (Capital structure, Working capital)' }, { name: 'Financial Markets (Money vs. Capital, SEBI)' }, { name: 'Marketing Mix (Product, Price, Place, Promotion)' }, { name: 'Consumer Protection Act' }] },
        ]
      },
      {
        name: 'Economics',
        topics: [
            { name: 'Macroeconomics', subTopics: [{ name: 'National Income calculation' }, { name: 'Functions of Money and Banking (RBI)' }, { name: 'Determination of Income and Employment (AD-AS framework)' }, { name: 'Government Budget' }, { name: 'Balance of Payments' }] },
            { name: 'Indian Economic Development', subTopics: [{ name: 'State of Indian economy pre- and post-independence' }, { name: 'Economic reforms (LPG)' }, { name: 'Current challenges (Poverty, Human Capital, etc.)' }] },
        ]
      },
      {
        name: 'History',
        topics: [
            { name: 'Themes in Indian History', subTopics: [{ name: 'Indus Valley Civilizations' }, { name: 'Bhakti-Sufi Traditions' }, { name: 'Vijayanagara Empire' }, { name: 'The Revolt of 1857' }, { name: 'Mahatma Gandhi and the Nationalist Movement' }, { name: 'Framing the Constitution' }] },
        ]
      },
      {
        name: 'Political Science',
        topics: [
            { name: 'Contemporary World & Indian Politics', subTopics: [{ name: 'The Cold War Era' }, { name: 'End of Bipolarity' }, { name: 'Challenges of Nation-Building' }, { name: 'The Crisis of the Democratic Order' }, { name: 'Recent Developments in Indian Politics' }] },
        ]
      }
    ],
  'JEE Main': [
    {
      name: 'Physics',
      topics: [
        {
          name: 'Mechanics',
          subTopics: [
            { name: 'Kinematics' },
            { name: 'Laws of Motion' },
            { name: 'Work, Energy and Power' },
            { name: 'Rotational Motion' },
            { name: 'Gravitation' },
          ],
        },
        {
          name: 'Thermodynamics',
          subTopics: [
            { name: 'Thermal Properties of Matter' },
            { name: 'Thermodynamics Laws' },
            { name: 'Kinetic Theory of Gases' },
          ],
        },
        {
            name: 'Optics',
            subTopics: [
                { name: 'Ray Optics' },
                { name: 'Wave Optics' },
            ]
        }
      ],
    },
    {
      name: 'Chemistry',
      topics: [
        {
          name: 'Physical Chemistry',
          subTopics: [
            { name: 'Mole Concept' },
            { name: 'Atomic Structure' },
            { name: 'Chemical Bonding' },
            { name: 'Equilibrium' },
            { name: 'Thermodynamics' },
          ],
        },
        {
          name: 'Organic Chemistry',
          subTopics: [
            { name: 'General Organic Chemistry (GOC)' },
            { name: 'Hydrocarbons' },
            { name: 'Alcohols, Phenols and Ethers' },
            { name: 'Biomolecules' },
          ],
        },
      ],
    },
    {
      name: 'Mathematics',
      topics: [
        {
          name: 'Algebra',
          subTopics: [
            { name: 'Complex Numbers & Quadratic Equations' },
            { name: 'Matrices & Determinants' },
            { name: 'Permutations & Combinations' },
            { name: 'Binomial Theorem' },
          ],
        },
        {
          name: 'Coordinate Geometry',
          subTopics: [
            { name: 'Straight Lines' },
            { name: 'Circles' },
            { name: 'Conic Sections' },
          ],
        },
      ],
    },
  ],
  'UPSC CSE': [
    {
      name: 'General Studies Paper I',
      topics: [
        {
          name: 'Indian History',
          subTopics: [
            { name: 'Ancient India' },
            { name: 'Medieval India' },
            { name: 'Modern Indian History' },
            { name: 'Indian National Movement' },
          ]
        },
        {
          name: 'Geography',
          subTopics: [
            { name: 'Physical Geography' },
            { name: 'Indian Geography' },
            { name: 'World Geography' },
          ]
        },
        {
          name: 'Indian Polity & Governance',
          subTopics: [
            { name: 'Constitution of India' },
            { name: 'Political System' },
            { name: 'Panchayati Raj' },
            { name: 'Public Policy' },
          ]
        }
      ]
    },
    {
      name: 'General Studies Paper II (CSAT)',
      topics: [
        {
          name: 'Comprehension',
          subTopics: [
            { name: 'Reading Comprehension Passages' },
          ]
        },
        {
          name: 'Logical Reasoning & Analytical Ability',
          subTopics: [
            { name: 'Syllogism' },
            { name: 'Puzzles & Seating Arrangement' },
            { name: 'Data Interpretation' },
          ]
        },
        {
          name: 'Basic Numeracy',
          subTopics: [
            { name: 'Number System' },
            { name: 'Percentages' },
            { name: 'Averages' },
          ]
        }
      ]
    }
  ]
};