
/* =====================================================================
   FILE: src/app/app.routes.ts
   WHAT: All website routes, including Login and My Profile.
   ===================================================================== */

import { Routes } from '@angular/router';

import { StudentsPage } from './pages/students-page/students-page';
import { PlaceholderPage } from './pages/placeholder-page/placeholder-page';
import { LoginPage } from './pages/login-page/login-page';
import { ProfilePage } from './pages/profile-page/profile-page';

export const routes: Routes = [
  {
    path: '',
    component: StudentsPage,
    title: 'Class of 2028 · GIU Yearbook'
  },

  {
    path: 'teachers',
    component: PlaceholderPage,
    data: { title: 'Teachers & Staff' }
  },

  {
    path: 'gallery',
    component: PlaceholderPage,
    data: { title: 'Gallery' }
  },

  {
    path: 'login',
    component: LoginPage,
    title: 'Student login · GIU Yearbook'
  },

  {
    path: 'profile',
    component: ProfilePage,
    title: 'My Profile · GIU Yearbook'
  },

  {
    path: 'students/:id',
    component: PlaceholderPage,
    data: { title: 'Student story' }
  },

  // Keep this route LAST.
  {
    path: '**',
    redirectTo: ''
  }
];
