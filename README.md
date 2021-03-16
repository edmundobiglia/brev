<h1 align="center"><img src="./readme_assets/Editor.gif?raw=true" width="600px" height="auto"></h1>

**BREV** is a simple blog app I designed and coded to practice **JavaScript** and **React**. <a href="https://edmundobiglia.github.io/brev">Live demo here</a>.

It has a global public page with all of the published entries. The app allows you to sign in with Google, write and publish articles and sign out. When logged-in, the menu on the upper-right corner allows you to go to the _My Articles_ section to edit, publish/unpublish or delete your articles and to the _My Profile_ section where you can edit your display name and bio.

Being my first React app, it was an interesting challenge which helped me grasp many React concepts and also understand the importance of best practices, clean code and architecture.

## Technologies Used

The app's core technolgies are:

- **React**, **React Router** for routing and **Redux** for state management
- **Firebase** for authentication and database
- **Draft.js** for the blog rich-text editor. Instead of choosing a rich-text editor with built-in formatting functionality, I went with Draft.js, which is not so "rich" and quite rudimentary out of the box, requiring a lot of configuration and customization. Its API proved to be pretty tricky, but it was interesting to explore it and get to understand how it works.

## Full Dependency List

- React
- React Router
- Redux
- Redux Thunk
- Firebase
- Draftjs
- React Transition Group
- React Modal
- Moment
- UUID
- Emoji Mart
- Loadash
- Node SASS
