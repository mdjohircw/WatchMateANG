import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UsersComponent } from './users/users.component';
import { AccessControlRoutingModule } from './access-control-routing.module';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

const antdModule = [
    NzCardModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzPaginationModule,
    NzDividerModule,
    NzButtonModule,
    NzListModule,
    NzTableModule,
    NzRadioModule,
    NzRateModule,
    NzTabsModule,
    NzTagModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSwitchModule,
    NzUploadModule,
    NzToolTipModule,
    NzModalModule,
    NzMessageModule,
    NzInputModule,
    NzBadgeModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    NzTreeModule,
    CdkDropList,
    CdkDrag,
    NzTableModule, 
  
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
       AccessControlRoutingModule,
        

        ...antdModule
    ],
    declarations: [
        UserRolesComponent,
        UsersComponent,
        
    ],
    providers: [
      DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AccessControlModule {}
