QUnit.test("Hash from Console", function(assert) {
    assert.equal(fkstHashConsole("a"), "9e86ff69557ca95f405f081269685b38e3a819b309ee942f482b6a8b");
    assert.equal(fkstHashConsole("ab"), "09d27a15bcbab5da828d84dbd66062e5d37049f9b165a65dc581e853");
    assert.equal(fkstHashConsole("abc"), "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
    assert.equal(fkstHashConsole("bac"), "5f3569911cbb51155303fb53649913a85a6d58c4465736f490231e24");
    assert.equal(fkstHashConsole("acb"), "e83488a992c7111f20bb9eca90ff323f2f42703dfe8037f1e096678e");
    assert.equal(fkstHashConsole(""), "");
});

QUnit.test("Hash from String", function(assert) {
    assert.equal(fkstHashString(), "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
});


QUnit.test("Hash from File", function(assert) {
    var done = assert.async(5);
    fkstHashFile('http://localhost/vvps/project/testFiles/abc.txt').then(function(res) {
        assert.equal(res, "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf");
        assert.ok(true, "test resumed from async operation 1");
        done();
    });

    fkstHashFile('http://localhost/vvps/project/testFiles/empty.txt').then(function(res) {
        assert.equal(res, "");
        assert.ok(true);
        done();
    });

    fkstHashFile('http://localhost/vvps/project/testFiles/123456789.txt').then(function(res) {
        assert.equal(res, "5795c3d628fd638c9835a4c79a55809f265068c88729a1a3fcdf8522");
        assert.ok(true);
        done();
    });
    fkstHashFile('http://localhost/vvps/project/testFiles/img.jpg').then(function(res) {
        assert.equal(res, "Wrong file format");
        assert.ok(true);
        done();
    });
    fkstHashFile('http://localhost/vvps/project/testFiles/word.docx').then(function(res) {
        assert.equal(res, "Wrong file format");
        assert.ok(true);
        done();
    });


});