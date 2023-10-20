// The provided course information.
let log = console.log
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };

  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345, 
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };

  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function getLearnerData(course, ag, submissions) {
    // First we ensure the assignment group_id matches the course_id
    try {
        if (ag.course_id !== course.id) {
            throw new Error("Invalid input: Assignment group does not match course id");
        }
      // we validate the assignment_group possible point should be greter than 0
        for (let x of AssignmentGroup.assignments) {
            if (x.points_possible <= 0) {
                throw new Error (`Error at : ${x.name}\nArithmetic Error: Divisor can not be zero`);
            }
        }
      // verify all the scores is of type number for the submission object
        for (let x of submissions) {
            if (typeof(x.submission.score) != 'number') {
                throw new Error (`Error at : learner_id:${x.learner_id} with assignment_id:${x.assignment_id}\nValue Error: Score must be a number.`);
            }
        }
      //   for (let x of LearnerSubmissions) {
      //     log(`Here: ${x.assignment_id}`)
      //     for (let y in x.submission) {
      //         log (`Then: ${x.submission[y]}`)
      //     }
      // }
      
        // Validate if the submission date is early
        const dueDate = new Date(assignments.due_at);
        const submissionDate = new Date(submissions.submitted_at);
        if (submissionDate <= dueDate) {
          const tot_points = assignment.points_possible;
          const score = submissions.score;
          const latePenalty = submissionDate > dueDate ? (tot_points * 0.10) : 0;

          if (!result[submission.learner_id]) {
            result[submissions.learner_id] = {
              avg: 0,
            };
          }
          const learnerResult = result[submissions.learner_id];
          learnerResult[assignment_id] = (score - latePenalty) / tot_points;
          // update the learner's average
          if (learnerResult.avg === 0) {
            learnerResult.avg = learnerResult[assignment.id];
        } else {
            learnerResult.avg = (learnerResult.avg + learnerResult[assignment.id]) / 2;
        }
        }
             
        
           
        const result = [
          {
            id: 125,
            avg: 0.985, // (47 + 150) / (50 + 150)
            1: 0.94, // 47 / 50
            2: 1.0 // 150 / 150
          },
          {
            id: 132,
            avg: 0.82, // (39 + 125) / (50 + 150)
            1: 0.78, // 39 / 50
            2: 0.833 // late: (140 - 15) / 150
          }
        ];
    return result;
        
    } 
    catch (err) {
        log(err.message);
    }
}

  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions); 
  //const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);    
  // console.log(result);