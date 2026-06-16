import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WordCountDto {
  word: string;
  count: number;
}

export interface JobResult {
  id: string;
  status: string;
  words: WordCountDto[];
}

@Injectable({ providedIn: 'root' })
export class Text {
  private readonly apiUrl = 'http://localhost:8080/api/texts';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{ id: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ id: string }>(this.apiUrl, formData);
  }

  getResult(id: string): Observable<JobResult> {
    return this.http.get<JobResult>(`${this.apiUrl}/${id}`);
  }
}
