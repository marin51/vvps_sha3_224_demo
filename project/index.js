var fkstHashConsole = (function() {
    'use strict';
    return function(string) {
        var hash = sha3_224.getInc();
        if (string.length) {
            document.getElementById('input-text-result').innerText = hash(string);
            return hash(string);
        } else {
            document.getElementById('input-text-result').innerText = '';
            return '';
        }
    };
}());

var fkstHashString = (function() {
    'use strict';
    return function() {
        var hash = sha3_224.getInc();
        return hash('abc');
    };
}());

var fkstHashFile = (function() {
    'use strict';
    return function(file) {
        var hash = sha3_224.getInc(),
            reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            document.getElementById('input-file-read-result').innerHTML = `plain text: <br> ${reader.result} <br>sha3_224: <br> ${hash(reader.result)}`;
            return hash(reader.result);

        };
        reader.onerror = function() {
            document.getElementById('input-file-read-result').innerText = reader.error;
            return 'Error';
        };
    };
}());

document.getElementById('hash-string').innerHTML = `Hash from String: text to hash:<br> "abc" <br> sha3_224: <br>${fkstHashString()}`;