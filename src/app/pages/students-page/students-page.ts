
/* =====================================================================
   FILE: pages/students-page/students-page.ts
   WHAT: The landing page: title, filters and the grid of student cards.
   FIGMA: Frame "Class of 2028 · Student directory".

   WHAT STUDENTS PRACTISE HERE
   1. Fetching data from a service (the fake API)
   2. Loading / error / empty states
   3. Filtering + sorting with signals and `computed`
   ===================================================================== */

import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

// STEP 11: Import our new Student Card component.
import { StudentCard } from '../../components/student-card/student-card';

// A type for the sort dropdown. Only these two values are allowed.
type SortMode = 'featured' | 'name';

@Component({
  selector: 'app-student-page',
  imports: [StudentCard],
  templateUrl: './students-page.html',
  styleUrl: './students-page.css',
})
export class StudentsPage implements OnInit {

  // Ask Angular for the service.
  private readonly studentService = inject(StudentService);

  // STATE = data that can change while the page is open.
  protected readonly students = signal<Student[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly searchText = signal('');
  protected readonly selectedFaculty = signal('all');
  protected readonly sortBy = signal<SortMode>('featured');

  // DERIVED STATE: faculties for the dropdown.
  protected readonly faculties = computed(() =>
    [...new Set(this.students().map((s) => s.faculty))].sort(),
  );

  // Filter and sort the displayed students.
  protected readonly visibleStudents = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const faculty = this.selectedFaculty();

    const filtered = this.students().filter(
      (s) =>
        s.name.toLowerCase().includes(text) &&
        (faculty === 'all' || s.faculty === faculty),
    );

    return this.sortBy() === 'name'
      ? filtered.sort((a, b) => a.name.localeCompare(b.name))
      : filtered.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            a.id - b.id,
        );
  });

  // Counter for total students.
  protected readonly totalLabel = computed(() =>
    String(this.students().length).padStart(2, '0'),
  );

  // Load student data when the component starts.
  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'We could not load the students. Please try again.',
        );
        this.loading.set(false);
      },
    });
  }

  // Search input handler.
  protected onSearch(event: Event): void {
    this.searchText.set(
      (event.target as HTMLInputElement).value,
    );
  }

  // Faculty dropdown handler.
  protected onFacultyChange(event: Event): void {
    this.selectedFaculty.set(
      (event.target as HTMLSelectElement).value,
    );
  }

  // Sort dropdown handler.
  protected onSortChange(event: Event): void {
    this.sortBy.set(
      (event.target as HTMLSelectElement).value as SortMode,
    );
  }

  // Scroll to the top of the page.
  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
