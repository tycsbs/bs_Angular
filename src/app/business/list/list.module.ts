import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { CounterComponent } from 'src/app/core/component/counter/counter.component';
import { SearchComponent } from 'src/app/core/component/search/search.component';

export const ListRoutes: Routes = [{
    path: '',
    component: ListComponent
}];

@NgModule({
    declarations: [
        ListComponent,
        CounterComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ListRoutes)
    ],
    exports: [],
    providers: [],
})
export class ListModule {}
