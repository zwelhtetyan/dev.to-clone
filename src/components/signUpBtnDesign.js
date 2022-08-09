import github from '../assets/logo/github.svg';
import twitter from '../assets/logo/twitter.svg';
import facebook from '../assets/logo/facebook.svg';
import google from '../assets/logo/google.svg';
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
      color: '#000',
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
