import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgDataService {
  private dataSubject = new BehaviorSubject<any[]>([]); // Holds the data as an array

  setData(data: any[]) {
    this.dataSubject.next(data);
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
}
