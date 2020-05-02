var tests = (function() {
    'use strict';


    function testHashFromFile() {
        QUnit.test("Hash from File", function(assert) {
            var done = assert.async(5);
            fkstHashFile('http://localhost/vvps/project/testFiles/abc.txt').then(function(result) {
                assert.equal(result, "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
                done();
            });

            fkstHashFile('http://localhost/vvps/project/testFiles/empty_file.txt').then(function(result) {
                assert.equal(result, "");
                done();
            });

            fkstHashFile('http://localhost/vvps/project/testFiles/123456789.txt').then(function(result) {
                assert.equal(result, "5795c3d628fd638c9835a4c79a55809f265068c88729a1a3fcdf8522");
                done();
            });
            fkstHashFile('http://localhost/vvps/project/testFiles/img.jpg').then(function(result) {
                assert.equal(result, "Wrong file format");
                done();
            });
            fkstHashFile('http://localhost/vvps/project/testFiles/word.docx').then(function(result) {
                assert.equal(result, "Wrong file format");
                done();
            });
        });
    }

    function testHashFromConsole() {
        QUnit.test("Hash from Console", function(assert) {
            assert.equal(fkstHashConsole("a"), "9e86ff69557ca95f405f081269685b38e3a819b309ee942f482b6a8b");
            assert.equal(fkstHashConsole("ab"), "09d27a15bcbab5da828d84dbd66062e5d37049f9b165a65dc581e853");
            assert.equal(fkstHashConsole("abc"), "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
            assert.equal(fkstHashConsole("bac"), "5f3569911cbb51155303fb53649913a85a6d58c4465736f490231e24");
            assert.equal(fkstHashConsole("acb"), "e83488a992c7111f20bb9eca90ff323f2f42703dfe8037f1e096678e");
            assert.equal(fkstHashConsole(""), "");
        });
    }

    function testHashFromString() {
        QUnit.test("Hash from String", function(assert) {
            assert.equal(fkstHashString(), "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
        });
    }

    function testAlgorithCollision() {
        var hash = sha3_224.getInstance(),
            result = '',
            testArray = [
                hash('hello'),
                hash('elloh'),
                hash('oehll'),
                hash('llheo'),
                hash('olhel'),
                hash('ohllo')
            ];

        for (var index = 0; index < arrayForTest.length; index += 1) {
            if (result !== arrayForTest[index]) {
                result = arrayForTest[index];
            } else {
                return alert('Test for collision fail');
            }
        }
        return alert('Test for collision pass successfully')
    }

    function testHashNumber() {
        var hash = sha3_224.getInstance();
        try {
            hash(-1);
            hash(29999);
            hash(345454);
        } catch (e) {
            alert(e);
        }
    }

    function testHashObject() {
        var hash = sha3_224.getInstance();
        try {
            hash({});
            hash({ 'foo': 'bar' });
        } catch (e) {
            alert(e);
        }
    }

    function testHashArray() {
        var hash = sha3_224.getInstance();
        try {
            hash([1, 2, 3, 4, '5']);
            hash(['a', 'b', 'c']);
            hash(['a', 2, 'c']);
        } catch (e) {
            alert(e);
        }
    }

    function testHashBoolean() {
        var hash = sha3_224.getInstance();

        try {
            hash(true);
            hash(false);
        } catch (e) {
            alert(e);
        }
    }

    function testHashNull() {
        var hash = sha3_224.getInstance();

        try {
            hash(null);
        } catch (e) {
            alert(e);
        }
    }

    function testHashString() {
        var hash = sha3_224.getInstance();
        try {
            hash('asdf');
            return alert('successfully hash String!');
        } catch (e) {
            alert(e);
        }
    }

    function runAll() {
        testHashFromFile();
        testHashFromConsole();
        testHashFromString();
    }

    return {
        runAll: runAll,
        testHashFromFile: testHashFromFile,
        testHashFromConsole: testHashFromConsole,
        testHashFromString: testHashFromString,
        testAlgorithCollision: testAlgorithCollision,
        testHashNumber: testHashNumber,
        testHashObject: testHashObject,
        testHashArray: testHashArray,
        testHashBoolean: testHashBoolean,
        testHashNull: testHashNull,
        testHashString: testHashString



    }
}());