const fkstHashConsole = (function() {
    'use strict';
    return function(string) {
        var hash = sha3_224.getInstance();
        if (typeof string === 'string' && string.length) {
            document.getElementById('input-text-result').innerText = hash(string);
            return hash(string);
        } else {
            document.getElementById('input-text-result').innerText = '';
            return '';
        }
    };
}());

const fkstHashString = (function() {
    'use strict';
    return function() {
        var hash = sha3_224.getInstance();
        return hash('abc');
    };
}());

const fkstHashFile = (function() {
    'use strict';


    return function(fileUrl, showOnDisplay = false) {

        return new Promise(function(resolve) {
            if (typeof fileUrl === 'string' && fileUrl.length && fileUrl.endsWith('.txt')) {
                fetch(fileUrl).then(function(file) {
                    return file.text();
                }).then(function(text) {
                    var hash = sha3_224.getInstance();
                    if (text.length) {
                        resolve(hash(text));
                    } else {
                        resolve('');
                    }
                    if (showOnDisplay) {
                        document.getElementById('input-file-read-result').innerHTML = `Plain text: <br> ${text} <br>sha3_224: <br> ${hash(text)}`;
                    }
                });
            } else {
                resolve("Wrong file format");
            }
        })
    };
}());