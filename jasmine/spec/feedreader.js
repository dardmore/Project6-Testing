/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite to test the menu functionality */
    describe('The Menu', function() {

        /* This test ensures the menu element is hidden by default */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* This test ensures the menu changes visibility when the menu
          * icon is clicked. Does the menu display when clicked and does
          * it hide when clicked again.
          */
        it('will become visible and hidden when the menu item is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            
            //simulate a menu click
            menuIcon.click();

            //menu is hidden by default, therefore the menu should be visible now
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
           
            //simulate a menu click
            menuIcon.click();
            
            //now menu should be hidden again
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite to test the initial entries in the RSS feed */
    describe('Initial Entries', function() {
        
        /* This test ensures that when the loadFeed function is called
         * and completes its work, there is at least a single .entry element
         * within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('.entry element in the .feed container', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite to test the "New Feed Selection" */
    describe('New Feed Selection', function() {
    
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // Empty the Feed Title
        $('.header-title').empty();
        var currentFeed;

        // Update the Feed to a new feed
        beforeAll(function(done) {
            loadFeed(0, function() {
                currentFeed = $('.header-title').text();
                loadFeed(1, done);
            });
        });
        
        // After test, reset Feed to the original feed
        afterEach(function(done) {
            loadFeed(0, done);
        });

        // Check to find out if the feed changed
        it('will change when new feed data is loaded by the loadFeed function', function() {
            expect($('.header-title').text()).not.toBe(currentFeed);
        });
    });
});