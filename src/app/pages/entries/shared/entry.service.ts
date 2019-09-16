import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap, catchError, map } from 'rxjs/operators';

import * as moment from 'moment';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
    ) {
      super('api/entries',
      injector,
      Entry.fromJson
      );
    }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year)),
      catchError(this.handleError)
    );
  }

  private setCategoryAndSendToService(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.data, 'DD/YY/YYYY');

      // tslint:disable-next-line: triple-equals
      const monthMatches = (entryDate.month() + 1) == month;
      // tslint:disable-next-line: triple-equals
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) {
        console.log('Retorno:' , entry);
        return entry;
      }
    });
  }

}
