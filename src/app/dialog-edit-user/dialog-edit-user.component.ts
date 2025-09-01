import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatInputModule, MatFormFieldModule, FormsModule,
    MatIconModule, MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./../dialog-add-user/dialog-add-user.component.scss', './dialog-edit-user.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User(inject(MAT_DIALOG_DATA));
  birthDate: Date = this.user.birthDate ? new Date(this.user.birthDate) : new Date();
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  async saveChangesUser() {
    if (this.birthDate) this.user.birthDate = this.birthDate.getTime();

    try {
      this.loading = true;
      this.cdr.detectChanges();
      const { id, ...userData } = this.user;
      const userDocRef = doc(this.firestore, `users/${id}`);

      await updateDoc(userDocRef, userData);
      this.cdr.detectChanges();
    } catch (error) {
      throw new Error('Error editing user: ' + error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
      this.dialogRef.close();
    }
  }

  cancelAction() {
    this.dialogRef.close();
  }
}