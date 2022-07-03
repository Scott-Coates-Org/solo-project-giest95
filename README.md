[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8037525&assignment_repo_type=AssignmentRepo)

# React Redux Firebase Starter

## Getting Started

1. Install yarn. `npm install -g yarn`
2. `yarn install`
3. `yarn dev`

### Hosting

1. `npm install -g firebase-tools`
2. `firebase login`
3. `yarn deploy`

### Stuck?

<details>
<summary>
Try This
</summary>

1. Navigate to: <https://console.firebase.google.com/> (make sure you are using the same account as you used for login)
1. Open your project, and navigate to 'Project Overview > Project settings'
1. Scroll down to 'Your apps' section and click on the web-app symbol (</>)
1. Follow the prompts and in the 2nd step, copy down the `const firebaseConfig` section as you will need it soon
1. Navigate to 'Build > Authentication', click 'Get started', and then follow the prompts to setup 'email/password' and 'Google' providers
1. Navigate to 'Build > Firestore Database', click 'Create database', and select 'Start in test mode'
1. Navigate to 'Build > Storage', click 'Get started', and select 'Start in test mode'
1. In the root folder, **copy** `env.local.example` and rename to `env.local` and open it
1. Enter the `authDomain`, `apiKey`, `projectId`, `storageBucket` into `env.local` to their respective variables
1. `yarn dev`
1. Once you can run locally, run `yarn deploy`

</details>

<!---
*** WHEN YOU ARE UP AND RUNNING, DELETE EVERYTHING ABOVE ME EXCEPT THE VERY TOP LINE. ***
*** RENAME THE TOP LINE WITH YOUR PROJECT NAME. ***
-->

## Sprint Progress

Update your progress by checking off the tasks for each sprint. We will **not** be using issues for solo projects.

### Sprint 1

- [x] Get app approved (DM Scott for approval)
- [x] Create mockups (physical paper, low-fi)
- [x] Define scope (DM Scott for approval)
  - [x] Define milestones for each sprint
  - [x] Define final deliverable for v1
    - Users will be able to view highlighted, color-coded sloped roads within a vicinity of a google map. The map will center on the users home location upon log in.
- [x] App must
  - [x] Be publicly accessible
        -solo-project-8eded.web.app
  - [x] Have working authentication
  - [x] Have technical component 5% done

### Sprint 2

- [x] Technical component 25%
- [ ] Re-evaluate milestones and features
- [x] [Have google maps integrated into home page]
- [x] [Have map start centered based on user home address]

### Sprint 3

- [ ] Technical component 50%
- [ ] Re-evaluate milestones and features
- [ ] [Integrate an api call for intersection identification based on the current map region]
- [ ] [Generate lines to each intersection]

### Sprint 4

- [ ] Technical component 100%
- [ ] [Integrate api call to google maps for elevation at each intersection]
- [ ] [Have lines highlight High to low lines]

## Mockups

| ![Skate Slope Mockup](src/images/SkateSlopeMockup.jpg) |
