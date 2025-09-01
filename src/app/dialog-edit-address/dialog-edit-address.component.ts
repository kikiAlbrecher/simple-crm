import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.class';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatInputModule, MatFormFieldModule, FormsModule,
    MatIconModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./../dialog-add-user/dialog-add-user.component.scss', './dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User(inject(MAT_DIALOG_DATA));
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);

  async saveAddressChanges() {
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
