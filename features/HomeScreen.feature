Feature: Home Screen
        Scenario: Verify that user redirects to the home screen when launched the website into browser
            Given I am online at "https://www.mailtag.io/"
             Then I should see homepage

        Scenario: Verify that user is able to see "Add to Chrome" button at the top right corner of the page
            Given I am online at "https://www.mailtag.io/"
              And I should see homepage
             Then I should see "Add to Chrome" button
        
        Scenario: Verify that user is able to click on the "Add to Chrome" button
            Given I am online at "https://www.mailtag.io/"
              And I should see homepage
              And I should see "Add to Chrome" button
              And I click on "Add to Chrome" button
             Then I should see "Chrome Web Store" page

        Scenario: Verify that user is able to click on the "Add to Chrome" button
            Given I am online at "https://www.mailtag.io/"
              And I should see homepage
              And I should see "Add to Chrome" button
              And I click on "Add to Chrome" button
              And  I should see "Chrome Web Store" page
              And I click on Add to Chrome button


