import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('* => *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() toggleState: Boolean = false;

  @Output() sideNavToggle: EventEmitter<void> = new EventEmitter();

  innerToggleState: String = 'default';

  photoURL: String = null;
  username: String = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.user) {
      this.authService.user.subscribe(u => {
        this.photoURL = u.photoURL ? u.photoURL : null;

        if (u.displayName) {
          this.username = u.displayName;
        } else {
          this.username = u.email;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toggleState) {
      this.innerToggleState = changes.toggleState.currentValue ? 'rotated' : 'default';
    }
  }

  sidenavToggled() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
