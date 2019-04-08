const fetch = require('node-fetch');

const swapi = require('./script2');

// using expect.assertions and done()
it('calls swapi to get people', (done) => {
    expect.assertions(1);
    swapi.getPeople(fetch).then(data => {
        expect(data.count).toBe(87);
        done();
    })
})

it('calls swapi to get people with a promise', (done) => {
    expect.assertions(1);
    swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toBe(87);
        done();
    })
})


// with returning promises.
it('calls swapi to get people with return promise', () => {
    return swapi.getPeople(fetch).then(data => {
        expect(data.count).toBe(87);
    })
})

// with returning promises and expect assertions.
it('calls swapi to get people with a promise', () => {
    expect.assertions(2);
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toBe(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
})