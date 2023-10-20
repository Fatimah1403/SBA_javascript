// Provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// Provided assignment group.
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

// Provided learner submission data.
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
  // Validate that the AssignmentGroup belongs to the course.
  if (ag.course_id !== course.id) {
    throw new Error("Invalid input: AssignmentGroup does not belong to the course.");
  }

  const result = [];

  // Group submissions by learner_id.
  const submissionsByLearner = submissions.reduce((acc, submission) => {
    if (!acc[submission.learner_id]) {
      acc[submission.learner_id] = {};
    }
    acc[submission.learner_id][submission.assignment_id] = submission;
    return acc;
  }, {});

  // Calculate learner data.
  for (const learnerId in submissionsByLearner) {
    const learnerSubmissions = submissionsByLearner[learnerId];
    const learnerData = {
      id: parseInt(learnerId),
    };

    let totalPoints = 0;
    let totalWeightedPoints = 0;

    for (const assignment of ag.assignments) {
      if (learnerSubmissions[assignment.id]) {
        const submission = learnerSubmissions[assignment.id];
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submission.submission.submitted_at);

        if (dueDate < submittedDate) {
          // Deduct 10% if the submission is late.
          submission.submission.score -= Math.ceil(
            (submission.submission.score / assignment.points_possible) * (assignment.points_possible * 0.1)
          );
        }

        if (assignment.points_possible === 0) {
          throw new Error("Invalid input: points_possible cannot be 0.");
        }

        const assignmentPercentage = (submission.submission.score / assignment.points_possible) * 100;
        const assignmentWeight = assignment.points_possible * (ag.group_weight / 100);

        totalPoints += assignment.points_possible;
        totalWeightedPoints += assignmentPercentage * assignmentWeight;

        learnerData[assignment.id] = assignmentPercentage / 100;
      }
    }

    learnerData.avg = (totalWeightedPoints / totalPoints) * 100;
    result.push(learnerData);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
