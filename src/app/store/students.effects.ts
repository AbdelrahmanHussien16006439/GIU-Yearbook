
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { StudentService } from '../services/student.service';
import * as StudentsActions from './students.actions';

@Injectable()
export class StudentsEffects {

  private readonly actions$ = inject(Actions);
  private readonly studentService = inject(StudentService);

  // Listen for loadStudents action
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),

      switchMap(() =>
        this.studentService.getStudents().pipe(

          map((students) =>
            StudentsActions.loadStudentsSuccess({
              students
            })
          ),

          catchError(() =>
            of(
              StudentsActions.loadStudentsFailure({
                error:
                  'We could not load the students. Please try again.'
              })
            )
          )
        )
      )
    )
  );
}
