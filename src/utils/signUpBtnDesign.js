import { github, twitter, facebook, google } from '../assets/icons';
import {
   FacebookAuthProvider,
   GithubAuthProvider,
   GoogleAuthProvider,
   TwitterAuthProvider,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const signUpBtnDesigns = [
   {
      bg: '#24292e',
      logo: github,
      text: 'Github',
      hoverBg: '#000',
      signInMethod: githubProvider,
   },
   {
      bg: '#1da1f2',
      logo: twitter,
      text: 'Twitter',
      hoverBg: '#0096f2',
      signInMethod: twitterProvider,
   },
   {
      bg: '#dbdbdb',
      logo: google,
      text: 'Google',
      hoverBg: '#d9d9d9',
      color: 'light.color',
      signInMethod: googleProvider,
   },
   {
      bg: '#1877f2eb',
      logo: facebook,
      text: 'Facebook',
      hoverBg: '#1877F2',
      signInMethod: facebookProvider,
   },
];
