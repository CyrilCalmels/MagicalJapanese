function rangeRand(minRange, maxRange) {
  const rand = Math.random();
  return minRange + Math.round(rand * (maxRange - minRange));
}

function shuffleArray(array) {
    var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

function getByLesson(lesson) {
  const result = [];
  for (const element of _words) {
    if (element[_TITLES.LESSON] === lesson.toString()) {
      result.push(element);
    }
  }
  return result;
}

function loadLesson(lesson, reset) {
  const words = getByLesson(lesson);
  if (reset) {
    _currentLesson = [];
  }
  for (const word of words) {
    _currentLesson.push({
      french: word[_TITLES.FRENCH],
      japanese: word[_TITLES.JAPANESE],
      romaji: word[_TITLES.ROMAJI],
      toFrenchSuccess: 0,
      toJapaneseSuccess: 0
    });
  }
}

function getUnknownWord(knownScore, numberQcmAnswers) {
  const unknownWords = [];
  for (const word of _currentLesson) {
    if (
      word.toFrenchSuccess < knownScore ||
      word.toJapaneseSuccess < knownScore
    ) {
      unknownWords.push(word)
    }
  }
  const nbUnknownWords = unknownWords.length;
  const nbLessonWords = _currentLesson.length;
  if (nbUnknownWords === 0) {
    return null;
  }
  const wordToGuess = unknownWords[rangeRand(0, nbUnknownWords - 1)];
  let languageToGuess = rangeRand(1,2);
  if (
    languageToGuess === 1 && wordToGuess.toFrenchSuccess < knownScore ||
    wordToGuess.toJapaneseSuccess >= knownScore
  ) {
    languageToGuess = 'french';
  } else {
    languageToGuess = 'japanese';
  }
  const answers = [wordToGuess[languageToGuess]];
  const nbAnswers = Math.min(nbLessonWords, numberQcmAnswers);
  while (answers.length < nbAnswers) {
    let index = rangeRand(0, nbUnknownWords - 1);
    while(answers.indexOf(_currentLesson[index][languageToGuess]) !== -1) {
      index = (index + 1) % nbLessonWords;
    }
    answers.push(_currentLesson[index][languageToGuess]);
  }
  shuffleArray(answers);
  return {
    wordToGuess,
    languageToGuess,
    answers
  }
}

function simplifyRomaji(romaji) {
  let result = romaji;
  result = result.replace(/ô/g, 'ou');
  result = result.replace(/û/g, 'uu');
  result = result.replace(/ê/g, 'ee');
  result = result.replace(/â/g, 'aa');
  result = result.replace(/î/g, 'ii');
  result = result.replace(/'/g, '');
  result = result.replace(/,/g, '');
  result = result.replace(/ /g, '_');
  return result;
}
