import { DistributionPath } from 'src/app/main/distribution/constant/distribution.enums';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column h-100 overflow-hidden';

  apiPath: string;
  apiHeaderPath: string;
  apiDownloadPath: string;
  activeTab: number; 

  constructor() { }

  ngOnInit(): void {
    // this.apiPath = DistributionPath.DISTRI BUTIONAPIPATH;
    this.activeTab = 2
    if (this.activeTab == 1) {
      this.apiPath = DistributionPath.DISTRIBUTIONAPIPATH;
      this.apiHeaderPath = DistributionPath.HEADERS
      this.apiDownloadPath = DistributionPath.DOWNLOAD
    } else {
      this.apiPath = DistributionPath.SHOWROOMAPIPATH;
      this.apiHeaderPath = DistributionPath.SHOWROOMHEADERS;
      this.apiDownloadPath = DistributionPath.SHOWROOMDOWNLOAD;
    }
  }

  resetFilters(tab: any) {
    if (tab.nextId == 1) {
      this.apiPath = DistributionPath.DISTRIBUTIONAPIPATH;
      this.apiHeaderPath = DistributionPath.HEADERS
      this.apiDownloadPath = DistributionPath.DOWNLOAD
    } else {
      this.apiPath = DistributionPath.SHOWROOMAPIPATH;
      this.apiHeaderPath = DistributionPath.SHOWROOMHEADERS;
      this.apiDownloadPath = DistributionPath.SHOWROOMDOWNLOAD;
    }
  }

}
