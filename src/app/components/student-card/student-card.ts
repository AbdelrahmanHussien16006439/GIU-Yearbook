
/*
FILE: student-card.ts
WHAT: Defines the Student Card component.
WHY: Receives student data and handles missing images.
*/

import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
import { SavedService } from '../../services/saved.service';
@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {

  // Receive student information from the parent page.
  readonly student = input.required<Student>();

  // Track whether the student photo failed to load.
  private readonly imageFailed = signal(false);

  // Use a placeholder if the original photo is missing.
  protected readonly photoSrc = computed(() =>
    this.imageFailed()
      ? 'images/placeholder-portrait.svg'
      : this.student().photo
  );

  // Handle image loading errors.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
  
private readonly saved = inject(SavedService);

protected readonly isSaved = computed(() =>
  this.saved.isSaved(this.student().id)
);

protected onToggleSaved(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
  this.saved.toggle(this.student().id);
}

}
