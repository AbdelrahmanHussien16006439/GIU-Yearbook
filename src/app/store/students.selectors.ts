
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import {
  StudentsState,
  studentsAdapter
} from './students.reducer';

// Get students state
export const selectStudentsState =
  createFeatureSelector<StudentsState>('students');

// Entity selectors
const entitySelectors = studentsAdapter.getSelectors();

export const selectAllStudents = createSelector(
  selectStudentsState,
  entitySelectors.selectAll
);

// Loading state
export const selectLoading = createSelector(
  selectStudentsState,
  (state) => state.loading
);

// Has the list loaded?
export const selectLoaded = createSelector(
  selectStudentsState,
  (state) => state.loaded
);

// Error message
export const selectErrorMessage = createSelector(
  selectStudentsState,
  (state) => state.errorMessage
);

// Search text
export const selectSearchText = createSelector(
  selectStudentsState,
  (state) => state.searchText
);

// Faculty filter
export const selectSelectedFaculty = createSelector(
  selectStudentsState,
  (state) => state.selectedFaculty
);

// Sort option
export const selectSortBy = createSelector(
  selectStudentsState,
  (state) => state.sortBy
);

// Available faculties
export const selectFaculties = createSelector(
  selectAllStudents,
  (students) =>
    [...new Set(students.map((s) => s.faculty))].sort()
);

// Filter and sort students
export const selectVisibleStudents = createSelector(
  selectAllStudents,
  selectSearchText,
  selectSelectedFaculty,
  selectSortBy,
  (students, searchText, faculty, sortBy) => {
    const text = searchText.trim().toLowerCase();

    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(text) &&
        (faculty === 'all' || student.faculty === faculty)
    );

    return sortBy === 'name'
      ? filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      : filtered.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            a.id - b.id
        );
  }
);

// Total student count
export const selectTotalLabel = createSelector(
  selectAllStudents,
  (students) =>
    String(students.length).padStart(2, '0')
);
