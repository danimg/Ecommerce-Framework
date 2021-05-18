import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ngbLoadingAnimationTypes, INgbLoadingConfig, NgbLoadingConfig } from './loading-config';
import { NgbLoadingService } from './loading.service';

@Component({
  selector: 'ngb-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class NgbLoadingComponent implements OnInit {
  // @Input() show: boolean;
  @Input() config: INgbLoadingConfig = new NgbLoadingConfig();
  @Input() template: TemplateRef<any>;
  private defaultConfig: INgbLoadingConfig = {
    animationType: ngbLoadingAnimationTypes.linePulse,
    backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
    backdropBorderRadius: '0px',
    fullScreenBackdrop: true,
    primaryColour: '#1b6ec2',
    secondaryColour: '#1b6ec2',
    tertiaryColour: '#1b6ec2'
  };
  public ngxLoadingAnimationTypes = ngbLoadingAnimationTypes;

  constructor(public LoadingService: NgbLoadingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setupConfig();
  }

  private setupConfig(): void {
    for (const option in this.defaultConfig) {
      if (typeof this.config[option] === 'boolean') {
        if (this.config[option] != null) {
          continue;
        }

        this.config[option] = this.LoadingService.loadingConfig[option] != null ? this.LoadingService.loadingConfig[option] : this.defaultConfig[option];
      } else {
        if (this.config[option] != null) {
          continue;
        }

        this.config[option] = this.LoadingService.loadingConfig[option] != null ? this.LoadingService.loadingConfig[option] : this.defaultConfig[option];
      }
    }
  }

  public setShow(show: boolean): void {
    if(show)
      this.LoadingService.show();
    else
      this.LoadingService.close();

    this.changeDetectorRef.markForCheck();
  }
}
