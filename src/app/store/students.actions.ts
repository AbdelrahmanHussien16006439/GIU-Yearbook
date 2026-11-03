
import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student.model';

export type SortMode = 'featured' | 'name';

// Load students
export const loadStudents = createAction(
  '[Students] Load Students'
);

// Loading successful
export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: Student[] }>()
);

// Loading failed
export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: string }>()
);

// Update search
export const setSearchText = createAction(
  '[Students] Set Search Text',
  props<{ searchText: string }>()
);

// Update faculty filter
export const setFaculty = createAction(
  '[Students] Set Faculty',
  props<{ faculty: string }>()
);

// Update sorting
export const setSortMode = createAction(
  '[Students] Set Sort Mode',
  props<{ sortBy: SortMode }>()
);
