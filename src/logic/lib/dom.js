function parseHtmlId(id) {
  let result = id;
  if (!result) {
    return '';
  }
  if (result[0] !== '#') {
    result = `#${result}`;
  }
  return result;
}

function toggleBlock(id) {
  const blockId = parseHtmlId(id);
  const block = $(blockId);
  if (!block[0]) {
    const filename = blockId.split('#')[1];
    $(document.body).load(`src/ui/html/${filename}.html`);
  } else {
    block.remove();
  }
}

// Qcm

function changeQcmText(id, text) {
  const qcmId = parseHtmlId(id);
  const textId = `${qcmId}Text`;
  $(textId).text(text);
}

function addButtonToQcm(id, text) {
  const qcmId = parseHtmlId(id);
  const buttonsBlockId = `${qcmId}Buttons`;
  const number = $(`${qcmId} .qcmButton`).length;
  let type = 'Learning';
  $(buttonsBlockId).append(
    `<button id="${qcmId}Button${number}" class="qcmButton"` +
    ` type="button" onclick="answer${type}('${text}')">${text}</button>`
  );
}

function addButtonToQcm(id, text, buttonFunction, param, style) {
  const buttonStyle = style ? ' ' + style : '';
  const qcmId = parseHtmlId(id);
  const buttonsBlockId = `${qcmId}Buttons`;
  const number = $(`${qcmId} .qcmButton`).length;
  $(buttonsBlockId).append(
    `<button id="${qcmId}Button${number}" class="qcmButton${buttonStyle}"` +
    ` type="button" onclick="${buttonFunction}('${param}')">${text}</button>`
  );
}

function addLearningAnswerButton(text) {
  addButtonToQcm('learningQcm', text, 'answerLearning', text);
}

function addLearningGiveUpButton() {
  addButtonToQcm('learningQcm', 'Je ne sais pas...', 'answerLearning', 'Je ne sais pas...', 'giveUpButton');
}

function addLearningOkButton() {
  addButtonToQcm('learningQcm', 'Ok', 'displayLearningQcmQuestion', '', 'okButton');
}

function getAllQcmButtons(id) {
  const qcmId = parseHtmlId(id);
  return $(`${qcmId} .qcmButton`);
}

function disableQcmButtons(id) {
  getAllQcmButtons(id).attr('onclick', '');
}

function resetQcmButtons(id) {
  getAllQcmButtons(id).remove();
}

function countdown(time, countdownFunction, params) {
  stopCountDown();
  $('#countdown').text(time);
  if (time > 0) {
    _countdown = setTimeout(() => {
      countdown(time - 1, countdownFunction, params);
    }, 1000);
  } else if (countdownFunction) {
    countdownFunction(params);
  }
}

function stopCountDown() {
  clearTimeout(_countdown);
}
