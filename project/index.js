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


    return function(fileUrl, showOnDisplay = false) {

        return new Promise(function(resolve) {
            if (fileUrl.endsWith('.txt')) {
                fetch(fileUrl).then(function(file) {
                    return file.text();
                }).then(function(text) {
                    var hash = sha3_224.getInc();
                    if (text.length) {
                        resolve(hash(text));
                    } else {
                        resolve('');
                    }
                    if (showOnDisplay) {
                        document.getElementById('input-file-read-result').innerHTML = `plain text: <br> ${text} <br>sha3_224: <br> ${hash(text)}`;
                    }
                });
            } else {
                resolve("Wrong file format");
            }
        })
    };
}());