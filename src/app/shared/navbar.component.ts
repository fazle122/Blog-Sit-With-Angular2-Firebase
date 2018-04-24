import {Component} from '@angular/core'

@Component({
    selector:'nav-bar',
    template:`
                <div class="top-bar">
                    <div class="top-bar-title">
                        Sports Current News
                    </div>
                    <div>
                        <ul class="menu">
                        <li class="nav-menu"><a [routerLink]="['/admin']">Admin Area</a></li>
                        </ul>
                    </div>
                </div>
    
            `,
    styleUrls:['./navbar.component.css']
})

export class NavComponent{}