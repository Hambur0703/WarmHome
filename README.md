## WarmHome: A rental information publication and quary webapp
   - Designed and built a full-stack web application landlords and renters using React and Ant Design.
   - Support register/login/logout, search and filter the apartments(name/price), mark favorite apartments, and check favorite apartments in ”All My List” page for renters.
   - Support register/login/logout, publish new apartment information, manage(show, delete) published apartment information for landlords.
   - Implemented RESTful APIs using Node.js, and stored pictures/form-data in MongoDB.
### UI Layout
                                  App
                                   |
                                  Main
       /               /                     \                      \
     Register       Login        Admin(only login as admin)      AllMyList 
   - Users must register and login before entering Main page and AllMyList page.
   - Only login as the admin can enter Admin page. 

