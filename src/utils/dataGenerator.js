import { faker } from '@faker-js/faker';

// Import default student photos
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import img3 from '../assets/images/img3.png';
import img4 from '../assets/images/img4.png';
import img5 from '../assets/images/img5.png';
import img6 from '../assets/images/img6.png';
import img7 from '../assets/images/img7.png';
import img8 from '../assets/images/img8.png';

// Default photos array
const defaultPhotos = [img1, img2, img3, img4, img5, img6, img7, img8];

// Track generated names to ensure uniqueness
const generatedNames = new Set();

// Extended first names dataset
const firstNames = [
  // Male names
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
  'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Dennis', 'Jerry', 'Tyler',
  'Aaron', 'Jose', 'Adam', 'Nathan', 'Henry', 'Douglas', 'Zachary', 'Peter', 'Kyle', 'Walter',
  'Ethan', 'Jeremy', 'Harold', 'Keith', 'Christian', 'Roger', 'Noah', 'Gerald', 'Carl', 'Terry',
  'Sean', 'Austin', 'Arthur', 'Lawrence', 'Jesse', 'Dylan', 'Bryan', 'Joe', 'Jordan', 'Billy',
  'Bruce', 'Albert', 'Willie', 'Gabriel', 'Logan', 'Alan', 'Juan', 'Wayne', 'Elijah', 'Randy',
  'Roy', 'Vincent', 'Ralph', 'Eugene', 'Russell', 'Bobby', 'Mason', 'Philip', 'Louis', 'Caleb',
  'Jack', 'Luke', 'Isaac', 'Levi', 'Oliver', 'Owen', 'Liam', 'Connor', 'Jayden', 'Carter',
  'Hunter', 'Landon', 'Wyatt', 'Colton', 'Cooper', 'Parker', 'Bentley', 'Chase', 'Hudson', 'Easton',
  'Adrian', 'Ian', 'Brayden', 'Carson', 'Nolan', 'Cole', 'Axel', 'Jaxon', 'Tristan', 'Blake',
  'Dominic', 'Maxwell', 'Miles', 'Sawyer', 'Gavin', 'Leonardo', 'Micah', 'Ezra', 'Wesley', 'Damian',
  'Vincent', 'Silas', 'Everett', 'Maddox', 'Kai', 'Declan', 'Rowan', 'Harrison', 'Grayson', 'Asher',
  'Felix', 'Jasper', 'Theo', 'Finn', 'Rhys', 'August', 'Elliot', 'Emmett', 'Atticus', 'Beckett',
  'Graham', 'Knox', 'Archer', 'Milo', 'Jude', 'Oscar', 'Jonah', 'Ryker', 'Ryder', 'Arlo',
  'Simon', 'Tobias', 'Zane', 'Ronan', 'Callum', 'Cody', 'Tanner', 'Travis', 'Garrett', 'Derek',
  'Marcus', 'Spencer', 'Preston', 'Trenton', 'Shane', 'Sergio', 'Cesar', 'Ivan', 'Edgar', 'Hector',
  'Fernando', 'Ricardo', 'Armando', 'Jorge', 'Andre', 'Raul', 'Marco', 'Rafael', 'Pedro', 'Miguel',
  // Female names
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
  'Carol', 'Amanda', 'Dorothy', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
  'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
  'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
  'Diane', 'Ruth', 'Julie', 'Olivia', 'Joyce', 'Virginia', 'Victoria', 'Kelly', 'Lauren', 'Christina',
  'Joan', 'Evelyn', 'Judith', 'Megan', 'Andrea', 'Cheryl', 'Hannah', 'Jacqueline', 'Martha', 'Gloria',
  'Teresa', 'Ann', 'Sara', 'Madison', 'Frances', 'Kathryn', 'Janice', 'Jean', 'Abigail', 'Alice',
  'Judy', 'Sophia', 'Grace', 'Denise', 'Amber', 'Doris', 'Marilyn', 'Danielle', 'Beverly', 'Isabella',
  'Theresa', 'Diana', 'Natalie', 'Brittany', 'Charlotte', 'Marie', 'Kayla', 'Alexis', 'Lori', 'Ava',
  'Mia', 'Ella', 'Lily', 'Chloe', 'Zoe', 'Scarlett', 'Aria', 'Layla', 'Riley', 'Nora',
  'Hazel', 'Ellie', 'Luna', 'Stella', 'Aurora', 'Violet', 'Nova', 'Willow', 'Lucy', 'Ruby',
  'Claire', 'Audrey', 'Bella', 'Maya', 'Elena', 'Savannah', 'Brooklyn', 'Skylar', 'Paisley', 'Everly',
  'Anna', 'Caroline', 'Kennedy', 'Autumn', 'Piper', 'Quinn', 'Naomi', 'Eliana', 'Delilah', 'Ivy',
  'Josephine', 'Madeline', 'Allison', 'Gabriella', 'Serenity', 'Ariana', 'Penelope', 'Adalyn', 'Kinsley', 'Mackenzie',
  'Gianna', 'Valentina', 'Isabelle', 'Vivian', 'Annabelle', 'Emilia', 'Reagan', 'Julia', 'Juliana', 'Melody',
  'Lydia', 'Athena', 'Brielle', 'Camila', 'Eloise', 'Gemma', 'Iris', 'Jasmine', 'Keira', 'Lila',
  'Mabel', 'Nina', 'Ophelia', 'Pearl', 'Rose', 'Sienna', 'Tessa', 'Vera', 'Wren', 'Ximena',
  'Yara', 'Zelda', 'Adriana', 'Bianca', 'Cecilia', 'Daphne', 'Eden', 'Faith', 'Giselle', 'Hope',
  'Imogen', 'Jade', 'Karina', 'Leah', 'Mariana', 'Nadia', 'Paige', 'Raquel', 'Serena', 'Talia'
];

// Extended last names dataset
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
  'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes',
  'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham',
  'Reynolds', 'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson',
  'Ellis', 'Tran', 'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens',
  'Harrison', 'Fernandez', 'McDonald', 'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen',
  'Freeman', 'Webb', 'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter',
  'Gordon', 'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon', 'Munoz', 'Hunt', 'Hicks',
  'Holmes', 'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar', 'Fox',
  'Warren', 'Mills', 'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels', 'Ferguson', 'Nichols', 'Stephens',
  'Soto', 'Weaver', 'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn', 'Kelley', 'Spencer', 'Hawkins',
  'Arnold', 'Pierce', 'Vazquez', 'Hansen', 'Peters', 'Santos', 'Hart', 'Bradley', 'Knight', 'Elliott',
  'Cunningham', 'Duncan', 'Armstrong', 'Hudson', 'Carroll', 'Lane', 'Riley', 'Andrews', 'Alvarado', 'Ray',
  'Delgado', 'Berry', 'Perkins', 'Hoffman', 'Johnston', 'Matthews', 'Pena', 'Richards', 'Contreras', 'Willis',
  'Carpenter', 'Lawrence', 'Sandoval', 'Guerrero', 'George', 'Chapman', 'Rios', 'Estrada', 'Ortega', 'Watkins',
  'Greene', 'Nunez', 'Wheeler', 'Valdez', 'Harper', 'Burke', 'Larson', 'Santiago', 'Maldonado', 'Morrison',
  'Franklin', 'Carlson', 'Austin', 'Dominguez', 'Carr', 'Lawson', 'Jacobs', 'Obrien', 'Lynch', 'Singh',
  'Vega', 'Bishop', 'Montgomery', 'Oliver', 'Jensen', 'Harvey', 'Williamson', 'Gilbert', 'Dean', 'Sims',
  'Espinoza', 'Howell', 'Li', 'Wong', 'Reid', 'Hanson', 'Le', 'McCoy', 'Garrett', 'Burton',
  'Fuller', 'Wang', 'Weber', 'Welch', 'Rojas', 'Lucas', 'Marquez', 'Fields', 'Park', 'Yang',
  'Little', 'Banks', 'Padilla', 'Day', 'Walsh', 'Bowman', 'Schultz', 'Luna', 'Fowler', 'Mejia',
  'Davidson', 'Acosta', 'Brewer', 'May', 'Holland', 'Juarez', 'Newman', 'Pearson', 'Curtis', 'Cortez',
  'Douglas', 'Schneider', 'Joseph', 'Barrett', 'Navarro', 'Figueroa', 'Keller', 'Avila', 'Wade', 'Molina',
  'Stanley', 'Hopkins', 'Campos', 'Barnett', 'Bates', 'Chambers', 'Caldwell', 'Beck', 'Lambert', 'Miranda',
  'Byrd', 'Craig', 'Ayala', 'Lowe', 'Frazier', 'Powers', 'Neal', 'Leonard', 'Gregory', 'Carrillo',
  'Sutton', 'Fleming', 'Rhodes', 'Shelton', 'Schwartz', 'Norris', 'Jennings', 'Watts', 'Duran', 'Walters',
  'Cohen', 'McDaniel', 'Moran', 'Parks', 'Steele', 'Vaughn', 'Becker', 'Holt', 'DeLeon', 'Barker',
  'Terry', 'Hale', 'Leon', 'Hail', 'Benson', 'Haynes', 'Horton', 'Miles', 'Lyons', 'Pham',
  'Graves', 'Bush', 'Thornton', 'Wolfe', 'Warner', 'Cabrera', 'McKinney', 'Mann', 'Zimmerman', 'Dawson',
  'Lara', 'Fletcher', 'Page', 'McCarthy', 'Love', 'Robles', 'Cervantes', 'Solis', 'Erickson', 'Reeves',
  'Chang', 'Klein', 'Salinas', 'Fuentes', 'Baldwin', 'Daniel', 'Simon', 'Velasquez', 'Hardy', 'Higgins'
];

// Generate unique student name with random suffix to prevent duplicates
const generateUniqueName = () => {
  // Randomly select first and last name from the large datasets
  const firstName = faker.helpers.arrayElement(firstNames);
  const lastName = faker.helpers.arrayElement(lastNames);
  
  // Add 1-2 random lowercase letters as suffix to lastName to prevent duplicates
  const suffixLength = faker.number.int({ min: 1, max: 2 });
  const suffix = faker.string.alpha({ length: suffixLength, casing: 'lower' });
  
  const lastNameWithSuffix = `${lastName}${suffix}`;
  const fullName = `${lastNameWithSuffix} ${firstName}`;
  
  // Track the name (optional, since suffix makes it highly unique)
  generatedNames.add(fullName);
  
  return { firstName, lastName: lastNameWithSuffix, fullName };
};

export const generateRandomData = () => {
  // Generate dates within the past 2 months from current date
  const currentDate = new Date();
  const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  // Generate a statement date within past 2 months (but leave room for due date)
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const statementDate = faker.date.between({ from: twoMonthsAgo, to: oneMonthAgo });
  
  // Due date is typically 2-4 weeks after statement, but ensure it doesn't exceed current date
  const dueDate = new Date(statementDate);
  dueDate.setDate(dueDate.getDate() + faker.number.int({ min: 14, max: 30 }));
  // If due date exceeds current date, cap it at current date - 1 day
  if (dueDate > currentDate) {
    dueDate.setTime(currentDate.getTime());
    dueDate.setDate(dueDate.getDate() - 1);
  }
  
  // Issue date within past 2 months
  const issueDate = faker.date.between({ from: twoMonthsAgo, to: currentDate });
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const { firstName, lastName, fullName } = generateUniqueName();

  // Default university (not randomized)
  const university = "Hudson County Community College"; 

  // Course Data Pool based on Major
  const majors = [
    { name: "Computer Science", college: "College of Science and Engineering", program: "Bachelor of Science", prefix: "CS" },
    { name: "Business Administration", college: "McCoy College of Business", program: "Bachelor of Business Admin", prefix: "BA" },
    { name: "Psychology", college: "College of Liberal Arts", program: "Bachelor of Arts", prefix: "PSY" },
    { name: "Biology", college: "College of Science and Engineering", program: "Bachelor of Science", prefix: "BIO" },
    { name: "Marketing", college: "McCoy College of Business", program: "Bachelor of Business Admin", prefix: "MKT" },
  ];

  const selectedMajor = faker.helpers.arrayElement(majors);

  // Generate random courses logic
  const generateCourses = (majorPrefix, term) => {
    const commonCourses = [
        { code: "ENG 1310", name: "College Writing I", hours: 3 },
        { code: "ENG 1320", name: "College Writing II", hours: 3 },
        { code: "HIST 1310", name: "History of US to 1877", hours: 3 },
        { code: "POSI 2310", name: "Principles of American Govt", hours: 3 },
        { code: "COMM 1310", name: "Fund. of Human Communication", hours: 3 },
        { code: "PHIL 1305", name: "Philosophy & Critical Thinking", hours: 3 },
        { code: "ART 2313", name: "Introduction to Fine Arts", hours: 3 },
    ];

    const majorCoursesPool = {
        "CS": [
            { code: "CS 1428", name: "Foundations of Computer Science I", hours: 4 },
            { code: "CS 2308", name: "Foundations of Computer Science II", hours: 3 },
            { code: "CS 3358", name: "Data Structures", hours: 3 },
            { code: "MATH 2471", name: "Calculus I", hours: 4 },
            { code: "MATH 2358", name: "Discrete Mathematics I", hours: 3 },
        ],
        "BA": [
            { code: "MGT 3303", name: "Management of Organizations", hours: 3 },
            { code: "MKT 3343", name: "Principles of Marketing", hours: 3 },
            { code: "ACC 2361", name: "Intro to Financial Accounting", hours: 3 },
            { code: "ECO 2314", name: "Principles of Microeconomics", hours: 3 },
            { code: "FIN 3312", name: "Business Finance", hours: 3 },
        ],
        "PSY": [
            { code: "PSY 1300", name: "Introduction to Psychology", hours: 3 },
            { code: "PSY 3300", name: "Lifespan Development", hours: 3 },
            { code: "PSY 3322", name: "Brain and Behavior", hours: 3 },
            { code: "SOC 1310", name: "Introduction to Sociology", hours: 3 },
            { code: "PSY 3341", name: "Cognitive Processes", hours: 3 },
        ],
        "BIO": [
            { code: "BIO 1330", name: "Functional Biology", hours: 3 },
            { code: "BIO 1130", name: "Functional Biology Lab", hours: 1 },
            { code: "CHEM 1341", name: "General Chemistry I", hours: 3 },
            { code: "CHEM 1141", name: "General Chemistry I Lab", hours: 1 },
            { code: "BIO 2450", name: "Genetics", hours: 4 },
        ],
        "MKT": [
            { code: "MKT 3350", name: "Consumer Behavior", hours: 3 },
            { code: "MKT 3358", name: "Professional Selling", hours: 3 },
            { code: "MKT 4330", name: "Promotional Strategy", hours: 3 },
            { code: "BLAW 2361", name: "Legal Environment of Business", hours: 3 },
            { code: "QMST 2333", name: "Business Statistics", hours: 3 },
        ]
    };

    // Mix 2-3 major courses with 2-3 common courses for realism
    const numMajor = faker.number.int({ min: 2, max: 3 });
    const numCommon = 5 - numMajor;
    
    const myMajorCourses = faker.helpers.arrayElements(majorCoursesPool[majorPrefix], numMajor);
    const myCommonCourses = faker.helpers.arrayElements(commonCourses, numCommon);
    
    const combined = [...myMajorCourses, ...myCommonCourses];
    
    // Generate Grades and Quality Points
    return combined.map(c => {
        const gradePool = ['A', 'A', 'A', 'A', 'B', 'B']; // Heavily skew towards A and B to ensure passing and realistic "good student" GPA
        const grade = faker.helpers.arrayElement(gradePool);
        let pointsPerHour = 0;
        if(grade === 'A') pointsPerHour = 4;
        else if(grade === 'B') pointsPerHour = 3;
        else if(grade === 'C') pointsPerHour = 2;
        else if(grade === 'D') pointsPerHour = 1;
        
        return {
            ...c,
            grade: grade,
            qualityPoints: (c.hours * pointsPerHour).toFixed(2),
            hours: c.hours.toFixed(2)
        };
    });
  };

  const termCourses = generateCourses(selectedMajor.prefix, "Fall 2025");
  const springCourses = generateCourses(selectedMajor.prefix, "Spring 2026");

  // Calculate GPA logic
  const calculateTermStats = (courses) => {
    const attempted = courses.reduce((acc, c) => acc + parseFloat(c.hours), 0);
    const earned = attempted; // Assuming no Fs
    const qualityPoints = courses.reduce((acc, c) => acc + parseFloat(c.qualityPoints), 0);
    const gpa = (qualityPoints / attempted).toFixed(2);
    return { attempted, earned, qualityPoints, gpa };
  };

  const fallStats = calculateTermStats(termCourses);
  const springStats = calculateTermStats(springCourses);
  
  // Cumulative (mock previous data + current)
  const prevHours = faker.number.int({ min: 15, max: 60 });
  const prevGpa = faker.number.float({ min: 3.2, max: 4.0 }); // Ensure previous GPA is solid (above 3.2)
  const prevPoints = prevHours * prevGpa;
  
  const cumAttempted = prevHours + fallStats.attempted + springStats.attempted;
  const cumPoints = prevPoints + fallStats.qualityPoints + springStats.qualityPoints;
  const cumGpa = (cumPoints / cumAttempted).toFixed(2);

  // Tuition Data Logic
  // Base tuition around 9500, slightly random but rounded to whole number
  const baseTuition = faker.number.int({ min: 9400, max: 9800 });
  
  // Differential tuition depends on college (mock logic)
  let diffTuition = 0;
  if (selectedMajor.college.includes("Business")) diffTuition = 1100;
  else if (selectedMajor.college.includes("Science")) diffTuition = 975;
  else diffTuition = 850;
  
  const fees = {
      studentService: 340,
      computerService: 210,
      library: 150,
      medical: 95,
      other: 680,
      intlOps: 75,
      insurance: 1650
  };
  
  const totalFees = Object.values(fees).reduce((a, b) => a + b, 0) + diffTuition;
  const totalCharges = baseTuition + totalFees;

  // Admission date: 1-3 years ago (ensures student card remains valid)
  const yearsEnrolled = faker.number.int({ min: 1, max: 3 });
  const admissionDate = new Date();
  admissionDate.setFullYear(admissionDate.getFullYear() - yearsEnrolled);
  // Randomize to a semester start (Aug/Sep or Jan/Feb)
  admissionDate.setMonth(faker.helpers.arrayElement([0, 1, 7, 8]));
  admissionDate.setDate(faker.number.int({ min: 15, max: 28 }));

  // Card Issue Date: not earlier than 3 months ago from current date
  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  const cardIssueDate = faker.date.between({ 
    from: threeMonthsAgo, 
    to: currentDate 
  });
  
  // Card Valid Date: 3 years from current year
  const cardValidDate = new Date(currentDate);
  cardValidDate.setFullYear(cardValidDate.getFullYear() + 3);

  return {
    universityName: university,
    universityLogo: '/university-logo.png',
    universityAddress: `${faker.number.int({min: 100, max: 9999})} University Blvd, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })}, ${faker.location.zipCode()}`,
    studentName: fullName, 
    studentID: `${faker.string.numeric(6)}-${faker.string.numeric(4)}`,
    passportNumber: faker.string.alphanumeric(9).toUpperCase(), // Added passport
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}`,
    term: "Fall 2025", 
    major: selectedMajor.name, 
    program: selectedMajor.program,
    college: selectedMajor.college,
    statementDate: formatDate(statementDate),
    dueDate: formatDate(dueDate),
    issueDate: formatDate(issueDate),
    admissionDate: formatDate(admissionDate), // Added admission date
    officials: {
        dean: `${faker.person.lastName()}, ${faker.person.firstName()} (PhD)`,
        registrar: `${faker.person.lastName()}, ${faker.person.firstName()}`
    },
    tuition: {
        base: baseTuition.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
        differential: diffTuition.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
        fees: fees,
        total: totalCharges.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    },
    courses: {
        current: termCourses,
        next: springCourses
    },
    stats: {
        current: fallStats,
        next: springStats,
        cumulative: {
            attempted: cumAttempted.toFixed(2),
            earned: cumAttempted.toFixed(2),
            qualityPoints: cumPoints.toFixed(2),
            gpa: cumGpa
        }
    },
    // Student Card specific
    cardSubtitle: 'INTERNATIONAL STUDENT ID CARD',
    cardIssueDate: formatDate(cardIssueDate),
    cardValidDate: formatDate(cardValidDate),
    cardNotice: 'This card is the property of the university and must be returned upon request. If found, please return to the nearest university office.',
    cardColor: '#3e80cc',
    studentPhoto: faker.helpers.arrayElement(defaultPhotos),
    
    // Teacher Card specific
    teacherName: `${firstName} ${lastName}`,
    teacherID: `FAC${faker.string.numeric(4)}`,
    teacherPhoto: faker.helpers.arrayElement(defaultPhotos),
    department: faker.helpers.arrayElement([
      'Department of Computer Science',
      'Department of Mathematics',
      'Department of Physics',
      'Department of Chemistry',
      'Department of Biology',
      'Department of Psychology',
      'Department of English Literature',
      'Department of History',
      'Department of Economics',
      'Department of Business Administration'
    ]),
    position: faker.helpers.arrayElement([
      'Full Professor', 
      'Associate Professor', 
      'Assistant Professor', 
      'Distinguished Professor',
      'Professor Emeritus',
      'Clinical Professor',
      'Research Professor'
    ]),
    employmentStartDate: formatDate(faker.date.past({ years: faker.number.int({ min: 2, max: 20 }) })),
    teacherCardSubtitle: 'FACULTY IDENTIFICATION CARD',
    teacherCardNotice: 'This faculty identification card is the property of the university and grants access to restricted academic facilities, laboratories, and administrative areas. This card must be displayed at all times while on campus. Loss or theft must be reported immediately to Campus Security.',
    officeRoom: `Room ${faker.number.int({ min: 100, max: 999 })}`,
    phoneExtension: faker.string.numeric(4),
    
    // Official Letter specific
    presidentName: faker.helpers.arrayElement([
      'Margaret Thompson',
      'Robert Anderson',
      'Elizabeth Davis',
      'Michael Johnson',
      'Sarah Williams',
      'David Brown',
      'Jennifer Miller',
      'Christopher Wilson'
    ]),
    letterDate: formatDate(new Date()),
    referenceNumber: `AA-${new Date().getFullYear()}-${faker.string.numeric(4)}`,
    verificationCode: faker.string.alphanumeric(9).toUpperCase(),
    
    // Payroll data
    employmentType: faker.helpers.arrayElement(['Full-Time Faculty', 'Associate Faculty', 'Adjunct Professor', 'Research Faculty', 'Clinical Faculty']),
    baseSalary: faker.number.int({ min: 7500, max: 12000 }),
    researchStipend: faker.number.int({ min: 800, max: 1500 }),
    overloadRate: faker.number.int({ min: 75, max: 95 }),
    overloadHours: faker.number.int({ min: 8, max: 20 }),
    checkNumber: `CHK${faker.number.int({ min: 100000, max: 999999 })}`,
    bankName: faker.helpers.arrayElement(['First National Bank', 'City Trust Bank', 'University Credit Union', 'Regional Savings Bank', 'Community Bank']),
    accountLastFour: faker.string.numeric(4),
    
    // Calculate earnings
    get overloadPay() { return this.overloadRate * this.overloadHours; },
    get totalEarnings() { return this.baseSalary + this.researchStipend + this.overloadPay; },
    
    // Calculate deductions (realistic percentages)
    get federalTax() { return Math.round(this.totalEarnings * 0.22 * 100) / 100; },
    get stateTax() { return Math.round(this.totalEarnings * 0.05 * 100) / 100; },
    get socialSecurity() { return Math.round(this.totalEarnings * 0.062 * 100) / 100; },
    get medicare() { return Math.round(this.totalEarnings * 0.0145 * 100) / 100; },
    healthInsurance: faker.number.int({ min: 250, max: 350 }),
    get retirement() { return Math.round(this.totalEarnings * 0.10 * 100) / 100; },
    dentalInsurance: faker.number.int({ min: 25, max: 35 }),
    
    get totalDeductions() { 
      return this.federalTax + this.stateTax + this.socialSecurity + this.medicare + 
             this.healthInsurance + this.retirement + this.dentalInsurance; 
    },
    get netPay() { return Math.round((this.totalEarnings - this.totalDeductions) * 100) / 100; },
    
    // YTD calculations (9 months)
    get ytdBaseSalary() { return this.baseSalary * 9; },
    get ytdResearchStipend() { return this.researchStipend * 9; },
    get ytdOverloadPay() { return this.overloadPay * 6; }, // Not every month
    get ytdTotalEarnings() { return this.ytdBaseSalary + this.ytdResearchStipend + this.ytdOverloadPay; },
    get ytdFederalTax() { return Math.round(this.ytdTotalEarnings * 0.22 * 100) / 100; },
    get ytdStateTax() { return Math.round(this.ytdTotalEarnings * 0.05 * 100) / 100; },
    get ytdSocialSecurity() { return Math.round(this.ytdTotalEarnings * 0.062 * 100) / 100; },
    get ytdMedicare() { return Math.round(this.ytdTotalEarnings * 0.0145 * 100) / 100; },
    get ytdHealthInsurance() { return this.healthInsurance * 9; },
    get ytdRetirement() { return Math.round(this.ytdTotalEarnings * 0.10 * 100) / 100; },
    get ytdDentalInsurance() { return this.dentalInsurance * 9; },
    get ytdTotalDeductions() { 
      return this.ytdFederalTax + this.ytdStateTax + this.ytdSocialSecurity + this.ytdMedicare + 
             this.ytdHealthInsurance + this.ytdRetirement + this.ytdDentalInsurance; 
    },
    get ytdNetPay() { return Math.round((this.ytdTotalEarnings - this.ytdTotalDeductions) * 100) / 100; }
  };
};
