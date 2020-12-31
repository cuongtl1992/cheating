const request = require('request');
const CronJob = require('cron').CronJob;
const makeId = (length) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const job = new CronJob('*/5 * * * * *', function () {
  const d = new Date();
  console.log('Every Tenth Minute:', d);

  let index = 0;

  while (index < 1000) {
    const postData = {
      presentation: 902630,
      slide: 13010425,
      audience: makeId(11),
      accessCode: 'rv5iivnlcl',
      slideTimestamp: Date.now(),
      config: {
        timeToAnswer: 15,
        quizTimestamp: [],
        multipleChoice: true,
        isCorrectGetPoint: false,
        stopSubmission: false,
        fastAnswerGetMorePoint: true,
        otherCorrectQuiz: [],
        correctQuizTypeAnswer: null,
        maxPoint: 100,
        minPoint: 50,
        SlideOptions: [
          { id: 39408663, correct: null },
          { id: 39408667, correct: null },
          { id: 39408662, correct: null },
          { id: 39408798, correct: null },
          { id: 39408799, correct: null },
          { id: 39408800, correct: null },
          { id: 39408666, correct: null },
          { id: 39408797, correct: null },
          { id: 39408665, correct: null },
          { id: 39408661, correct: null },
        ],
      },
      type: 'multipleChoice',
      slideType: null,
      vote: [39408799],
    };

    console.log('spam running for id ' + postData.audience);
    request
      .post('https://audience.ahaslides.com/api/answer/create/', {
        headers: {
          accept: 'application/json, text/plain, */*',
        },
        'content-type': 'application/json',
      })
      .json(postData)
      .on('response', (data) => {
        if (data.statusCode === 200) {
          console.log('spam successed');
        } else {
          console.log('spam error ' + data.toJSON());
        }
      })
      .on('error', () => {
        console.log('spam error');
      });

    index++;
  }
});
console.log('After job instantiation');
job.start();
