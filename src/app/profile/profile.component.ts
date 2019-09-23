import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Project } from '@/_models';
import { UserService, AuthenticationService, ProjectService } from '@/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  projects: any = [];
  loading = true;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllInvestments();
  }

  private loadAllInvestments() {
    this.projectService.getProjects()
      .pipe(first())
      .subscribe(projects => {
        this.loading = false;
        this.projects = projects;
        this.filterProjects();
      });
  }

  private filterProjects() {
    this.projects = this.projects.filter(project => {
      return project.investments.some(investment => investment.investorId === this.currentUser.id);
    });
  }

}
