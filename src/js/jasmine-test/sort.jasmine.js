jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('jquery sort plugin', function () {
    var elem;

    beforeEach(function () {
        loadFixtures('sampleSort.html');
        elem = $('#mylist2');
    });

    it('should  have French sorting', function () {
        elem.localeSort();
        var li = elem.find('li').map(function (i, el) {
            return $(el).text();
        }).get();


        expect(li).toEqual(['Orange', 'Poir', 'Pomme']);
    });
});
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('jquery sort plugin', function () {
    var elem;

    beforeEach(function () {
        loadFixtures('sampleSort.html');
        elem = $('#mylist2');
    });

    it('should  have French sorting', function () {
        elem.localeSort();
        var li = elem.find('li').map(function (i, el) {
            return $(el).text();
        }).get();


        expect(li).toEqual(['Orange', 'Poir', 'Pomme']);
    });
});
