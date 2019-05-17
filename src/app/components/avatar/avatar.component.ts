import { Component, Input } from "@angular/core";

@Component({
  selector: 'sm-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  /**
   * Initials shown by the component.
   */
  public initials = '???';

  @Input()
  set name(name: string) {
    const splitable = typeof name === 'string' && name.split(' ').length > 0;
    this.initials = splitable ? name.split(' ').map(namePart => namePart.charAt(0).toLocaleUpperCase()).join('') : 'ERR';
  }

  @Input()
  public indicatorIcon: 'checkmark' | undefined;

}