import { Component  } from '@angular/core';
import tableData  from '../../../../assets/data/pages/table-data.json';

@Component({
  selector: 'attendance-Status',
  template: `
  <div class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative ">
  <div
    class="px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]">
    <h1
      class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-white/[.87]">
    Attendance Status</h1>
    <div class="py-[16px] flex items-center gap-[15px]">
      <ul class="flex items-center mb-0">
        <li>
          <button type="button"
            [class]="sellingTab === 'today' ? 'inline-flex items-center bg-primary/10 dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md' : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 hover:text-primary text-13'"
            (click)="handleClick('today')">
            Today
          </button>
        </li>
        <li>
          <button type="button"
            [class]="sellingTab === 'week' ? 'inline-flex items-center bg-primary/10 dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md' : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'"
            (click)="handleClick('week')">
            Week
          </button>
        </li>
        <li>
          <button type="button"
            [class]="sellingTab === 'month' ? 'inline-flex items-center bg-primary/10 dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md' : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'"
            (click)="handleClick('month')">
            Month
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="px-[25px] pt-0 pb-[25px]">
    <div *ngFor="let tab of tabData" [class.hidden]="sellingTab !== tab.key">
      <div class="overflow-x-auto w-full">
      <nz-table [nzData]="seller[tab.key]" [nzFrontPagination]="false" [nzShowPagination]="false" class="text-sm rounded- [5px]">
        <thead>
          <tr>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-start text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-s-[4px]">SL</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden">Date</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden">Shift</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden">In Time</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-end text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-e-[4px]">Out Time</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-end text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-e-[4px]">Stay Time</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-end text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-e-[4px]">Status</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-end text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-e-[4px]">Late By</th>
            <th class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-end text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-e-[4px]">OT Total (H)</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-[#1b1d2a]">
          <tr *ngFor="let product of seller[tab.key]" class="group">
            <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-white/[.87] group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
            1
            </td>
            <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent">01-01-2025</td>
            <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent">General</td>
            <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent">09:20:49</td>
            <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px]">06:20:49</td>
            <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px]">08:20:49</td>
            <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px]">P</td>
            <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px]">10:10:10</td>
            <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px]">02:20:10</td>
          </tr>
        </tbody>
      </nz-table>
      </div>
    </div>
  </div>
</div>

  `
})

export class AttendanceStatusComponent  {
  //Table Data
  seller: any;
  tabData: { key: string; label: string }[];

  constructor() {
    this.seller = tableData.bestSeller;
    this.tabData = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' }
    ];
  }

  //Dropdown Data
  // appItems = items.appItems;
  //Tab
  sellingTab: string = 'today';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }
}
