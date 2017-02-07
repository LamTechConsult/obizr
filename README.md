**What is OBizR?**

OBizR is a location-based local business review, directory, and citizen-generated open data platform for Africa. "OBizR Sierra Leone" is your local guide to finding the best places to eat, shop, sleep, bank, drink, learn, exercise, relax, watch a game, buy medication, do business with the government, NGOs, Foreign Missions, and play in Sierra Leone.

Its free and easy to share your experience using five-star ratings, photos, and text comments. Your shared experience will help others like you make informed decisions. Your reviews will help the business owner improve service delivery

Instructions
------------
- clone the repository using 'git clone [reponame]'
- cd [reponame]
- npm install (to install node module dependency).
- bower update (to install bower dependency).
- ionic state restore (to add cordova plugins)

Add platform
------------
- ionic platform add android
- ionic platform add ios
- ionic platform add windows

Generate resources
------------------
- ionic resources --splash

Run the app in your browser
-----------
- ionic serve
- ionic serve browser

Run the app in an emulator
-----------
- ionic run android
- ionic run ios
- ionic emulate android
- ionic emulate ios

Prepare app store files for release
---------
- cordova plugin rm cordova-plugin-console
- cordova build --release android OR
- ionic build android
- cordova build --release ios OR
- ionic build ios
- ionic build browser
