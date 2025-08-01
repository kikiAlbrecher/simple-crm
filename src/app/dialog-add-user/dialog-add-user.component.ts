import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatInputModule, MatFormFieldModule, FormsModule, MatIconModule,
    MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  loading = false;

  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('user:', this.user);

    try {
      this.loading = true;
      this.cdr.detectChanges();
      const usersCollection = collection(this.firestore, 'users');
      const result = await addDoc(usersCollection, { ...this.user });
      console.log('Adding user finished', result);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}