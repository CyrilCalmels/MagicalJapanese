 function activateLearningQcm(lessons) {
  for (const index in lessons) {
    reset = (index === 0);
    loadLesson(lessons[index], reset);
  }
  if (!$('#learningQcm')[0]) {
    toggleBlock('learningQcm');
  }
  resetQcmButtons('learningQcm');
}

function displayLearningQcmQuestion() {
  const swapLanguages = {
    french: 'japanese',
    japanese: 'french'
  };
  const successLanguages = {
    french: 'toFrenchSuccess',
    japanese: 'toJapaneseSuccess'
  }
  _currentQuestion = getUnknownWord(_LEARNINGQCM.KNOWNSCORE, _LEARNINGQCM.NBANSWERS);
  resetQcmButtons('learningQcm');
  if (_currentQuestion === null) {
    changeQcmText('learningQcm', 'Leçon terminée !');
  } else {
    const {wordToGuess, languageToGuess, answers} = _currentQuestion;
    const questionLanguage = swapLanguages[languageToGuess];
    changeQcmText('learningQcm', wordToGuess[questionLanguage]);
    for (const answer of answers) {
      addLearningAnswerButton(answer);
    }
    addLearningGiveUpButton();
    countdown(
      _DELAY.SUCCESS[wordToGuess[successLanguages[languageToGuess]]],
      answerLearning,
      'Je ne sais pas...'
    );
  }
}

function answerLearning(givenAnswer) {
  stopCountDown();
  const {wordToGuess, languageToGuess, answer} = _currentQuestion;
  const buttons = $('.qcmButton');
  let rightButton, selectedButton;
  for (const button of buttons) {
    if ($(button).text() === wordToGuess[languageToGuess]) {
      rightButton = button;
    }
    if ($(button).text() === givenAnswer) {
      selectedButton = button;
    }
  }
  if (rightButton === selectedButton) {
    if (languageToGuess === 'french') {
      wordToGuess.toFrenchSuccess++;
    } else {
      wordToGuess.toJapaneseSuccess++;
    }
    setTimeout(displayLearningQcmQuestion, _DELAY.ANSWER);
  } else {
    $(selectedButton).addClass('wrong');
    wordToGuess.toFrenchSuccess = 0;
    wordToGuess.toJapaneseSuccess = 0;
    addLearningOkButton();
  }
  $(rightButton).addClass('right');
  const soundUrl = `src/data/mp3/${simplifyRomaji(wordToGuess.romaji)}.mp3`;
  $.get(soundUrl, () => {
    new Audio(soundUrl).play();
  }).fail(() => {
    console.log(`Missing file: ${soundUrl}`);
  });
}

function pause() {
  if (!_pause) {
    stopCountDown();
    resetQcmButtons();
    $('#learningQcmText').text('Pause');
    $('#countdown').text('');
    $('#qcmPauseButton').text('Reprendre');
  } else {
    $('#qcmPauseButton').text('Pause');
    displayLearningQcmQuestion();
  }
  _pause = !_pause;
}
