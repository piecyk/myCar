'use strict';

describe('Service: Locale', function () {

    // load the controller's module
    beforeEach(module('locale'));

    it("should be defined", inject(function(Locale) {
	expect(Locale).toBeDefined();
    }));
    
});

describe('Locale filter', function () {

    beforeEach(module('locale'));
    
    var dictionary = {
	key: 'value',
	key1: 'value1',
	key2: 'value2',
	keyParam: "Hello {0}!",
	keyParams: "A, {0}, {1}, D, {2}, F, {3}",
	keyOrder: "2-{1}, 1-{0}, 4-{3}, 3-{2}"
    };
    
    beforeEach(inject(function(Locale) {
        //Locale
    }));
    
    it("should be defined", inject(function($filter) {
	expect($filter('l')).toBeDefined();
    }));
    
    it("should value string",  inject(function($filter) {
	expect($filter('l')("key")).toBe(dictionary.key);
	expect($filter('l')("key1")).toBe(dictionary.key1);
	expect($filter('l')("key2")).toBe(dictionary.key2);
    }));
    
    it("should value string with params",  inject(function($filter) {
	expect($filter('l')("keyParam", "world" )).toBe("Hello world!");		
	expect($filter('l')("keyParams",  ["B", "C", "E", "G"])).toBe("A, B, C, D, E, F, G");
	expect($filter('l')("keyOrder",  [1, 2, 3, 4])).toBe("2-2, 1-1, 4-4, 3-3");
    }));	
});
