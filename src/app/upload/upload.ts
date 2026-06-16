import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Text } from '../text';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile = signal<File | null>(null);
  uploading = signal(false);
  error = signal<string | null>(null);

  constructor(private textService: Text, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile.set(input.files[0]);
      this.error.set(null);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile.set(file);
      this.error.set(null);
    }
  }

  upload(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);
    this.textService.uploadFile(file).subscribe({
      next: (res) => this.router.navigate(['/results', res.id]),
      error: () => {
        this.error.set('Upload failed. Please try again.');
        this.uploading.set(false);
      }
    });
  }
}
