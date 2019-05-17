import { Component, Input } from "@angular/core";

@Component({
  selector: 'sm-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input()
  public name: string = 'T T';

  public get initials(): string {
    return this.name ? this.name.split(' ').map(namePart => namePart.charAt(0).toLocaleUpperCase()).join('') : '';
  }
}