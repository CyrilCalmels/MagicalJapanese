$(document).ready(function() {
  getFileContentPromise('src/data/csv/words.csv').then((csvFile) =>{
    _words = csvToArray(csvFile);
  });
});
