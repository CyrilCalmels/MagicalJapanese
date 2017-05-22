function getFileContentPromise(filePath) {
  return new Promise ((resolve, reject) => {
    $.ajax({
        url : filePath,
        dataType: 'text',
        success : (data) => {
          if (!data) {
            return reject(new Error('Empty file'));
          }
          return resolve(data);
        }
    });
  });
}

function csvToArray(csvFile) {
  const lines = csvFile.split('\n');
  const titles = lines[0].split(',');
  const result = [];
  for (let index = 1; index < lines.length; index++) {
    const line = lines[index].split(',');
    const element = {};
    for (const data in line) {
      element[titles[data]] = line[data];
    }
    result.push(element);
  }
  return result;
}
