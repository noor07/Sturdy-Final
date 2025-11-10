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
      name: 'Physics',
      topics: [
        {
          name: 'Electrostatics',
          subTopics: [
            { name: 'Electric Charges and Fields' },
            { name: 'Electrostatic Potential and Capacitance' },
          ],
        },
        {
          name: 'Current Electricity',
          subTopics: [
            { name: 'Ohm\'s Law and Resistance' },
            { name: 'Kirchhoff\'s Laws' },
            { name: 'Potentiometer' },
          ],
        },
        {
            name: 'Magnetic Effects of Current and Magnetism',
            subTopics: [
              { name: 'Moving Charges and Magnetism' },
              { name: 'Magnetism and Matter' },
            ],
        },
      ],
    },
    {
      name: 'Chemistry',
      topics: [
        {
          name: 'Solutions',
          subTopics: [
            { name: 'Types of Solutions' },
            { name: 'Colligative Properties' },
          ],
        },
        {
          name: 'Electrochemistry',
          subTopics: [
            { name: 'Electrochemical Cells' },
            { name: 'Nernst Equation' },
          ],
        },
        {
            name: 'd-and f-Block Elements',
            subTopics: [
                { name: 'General Properties' },
                { name: 'Lanthanoids and Actinoids' },
            ],
        }
      ],
    },
    {
        name: 'Mathematics',
        topics: [
            {
                name: 'Relations and Functions',
                subTopics: [
                    { name: 'Types of Relations' },
                    { name: 'Types of Functions' },
                    { name: 'Inverse Trigonometric Functions' },
                ]
            },
            {
                name: 'Calculus',
                subTopics: [
                    { name: 'Continuity and Differentiability' },
                    { name: 'Integrals' },
                    { name: 'Differential Equations' },
                ]
            }
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