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
        QUnit.test("Collision test", function(assert) {
            assert.expect(6);
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

            for (var index = 0; index < testArray.length; index += 1) {
                if (result !== testArray[index]) {
                    result = testArray[index];
                    assert.ok(true);
                } else {
                    assert.notOk(result, "There is Collision");
                }
            }
        });
    }

    function testHashNumber() {
        QUnit.test("test hash number", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash(-1);
                assert.ok(true);
            } catch (e) {
                assert.notOk(false, "Do not accept number as a valid input");
            }
        });
    }

    function testHashObject() {
        QUnit.test("test hash object", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash({});
                assert.ok(true);
            } catch (e) {
                assert.notOk(false, "Do not accept object as a valid input");
            }
        });
    }

    function testHashArray() {
        QUnit.test("test hash array", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash(['a', 2, 'c']);
                assert.ok(true);
            } catch (e) {
                assert.notOk(false, "Do not accept array as a valid input");
            }
        });
    }

    function testHashBoolean() {
        QUnit.test("test hash boolean", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash(true);
                assert.ok(true);
            } catch (e) {
                assert.notOk(false, "Do not accept boolean as a valid input");
            }
        });
    }

    function testHashNull() {

        QUnit.test("test hash null", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash(null);
                assert.ok(true);
            } catch (e) {
                assert.notOk(false, "Do not accept null as a valid input");
            }
        });
    }

    function testHashString() {
        QUnit.test("test hash string", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash('asdf');
                assert.ok(true, "Successfully hash string");
            } catch (e) {
                assert.notOk(false, "Failed hash string");
            }
        });
    }

    function testHashCyrillicString() {


        QUnit.test("test hash cyrillic string", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash('здрасти');
                assert.ok(true, "Successfully cyrillic hash string");
            } catch (e) {
                assert.notOk(false, "Failed hash cyrillic string");
            }
        });
    }

    function testHashInput(input) {
        QUnit.test("test hash from input", function(assert) {
            var hash = sha3_224.getInstance();
            try {
                hash(input);
                assert.ok(true, "Successfully hash input");
            } catch (e) {
                assert.notOk(false, "Failed hash input");
            }
        });
    }

    function runAll() {
        testHashFromFile();
        testHashFromConsole();
        testHashFromString();
        testHashNumber();
        testAlgorithCollision();
        testHashObject();
        testHashArray();
        testHashBoolean();
        testHashNull();
        testHashString();
        testHashCyrillicString();
        testHashInput();
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
        testHashString: testHashString,
        testHashCyrillicString: testHashCyrillicString,
        testHashInput: testHashInput
    }
}());