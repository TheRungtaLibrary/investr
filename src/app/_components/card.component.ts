import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User, Project } from '@/_models';
import { ProjectService } from '@/_services';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {
  investForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() project: Project;
  @Input() user: User;
  @Input() editable: boolean;
  @Output() isProjectListUpdated = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.investForm = this.formBuilder.group({
      investment: ['', [Validators.required, Validators.min(100), Validators.max(10000)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.investForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.investForm.invalid) {
      return;
    }
    this.loading = true;
    this.project.investments.push({
      investorId: this.user.id,
      amount:  this.investForm.get('investment').value
    });
    this.projectService.updateProject(this.project)
      .pipe(first())
      .subscribe(() => this.isProjectListUpdated.emit(true));
  }
}
