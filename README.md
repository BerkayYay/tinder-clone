
# Tinder Clone

This project contains a Tinder clone built with React Native, utilizing Firebase, React Native Swiper, Tailwind, and Vector-icons libraries.




## Screenshots
-  <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494145-9d82600a-0baa-4095-8625-4d1fcbb0f63a.png" > <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494149-c4209919-6425-4242-aec5-3109f2108623.png" > <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494135-e762b78b-e0ff-4f34-b924-c5d5a3e5e117.png" > <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494110-c0ceca5c-ebc3-4147-af55-fa2e68c3dfb2.png" > <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494028-af0abe97-e19b-49b5-9f76-a747891d465c.png"> <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494100-6b491cd2-4c8a-4986-94ee-0ecada3e74e1.png" > <img width="163" alt="1" src="https://user-images.githubusercontent.com/61309524/231494130-f57dd9be-f3c3-4edc-bf2e-de82d638154d.png" > 

  
## Features

- User registration and login: Users can register and login using their Google account for a seamless and convenient signup process.
- User profile creation and editing: Users can create their profiles, including their profile picture, name, age, bio, and other relevant information. They can also edit their profiles to update their information.
- Liking and matching with other users: Users can browse through other users' profiles and like or dislike them. If two users like each other, they will be matched and notified of the match.
- Chatting with matched users: Users can chat with their matched users in real-time through the in-app messaging feature. They can send and receive messages, view message history, and interact with their matches.
These features provide a basic functionality similar to the popular dating app Tinder and can be extended and customized as per the requirements of the project.

## Libraries and Tools
- React Native: A popular JavaScript framework for building native mobile applications.
- Firebase (Authentication and Firestore): A backend-as-a-service (BaaS) platform that provides authentication and real-time database functionality for - building scalable mobile applications.
- React Native Swiper: A swiper/carousel component for React Native that enables swiping through cards or images.
- Tailwind CSS: A utility-first CSS framework for building responsive and modern user interfaces.
- Vector-icons: A library that provides a collection of customizable icons for React Native applications.

## Getting Started
To get started with this example application, follow these steps:

1- Clone the repository to your local machine using the following command:

```bash
  git clone https://github.com/BerkayYay/tinder-clone.git
```

2- Change to the cloned directory:

```bash
  cd TinderClone
```

3- Install the dependencies using npm or yarn:

```bash
  npm install
```
or 

```bash
  yarn install
```

4- Start the React Native Metro server:

```bash
  npx react-native start
```
or
```bash
  yarn start
```
4- Make sure you have a valid Firebase project set up with authentication and Firestore enabled. If you don't have one, you can create a new Firebase project from the Firebase console: https://console.firebase.google.com/.

5- Obtain the necessary Firebase configuration credentials for your project, including the **`apiKey`**, **`authDomain`**, **`projectId`**, and other details. You can find these credentials in the Firebase console under the "Settings" of your project, in the "General" tab, under the "Your apps" section.


  
## What I Learned

- Utilizing Firebase authentication for user registration and sign-in functionality, including integrating Google Sign-In for easy registration with Google accounts.
- Implementing swipe gestures using the **`react-native-deck-swiper`** library to create Tinder-like swipeable cards for browsing profiles.
- Utilizing Firebase Firestore as a real-time database to store and retrieve user data, including profiles and chat messages.




  
