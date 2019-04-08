const googleSearch = require('./script')

dbMock = [
    'dog.com',
    'cheesepuff.com',
    'javascript.com',
    'disney.com',
    'dogpictures.com',
    'moredogs.com',
    'extradogs.com',
];

describe('googleSearch', () => {
    it('Simple test', () => {
        expect('hello').toBe('hello')
    });
    
    it('is searching google', () => {
        expect(googleSearch('testest', dbMock)).toEqual([])
        expect(googleSearch('disney', dbMock)).toEqual(['disney.com'])
    })
    
    it('work with undefined and null input', () => {
        expect(googleSearch(undefined, dbMock)).toEqual([])
        expect(googleSearch(null, dbMock)).toEqual([])
    })
    
    it('does not return more than 3 matches', () => {
        expect(googleSearch('dog', dbMock).length).toEqual(3)
    })
})

