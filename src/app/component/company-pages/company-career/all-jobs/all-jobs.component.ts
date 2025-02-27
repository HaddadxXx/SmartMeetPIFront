import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { allJobs } from '../../../../shared/data/company-pages/company';

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.scss'
})

export class AllJobsComponent {

  public allJobs = allJobs ;

}
