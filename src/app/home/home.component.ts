import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService, ProjectService, AlertService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    projects: any = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private projectService: ProjectService,
        private alertService: AlertService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllProjects();
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    private loadAllProjects() {
      this.projectService.getProjects()
        .pipe(first())
        .subscribe(projects => {
          this.projects = projects;
          this.filterProjects();
          setTimeout( () => this.alertService.clear(), 2000);
        });
    }

    private filterProjects() {
      this.projects = this.projects.filter(project => {
        return !project.investments.some(investment => investment.investorId === this.currentUser.id);
      });
    }

  onProjectListUpdate(isProjectListUpdated: boolean) {
    this.alertService.success(
      'Congratulations! You have successfully invested in the project. Invested projects show up in My Profile section',
      true
    );
    this.loadAllProjects();
  }
}
