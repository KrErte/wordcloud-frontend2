import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Text, JobResult } from '../text';
import { interval, Subscription, switchMap, takeWhile } from 'rxjs';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results implements OnInit, OnDestroy {
  result = signal<JobResult | null>(null);
  loading = signal(true);
  private pollSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private textService: Text
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pollSub = interval(2000).pipe(
      switchMap(() => this.textService.getResult(id)),
      takeWhile(r => r.status !== 'COMPLETE', true)
    ).subscribe({
      next: (r) => {
        this.result.set(r);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  getFontSize(count: number): string {
    const max = this.result()?.words[0]?.count ?? 1;
    return `${12 + (count / max) * 40}px`;
  }

  getColor(index: number): string {
    const colors = ['#1d4ed8', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'];
    return colors[index % colors.length];
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
