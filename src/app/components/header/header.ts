
/*=====================================================================
  FILE: components/header/header.ts
  WHAT: The top bar of the site.
  WHY: Displays navigation, logo, login, and saved student count.
=====================================================================*/

import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SavedService } from '../../services/saved.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  // Navigation links
  protected readonly navLinks = [
    { label: 'Class of 2028', path: '/', exact: true },
    { label: 'Teachers & Staff', path: '/teachers', exact: false },
    { label: 'Gallery', path: '/gallery', exact: false },
  ];

  // Track whether the logo image failed to load
  protected readonly logoFailed = signal(false);

  // Shared service for saved students
  protected readonly saved = inject(SavedService);
}
