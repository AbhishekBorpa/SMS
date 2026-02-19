const mongoose = require('mongoose');
const Quiz = require('../src/models/Quiz');
const Assignment = require('../src/models/Assignment');
const User = require('../src/models/User');
const School = require('../src/models/School');
require('dotenv').config();

async function getTeacherAndSchool() {
    // Get first teacher and school from database
    const teacher = await User.findOne({ role: 'Teacher' });
    const school = await School.findOne({});

    if (!teacher || !school) {
        throw new Error('No teacher or school found in database. Please create them first.');
    }

    return { teacherId: teacher._id, schoolId: school._id };
}

const sampleQuizzes = [
    {
        title: 'Mathematics - Algebra Basics',
        subject: 'Mathematics',
        description: 'Test your knowledge of basic algebra concepts',
        duration: 15,
        totalMarks: 10,
        passingMarks: 6,
        status: 'Published',
        isPublic: true,
        questions: [
            {
                questionText: 'What is the value of x in the equation 2x + 5 = 15?',
                options: ['5', '10', '7.5', '3'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Simplify: 3(x + 4) - 2x',
                options: ['x + 12', '5x + 12', 'x + 4', '3x + 12'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the slope of the line y = 3x + 2?',
                options: ['2', '3', '5', '1'],
                correctAnswerIndex: 1,
                marks: 2
            },
            {
                questionText: 'Solve: x² - 9 = 0',
                options: ['x = 3 or x = -3', 'x = 9', 'x = 3', 'x = -9'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is 25% of 80?',
                options: ['20', '15', '25', '30'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Physics - Motion and Force',
        subject: 'Physics',
        description: 'Understanding Newton\'s laws and motion',
        duration: 20,
        totalMarks: 15,
        passingMarks: 9,
        questions: [
            {
                questionText: 'What is Newton\'s First Law of Motion?',
                options: [
                    'An object in motion stays in motion unless acted upon by a force',
                    'F = ma',
                    'For every action there is an equal and opposite reaction',
                    'Energy cannot be created or destroyed'
                ],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'If a car accelerates at 5 m/s² for 4 seconds, what is the change in velocity?',
                options: ['20 m/s', '9 m/s', '1.25 m/s', '5 m/s'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'What is the SI unit of force?',
                options: ['Newton', 'Joule', 'Watt', 'Pascal'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'What is the acceleration due to gravity on Earth?',
                options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '9.0 m/s²'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Which of these is a vector quantity?',
                options: ['Velocity', 'Speed', 'Mass', 'Temperature'],
                correctAnswerIndex: 0,
                marks: 3
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Chemistry - Periodic Table',
        subject: 'Chemistry',
        description: 'Test your knowledge of elements and the periodic table',
        duration: 10,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'What is the chemical symbol for Gold?',
                options: ['Au', 'Ag', 'Go', 'Gd'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'How many elements are in the periodic table?',
                options: ['118', '100', '92', '150'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the atomic number of Carbon?',
                options: ['6', '12', '8', '14'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which element is most abundant in Earth\'s atmosphere?',
                options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Hydrogen'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is H2O commonly known as?',
                options: ['Water', 'Hydrogen Peroxide', 'Hydrochloric Acid', 'Hydroxide'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Biology - Cell Structure',
        subject: 'Biology',
        description: 'Understanding the basic structure of cells',
        duration: 15,
        totalMarks: 12,
        passingMarks: 7,
        questions: [
            {
                questionText: 'What is the powerhouse of the cell?',
                options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which organelle contains genetic material?',
                options: ['Nucleus', 'Mitochondria', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the function of ribosomes?',
                options: ['Protein synthesis', 'Energy production', 'Photosynthesis', 'Cell division'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the outer boundary of an animal cell?',
                options: ['Cell membrane', 'Cell wall', 'Cytoplasm', 'Nuclear membrane'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which cells have chloroplasts?',
                options: ['Plant cells', 'Animal cells', 'Bacterial cells', 'All cells'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the jelly-like substance inside cells called?',
                options: ['Cytoplasm', 'Nucleus', 'Plasma', 'Protoplasm'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'English - Grammar Fundamentals',
        subject: 'English',
        description: 'Test your understanding of basic English grammar',
        duration: 12,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'Which is the correct plural of "child"?',
                options: ['Children', 'Childs', 'Childrens', 'Childes'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Identify the verb in: "The cat sleeps on the mat"',
                options: ['sleeps', 'cat', 'mat', 'on'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What type of word is "quickly"?',
                options: ['Adverb', 'Adjective', 'Noun', 'Verb'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which sentence is grammatically correct?',
                options: [
                    'She doesn\'t like pizza',
                    'She don\'t like pizza',
                    'She doesn\'t likes pizza',
                    'She not like pizza'
                ],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the past tense of "go"?',
                options: ['went', 'goed', 'gone', 'goes'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'History - World War II',
        subject: 'History',
        description: 'Key events and figures of World War II',
        duration: 20,
        totalMarks: 15,
        passingMarks: 9,
        questions: [
            {
                questionText: 'When did World War II begin?',
                options: ['1939', '1914', '1941', '1945'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Who was the Prime Minister of the UK during most of WWII?',
                options: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee', 'Margaret Thatcher'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'The invasion of which country triggered the start of WWII?',
                options: ['Poland', 'France', 'Belgium', 'Russia'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'What was the code name for the Allied invasion of Normandy?',
                options: ['Operation Overlord', 'Operation Barbarossa', 'Operation Market Garden', 'Operation Torch'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Which event brought the United States into WWII?',
                options: ['Attack on Pearl Harbor', 'Sinking of the Lusitania', 'The Zimmerman Telegram', 'The Battle of Britain'],
                correctAnswerIndex: 0,
                marks: 3
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Geography - World Capitals',
        subject: 'Geography',
        description: 'Test your knowledge of world capitals',
        duration: 10,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'What is the capital of Australia?',
                options: ['Canberra', 'Sydney', 'Melbourne', 'Perth'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the capital of Canada?',
                options: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the capital of Japan?',
                options: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the capital of Brazil?',
                options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the capital of Nigeria?',
                options: ['Abuja', 'Lagos', 'Kano', 'Ibadan'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Art - Famous Painters',
        subject: 'Art',
        description: 'Identify famous painters and their works',
        duration: 15,
        totalMarks: 12,
        passingMarks: 7,
        questions: [
            {
                questionText: 'Who painted the Mona Lisa?',
                options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Which artist is known for his "drip" technique?',
                options: ['Jackson Pollock', 'Andy Warhol', 'Salvador Dalí', 'Georgia O\'Keeffe'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Who is famous for co-founding the Cubist movement?',
                options: ['Pablo Picasso', 'Henri Matisse', 'Georges Braque', 'Wassily Kandinsky'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Which Dutch master painted "The Night Watch"?',
                options: ['Rembrandt', 'Johannes Vermeer', 'Frans Hals', 'Jan Steen'],
                correctAnswerIndex: 0,
                marks: 3
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Computer Science - Basic Concepts',
        subject: 'Computer Science',
        description: 'Fundamental concepts of computer science',
        duration: 15,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'What does "CPU" stand for?',
                options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Control Processing Unit'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the binary equivalent of the decimal number 10?',
                options: ['1010', '1100', '1001', '1111'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which of these is a programming language?',
                options: ['Python', 'HTML', 'JPEG', 'CSS'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What does "RAM" stand for?',
                options: ['Random Access Memory', 'Read Only Memory', 'Rapid Access Memory', 'Run-time Access Memory'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is an algorithm?',
                options: ['A step-by-step procedure for calculations', 'A type of computer chip', 'A malicious software', 'A data storage format'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Music - Classical Composers',
        subject: 'Music',
        description: 'Test your knowledge of famous classical composers',
        duration: 12,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'Who composed the "Moonlight Sonata"?',
                options: ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Frédéric Chopin'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which composer is known as the "Father of the Symphony"?',
                options: ['Joseph Haydn', 'George Frideric Handel', 'Antonio Vivaldi', 'Franz Schubert'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Who composed "The Four Seasons"?',
                options: ['Antonio Vivaldi', 'Pyotr Ilyich Tchaikovsky', 'Johannes Brahms', 'Igor Stravinsky'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which Russian composer wrote "The Nutcracker" ballet?',
                options: ['Pyotr Ilyich Tchaikovsky', 'Dmitri Shostakovich', 'Sergei Rachmaninoff', 'Nikolai Rimsky-Korsakov'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which of these composers was a child prodigy?',
                options: ['Wolfgang Amadeus Mozart', 'Richard Wagner', 'Gustav Mahler', 'Hector Berlioz'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Mathematics - Algebra Basics Part 2',
        subject: 'Mathematics',
        description: 'Test your knowledge of basic algebra concepts',
        duration: 15,
        totalMarks: 10,
        passingMarks: 6,
        status: 'Published',
        isPublic: true,
        questions: [
            {
                questionText: 'What is the value of x in the equation 2x + 5 = 15?',
                options: ['5', '10', '7.5', '3'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Simplify: 3(x + 4) - 2x',
                options: ['x + 12', '5x + 12', 'x + 4', '3x + 12'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the slope of the line y = 3x + 2?',
                options: ['2', '3', '5', '1'],
                correctAnswerIndex: 1,
                marks: 2
            },
            {
                questionText: 'Solve: x² - 9 = 0',
                options: ['x = 3 or x = -3', 'x = 9', 'x = 3', 'x = -9'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is 25% of 80?',
                options: ['20', '15', '25', '30'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Physics - Motion and Force Part 2',
        subject: 'Physics',
        description: 'Understanding Newton\'s laws and motion',
        duration: 20,
        totalMarks: 15,
        passingMarks: 9,
        questions: [
            {
                questionText: 'What is Newton\'s First Law of Motion?',
                options: [
                    'An object in motion stays in motion unless acted upon by a force',
                    'F = ma',
                    'For every action there is an equal and opposite reaction',
                    'Energy cannot be created or destroyed'
                ],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'If a car accelerates at 5 m/s² for 4 seconds, what is the change in velocity?',
                options: ['20 m/s', '9 m/s', '1.25 m/s', '5 m/s'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'What is the SI unit of force?',
                options: ['Newton', 'Joule', 'Watt', 'Pascal'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'What is the acceleration due to gravity on Earth?',
                options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '9.0 m/s²'],
                correctAnswerIndex: 0,
                marks: 3
            },
            {
                questionText: 'Which of these is a vector quantity?',
                options: ['Velocity', 'Speed', 'Mass', 'Temperature'],
                correctAnswerIndex: 0,
                marks: 3
            }
        ],
        status: 'Published',
        isPublic: true
    },
    {
        title: 'Chemistry - Periodic Table Part 2',
        subject: 'Chemistry',
        description: 'Test your knowledge of elements and the periodic table',
        duration: 10,
        totalMarks: 10,
        passingMarks: 6,
        questions: [
            {
                questionText: 'What is the chemical symbol for Gold?',
                options: ['Au', 'Ag', 'Go', 'Gd'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'How many elements are in the periodic table?',
                options: ['118', '100', '92', '150'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is the atomic number of Carbon?',
                options: ['6', '12', '8', '14'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'Which element is most abundant in Earth\'s atmosphere?',
                options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Hydrogen'],
                correctAnswerIndex: 0,
                marks: 2
            },
            {
                questionText: 'What is H2O commonly known as?',
                options: ['Water', 'Hydrogen Peroxide', 'Hydrochloric Acid', 'Hydroxide'],
                correctAnswerIndex: 0,
                marks: 2
            }
        ],
        status: 'Published',
        isPublic: true
    }
];

const sampleAssignments = [
    {
        title: 'Algebra Problem Set',
        subject: 'Mathematics',
        description: 'Complete all 10 algebra problems. Show your work for full credit.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalMarks: 50,
        grade: '10',
        attachments: [],
        instructions: 'Solve all problems step by step. Submit handwritten or typed solutions.'
    },
    {
        title: 'Newton\'s Laws Lab Report',
        subject: 'Physics',
        description: 'Write a detailed lab report on the experiment demonstrating Newton\'s laws',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        totalMarks: 100,
        grade: '10',
        attachments: [],
        instructions: 'Include: Introduction, Methodology, Results, Discussion, and Conclusion'
    },
    {
        title: 'Chemical Reactions Essay',
        subject: 'Chemistry',
        description: 'Write a 500-word essay on types of chemical reactions with examples',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        totalMarks: 30,
        grade: '10',
        attachments: [],
        instructions: 'Cover at least 5 types of reactions. Include real-world examples.'
    },
    {
        title: 'Cell Diagram Project',
        subject: 'Biology',
        description: 'Create a detailed diagram of plant and animal cells with labels',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        totalMarks: 40,
        grade: '10',
        attachments: [],
        instructions: 'Label all major organelles. Use colors for clarity.'
    },
    {
        title: 'Book Review - To Kill a Mockingbird',
        subject: 'English',
        description: 'Write a comprehensive book review (750 words minimum)',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        totalMarks: 50,
        grade: '10',
        attachments: [],
        instructions: 'Discuss themes, characters, and your personal reflection'
    },
    {
        title: 'Trigonometry Worksheet',
        subject: 'Mathematics',
        description: 'Complete the trigonometry worksheet - all 15 problems',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        totalMarks: 30,
        grade: '10',
        attachments: [],
        instructions: 'Show all calculations. Round to 2 decimal places.'
    },
    {
        title: 'Photosynthesis Research',
        subject: 'Biology',
        description: 'Research and present the process of photosynthesis',
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        totalMarks: 60,
        grade: '10',
        attachments: [],
        instructions: 'Create a presentation (PowerPoint or PDF) with diagrams'
    },
    {
        title: 'Grammar Exercise Set 3',
        subject: 'English',
        description: 'Complete grammar exercises on pages 45-52',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        totalMarks: 20,
        grade: '10',
        attachments: [],
        instructions: 'Complete all exercises. Check your answers.'
    },
    {
        title: 'Algebra Problem Set Part 2',
        subject: 'Mathematics',
        description: 'Complete all 10 algebra problems. Show your work for full credit.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalMarks: 50,
        grade: '10',
        attachments: [],
        instructions: 'Solve all problems step by step. Submit handwritten or typed solutions.'
    },
    {
        title: 'Newton\'s Laws Lab Report Part 2',
        subject: 'Physics',
        description: 'Write a detailed lab report on the experiment demonstrating Newton\'s laws',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        totalMarks: 100,
        grade: '10',
        attachments: [],
        instructions: 'Include: Introduction, Methodology, Results, Discussion, and Conclusion'
    },
    {
        title: 'Chemical Reactions Essay Part 2',
        subject: 'Chemistry',
        description: 'Write a 500-word essay on types of chemical reactions with examples',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        totalMarks: 30,
        grade: '10',
        attachments: [],
        instructions: 'Cover at least 5 types of reactions. Include real-world examples.'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get teacher and school IDs
        const { teacherId, schoolId } = await getTeacherAndSchool();
        console.log('✅ Found teacher and school');

        // Clear existing data
        await Quiz.deleteMany({});
        await Assignment.deleteMany({});
        console.log('🗑️  Cleared existing quizzes and assignments');

        // Add teacher and school to all quizzes
        const quizzesWithIds = sampleQuizzes.map(quiz => ({
            ...quiz,
            teacher: teacherId,
            school: schoolId
        }));

        // Add teacher and school to all assignments
        const assignmentsWithIds = sampleAssignments.map(assignment => ({
            ...assignment,
            teacher: teacherId,
            school: schoolId
        }));

        // Insert quizzes
        const quizzes = await Quiz.insertMany(quizzesWithIds);
        console.log(`✅ Created ${quizzes.length} quizzes`);

        // Insert assignments
        const assignments = await Assignment.insertMany(assignmentsWithIds);
        console.log(`✅ Created ${assignments.length} assignments`);

        console.log('\n📊 Seed Data Summary:');
        console.log(`   - Quizzes: ${quizzes.length}`);
        console.log(`   - Assignments: ${assignments.length}`);
        console.log('\n🎉 Database seeded successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
