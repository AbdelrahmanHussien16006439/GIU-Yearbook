
import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { map } from 'rxjs';

import { Student } from '../../models/student.model';
import { AuthService } from '../../services/auth.service';
import { StoryDraftService } from '../../services/story-draft.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage implements OnInit {

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly students = inject(StudentService);
  private readonly drafts = inject(StoryDraftService);

  protected readonly form = this.fb.group({
    quote: ['', [
      Validators.required,
      Validators.maxLength(160)
    ]],
    story: ['', [Validators.maxLength(1000)]],
    moment: ['', [Validators.maxLength(200)]],
    next: ['', [Validators.maxLength(120)]],
    consent: [false]
  });

  protected readonly values = toSignal(
    this.form.valueChanges.pipe(
      map(() => this.form.getRawValue())
    ),
    {
      initialValue: this.form.getRawValue()
    }
  );

  protected readonly student = signal<Student | null>(null);
  protected readonly user = this.auth.currentUser;

  protected readonly changed = signal(false);
  protected readonly savedAt = signal<string | null>(null);
  protected readonly storageError = signal(false);

  protected readonly quoteLength = computed(
    () => this.values().quote.length
  );

  constructor() {
    this.form.valueChanges.subscribe(() => {
      this.changed.set(true);
      this.storageError.set(false);
    });
  }

  ngOnInit(): void {
    const currentUser = this.auth.currentUser();

    if (!currentUser) {
      this.router.navigateByUrl('/login');
      return;
    }

    const studentId = currentUser.studentId;

    this.students.getStudents().subscribe({
      next: (list) => {
        const foundStudent =
          list.find((s) => s.id === studentId) ?? null;

        this.student.set(foundStudent);

        if (!foundStudent) {
          return;
        }

        const savedDraft = this.drafts.load(studentId);

        if (savedDraft) {
          this.form.patchValue(savedDraft.values);
          this.savedAt.set(savedDraft.savedAt);
        } else {
          this.form.patchValue({
            quote: foundStudent.quote
          });
        }

        this.changed.set(false);
      },
      error: () => {
        this.storageError.set(true);
      }
    });
  }

  protected saveDraft(): void {
    const currentUser = this.auth.currentUser();

    if (!currentUser) {
      return;
    }

    const savedTime = this.drafts.save(
      currentUser.studentId,
      this.form.getRawValue()
    );

    if (savedTime) {
      this.savedAt.set(savedTime);
      this.changed.set(false);
      this.storageError.set(false);
    } else {
      this.storageError.set(true);
    }
  }

  protected signOut(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
