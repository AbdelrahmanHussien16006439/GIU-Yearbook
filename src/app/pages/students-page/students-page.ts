
/*
FILE: pages/students-page/students-page.ts
WHAT: Student directory using NgRx state management.
WHY: Keeps student data and filters when navigating pages.
*/

import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StudentCard } from '../../components/student-card/student-card';
import * as StudentsActions from '../../store/students.actions';
import * as StudentsSelectors from '../../store/students.selectors';
import { SortMode } from '../../store/students.actions';

@Component({
  selector: 'app-student-page',
  imports: [StudentCard],
  templateUrl: './students-page.html',
  styleUrl: './students-page.css',
})
export class StudentsPage implements OnInit {

  // Connect to the shared NgRx store
  private readonly store = inject(Store);

  // Read store state as Angular signals
  protected readonly students =
    this.store.selectSignal(
      StudentsSelectors.selectAllStudents
    );

  protected readonly loading =
    this.store.selectSignal(
      StudentsSelectors.selectLoading
    );

  protected readonly errorMessage =
    this.store.selectSignal(
      StudentsSelectors.selectErrorMessage
    );

  protected readonly searchText =
    this.store.selectSignal(
      StudentsSelectors.selectSearchText
    );

  protected readonly selectedFaculty =
    this.store.selectSignal(
      StudentsSelectors.selectSelectedFaculty
    );

  protected readonly sortBy =
    this.store.selectSignal(
      StudentsSelectors.selectSortBy
    );

  protected readonly faculties =
    this.store.selectSignal(
      StudentsSelectors.selectFaculties
    );

  protected readonly visibleStudents =
    this.store.selectSignal(
      StudentsSelectors.selectVisibleStudents
    );

  protected readonly totalLabel =
    this.store.selectSignal(
      StudentsSelectors.selectTotalLabel
    );

  // Load only if data is not already available
  ngOnInit(): void {
    const loaded =
      this.store.selectSignal(
        StudentsSelectors.selectLoaded
      );

    if (!loaded() && !this.loading()) {
      this.store.dispatch(
        StudentsActions.loadStudents()
      );
    }
  }

  // Search students
  protected onSearch(event: Event): void {
    const searchText =
      (event.target as HTMLInputElement).value;

    this.store.dispatch(
      StudentsActions.setSearchText({
        searchText
      })
    );
  }

  // Filter by faculty
  protected onFacultyChange(event: Event): void {
    const faculty =
      (event.target as HTMLSelectElement).value;

    this.store.dispatch(
      StudentsActions.setFaculty({
        faculty
      })
    );
  }

  // Sort students
  protected onSortChange(event: Event): void {
    const sortBy =
      (event.target as HTMLSelectElement).value as SortMode;

    this.store.dispatch(
      StudentsActions.setSortMode({
        sortBy
      })
    );
  }

  // Scroll to top
  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
