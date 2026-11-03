
import { createReducer, on } from '@ngrx/store';
import {
  createEntityAdapter,
  EntityState
} from '@ngrx/entity';

import { Student } from '../models/student.model';
import * as StudentsActions from './students.actions';
import { SortMode } from './students.actions';

// Student store state
export interface StudentsState extends EntityState<Student> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  searchText: string;
  selectedFaculty: string;
  sortBy: SortMode;
}

// Entity adapter
export const studentsAdapter = createEntityAdapter<Student>({
  selectId: (student: Student) => String(student.id),
  sortComparer: false
});

// Initial state
export const initialState: StudentsState =
  studentsAdapter.getInitialState({
    loading: false,
    loaded: false,
    errorMessage: '',
    searchText: '',
    selectedFaculty: 'all',
    sortBy: 'featured'
  });

// Reducer
export const studentsReducer = createReducer(
  initialState,

  // Start loading
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  // Loading successful
  on(
    StudentsActions.loadStudentsSuccess,
    (state, { students }) =>
      studentsAdapter.setAll(students, {
        ...state,
        loading: false,
        loaded: true,
        errorMessage: ''
      })
  ),

  // Loading failed
  on(
    StudentsActions.loadStudentsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      errorMessage: error
    })
  ),

  // Update search
  on(
    StudentsActions.setSearchText,
    (state, { searchText }) => ({
      ...state,
      searchText
    })
  ),

  // Update faculty filter
  on(
    StudentsActions.setFaculty,
    (state, { faculty }) => ({
      ...state,
      selectedFaculty: faculty
    })
  ),

  // Update sort mode
  on(
    StudentsActions.setSortMode,
    (state, { sortBy }) => ({
      ...state,
      sortBy
    })
  )
);
